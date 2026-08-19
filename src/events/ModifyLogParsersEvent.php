<?php
namespace verbb\timber\events;

use yii\base\Event;

class ModifyLogParsersEvent extends Event
{
    // Properties
    // =========================================================================

    /**
     * Absolute path to the log file being parsed.
     */
    public string $logFile = '';

    /**
     * Regex (PCRE) matched against the start of a line to detect a new multiline entry.
     */
    public string $lineStartPattern = '';

    /**
     * Ordered parser cascade. Each item must include `regex` and `fields`.
     *
     * `fields` lists named capture groups to map onto log entry keys
     * (`datetime`, `channel`, `level`, `category`, `message`, `context`).
     * Parsers are tried in order; the first match wins.
     */
    public array $parsers = [];
}
