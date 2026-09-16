<?php
namespace verbb\timber\web\assets\utility;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;
use craft\web\View;

use verbb\base\assetbundles\CpAsset as VerbbCpAsset;

class TimberAsset extends AssetBundle
{
    // Public Methods
    // =========================================================================

    public function init(): void
    {
        $this->sourcePath = __DIR__ . '/dist/';

        $this->depends = [
            VerbbCpAsset::class,
            CpAsset::class,
        ];

        parent::init();
    }

    public function registerAssetFiles($view): void
    {
        parent::registerAssetFiles($view);

        if ($view instanceof View) {
            $this->_registerTranslations($view);
        }
    }

    private function _registerTranslations(View $view): void
    {
        $view->registerTranslations('timber', [
            'Select all',
            'Deselect all',
            'Are you sure you want to permanently delete this log file?',
            'Are you sure you want to permanently delete all log files?',
            'Log File:',
            'Log File',
            'Select a log file',
            'Refresh',
            'Settings',
            'Download',
            'Delete',
            'No log files available',
            'Download all logs',
            'Download selected log',
            'Delete all logs',
            'Delete selected log',
            'Level',
            'There are no filters to display because no entries have been found.',
            'Category',
            'Search',
            'Search for log message',
            'Select a log file to view',
            'No results',
            'Time',
            'Message',
            'Entry pagination',
            'Previous Page',
            'Next Page',
            '{min}-{max} of {total} entries',
            'Log file updated, click to reload',
        ]);
    }
}
