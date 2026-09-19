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

it('does not discover file or directory symlinks that escape the log root', function() {
    $logsDirectory = Craft::getAlias('@storage/logs') . '/escaping-symlink-fixture';
    $externalDirectory = sys_get_temp_dir() . '/timber-external-' . bin2hex(random_bytes(6));
    mkdir($logsDirectory, 0777, true);
    mkdir($externalDirectory, 0777, true);
    $externalFile = $externalDirectory . '/external.log';
    file_put_contents($externalFile, "2026-09-17 10:00:00 [INFO] External\n");
    symlink($externalFile, $logsDirectory . '/file-link.log');
    symlink($externalDirectory, $logsDirectory . '/directory-link');

    try {
        $paths = array_column(LogFiles::findAll(true), 'path');
        expect($paths)->not->toContain(realpath($externalFile));
    } finally {
        unlink($logsDirectory . '/file-link.log');
        unlink($logsDirectory . '/directory-link');
        unlink($externalFile);
        rmdir($logsDirectory);
        rmdir($externalDirectory);
        LogFiles::findAll(true);
    }
});

it('rejects a catalog path replaced by a symlink before it can be read', function() {
    $directory = Craft::getAlias('@storage/logs') . '/replacement-symlink-fixture';
    $external = sys_get_temp_dir() . '/timber-replacement-' . bin2hex(random_bytes(6)) . '.log';
    mkdir($directory, 0777, true);
    $catalogPath = $directory . '/replace.log';
    file_put_contents($catalogPath, "2026-09-17 10:00:00 [INFO] Safe\n");
    file_put_contents($external, "2026-09-17 10:00:00 [INFO] External\n");
    LogFiles::findAll(true);
    unlink($catalogPath);
    symlink($external, $catalogPath);

    try {
        expect(LogFiles::resolveCatalogPath($catalogPath))->toBeNull()
            ->and(LogFiles::openForReading($catalogPath))->toBeFalse()
            ->and(file_get_contents($external))->toContain('External');
    } finally {
        unlink($catalogPath);
        unlink($external);
        rmdir($directory);
        LogFiles::findAll(true);
    }
});

it('rejects a catalog path when an ancestor directory is replaced by a symlink', function() {
    $root = Craft::getAlias('@storage/logs') . '/ancestor-symlink-fixture';
    $nested = $root . '/nested';
    $moved = $root . '/moved';
    $external = sys_get_temp_dir() . '/timber-ancestor-' . bin2hex(random_bytes(6));
    mkdir($nested, 0777, true);
    mkdir($external, 0777, true);
    $catalogPath = $nested . '/replace.log';
    file_put_contents($catalogPath, "2026-09-17 10:00:00 [INFO] Safe\n");
    file_put_contents($external . '/replace.log', "2026-09-17 10:00:00 [INFO] External\n");
    LogFiles::findAll(true);
    rename($nested, $moved);
    symlink($external, $nested);

    try {
        expect(LogFiles::resolveCatalogPath($catalogPath))->toBeNull()
            ->and(LogFiles::openForReading($catalogPath))->toBeFalse()
            ->and(fn() => verbb\timber\Timber::$plugin->getService()->getLogs($catalogPath, true))->toThrow(RuntimeException::class)
            ->and(file_get_contents($external . '/replace.log'))->toContain('External');
    } finally {
        unlink($nested);
        unlink($moved . '/replace.log');
        rmdir($moved);
        rmdir($root);
        unlink($external . '/replace.log');
        rmdir($external);
        LogFiles::findAll(true);
    }
});
