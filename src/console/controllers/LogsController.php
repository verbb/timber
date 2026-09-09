<?php
namespace verbb\timber\console\controllers;

use verbb\timber\Timber;
use verbb\timber\console\ProcessRun;
use verbb\timber\helpers\LogFiles;
use verbb\timber\models\Settings;

use Craft;
use craft\console\Controller;
use craft\helpers\Console;

use yii\console\ExitCode;

use Exception;
use Throwable;

use Channel\Server;
use Emitter;
use PHPSocketIO\SocketIO;
use PHPSocketIO\ChannelAdapter;
use Workerman\Worker;

use Symfony\Component\Process\Process;

use Graze\ParallelProcess\Pool;
use Graze\ParallelProcess\Event\RunEvent;

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

        new Server();
        $io = new SocketIO($socketPort);

        $io->on('workerStart', function() use ($io) {
            $io->adapter(ChannelAdapter::class);
        });

        Worker::runAll();

        return ExitCode::OK;
    }

    /**
     * Poll log files for changes.
     */
    public function actionWatch(): int
    {
        // Watch active log files for changes, in parallel (not gzip or numbered rotations).
        $logFiles = LogFiles::watchablePaths();

        $pool = new Pool();

        // Use `tail -n0 -f` to stream changes to us. Process for each watch command
        foreach ($logFiles as $file) {
            $command = ['tail', '-n0', '-f', $file];

            $pool->add(new ProcessRun(new Process($command), ['file' => $file]));
        }

        // Add event triggers for each task to process the log content and ping the update
        // to our event emitter to pass to the front-end with socket.io.
        foreach ($pool->getAll() as $run) {
            $run->addListener(RunEvent::UPDATED, function (RunEvent $event) {
                try {
                    $run = $event->getRun();
                    $file = $run->getTags()['file'];
                    $data = $run->getLastMessage();

                    if ($run->getProcess()->getStatus() !== 'started') {
                        throw new Exception('Unable to run process: "' . trim($data) . '"');
                    }

                    $this->stdout('[UPDATED]', Console::FG_GREEN);
                    $this->stdout(' → ' . $file . PHP_EOL, Console::FG_GREY);

                    // Invalidate only — never broadcast log bodies. Clients refetch via
                    // the authorized timber/logs HTTP action (SEC-04).
                    $emitter = new Emitter();

                    $emitter->emit('logUpdate', [
                        'file' => $file,
                    ]);
                } catch (Throwable $e) {
                    $this->stdout('[ERROR]', Console::FG_RED);
                    $this->stdout(' → ' . $e->getMessage() . PHP_EOL, Console::FG_GREY);

                    if (str_contains($e->getMessage(), 'stream_socket_client')) {
                        exit;
                    }
                }
            });
        }

        $pool->run();

        return ExitCode::OK;
    }
}
