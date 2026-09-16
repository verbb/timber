<?php

use craft\log\MonologTarget;
use Monolog\Level;
use Monolog\LogRecord;
use Monolog\Logger;
use Tests\Support\AdminUser;
use Tests\Support\CpRequestContext;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
use verbb\timber\helpers\LogFiles;

it('keeps metadata and filters for custom Craft log channels', function(string $channel) {
    $file = Craft::getAlias('@storage/logs') . '/channel-fixture.log';
    $target = new MonologTarget(['name' => $channel, 'logger' => new Logger($channel)]);
    $record = new LogRecord(new DateTimeImmutable('2026-09-17 10:00:00 UTC'), $channel, Level::Error, 'Channel fixture', [], ['yii_category' => 'plugin\\task']);
    file_put_contents($file, $target->getFormatter()->format($record));
    $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
    $catalog->setValue(null, null);
    try {
        AdminUser::login();
        CpRequestContext::activate('actions/timber/logs/index', 'POST', true);
        Craft::$app->getRequest()->setBodyParams(['file' => $file, 'levels' => ['ERROR'], 'categories' => ['plugin\\task']]);
        $controller = new LogsController('logs', Timber::$plugin);
        $controller->enableCsrfValidation = false;
        $data = $controller->runAction('index')->data;
        expect($data['pagination']['totalCount'])->toBe(1);
        expect($data['logs'][0]['channel'])->toBe($channel);
        expect($data['logs'][0]['message'])->toContain('Channel fixture');
        expect($data['info']['levels']['ERROR'])->toBe(1);
        expect($data['info']['categories']['plugin\\task'])->toBe(1);
    } finally {
        unlink($file);
        $catalog->setValue(null, null);
    }
})->with(['web', 'my-plugin', 'my.plugin', 'my_plugin', 'custom channel']);
