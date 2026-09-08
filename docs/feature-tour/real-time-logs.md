# Real-Time Logs

Timber can push new log entries to the Logs utility without refreshing the page. It uses [socket.io](https://socket.io/) under the hood to watch log files and notify the Control Panel.

When an update to the currently viewed log file is detected, a notification shows with the count of new entries. Click the alert to load them — they are not injected automatically, so a busy log does not thrash the table.

## Requirements

1. **Enable real-time updates** in Settings → Timber (or set `enableRealTimeUpdates` to `true` in `config/timber.php`). The utility only opens a WebSocket when this is on.
2. Your server must provide the `tail` command (typical on Linux).
3. Run the two long-lived CLI processes below (ideally as daemons / supervised services).

### What is watched

`./craft timber/logs/watch` only tails **active** `.log` files from the catalog — not `.gz` archives, not numbered rotations like `web.log.1`, and not `.txt` siblings. Those files still appear in the Logs utility for browsing; they simply are not streamed live.

### Socket host

The Control Panel connects to `http://localhost:{socketPort}` (default port `8085`). The socket server must be reachable as **localhost from the browser** that has the CP open — typically the same machine in local/dev, or via a reverse proxy / tunnel in production. Changing `socketPort` alone does not change the hostname.

## Server setup

These command line tasks are long-running scripts that continue to watch and push changes, so installing them as a daemon is ideal.

### Watching log files

First, watch log files for changes with `tail -f` streamed into Timber:

```shell
./craft timber/logs/watch
```

This creates a long-lived process that continually checks for updates to watchable log files. It outputs errors and updates found, and runs until you terminate it.

### Socket.io server

Secondly, push those updates to the Timber log screen over WebSockets (a PHP-compatible socket.io server — no separate Node install required):

```shell
./craft timber/logs/run start -d
```

This hosts the WebSocket listener on `socketPort`. It runs until you terminate it.

### Combination

If your server supports running tasks in parallel, you can start both together:

```shell
./craft timber/logs/watch & ./craft timber/logs/run start -d
```
