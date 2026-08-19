<?php
namespace verbb\timber\helpers;

use verbb\timber\events\ModifyLogParsersEvent;

use craft\helpers\StringHelper;

use yii\base\Event;

/**
 * Line-shape log parsers. Tried in order; unmatched entries stay visible as raw text.
 *
 * Modules can adjust parsing per file via {@see self::EVENT_MODIFY_LOG_PARSERS}.
 */
class LogParser
{
    // Constants
    // =========================================================================

    public const EVENT_MODIFY_LOG_PARSERS = 'modifyLogParsers';

    /** Bump when built-in parser rules change so parsed-log caches invalidate. */
    public const VERSION = '3';

    private const ENTRY_FIELDS = ['datetime', 'channel', 'level', 'category', 'message', 'context'];


    // Properties
    // =========================================================================

    private static array $configCache = [];


    // Public Methods
    // =========================================================================

    /**
     * Detects the first line of a multiline log entry for a given file.
     */
    public static function lineStartPattern(string $logFile): string
    {
        return self::configForLogFile($logFile)['lineStartPattern'];
    }

    /**
     * Hash suffix for cache keys — changes when event handlers customize parsers for a file.
     */
    public static function cacheKeySuffix(string $logFile): string
    {
        $config = self::configForLogFile($logFile);

        return md5($config['lineStartPattern'] . json_encode($config['parsers']));
    }

    public static function parseEntry(string $entry, string $logFile): array
    {
        foreach (self::configForLogFile($logFile)['parsers'] as $pattern) {
            if (!preg_match($pattern['regex'], $entry, $matches)) {
                continue;
            }

            return self::buildEntry($matches, $pattern['fields']);
        }

        // Raw fallback — never drop lines that fail every parser.
        return [
            'datetime' => null,
            'channel' => null,
            'level' => null,
            'category' => null,
            'message' => StringHelper::escape($entry),
            'context' => null,
        ];
    }

    public static function parser(string $regex, array $fields): array
    {
        return [
            'regex' => $regex,
            'fields' => array_values($fields),
        ];
    }

    /** Clears per-request parser config — useful in tests after registering event handlers. */
    public static function clearConfigCache(): void
    {
        self::$configCache = [];
    }


    // Private Methods
    // =========================================================================

    /**
     * Resolves line-start + parser cascade for a file, firing {@see self::EVENT_MODIFY_LOG_PARSERS}
     * once per path per request. Cached so cache-key generation and parsing share the same config.
     */
    private static function configForLogFile(string $logFile): array
    {
        if (isset(self::$configCache[$logFile])) {
            return self::$configCache[$logFile];
        }

        $lineStartPattern = self::defaultLineStartPattern();
        $parsers = self::defaultParsers();

        if (Event::hasHandlers(self::class, self::EVENT_MODIFY_LOG_PARSERS)) {
            $event = new ModifyLogParsersEvent([
                'logFile' => $logFile,
                'lineStartPattern' => $lineStartPattern,
                'parsers' => $parsers,
            ]);

            Event::trigger(self::class, self::EVENT_MODIFY_LOG_PARSERS, $event);

            $lineStartPattern = $event->lineStartPattern;
            $parsers = self::normalizeParsers($event->parsers);
        }

        return self::$configCache[$logFile] = [
            'lineStartPattern' => $lineStartPattern,
            'parsers' => $parsers,
        ];
    }

    private static function defaultLineStartPattern(): string
    {
        // Craft/Formie dates, or bracketed timestamps (Monolog ISO, Blitz). Deliberately not bare `[` —
        // Yii exception chains use `[previous exception]` / `[object]` mid-entry and must stay attached.
        return '/^(?:\d{4}-\d{2}-\d{2}|\[\d{4}-\d{2}-\d{2})/';
    }

    /**
     * Built-in cascade — most specific shapes first; bare datetime last so it does not swallow Craft lines.
     */
    private static function defaultParsers(): array
    {
        return [
            // Craft 5 — 2026-08-18 17:00:27 [web.INFO] [category] message
            self::parser(
                '/^(?P<datetime>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (\[(?:(?P<channel>\w+)\.)?(?P<level>\w+)\])(?: \[(?P<category>.*?)\])? (?P<message>.*)/s',
                ['datetime', 'channel', 'level', 'category', 'message'],
            ),
            // Craft 3 / Yii — extra bracket groups before level + category
            self::parser(
                '/^(?P<datetime>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(?P<param1>-|\w+)\]\[(?P<param2>-|\w+)\]\[(?P<param3>-|\w+)\]\[(?P<level>-|\w+)\]\[(?P<category>.*?)\] (?P<message>.*)/s',
                ['datetime', 'level', 'category', 'message'],
            ),
            // Monolog — [2024-01-15T10:30:45+00:00] channel.INFO: message
            self::parser(
                '/^\[(?P<datetime>[^\]]+)\] (?P<channel>[\w\.-]+)\.(?P<level>\w+): (?P<message>.*)/s',
                ['datetime', 'channel', 'level', 'message'],
            ),
            // Formie-style — 2026-04-14 14:15:37 [ERROR] message
            self::parser(
                '/^(?P<datetime>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(?P<level>\w+)\] (?P<message>.*)/s',
                ['datetime', 'level', 'message'],
            ),
            // Blitz, Sprig, phperrors, Craftagram — [datetime] message
            self::parser(
                '/^\[(?P<datetime>[^\]]+)\] (?P<message>.*)/s',
                ['datetime', 'message'],
            ),
            // Bare datetime — ondemand and other single-line formats
            self::parser(
                '/^(?P<datetime>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (?P<message>.*)/s',
                ['datetime', 'message'],
            ),
        ];
    }

    /** Drops invalid event parsers and limits `fields` to known log entry keys. */
    private static function normalizeParsers(array $parsers): array
    {
        $normalized = [];

        foreach ($parsers as $parser) {
            $regex = (string)($parser['regex'] ?? '');
            $fields = $parser['fields'] ?? [];

            if ($regex === '' || !is_array($fields) || $fields === []) {
                continue;
            }

            $mappedFields = [];

            foreach ($fields as $field) {
                $field = (string)$field;

                if (!in_array($field, self::ENTRY_FIELDS, true)) {
                    continue;
                }

                $mappedFields[] = $field;
            }

            if ($mappedFields === []) {
                continue;
            }

            $normalized[] = self::parser($regex, $mappedFields);
        }

        return $normalized;
    }

    private static function buildEntry(array $matches, array $fields): array
    {
        $entry = [
            'datetime' => null,
            'channel' => null,
            'level' => null,
            'category' => null,
            'message' => '',
            'context' => null,
        ];

        foreach ($fields as $field) {
            if (isset($matches[$field])) {
                $entry[$field] = $matches[$field];
            }
        }

        $entry['message'] = StringHelper::escape($entry['message']);

        return $entry;
    }
}
