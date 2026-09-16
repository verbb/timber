<?php

use Tests\Support\AdminUser;
use Tests\Support\CpRequestContext;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
use verbb\timber\helpers\LogFiles;

it('distinguishes unrestricted, empty and literal null category filters', function() {
    $file = Craft::getAlias('@storage/logs') . '/audit-filter.log';
    file_put_contents($file, "2026-09-16 08:00:00 [web.INFO] [null] First message\n2026-09-16 08:01:00 [ERROR] Second message\n");
    $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
    $catalog->setValue(null, null);
    try {
        AdminUser::login();
        foreach ([[null, 2], [[], 0], [['null'], 1]] as [$categories, $count]) {
            CpRequestContext::activate('actions/timber/logs/index', 'POST', true);
            Craft::$app->getRequest()->setBodyParams(['file' => $file, 'categories' => $categories]);
            $controller = new LogsController('logs', Timber::$plugin);
            $controller->enableCsrfValidation = false;
            $response = $controller->runAction('index');
            expect($response->data['pagination']['totalCount'])->toBe($count);
        }
    } finally {
        unlink($file);
        $catalog->setValue(null, null);
    }
});

it('searches literal displayed messages including zero and escaped characters', function() {
    $file = Craft::getAlias('@storage/logs') . '/audit-search.log';
    file_put_contents($file, "2026-09-16 08:00:00 [web.INFO] [app] zero 0 and <tag> & value\n2026-09-16 08:01:00 [INFO] another message\n");
    $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
    $catalog->setValue(null, null);
    try {
        AdminUser::login();
        foreach (['0', '<tag>', '& value'] as $search) {
            CpRequestContext::activate('actions/timber/logs/index', 'POST', true);
            Craft::$app->getRequest()->setBodyParams(['file' => $file, 'search' => $search]);
            $controller = new LogsController('logs', Timber::$plugin);
            $controller->enableCsrfValidation = false;
            $response = $controller->runAction('index');
            expect($response->data['pagination']['totalCount'])->toBe(1);
        }
    } finally {
        unlink($file);
        $catalog->setValue(null, null);
    }
});

it('keeps literal zero level and category values available as facets', function() {
    $file = Craft::getAlias('@storage/logs') . '/audit-zero-facets.log';
    file_put_contents($file, "2026-09-16 08:00:00 [0] [0] Zero facets\n2026-09-16 08:01:00 [INFO] [app] Normal facets\n");
    $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
    $catalog->setValue(null, null);
    try {
        AdminUser::login();
        CpRequestContext::activate('actions/timber/logs/index', 'POST', true);
        Craft::$app->getRequest()->setBodyParams(['file' => $file, 'levels' => ['0'], 'categories' => ['0']]);
        $controller = new LogsController('logs', Timber::$plugin);
        $controller->enableCsrfValidation = false;
        $response = $controller->runAction('index');
        expect($response->data['info']['levels']['0'] ?? null)->toBe(1);
        expect($response->data['info']['categories']['0'] ?? null)->toBe(1);
        expect($response->data['supportsLevel'])->toBeTrue();
        expect($response->data['supportsCategory'])->toBeTrue();
        expect($response->data['pagination']['totalCount'])->toBe(1);
        expect($response->data['logs'][0]['message'])->toContain('Zero facets');
    } finally {
        unlink($file);
        $catalog->setValue(null, null);
    }
});
