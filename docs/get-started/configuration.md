# Configuration

You can customise Timber’s settings using a PHP configuration file. This is optional: each setting has a default, so you only need to include the values you want to change.

To override a setting, create `timber.php` in your Craft project’s `/config` directory and return an array of setting names and values. For example, the following will show 50 log entries per page:

```php
<?php

return [
    'paginationLimit' => 50,
];
```

All other settings keep their defaults. Add any further settings you want to change to the same array. The options below explain the available settings and their defaults.

Values in `config/timber.php` override the corresponding values saved in the control panel. To manage a setting through the control panel again, remove its override from the file.

## Environment Overrides

Craft can apply different settings to each environment. Use `*` for shared values and a key matching `CRAFT_ENVIRONMENT` for an environment-specific override. For example:

```php
<?php

return [
    '*' => [
        'paginationLimit' => 50,
    ],
    'dev' => [
        'paginationLimit' => 100,
    ],
];
```

This replaces the simple array above. The `dev` values apply only when `CRAFT_ENVIRONMENT` is `dev`; other environments use the shared values. Merge your own overrides into the appropriate array.

## Configuration Options

::: reference
### `paginationLimit`

**Type:** `int` · **Default:** `100`

Set the number of entries to show per-page for pagination.
:::

::: reference
### `maxPaginationLimit`

**Type:** `int` · **Default:** `500`

The maximum page size accepted from a log request. The effective ceiling cannot exceed 2000 entries.
:::

::: reference
### `maxLogReadBytes`

**Type:** `int` · **Default:** `52428800`

The maximum number of uncompressed bytes parsed from one log file. For a larger plain file, Timber reads the end of the file, showing its newest entries. For a gzip archive, Timber reads from the beginning and stops at this limit, so newer entries may be omitted. The effective minimum is 1 MiB. A separate ceiling of 100,000 entries per file also applies, retaining the newest entries from plain files or the oldest entries from gzip archives. Download the file when you need to inspect its complete history.
:::

::: reference
### `enableRealTimeUpdates`

**Type:** `bool` · **Default:** `false`

Whether the Logs utility should open a WebSocket for live updates. Also requires the watch + socket CLI processes (see [Real-Time Logs](docs:feature-tour/real-time-logs)).
:::

::: reference
### `socketPort`

**Type:** `int` · **Default:** `8085`

Port for the WebSocket listener. The Control Panel browser always connects to `http://localhost` on this port, which limits the built-in client to a listener reachable on the user's own machine.
:::

::: reference
### `includedLogFiles`

**Type:** `array|string|null` · **Default:** `null`

Optional allowlist of log file stems. Empty / unset means all discoverable files. Use the name without a date suffix (`web` matches `web-2026-08-19.log`).
:::

::: reference
### `excludedLogFiles`

**Type:** `array|string|null` · **Default:** `[]`

Optional denylist of log file stems, applied after the allowlist. Hidden from everyone, including admins.
:::


## Control Panel
You can also manage configuration settings through the Control Panel by visiting Settings → Timber.
