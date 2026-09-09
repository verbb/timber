<?php
namespace verbb\timber\services;

use Craft;
use craft\base\Component;
use verbb\timber\Timber;
use verbb\timber\helpers\LogParser;

use yii2mod\query\ArrayQuery;

class Service extends Component
{
    // Public Methods
    // =========================================================================

    public function getLogs(string $logFile): ArrayQuery
    {
        $maxBytes = Timber::$plugin?->getSettings()?->getMaxLogReadBytes() ?? 52_428_800;

        $cacheKey = md5(
            LogParser::VERSION . ':'
            . LogParser::cacheKeySuffix($logFile) . ':'
            . $logFile . ':'
            . $this->fileGenerationToken($logFile) . ':'
            . $maxBytes
        );

        $logs = Craft::$app->getCache()->getOrSet($cacheKey, function() use ($logFile, $maxBytes) {
            return $this->readLogFile($logFile, $maxBytes);
        });

        if (!is_array($logs)) {
            $logs = [];
        }

        return (new ArrayQuery())->from($logs);
    }

    public function getLogsFromString(string $logFile, string $data): array
    {
        $logs = [];
        $key = -1;
        $lineStart = LogParser::lineStartPattern($logFile);

        foreach (explode(PHP_EOL, $data) as $line) {
            if (preg_match($lineStart, $line)) {
                $key++;
                $logs[$key] = $line;
            } elseif ($key >= 0) {
                $logs[$key] .= $line;
            } elseif ($line !== '') {
                $key = 0;
                $logs[$key] = $line;
            }
        }

        return $this->parseLogEntries($logs, $logFile);
    }


    // Protected Methods
    // =========================================================================

    protected function readLogFile(string $logFile, ?int $maxBytes = null): array|false
    {
        $maxBytes ??= Timber::$plugin?->getSettings()?->getMaxLogReadBytes() ?? 52_428_800;
        [$readLine, $close] = $this->openLogFile($logFile, $maxBytes);

        if ($readLine === null) {
            return false;
        }

        $logs = [];
        $key = -1;
        $lineStart = LogParser::lineStartPattern($logFile);
        $bytesRead = 0;

        while (($line = $readLine()) !== false) {
            $bytesRead += strlen($line);

            // Gzip / streaming path: stop once the budget is exhausted.
            if ($bytesRead > $maxBytes) {
                break;
            }

            if (preg_match($lineStart, $line)) {
                $key++;
                $logs[$key] = $line;
            } elseif ($key >= 0) {
                $logs[$key] .= $line;
            } elseif ($line !== '') {
                $key = 0;
                $logs[$key] = $line;
            }
        }

        $close();

        $logs = $this->parseLogEntries($logs, $logFile);

        if (!$logs) {
            return false;
        }

        return $logs;
    }

    protected function parseLogEntries(array $logs, string $logFile): array
    {
        foreach ($logs as $key => $log) {
            $logs[$key] = LogParser::parseEntry($log, $logFile);
        }

        return $logs;
    }

    /**
     * @return array{0: (callable(): (string|false))|null, 1: callable(): mixed}
     */
    protected function openLogFile(string $logFile, int $maxBytes = 0): array
    {
        if (str_ends_with(strtolower($logFile), '.gz')) {
            $handle = @gzopen($logFile, 'rb');

            if ($handle === false) {
                return [null, static fn() => null];
            }

            // Gzip has no cheap tail seek — stream from the start and let readLogFile
            // stop at the byte budget (prefer truncated head over OOM on huge archives).
            return [
                static fn() => gzgets($handle),
                static fn() => gzclose($handle),
            ];
        }

        $handle = @fopen($logFile, 'rb');

        if ($handle === false) {
            return [null, static fn() => null];
        }

        clearstatcache(true, $logFile);
        $size = @filesize($logFile) ?: 0;

        // Uncompressed oversized files: parse a tail window so newest entries win.
        if ($maxBytes > 0 && $size > $maxBytes) {
            fseek($handle, $size - $maxBytes);
            // Discard the partial first line after the seek point.
            fgets($handle);
        }

        return [
            static fn() => fgets($handle),
            static fn() => fclose($handle),
        ];
    }

    /**
     * Identity for cache keys when path + size alone are ambiguous (same-size rewrite
     * within the same mtime second). Samples head/tail rather than hashing the whole file.
     */
    private function fileGenerationToken(string $logFile): string
    {
        clearstatcache(true, $logFile);
        $size = @filesize($logFile) ?: 0;
        $mtime = @filemtime($logFile) ?: 0;
        $sample = '';

        if ($size > 0 && ($fh = @fopen($logFile, 'rb'))) {
            $sample .= (string)fread($fh, 256);

            if ($size > 512) {
                fseek($fh, $size - 256);
                $sample .= (string)fread($fh, 256);
            }

            fclose($fh);
        }

        return $mtime . ':' . $size . ':' . md5($sample);
    }
}
