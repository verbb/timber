<?php
namespace verbb\timber\services;

use Craft;
use craft\base\Component;
use verbb\timber\helpers\LogParser;

use yii2mod\query\ArrayQuery;

class Service extends Component
{
    // Public Methods
    // =========================================================================

    public function getLogs(string $logFile): ArrayQuery
    {
        $cacheKey = md5(
            LogParser::VERSION . ':'
            . LogParser::cacheKeySuffix($logFile) . ':'
            . $logFile . ':'
            . filesize($logFile)
        );

        $logs = Craft::$app->getCache()->getOrSet($cacheKey, function() use ($logFile) {
            return $this->readLogFile($logFile);
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

    protected function readLogFile(string $logFile): array|false
    {
        [$readLine, $close] = $this->openLogFile($logFile);

        if ($readLine === null) {
            return false;
        }

        $logs = [];
        $key = -1;
        $lineStart = LogParser::lineStartPattern($logFile);

        while (($line = $readLine()) !== false) {
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

    protected function openLogFile(string $logFile): array
    {
        if (str_ends_with(strtolower($logFile), '.gz')) {
            $handle = @gzopen($logFile, 'rb');

            if ($handle === false) {
                return [null, static fn() => null];
            }

            return [
                static fn() => gzgets($handle),
                static fn() => gzclose($handle),
            ];
        }

        $handle = @fopen($logFile, 'rb');

        if ($handle === false) {
            return [null, static fn() => null];
        }

        return [
            static fn() => fgets($handle),
            static fn() => fclose($handle),
        ];
    }
}
