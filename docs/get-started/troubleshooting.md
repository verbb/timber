# Troubleshooting

## A User Can See More Logs Than Expected

Remove **View all log files**, then grant at least one nested log-file permission to restrict the user group to those stems. A non-admin user with neither permission cannot see any logs. Access to the Logs utility alone does not grant access to its files.

Use `includedLogFiles` and `excludedLogFiles` for restrictions that must apply to everyone. Dated and rotated files inherit the permission of their base stem, such as `web`.

## Older Entries Are Missing from a Large File

For an uncompressed file larger than `maxLogReadBytes`, Timber reads the end of the file. Older entries outside that window are omitted. The default window is 50 MiB.

Compressed `.gz` files are read from the beginning until the same uncompressed byte budget is reached. In a large archive, it is the newer entries that may be missing. Download the file and inspect its full history with server-side tools. Increase the byte budget only after considering request time and memory, then reload the file and check the timestamps covered by the results.

## Real-Time Updates Do Not Connect

Confirm `enableRealTimeUpdates` is enabled and both long-running commands are active. Check their process logs for a failed `tail` command, an occupied `socketPort` or unreadable log paths.

The Control Panel client connects to `http://localhost:{socketPort}`. In a remote production Control Panel, `localhost` refers to the editor's computer, not the web server. A reverse proxy on the server does not change that browser destination. Use real-time updates only when a secure tunnel or local listener makes that address reachable; otherwise leave the feature disabled and refresh the Logs utility normally.

An HTTPS Control Panel may also block the insecure socket as mixed content. The built-in client does not provide a configurable secure WebSocket hostname, so do not expose the listener publicly as a workaround.
