<?php
namespace verbb\timber\services;

use verbb\timber\Timber;
use verbb\timber\helpers\LogParser;

use Craft;
use craft\base\Component;

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
            . $this->_fileGenerationToken($logFile) . ':'
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

        foreach (preg_split('/(?<=\n)/', $data, -1, PREG_SPLIT_NO_EMPTY) as $line) {
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

        while ($bytesRead < $maxBytes) {
            // Pass a hard read length so one malformed, newline-free entry cannot make
            // fgets()/gzgets() allocate beyond the configured window before we reject it.
            $line = $readLine(($maxBytes - $bytesRead) + 1);

            if ($line === false) {
                break;
            }

            $bytesRead += strlen($line);

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
                static fn(int $length) => gzgets($handle, $length),
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
            fseek($handle, $size - $maxBytes - 1);
            // Only discard a partial line; the window may start on a complete entry.
            if (fread($handle, 1) !== "\n") {
                fgets($handle);
            }
        }

        return [
            static fn(int $length) => fgets($handle, $length),
            static fn() => fclose($handle),
        ];
    }


    // Private Methods
    // =========================================================================

    /**
     * Identity for cache keys when path + size alone are ambiguous (same-size rewrite
     * within the same mtime second). Samples head/tail rather than hashing the whole file.
     */
    private function _fileGenerationToken(string $logFile): string
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
