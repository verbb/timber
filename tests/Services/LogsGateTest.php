<?php

declare(strict_types=1);

use Tests\Support\AdminUser;
use Tests\Support\CpRequestContext;
use Tests\Support\NonAdminUser;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
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
