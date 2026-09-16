<?php

use Tests\Support\AdminUser;
use Tests\Support\CpRequestContext;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
use verbb\timber\events\ModifyLogFilesEvent;
use verbb\timber\helpers\LogFiles;
use yii\base\Event;
use yii\web\ServerErrorHttpException;

it('reports unreadable logs and recovers after permissions are restored', function(bool $compressed) {
    $file = sys_get_temp_dir() . '/timber-unreadable-' . bin2hex(random_bytes(6)) . ($compressed ? '.log.gz' : '.log');
    $data = "2026-09-16 12:00:00 [INFO] Existing content\n";
    file_put_contents($file, $compressed ? gzencode($data) : $data);
    chmod($file, 0000);
    $handler = static function(ModifyLogFilesEvent $event) use ($file) {
        $event->logFiles = [$file];
    };
    Event::on(LogFiles::class, LogFiles::EVENT_MODIFY_LOG_FILES, $handler);

    try {
        expect(is_readable($file))->toBeFalse();
        LogFiles::findAll(true);
        AdminUser::login();
        foreach (['index', 'download'] as $action) {
            CpRequestContext::activate('actions/timber/logs/' . $action, 'POST', true);
            Craft::$app->getRequest()->setBodyParams(['file' => $file]);
            $controller = new LogsController('logs', Timber::$plugin);
            $controller->enableCsrfValidation = false;
            expect(fn() => $controller->runAction($action))->toThrow(ServerErrorHttpException::class, 'permissions');
        }
        chmod($file, 0644);
        clearstatcache(true, $file);
        expect(Timber::$plugin->getService()->getLogs($file)->all())->toHaveCount(1);
    } finally {
        chmod($file, 0644);
        unlink($file);
        Event::off(LogFiles::class, LogFiles::EVENT_MODIFY_LOG_FILES, $handler);
        (new ReflectionProperty(LogFiles::class, 'allFiles'))->setValue(null, null);
    }
})->with([false, true]);
