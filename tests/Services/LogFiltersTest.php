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
