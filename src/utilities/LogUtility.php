<?php
namespace verbb\timber\utilities;

use verbb\timber\Timber;
use verbb\timber\helpers\Plugin;
use verbb\timber\models\Settings;

use Craft;
use craft\base\Utility;
use craft\helpers\FileHelper;

class LogUtility extends Utility
{
    // Static Methods
    // =========================================================================

    public static function displayName(): string
    {
        return Craft::t('timber', 'Logs');
    }

    public static function id(): string
    {
        return 'timber-logs';
    }

    public static function icon(): ?string
    {
        return '@verbb/timber/icon-mask.svg';
    }

    public static function contentHtml(): string
    {
        /* @var Settings $settings */
        $settings = Timber::$plugin->getSettings();
        $view = Craft::$app->getView();

        Plugin::registerAsset('utility/src/js/timber.js');
        $js = 'new Craft.Timber.Utility();';

        // Wait for Hyper JS to be loaded, either through an event listener, or by a flag.
        // This covers if this script is run before, or after the Hyper JS has loaded
        $view->registerJs('document.addEventListener("vite-script-loaded", function(e) {' .
            'if (e.detail.path === "utility/src/js/timber.js") {' . $js . '}' .
        '}); if (Craft.TimberReady) {' . $js . '}');

        $logFiles = FileHelper::findFiles(Craft::getAlias('@storage/logs'), [
            'only' => ['*.log'],
        ]);

        sort($logFiles);

        foreach ($logFiles as $key => $logFile) {
            $logFiles[$key] = [
                'path' => $logFile,
                'size' => filesize($logFile),
            ];
        }

        return $view->renderTemplate('timber/_utility', [
            'logFiles' => $logFiles,
            'pageLimit' => $settings->paginationLimit,
            'socketPort' => $settings->socketPort,
            'enableRealTimeUpdates' => $settings->enableRealTimeUpdates,
        ]);
    }
}
