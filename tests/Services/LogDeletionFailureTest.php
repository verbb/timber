<?php

use Tests\Support\AdminUser;
use Tests\Support\CpRequestContext;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
use verbb\timber\events\ModifyLogFilesEvent;
use verbb\timber\helpers\LogFiles;
use yii\base\Event;

it('reports failed deletions and identifies files removed by a partial bulk deletion', function() {
    $directory = sys_get_temp_dir() . '/timber-delete-' . bin2hex(random_bytes(6));
    mkdir($directory . '/locked', 0777, true);
    $locked = $directory . '/locked/retained.log';
    $removable = $directory . '/removed.log';
    file_put_contents($locked, 'retained');
    file_put_contents($removable, 'removed');
    chmod($directory . '/locked', 0555);
    $handler = static function(ModifyLogFilesEvent $event) use ($locked, $removable) {
        $event->logFiles = [$locked, $removable];
    };
    Event::on(LogFiles::class, LogFiles::EVENT_MODIFY_LOG_FILES, $handler);

    try {
        expect(is_writable(dirname($locked)))->toBeFalse();
        AdminUser::login();
        foreach (['delete', 'delete-all'] as $action) {
            LogFiles::findAll(true);
            CpRequestContext::activate('actions/timber/logs/' . $action, 'POST', true);
            Craft::$app->getRequest()->setBodyParams(['file' => $locked]);
            Craft::$app->getResponse()->setStatusCode(200);
            $controller = new LogsController('logs', Timber::$plugin);
            $controller->enableCsrfValidation = false;
            $response = $controller->runAction($action);
            expect($response->statusCode)->toBe(500);
            expect($response->data['success'])->toBeFalse();
            expect($response->data['message'])->toContain('permissions');
            expect(is_file($locked))->toBeTrue();
            if ($action === 'delete-all') {
                expect($response->data['deleted'])->toBe([$removable]);
                expect(is_file($removable))->toBeFalse();
            }
        }
    } finally {
        chmod($directory . '/locked', 0755);
        craft\helpers\FileHelper::removeDirectory($directory);
        Event::off(LogFiles::class, LogFiles::EVENT_MODIFY_LOG_FILES, $handler);
        (new ReflectionProperty(LogFiles::class, 'allFiles'))->setValue(null, null);
        Craft::$app->getResponse()->setStatusCode(200);
    }
});
