# Configuration
Create a `timber.php` file under your `/config` directory with the following options available to you. You can also use multi-environment options to change these per environment.

The below shows the defaults already used by Timber, so you don't need to add these options unless you want to modify the values.

```php
<?php

return [
    '*' => [
        'paginationLimit' => 100,
        'enableRealTimeUpdates' => false,
        'socketPort' => 8085,
        'includedLogFiles' => [],
        'excludedLogFiles' => [],
    ]
];
```

## Configuration options
- `paginationLimit` - Set the number of entries to show per-page for pagination.
- `enableRealTimeUpdates` - Whether to enable real-time updates for logs.
- `socketPort` - Set the port number for the WebSocket listener, if enabling real-time logging.
- `includedLogFiles` - Optional allowlist of log file stems. Empty means all files. Use the name without a date suffix (`web` matches `web-2026-08-19.log`).
- `excludedLogFiles` - Optional denylist of log file stems, applied after the allowlist. Hidden from everyone, including admins.

## Control Panel
You can also manage configuration settings through the Control Panel by visiting Settings → Timber.
