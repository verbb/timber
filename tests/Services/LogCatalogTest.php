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

it('keeps discovered symlink targets accessible with their original log format', function(bool $compressed) {
    $directory = Craft::getAlias('@storage/logs') . '/symlink-catalog-fixture';
    mkdir($directory . '/target', 0777, true);
    $target = $directory . '/target/access_log';
    $alias = $directory . '/linked.log' . ($compressed ? '.gz' : '');
    $data = "2026-09-17 10:00:00 [INFO] Linked log entry\n";
    file_put_contents($target, $compressed ? gzencode($data) : $data);
    symlink($target, $alias);
    try {
        $files = array_values(array_filter(LogFiles::findAll(true), fn($file) => str_starts_with($file['path'], $directory . '/')));
        expect($files)->toHaveCount(1);
        expect($files[0]['stem'])->toBe('linked');
        expect(LogFiles::isAccessibleLogPath($files[0]['path']))->toBeTrue();
        expect(LogFiles::isAccessibleLogPath($alias))->toBeTrue();
        expect(in_array($files[0]['path'], LogFiles::watchablePaths(), true))->toBe(!$compressed);
        $rows = verbb\timber\Timber::$plugin->getService()->getLogs($files[0]['path'])->all();
        expect($rows)->toHaveCount(1);
        expect($rows[0]['message'])->toContain('Linked log entry');
    } finally {
        unlink($alias);
        unlink($target);
        rmdir($directory . '/target');
        rmdir($directory);
        LogFiles::findAll(true);
    }
})->with(['plain' => false, 'gzip' => true]);
