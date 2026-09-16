<?php

use Tests\Support\AdminUser;
use Tests\Support\CpRequestContext;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
use verbb\timber\helpers\LogFiles;
use yii\web\JsonResponseFormatter;

it('displays legacy category bytes and filters by the category returned to the browser', function() {
    $file = Craft::getAlias('@storage/logs') . '/encoding-fixture.log';
    file_put_contents($file, "2026-09-17 12:00:00 [web.INFO] [caf" . chr(233) . "] Legacy category\n");
    $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
    $catalog->setValue(null, null);
    try {
        AdminUser::login();
        $categories = null;
        for ($requestNumber = 0; $requestNumber < 2; $requestNumber++) {
            CpRequestContext::activate('actions/timber/logs/index', 'POST', true);
            Craft::$app->getRequest()->setBodyParams(['file' => $file, 'categories' => $categories]);
            $controller = new LogsController('logs', Timber::$plugin);
            $controller->enableCsrfValidation = false;
            $response = $controller->runAction('index');
            (new JsonResponseFormatter())->format($response);
            $data = json_decode($response->content, true, 512, JSON_THROW_ON_ERROR);
            expect($data['pagination']['totalCount'])->toBe(1);
            expect($data['logs'][0]['category'])->toBe("caf\u{FFFD}");
            expect($data['info']['categories']["caf\u{FFFD}"])->toBe(1);
            $categories = [$data['logs'][0]['category']];
        }
    } finally {
        unlink($file);
        $catalog->setValue(null, null);
    }
});
