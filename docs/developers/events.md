# Events
Timber provides a collection of events for extending its functionality. Modules and plugins can register event listeners, typically in their `init()` methods, to modify Timber’s behavior.

## Log File Events

### The `modifyLogFiles` event
The event that is triggered when Timber builds its catalog of log files. The default list is every discoverable log under `@storage/logs` (`.log`, `.txt`, rotations, and `.gz` archives). Use this to add files from other directories, remove files, or override a file’s `stem` (the name used for permissions and include/exclude lists).

Include/exclude settings and user permissions still apply after the event.

```php
use verbb\timber\events\ModifyLogFilesEvent;
use verbb\timber\helpers\LogFiles;
use yii\base\Event;

Event::on(LogFiles::class, LogFiles::EVENT_MODIFY_LOG_FILES, function(ModifyLogFilesEvent $event) {
    // Hide queue logs from the catalog
    $event->logFiles = array_values(array_filter(
        $event->logFiles,
        fn(array $file) => $file['stem'] !== 'queue'
    ));

    // Include a log from outside Craft’s storage/logs directory
    $path = '/var/log/nginx/error.log';

    if (is_file($path)) {
        $event->logFiles[] = [
            'path' => $path,
            'stem' => 'nginx',
        ];
    }
});
```

## Log Parser Events

### The `modifyLogParsers` event

Companion to `modifyLogFiles`. Fires once per log file when Timber resolves how to split multiline entries and parse each line.

The event exposes:

- **`logFile`** — absolute path being parsed
- **`lineStartPattern`** — PCRE matched at the start of a line to detect a new entry (for stack traces and multiline messages)
- **`parsers`** — ordered cascade of `{ regex, fields }`. Each regex uses named capture groups; `fields` lists which groups map to `datetime`, `channel`, `level`, `category`, `message`, or `context`. The first matching parser wins. Unmatched lines stay visible as raw text.

Use `LogParser::parser()` to build parser definitions. Prepend custom parsers (try first), append them (fallback), or replace the entire cascade for a specific file.

Custom parsers are included in Timber’s parse cache key for that file, so you do not need to clear caches manually when handlers change.

```php
use verbb\timber\events\ModifyLogParsersEvent;
use verbb\timber\helpers\LogParser;
use yii\base\Event;

Event::on(LogParser::class, LogParser::EVENT_MODIFY_LOG_PARSERS, function(ModifyLogParsersEvent $event) {
    if (!str_ends_with($event->logFile, 'nginx/error.log')) {
        return;
    }

    // Nginx uses 2024/01/15 dates, not 2024-01-15
    $event->lineStartPattern = '/^\d{4}\/\d{2}\/\d{2}/';

    array_unshift($event->parsers, LogParser::parser(
        '/^(?P<datetime>\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}) \[(?P<level>\w+)\] (?P<message>.*)/s',
        ['datetime', 'level', 'message'],
    ));
});
```

Typical flow for a non-Craft log:

1. Add the file in `modifyLogFiles` (set `path` and `stem`).
2. Register parsers in `modifyLogParsers` when `$event->logFile` matches that path.

Without step 2, custom files still go through Timber’s built-in Craft-oriented cascade and most lines will show as unparsed raw text rather than disappearing entirely.
