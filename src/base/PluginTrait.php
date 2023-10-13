<?php
namespace verbb\timber\base;

use verbb\timber\Timber;
use verbb\timber\services\Service;
use verbb\timber\web\assets\utility\TimberAsset;

use verbb\base\LogTrait;
use verbb\base\helpers\Plugin;

use nystudio107\pluginvite\services\VitePluginService;

trait PluginTrait
{
    // Properties
    // =========================================================================

    public static ?Timber $plugin = null;


    // Traits
    // =========================================================================

    use LogTrait;
    

    // Static Methods
    // =========================================================================

    public static function config(): array
    {
        Plugin::bootstrapPlugin('timber');

        return [
            'components' => [
                'service' => Service::class,
                'vite' => [
                    'class' => VitePluginService::class,
                    'assetClass' => TimberAsset::class,
                    'useDevServer' => true,
                    'devServerPublic' => 'http://localhost:4020/',
                    'errorEntry' => 'js/main.js',
                    'cacheKeySuffix' => '',
                    'devServerInternal' => 'http://localhost:4020/',
                    'checkDevServer' => true,
                    'includeReactRefreshShim' => false,
                ],
            ],
        ];
    }

    // Public Methods
    // =========================================================================

    public function getService(): Service
    {
        return $this->get('service');
    }

    public function getVite(): VitePluginService
    {
        return $this->get('vite');
    }

}