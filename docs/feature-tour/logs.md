# Logs
The main functionality of Timber is to provide a beautiful, simple and useful interface to view and manage your log files in your control panel. This makes it easy to view log files when you need it, or for when your clients are like to be hands-on with the technical information that logs bring.

## Log screen
The Timber log screen is the interface for viewing logs. It's built as a Craft Utility, to sit alongside other similar tools.

The interface allows you to pick a log file and see its size. Once picked, you'll see a table of all log entries for the file which are sortable, filterable and searchable. For example, almost all log files record a "level", which represent the type of error it is (info, warning, error). Some other log files also contain "category" information, which is often used by plugins to scope logs to certain plugins or services.

Clicking on a log entry will expand the detail of that log with any context also captured with the log.

You can also download or delete single log files, and download or delete **all** log files.

Log entries are also paginated for performance.

## Permissions
Timber provides User permissions for certain features. You can enable access to view logs by allowing access to the Utility itself. You can also control who can download or delete log files with separate permissions.

## Performance
Some log files can get pretty large. Fortunately, Craft will split log files automatically, but nevertheless Timber still needs to deal with large log files. We employ a few things to keep performance in check:

- Reading log files is done per-line, rather than loading the entire file into memory.
- Log files are parsed into structured data and cached for next time.
- Pagination of 100 (configurable) so not all log entries are rendered.

With these techniques, a 1GB log file takes about 15 seconds to load on a development environment and 5 seconds to load on a production environment.