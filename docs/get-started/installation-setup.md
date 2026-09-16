# Installation & Setup
You can install Timber via the plugin store, or through Composer.

## Craft Plugin Store
To install **Timber**, navigate to the _Plugin Store_ section of your Craft control panel, search for `Timber`, and click the _Try_ button.

## Composer
You can also add the package to your project using Composer and the command line.

1. Open your terminal and go to your Craft project:
```shell
cd /path/to/project
```

2. Then tell Composer to require the plugin, and Craft to install it:
```shell
composer require verbb/timber && php craft plugin/install timber
```

## Licensing
You can try Timber in a development environment for as long as you like. Once your site goes live, you are required to purchase a licence for the plugin.

For more information, see [Craft's Commercial Plugin Licensing](https://craftcms.com/docs/5.x/system/plugins.html#plugin-licensing).

## Inspect a Log

Before giving non-admin users access, go to **Settings → Users → User Groups**, allow access to the Logs utility and assign Timber's view, download and delete permissions deliberately. Log content can contain personal data, request details and secrets written by application code.

Open Timber's Logs utility and choose an existing Craft log. Search for a message you recognise, filter by its level and expand the entry to inspect its details. Clear the filters when you want to see the full file again.

After a known action writes another log entry, reload and check its timestamp and message. You can use ordinary log viewing without configuring a real-time process. [Logs](docs:feature-tour/logs) explains the available files and permissions; [Real-Time Logs](docs:feature-tour/real-time-logs) covers automatic updates.
