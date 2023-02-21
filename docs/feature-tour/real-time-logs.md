# Real-Time Logs
Timber can support pushing new log entries to your log files automatically, without you having to refresh the page. It uses [socket.io](https://socket.io/) under the hood to subscribe to every log file, and watch for updates.

When an update to the currently-viewed log file is detected, a notification will show on the Timber log screen with the number of new updates. These aren't shown immediately to prevent the screen from changing with potentially a lot of log activity. Instead, clicking on the alert will load these new log entries into the list.

## Server setup
However, in order to push changes in log files to the Timber log screen, you'll need to start a watch process. In fact, these are actually two different commands that will need to be run on the command line on your server.

Your server will also need to have access to the `tail` command, which most Linux-based systems do.

These command line tasks are long-running scripts that will continue to watch and push changes, so installing them as a daemon is ideal.

### Watching log files
First, we'll want to watch the log files for changes. This is accomplished by using `tail -f` which give a path to a file, will watch any new output to it, and stream that new output to Timber. It's the ideal command for getting new changes to a file!

To start this service, run the following on your server:

```shell
./craft timber/logs/watch
```

This will create a long-lived process that will continually check for updates to your log files. It will output any errors that the script comes across, and any updates found. It will run non-stop until you terminate the process.

### Socket.io server
Secondly, we'll want a way to push those updates to the Timber log screen. While we could use a "polling" technique to constantly check for new changes, that's incredibly inefficient. Instead, we can utilize WebSocket's to push an update to our front-end.

To do this, we'll need to setup a [socket.io](https://socket.io/) server. Normally, this would be a NodeJS script, but we're using a PHP-compatible package, so you won't need to install anything extra.

To start this service, run the following on your server:

```shell
./craft timber/logs/run start -d
```

This will create a long-lived process that will host a WebSocket server to push updates to the front-end. It will output any errors that the script comes across, and any updates found. It will run non-stop until you terminate the process.

### Combination
If your server supports running tasks in parallel, you can run these two tasks together in a single command.

```shell
./craft timber/logs/watch & ./craft timber/logs/run start -d
```
