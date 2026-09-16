<?php

use Tests\Support\AdminUser;
use Tests\Support\CpRequestContext;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
use verbb\timber\helpers\LogFiles;

it('sorts displayed message text before pagination while retaining escaped output', function() {
    $file = Craft::getAlias('@storage/logs') . '/message-sorting-fixture.log';
    $messages = ['&alpha', '"beta', "'gamma", '<delta>'];
    file_put_contents($file, implode('', array_map(fn($message) => "2026-09-17 12:00:00 [INFO] $message\n", $messages)));
    $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
    $catalog->setValue(null, null);
    try {
        AdminUser::login();
        foreach ([['message asc', 0, ['"beta', '&alpha']], ['message asc', 1, ["'gamma", '<delta>']], ['message desc', 0, ['<delta>', "'gamma"]]] as [$orderBy, $page, $expected]) {
            CpRequestContext::activate('actions/timber/logs/index', 'POST', true);
            Craft::$app->getRequest()->setBodyParams(['file' => $file, 'orderBy' => $orderBy, 'limit' => 2, 'page' => $page]);
            $controller = new LogsController('logs', Timber::$plugin);
            $controller->enableCsrfValidation = false;
            $data = $controller->runAction('index')->data;
            expect(array_map(fn($row) => trim(htmlspecialchars_decode($row['message'], ENT_QUOTES)), $data['logs']))->toBe($expected);
            expect($data['pagination']['totalCount'])->toBe(4);
            expect(implode('', array_column($data['logs'], 'message')))->not->toContain('<delta>');
        }
    } finally {
        unlink($file);
        $catalog->setValue(null, null);
    }
});
