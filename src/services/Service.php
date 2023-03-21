<?php
namespace verbb\timber\services;

use Craft;
use craft\base\Component;

use yii2mod\query\ArrayQuery;

class Service extends Component
{
    // Public Methods
    // =========================================================================

    public function getLogs(string $logFile): ArrayQuery
    {
        $cacheKey = md5($logFile . ':' . filesize($logFile));

        $logs = Craft::$app->getCache()->getOrSet($cacheKey, function() use ($logFile) {
            $fileHandler = fopen($logFile, 'rb');

            $logs = [];
            $key = -1;

            // Regex for the start of a log file. Kept minimal for performance
            $lineStart = $this->getLinePattern($logFile);

            // Loop through all the lines until the eof or we say we're done
            while (!feof($fileHandler)) {
                // Get the next line of content
                $line = fgets($fileHandler);

                // Find every line that matches the start of a log file. Used due to log entries taking over multiple lines
                // So find a line that matches `2022-01-01 00:00:00 ...`, which will be used to find the first and next log lines.
                if (preg_match($lineStart, $line)) {
                    $key++;

                    $logs[$key] = $line;
                } else {
                    // Capture everything in between two lines starting with datestrings
                    $logs[$key] .= $line;
                }
            }

            $this->getLogContent($logFile, $logs);

            fclose($fileHandler);

            // Don't cache something that's empty
            if (!$logs) {
                return false;
            }

            return $logs;
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

        // Regex for the start of a log file. Kept minimal for performance
        $lineStart = $this->getLinePattern($logFile);

        // Loop through all the lines until the eof or we say we're done
        foreach (explode(PHP_EOL, $data) as $line) {
            // Find every line that matches the start of a log file. Used due to log entries taking over multiple lines
            // So find a line that matches `2022-01-01 00:00:00 ...`, which will be used to find the first and next log lines.
            if (preg_match($lineStart, $line)) {
                $key++;

                $logs[$key] = $line;
            } else {
                // Capture everything in between two lines starting with datestrings
                $logs[$key] .= $line;
            }
        }

        $this->getLogContent($logFile, $logs);

        return $logs;
    }


    // Protected Methods
    // =========================================================================

    protected function getLogContent(string $logFile, array &$logs): void
    {
        $pattern = $this->getPattern($logFile);

        foreach ($logs as $key => $log) {
            preg_match($pattern, $log, $matches);

            // `preg_match` doesn't support named grouped, so go manual
            $datetime = $matches['datetime'] ?? null;

            if ($datetime) {
                $logs[$key] = [
                    'datetime' => $matches['datetime'] ?? null,
                    'channel' => $matches['channel'] ?? null,
                    'level' => $matches['level'] ?? null,
                    'category' => $matches['category'] ?? null,
                    'message' => $matches['message'] ?? null,
                    'context' => $matches['context'] ?? null,
                ];
            } else {
                unset($logs[$key]);
            }
        }
    }

    protected function getPattern(string $logFile): string
    {
        if (str_contains($logFile, 'phperrors')) {
            return '/^\[(?<datetime>.*)\] (?<message>.*)/s';
        }

        if (str_contains($logFile, 'blitz')) {
            return '/^\[(?<datetime>.*)\] (?<message>.*)/s';
        }

        if (str_contains($logFile, 'sprig')) {
            return '/^\[(?<datetime>.*)\] (?<message>.*)/s';
        }

        // Craft 3 logs (not really supported)
        if (str_contains($logFile, 'console.log') || str_contains($logFile, 'queue.log') || str_contains($logFile, 'web.log')) {
            return '/^(?P<datetime>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(?P<param1>-|\w+)\]\[(?P<param2>-|\w+)\]\[(?P<param3>-|\w+)\]\[(?P<level>-|\w+)\]\[(?P<category>.*?)\] (?P<message>.*)/s';
        }

        return '/^(?P<datetime>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (\[(?:(?P<channel>\w+)\.)?(?P<level>\w+)\])(?: \[(?P<category>.*?)\])? (?P<message>.*)/s';
    }

    protected function getLinePattern(string $logFile): string
    {
        if (str_contains($logFile, 'phperrors')) {
            return '/^\[.*\]/';
        }

        if (str_contains($logFile, 'blitz')) {
            return '/^\[.*\]/';
        }

        if (str_contains($logFile, 'sprig')) {
            return '/^\[.*\]/';
        }

        return '/^\d{4}-\d{2}-\d{2}/';
    }

}
