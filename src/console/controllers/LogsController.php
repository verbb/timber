<?php
namespace verbb\timber\console\controllers;

use verbb\timber\Timber;
use verbb\timber\helpers\LogFiles;
use verbb\timber\models\Settings;
use verbb\timber\realtime\AuthenticatedSocketIO;
use verbb\timber\realtime\RealtimeEventBus;

use Craft;
use craft\console\Controller;
use craft\helpers\Console;

use yii\console\ExitCode;

use Throwable;

use Symfony\Component\Process\Process;
use Workerman\Worker;

/**
 * Manages Timber logs.
 */
class LogsController extends Controller
{
    // Public Methods
    // =========================================================================

    /**
     * Start a Socket.io server to listen to logs in real-time.
     */
    public function actionRun(): int
    {
        /* @var Settings $settings */
        $settings = Timber::$plugin->getSettings();
        $socketPort = $settings->socketPort;

        $io = new AuthenticatedSocketIO();
        $worker = new Worker('SocketIO://127.0.0.1:' . $socketPort);
        $worker->name = 'PHPSocketIO';
        $worker->count = 1;
        $io->attach($worker);

        $eventWorker = null;

        $io->on('workerStart', function() use ($io, &$eventWorker): void {
            $eventWorker = RealtimeEventBus::createWorker(static function(array $payload) use ($io): void {
                $io->emit('logUpdate', $payload);
            });
            $eventWorker->listen();
        });

        $io->on('workerStop', static function() use (&$eventWorker): void {
            $eventWorker?->unlisten();
        });

        Worker::runAll();

        return ExitCode::OK;
    }

    /**
     * Poll log files for changes.
     */
    public function actionWatch(): int
    {
        $processes = [];
        $initialScan = true;

        try {
            while (true) {
                $paths = LogFiles::watchablePaths(true);

                foreach ($processes as $file => $process) {
                    if (!in_array($file, $paths, true)) {
                        $process->stop();
                        unset($processes[$file]);
                        $this->_notifyUpdate($file);
                    }
                }

                foreach ($paths as $file) {
                    if (isset($processes[$file])) {
                        continue;
                    }

                    // Follow the filename through replacement, not the old file descriptor.
                    $process = new Process(['tail', '-n0', '-F', $file]);
                    $process->setTimeout(null);
                    $process->start(function(string $type, string $data) use ($file): void {
                        if ($type === Process::ERR) {
                            $this->stderr(trim($data) . PHP_EOL, Console::FG_GREY);
                        }

                        // Tail reports truncation and replacement diagnostics on stderr.
                        $this->_notifyUpdate($file);
                    });
                    $processes[$file] = $process;

                    // A new daily log may already contain entries before tail starts.
                    if (!$initialScan) {
                        $this->_notifyUpdate($file);
                    }
                }

                $initialScan = false;

                // Drain each process frequently, refreshing discovery once per second.
                for ($tick = 0; $tick < 10; $tick++) {
                    foreach ($processes as $file => $process) {
                        if (!$process->isRunning()) {
                            $this->stderr('Unable to watch ' . $file . ': ' . $process->getErrorOutput() . PHP_EOL, Console::FG_RED);
                            return ExitCode::UNSPECIFIED_ERROR;
                        }

                        $process->clearOutput();
                        $process->clearErrorOutput();
                    }

                    usleep(100_000);
                }
            }
        } catch (Throwable $e) {
            $this->stderr($e->getMessage() . PHP_EOL, Console::FG_RED);
            return ExitCode::UNSPECIFIED_ERROR;
        } finally {
            foreach ($processes as $process) {
                $process->stop();
            }
        }
    }


    // Private Methods
    // =========================================================================

    private function _notifyUpdate(string $file): void
    {
        $this->stdout('[UPDATED]', Console::FG_GREEN);
        $this->stdout(' → ' . $file . PHP_EOL, Console::FG_GREY);

        // Only invalidate; log bodies are fetched through the authorised HTTP action.
        RealtimeEventBus::publish($this->_invalidationPayload($file)['id']);
    }

    /** Keep realtime messages free of log content; authorized clients refetch it. */
    private function _invalidationPayload(string $file): array
    {
        return ['id' => LogFiles::identifier($file)];
    }
}
