<?php
namespace verbb\timber\services;

use verbb\timber\Timber;
use verbb\timber\helpers\LogParser;
use verbb\timber\helpers\LogQueryProcessor;

use Craft;
use craft\base\Component;

use yii2mod\query\ArrayQuery;

use RuntimeException;
use SplQueue;

class Service extends Component
{
    // Constants
    // =========================================================================

    private const MAX_PARSED_ENTRIES = 100_000;
    private const MAX_CACHED_READ_BYTES = 8_388_608;


    // Public Methods
    // =========================================================================

    public function getLogs(string $logFile): ArrayQuery
    {
        $maxBytes = Timber::$plugin?->getSettings()?->getMaxLogReadBytes() ?? 52_428_800;

        $cacheKey = md5(
            LogParser::VERSION . ':' . self::MAX_PARSED_ENTRIES . ':'
            . LogParser::cacheKeySuffix($logFile) . ':'
            . $logFile . ':'
            . $this->_fileGenerationToken($logFile) . ':'
            . $maxBytes
        );

        // Filesystem timestamps have second precision. Wait until both timestamps are
        // stable before caching, so rapid same-size edits cannot reuse an earlier parse.
        $modified = max(@filemtime($logFile) ?: 0, @filectime($logFile) ?: 0);
        $read = fn() => $this->readLogFile($logFile, $maxBytes);
        $readBytes = str_ends_with(strtolower($logFile), '.gz') ? $maxBytes : min(@filesize($logFile) ?: 0, $maxBytes);

        // Cache serialization duplicates the parsed window in memory. Large windows
        // are read directly; gzip eligibility uses its uncompressed read budget.
        $logs = $readBytes > self::MAX_CACHED_READ_BYTES || $modified >= time() - 1
            ? $read()
            : Craft::$app->getCache()->getOrSet($cacheKey, $read);

        if (!is_array($logs)) {
            $logs = [];
        }

        return (new ArrayQuery(['queryProcessorClass' => LogQueryProcessor::class]))->from($logs);
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
            throw new RuntimeException(Craft::t('timber', 'Unable to read the log file. Check its permissions and try again.'));
        }

        $entries = new SplQueue();
        $entry = '';
        $lineStart = LogParser::lineStartPattern($logFile);
        $bytesRead = 0;
        $compressed = str_ends_with(strtolower($logFile), '.gz');

        while ($bytesRead < $maxBytes) {
            // fgets allocates its requested length even for a short line. Assemble
            // physical lines from small chunks while retaining the hard byte cap.
            $line = '';
            $remaining = $maxBytes - $bytesRead;

            do {
                $chunk = $readLine(min(8193, $remaining + 1));

                if ($chunk === false) {
                    break;
                }

                $line .= $chunk;
                $remaining -= strlen($chunk);
            } while ($remaining > 0 && !str_ends_with($chunk, "\n"));

            if ($line === '') {
                break;
            }

            $bytesRead += strlen($line);

            if (preg_match($lineStart, $line) && $entry !== '') {
                $entries->enqueue(LogParser::parseEntry($entry, $logFile));
                $entry = '';

                if ($entries->count() >= self::MAX_PARSED_ENTRIES) {
                    if ($compressed) {
                        break;
                    }

                    // Plain logs retain the newest entries in the byte window.
                    if ($entries->count() > self::MAX_PARSED_ENTRIES) {
                        $entries->dequeue();
                    }
                }
            }

            $entry .= $line;
        }

        $close();

        if ($entry !== '') {
            $entries->enqueue(LogParser::parseEntry($entry, $logFile));

            if ($entries->count() > self::MAX_PARSED_ENTRIES) {
                $entries->dequeue();
            }
        }

        $logs = [];

        // Transfer parsed entries without retaining a second raw copy of the window.
        while (!$entries->isEmpty()) {
            $logs[] = $entries->dequeue();
        }

        return $logs ?: false;
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
     * Identity for stable-file cache keys, including replacement and metadata changes.
     * Samples head/tail rather than hashing the whole file.
     */
    private function _fileGenerationToken(string $logFile): string
    {
        clearstatcache(true, $logFile);
        $size = @filesize($logFile) ?: 0;
        $mtime = @filemtime($logFile) ?: 0;
        $ctime = @filectime($logFile) ?: 0;
        $inode = @fileinode($logFile) ?: 0;
        $sample = '';

        if ($size > 0 && ($fh = @fopen($logFile, 'rb'))) {
            $sample .= (string)fread($fh, 256);

            if ($size > 512) {
                fseek($fh, $size - 256);
                $sample .= (string)fread($fh, 256);
            }

            fclose($fh);
        }

        return $mtime . ':' . $ctime . ':' . $inode . ':' . $size . ':' . md5($sample);
    }
}
