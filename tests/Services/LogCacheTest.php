<?php

use craft\cache\FileCache;
use craft\helpers\FileHelper;
use verbb\timber\services\Service;

it('reuses unchanged parses and replaces obsolete cached log generations', function() {
    $directory = Craft::getAlias('@runtime') . '/log-cache-fixture-' . bin2hex(random_bytes(4));
    FileHelper::createDirectory($directory);
    $originalCache = Craft::$app->getCache();
    $cache = new FileCache(['cachePath' => $directory . '/cache', 'defaultDuration' => $originalCache->defaultDuration]);
    Craft::$app->set('cache', $cache);
    $file = $directory . '/growing.log';
    $service = new class extends Service {
        public int $reads = 0;

        protected function readLogFile(string $logFile, ?int $maxBytes = null): array|false
        {
            $this->reads++;
            return parent::readLogFile($logFile, $maxBytes);
        }
    };
    try {
        for ($generation = 1; $generation <= 3; $generation++) {
            file_put_contents($file, "2026-09-17 12:00:00 [INFO] Generation $generation\n", FILE_APPEND);
            usleep(2_100_000);
            expect($service->getLogs($file)->count())->toBe($generation);
            expect($service->getLogs($file)->count())->toBe($generation);
            expect($service->reads)->toBe($generation);
        }
        expect(FileHelper::findFiles($cache->cachePath))->toHaveCount(1);
    } finally {
        Craft::$app->set('cache', $originalCache);
        FileHelper::removeDirectory($directory);
    }
});
