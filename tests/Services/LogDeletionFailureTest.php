<?php

use Tests\Support\AdminUser;
use Tests\Support\CpRequestContext;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
use verbb\timber\events\ModifyLogFilesEvent;
use verbb\timber\helpers\LogFiles;
use yii\base\Event;

it('deletes direct logs while retaining paths that cannot be unlinked without ancestor races', function() {
    $directory = Craft::getAlias('@storage/logs') . '/timber-delete-' . bin2hex(random_bytes(6));
    mkdir($directory . '/locked', 0777, true);
    $locked = $directory . '/locked/retained.log';
    $removable = Craft::getAlias('@storage/logs') . '/removed-' . bin2hex(random_bytes(6)) . '.log';
    file_put_contents($locked, 'retained');
    file_put_contents($removable, 'removed');
    $handler = static function(ModifyLogFilesEvent $event) use ($locked, $removable) {
        $event->logFiles = [$locked, $removable];
    };
    Event::on(LogFiles::class, LogFiles::EVENT_MODIFY_LOG_FILES, $handler);

    try {
        AdminUser::login();
        foreach (['delete', 'delete-all'] as $action) {
            LogFiles::findAll(true);
            CpRequestContext::activate('actions/timber/logs/' . $action, 'POST', true);
            Craft::$app->getRequest()->setBodyParams(['file' => $locked]);
            Craft::$app->getResponse()->setStatusCode(200);
            $controller = new LogsController('logs', Timber::$plugin);
            $controller->enableCsrfValidation = false;
            $response = $controller->runAction($action);
            expect(is_file($locked))->toBeTrue();

            if ($action === 'delete') {
                expect($response->statusCode)->toBe(500)
                    ->and($response->data['success'])->toBeFalse();
            } else {
                expect($response->statusCode)->toBe(200)
                    ->and($response->data['success'])->toBeTrue();
                expect($response->data['deleted'])->toBe([$removable]);
                expect(is_file($removable))->toBeFalse();
            }
        }
    } finally {
        craft\helpers\FileHelper::removeDirectory($directory);
        @unlink($removable);
        Event::off(LogFiles::class, LogFiles::EVENT_MODIFY_LOG_FILES, $handler);
        (new ReflectionProperty(LogFiles::class, 'allFiles'))->setValue(null, null);
        Craft::$app->getResponse()->setStatusCode(200);
    }
});
