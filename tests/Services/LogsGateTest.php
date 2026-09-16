<?php

declare(strict_types=1);

use Tests\Support\AdminUser;
use Tests\Support\CpRequestContext;
use Tests\Support\NonAdminUser;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
use verbb\timber\events\ModifyLogFilesEvent;
use verbb\timber\events\ModifyLogParsersEvent;
use verbb\timber\helpers\LogFiles;
use verbb\timber\helpers\LogParser;
use yii\base\Event;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\MethodNotAllowedHttpException;

describe('Timber plugin boot', function() {
    it('installs and exposes the plugin instance', function() {
        expect(Timber::$plugin)->not->toBeNull();
        expect(Craft::$app->plugins->isPluginEnabled('timber'))->toBeTrue();
    });
});

describe('LogsController HTTP gate', function() {
    it('rejects non-CP requests', function() {
        AdminUser::login();
        CpRequestContext::activate('actions/timber/logs/index', 'POST', false);

        $controller = new LogsController('logs', Timber::$plugin);
        $controller->enableCsrfValidation = false;

        expect(fn() => $controller->runAction('index'))
            ->toThrow(BadRequestHttpException::class);
    });

    it('rejects users without utility:timber-logs', function() {
        NonAdminUser::login();
        CpRequestContext::activate('actions/timber/logs/index', 'POST', true);

        $controller = new LogsController('logs', Timber::$plugin);
        $controller->enableCsrfValidation = false;

        expect(fn() => $controller->runAction('index'))
            ->toThrow(ForbiddenHttpException::class);
    });

    it('rejects non-POST CP requests for admins', function() {
        AdminUser::login();
        CpRequestContext::activate('actions/timber/logs/index', 'GET', true);

        $controller = new LogsController('logs', Timber::$plugin);
        $controller->enableCsrfValidation = false;

        expect(fn() => $controller->runAction('index'))
            ->toThrow(MethodNotAllowedHttpException::class);
    });
});

describe('LogsController response contract', function() {
    it('retains filter support when a raw entry appears last and reports empty pages accurately', function() {
        $temporaryFile = tempnam(sys_get_temp_dir(), 'timber-controller-');
        $file = $temporaryFile . '.log';
        rename($temporaryFile, $file);
        file_put_contents($file, "2026-08-18 17:00:27 [web.INFO] [app] Parsed entry\nRAW trailing entry\n");

        $handler = function(ModifyLogFilesEvent $event) use ($file): void {
            $event->logFiles[] = $file;
        };
        Event::on(LogFiles::class, LogFiles::EVENT_MODIFY_LOG_FILES, $handler);
        $parserHandler = function(ModifyLogParsersEvent $event) use ($file): void {
            if ($event->logFile === $file) {
                $event->lineStartPattern = '/^(?:\d{4}-\d{2}-\d{2}|RAW)/';
            }
        };
        Event::on(LogParser::class, LogParser::EVENT_MODIFY_LOG_PARSERS, $parserHandler);
        LogParser::clearConfigCache();
        $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
        $catalog->setAccessible(true);
        $catalog->setValue(null, null);

        try {
            AdminUser::login();
            CpRequestContext::activate('actions/timber/logs/index', 'POST', true);
            Craft::$app->getRequest()->setBodyParams([
                'file' => $file,
                'limit' => 1,
                'page' => 5,
            ]);

            $controller = new LogsController('logs', Timber::$plugin);
            $controller->enableCsrfValidation = false;
            $response = $controller->runAction('index');

            expect($response->data['supportsLevel'])->toBeTrue()
                ->and($response->data['supportsCategory'])->toBeTrue()
                ->and($response->data['info']['levels'])->toBe(['INFO' => 1])
                ->and($response->data['info']['categories'])->toBe(['app' => 1])
                ->and($response->data['pagination'])->toMatchArray([
                    'count' => 0,
                    'totalCount' => 2,
                    'min' => 0,
                    'max' => 2,
                ]);
        } finally {
            Event::off(LogFiles::class, LogFiles::EVENT_MODIFY_LOG_FILES, $handler);
            Event::off(LogParser::class, LogParser::EVENT_MODIFY_LOG_PARSERS, $parserHandler);
            LogParser::clearConfigCache();
            $catalog->setValue(null, null);
            @unlink($file);
        }
    });
});
