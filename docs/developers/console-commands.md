# Console Commands

Timber includes console commands you can run from your Craft project’s directory.

## Real-Time Logs

These commands power [real-time log updates](docs:feature-tour/real-time-logs) in the Logs utility. Run each as its own long-lived, supervised process.

::: reference
### `timber/logs/watch`

Watches the active `.log` files in Timber’s log catalogue and publishes an update notice whenever one changes. It follows files that are replaced or truncated, checks every second for new daily logs, and runs until you stop it. Archives, numbered rotations and `.txt` files aren’t watched.

```shell
php craft timber/logs/watch
```
:::

::: reference
### `timber/logs/run`

Starts the Socket.IO server that sends update notices to the Logs utility. It listens on `127.0.0.1` at the port set by the `socketPort` setting and runs until you stop it. Pass `start` to start the server.

```shell
php craft timber/logs/run start
```
:::
