# Real-Time Logs

Timber can push new log entries to the Logs utility without refreshing the page. It uses [socket.io](https://socket.io/) under the hood to watch log files and notify the Control Panel.

When an update to the currently viewed log file is detected, a notification shows that the file has changed. Click the alert to load them — this keeps the entries you are reading in place while a busy log continues to grow.

## Requirements

1. **Enable real-time updates** in Settings → Timber (or set `enableRealTimeUpdates` to `true` in `config/timber.php`). The utility only opens a WebSocket when this is on.
2. Your server must provide the `tail` command (typical on Linux).
3. Run the two long-lived CLI processes below under a process supervisor that restarts them and captures their output.

### What Is Watched

`./craft timber/logs/watch` only tails **active** `.log` files from the catalogue — not `.gz` archives, not numbered rotations like `web.log.1`, and not `.txt` siblings. Those files still appear in the Logs utility for browsing; they are not streamed live.

### Socket Host

The Control Panel connects to `http://localhost:{socketPort}` (default port `8085`). Here, `localhost` means the computer running the browser, not the Craft web server. This works directly when the browser and socket process run on the same development machine.

For a remote Control Panel, a server-side reverse proxy alone cannot make the editor's `localhost` reach the server. You would need a deliberately secured tunnel or local listener for each browser. An HTTPS page may also block the insecure socket as mixed content. If those constraints do not fit your environment, leave real-time updates disabled and refresh the log normally.

## Server Setup

These command-line tasks continue to watch and push changes. Run them under your platform's process supervisor rather than relying on an interactive shell.

### Watching Log Files

First, watch log files for changes with `tail -f` streamed into Timber:

```shell
./craft timber/logs/watch
```

This creates a long-lived process that continually checks for updates to watchable log files. It outputs errors and updates found, and runs until you terminate it.

### Socket.IO Server

Secondly, push those updates to the Timber log screen over WebSockets (a PHP-compatible socket.io server — no separate Node install required):

```shell
./craft timber/logs/run start
```

This hosts the WebSocket listener on `socketPort`. It runs until you terminate it.

Run the watcher and socket server as separate supervised processes so each has independent restart and logging behaviour. After starting both, open the Logs utility, write a known test entry and confirm the update notification appears. See [Troubleshooting](docs:get-started/troubleshooting#real-time-updates-do-not-connect) if the browser cannot connect.
