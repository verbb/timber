<?php
namespace verbb\timber\base;

use verbb\timber\Timber;
use verbb\timber\services\Service;
use verbb\timber\web\assets\utility\TimberAsset;

use Craft;

use yii\log\Logger;

use verbb\base\BaseHelper;

use nystudio107\pluginvite\services\VitePluginService;

trait PluginTrait
{
    // Static Properties
    // =========================================================================

    public static Timber $plugin;


    // Public Methods
    // =========================================================================

    public static function log(string $message, array $attributes = []): void
    {
        if ($attributes) {
            $message = Craft::t('timber', $message, $attributes);
        }

        Craft::getLogger()->log($message, Logger::LEVEL_INFO, 'timber');
    }

    public static function error(string $message, array $attributes = []): void
    {
        if ($attributes) {
            $message = Craft::t('timber', $message, $attributes);
        }

        Craft::getLogger()->log($message, Logger::LEVEL_ERROR, 'timber');
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


    // Private Methods
    // =========================================================================

    private function _setPluginComponents(): void
    {
        $this->setComponents([
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
        ]);

        BaseHelper::registerModule();
    }

    private function _setLogging(): void
    {
        BaseHelper::setFileLogging('timber');
    }

}