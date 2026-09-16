<?php

use Tests\Support\AdminUser;
use Tests\Support\CpRequestContext;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
use verbb\timber\helpers\LogFiles;

it('downloads every visible file when different directories share a filename', function() {
    $directory = Craft::getAlias('@storage/logs') . '/archive-fixture';
    mkdir($directory . '/one', 0777, true);
    mkdir($directory . '/two', 0777, true);
    file_put_contents($directory . '/one/same.log', 'first file');
    file_put_contents($directory . '/two/same.log', 'second file');
    $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
    $catalog->setValue(null, null);
    $settings = Timber::$plugin->getSettings();
    $included = $settings->includedLogFiles;
    $settings->includedLogFiles = ['same'];
    $bufferLevel = ob_get_level();

    try {
        AdminUser::login();
        CpRequestContext::activate('actions/timber/logs/download-all', 'POST', true);
        $controller = new LogsController('logs', Timber::$plugin);
        $controller->enableCsrfValidation = false;
        // Craft clears one buffer before a download; give it one owned by this test.
        ob_start();
        $response = $controller->runAction('download-all');
        $stream = $response->stream;
        $path = stream_get_meta_data(is_array($stream) ? $stream[0] : $stream)['uri'];
        $zip = new ZipArchive();
        expect($zip->open($path))->toBeTrue();
        $contents = [];
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $contents[] = $zip->getFromIndex($i);
        }
        $zip->close();
        expect($contents)->toHaveCount(2)->toContain('first file', 'second file');
    } finally {
        while (ob_get_level() > $bufferLevel) {
            ob_end_clean();
        }
        $settings->includedLogFiles = $included;
        $catalog->setValue(null, null);
        craft\helpers\FileHelper::removeDirectory($directory);
        if (isset($path)) {
            @unlink($path);
        }
    }
});
