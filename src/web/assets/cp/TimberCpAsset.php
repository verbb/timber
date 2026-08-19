<?php
namespace verbb\timber\web\assets\cp;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset as CraftCpAsset;

use verbb\base\assetbundles\CpAsset as VerbbCpAsset;

class TimberCpAsset extends AssetBundle
{
    // Public Methods
    // =========================================================================

    public function init(): void
    {
        $this->depends = [
            VerbbCpAsset::class,
            CraftCpAsset::class,
        ];

        parent::init();
    }
}
