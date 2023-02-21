<?php
namespace verbb\timber\controllers;

use verbb\timber\Timber;
use verbb\timber\models\Settings;

use craft\web\Controller;

use yii\web\Response;

class PluginController extends Controller
{
    // Public Methods
    // =========================================================================

    public function actionSettings(): Response
    {
        /* @var Settings $settings */
        $settings = Timber::$plugin->getSettings();

        return $this->renderTemplate('timber/settings', [
            'settings' => $settings,
        ]);
    }
}
