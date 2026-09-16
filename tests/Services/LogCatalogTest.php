<?php

use verbb\timber\helpers\LogFiles;

it('discovers supported uncompressed dated rotations and groups their stems', function() {
    $directory = Craft::getAlias('@storage/logs') . '/catalog-fixture';
    mkdir($directory, 0777, true);
    $names = ['dated.log-20260916', 'dated.txt-20260916', 'dated.log.1', 'dated-2026-09-16.log'];
    foreach ($names as $name) file_put_contents($directory . '/' . $name, 'fixture');
    $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
    $catalog->setValue(null, null);
    try {
        $files = array_filter(LogFiles::findAll(), fn($file) => str_starts_with($file['path'], $directory . '/'));
        expect(array_column($files, 'stem'))->toHaveCount(4)->each->toBe('dated');
    } finally {
        craft\helpers\FileHelper::removeDirectory($directory);
        $catalog->setValue(null, null);
    }
});
