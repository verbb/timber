<?php
namespace verbb\timber\utilities;

use verbb\timber\Timber;
use verbb\timber\helpers\LogFiles;
use verbb\timber\helpers\Plugin;
use verbb\timber\models\Settings;

use Craft;
use craft\base\Utility;
use craft\helpers\Json;

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

        // Register Plugin Kit web components + the Timber app; the app auto-mounts
        // `[data-timber-auto-mount]` on load (no vite-script-loaded handshake needed).
        Plugin::registerUtilityAssets();

        $logFiles = LogFiles::visible();

        $currentUser = Craft::$app->getUser()->getIdentity();

        $componentSettings = [
            'logFiles' => $logFiles,
            'limit' => $settings->paginationLimit,
            'socketPort' => $settings->socketPort,
            'enableRealTimeUpdates' => $settings->enableRealTimeUpdates,
            'canDownload' => (bool)$currentUser?->can('timber-download'),
            'canDelete' => (bool)$currentUser?->can('timber-delete'),
        ];

        return $view->renderTemplate('timber/_utility', [
            'componentSettings' => Json::encode($componentSettings, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        ]);
    }
}
