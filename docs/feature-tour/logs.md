# Logs

The main functionality of Timber is to provide a beautiful, simple and useful interface to view and manage your log files in your control panel. This makes it easy to view log files when you need it, or for when your clients are like to be hands-on with the technical information that logs bring.

## Log screen

The Timber log screen is the interface for viewing logs. It's built as a Craft Utility, to sit alongside other similar tools.

![Timber Logs utility with level filters and paginated entries](/_screenshots/feature-tour/logs.png)

The interface allows you to pick a log file and see its size. Once picked, you'll see a table of all log entries for the file which are sortable, filterable and searchable. For example, almost all log files record a "level", which represent the type of error it is (info, warning, error). Some other log files also contain "category" information, which is often used by plugins to scope logs to certain plugins or services.

The log file picker is a searchable combobox — useful when `storage/logs` has many dated or plugin files.

Clicking on a log entry will expand the detail of that log with any context also captured with the log.

You can also download or delete single log files, and download or delete **all** log files.

Log entries are also paginated for performance.

## Log discovery

Timber scans Craft’s `@storage/logs` directory for:

- `*.log` and dated Craft files such as `web-2026-08-19.log`
- Rotations such as `web.log.1` and dated logrotate suffixes
- Compressed `*.gz` copies of the above
- Plain `*.txt` / `*.txt.*` logs some tools write alongside `.log` files

Permissions and include/exclude config use a **stem** — the base name without date or rotation suffixes. So `web-2026-08-19.log`, `web.log.1`, and `web.log.1.gz` all share the `web` stem.

Real-time watching is limited to active `.log` files; see [Real-Time Logs](docs:feature-tour/real-time-logs).

## Permissions

Timber provides User permissions for certain features. You can enable access to view logs by allowing access to the Utility itself. You can also control who can download or delete log files with separate permissions.

To restrict **which** log files a user group can see, leave **View all log files** unchecked and enable the nested permissions for specific files (`web`, `queue`, `phperrors`, and any plugin logs currently on disk). Dated files like `web-2026-08-19.log` are grouped under `web`. Users with **View all log files** continue to see new log files as they appear.

:::tip
If a user has **neither** View all **nor** any nested stem permissions, Timber keeps the historical default: they can see every file that passes site-wide config. To lock a group down to a subset, grant at least one nested stem permission (and leave View all off).
:::

You can also limit the catalog for the whole site via `includedLogFiles` / `excludedLogFiles` in `config/timber.php` (or Settings → Timber). Config applies first; user permissions then filter further. Download all / delete all only affect files the user is allowed to see.

Modules can add or remove files from the catalog with the `modifyLogFiles` event. See [Events](/developers/events).

## Performance

Some log files can get pretty large. Fortunately, Craft will split log files automatically, but nevertheless Timber still needs to deal with large log files. We employ a few things to keep performance in check:

- Reading log files is done per-line, rather than loading the entire file into memory.
- Log files are parsed into structured data and cached for next time.
- Pagination of 100 (configurable) so not all log entries are rendered.

With these techniques, a 1GB log file takes about 15 seconds to load on a development environment and 5 seconds to load on a production environment.
