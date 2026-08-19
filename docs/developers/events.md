# Events
Timber provides a collection of events for extending its functionality. Modules and plugins can register event listeners, typically in their `init()` methods, to modify Timber’s behavior.

## Log File Events

### The `modifyLogFiles` event
The event that is triggered when Timber builds its catalog of log files. The default list is every `*.log` file under `@storage/logs`. Use this to add files from other directories, remove files, or override a file’s `stem` (the name used for permissions and include/exclude lists).

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
