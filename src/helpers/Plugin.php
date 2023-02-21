<?php
namespace verbb\timber\helpers;

use verbb\timber\Timber;
use verbb\timber\web\assets\utility\TimberAsset;

class Plugin
{
    // Static Methods
    // =========================================================================

    public static function registerAsset(string $path): void
    {
        $viteService = Timber::$plugin->getVite();

        $scriptOptions = [
            'depends' => [
                TimberAsset::class,
            ],
            'onload' => null,
        ];

        $styleOptions = [
            'depends' => [
                TimberAsset::class,
            ],
        ];

        $viteService->register($path, false, $scriptOptions, $styleOptions);

        // Provide nice build errors - only in dev
        if ($viteService->devServerRunning()) {
            $viteService->register('@vite/client', false);
        }
    }

}
