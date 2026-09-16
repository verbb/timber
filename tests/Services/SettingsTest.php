<?php

use verbb\timber\Timber;
use verbb\timber\models\Settings;

it('rejects ports outside the range a socket listener can use', function() {
    $settings = new Settings(['socketPort' => 65536]);
    expect($settings->validate())->toBeFalse()
        ->and($settings->hasErrors('socketPort'))->toBeTrue();
});

it('persists and clears editable log lists through Craft project configuration', function() {
    $plugin = Timber::$plugin;
    $previous = $plugin->getSettings()->toArray();
    $service = Craft::$app->getPlugins();
    try {
        expect($service->savePluginSettings($plugin, array_merge($previous, [
            'paginationLimit' => '25', 'socketPort' => '8085', 'enableRealTimeUpdates' => '1',
            'includedLogFiles' => [['stem' => ' web '], ['stem' => 'web'], ['stem' => 'queue']],
            'excludedLogFiles' => [['stem' => 'queue']],
        ])))->toBeTrue();
        $stored = Craft::$app->getProjectConfig()->get('plugins.timber.settings');
        $reloaded = new Settings(craft\helpers\ProjectConfig::unpackAssociativeArrays($stored));
        expect($reloaded->paginationLimit)->toBe(25)
            ->and($reloaded->includedStems())->toBe(['web', 'queue'])
            ->and($reloaded->excludedStems())->toBe(['queue'])
            ->and($reloaded->enableRealTimeUpdates)->toBeTrue();
        expect($service->savePluginSettings($plugin, array_merge($previous, [
            'includedLogFiles' => '', 'excludedLogFiles' => '', 'enableRealTimeUpdates' => '0',
        ])))->toBeTrue();
        expect($plugin->getSettings()->includedStems())->toBe([])
            ->and($plugin->getSettings()->excludedStems())->toBe([])
            ->and($plugin->getSettings()->enableRealTimeUpdates)->toBeFalse();
    } finally {
        $service->savePluginSettings($plugin, $previous);
    }
});
