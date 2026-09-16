<?php

use craft\elements\User;
use Tests\Support\CpRequestContext;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
use verbb\timber\helpers\LogFiles;
use yii\web\ForbiddenHttpException;

it('enforces real persisted file and action permissions for direct requests', function() {
    $previousRequest = Craft::$app->getRequest();
    $edition = Craft::$app->getEdition();
    Craft::$app->setEdition(Craft::Pro);
    CpRequestContext::activate();
    // Match CP boot: the normal console test bootstrap does not register utilities.
    $utilityRegistration = new ReflectionMethod(Timber::class, '_registerUtilities');
    $utilityRegistration->invoke(Timber::$plugin);
    $permissionRegistration = new ReflectionMethod(Timber::class, '_registerPermissions');
    $permissionRegistration->invoke(Timber::$plugin);
    $file = Craft::getAlias('@storage/logs') . '/permission-fixture.log';
    file_put_contents($file, "2026-09-16 08:00:00 [web.INFO] [app] Private fixture\n");
    $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
    $catalog->setValue(null, null);
    $user = new User(['username' => 'permission-fixture', 'email' => 'permission-fixture@example.test']);
    expect(Craft::$app->getElements()->saveElement($user))->toBeTrue();

    try {
        $cases = [
            [[], 'index', false],
            [['utility:timber-logs'], 'index', false],
            [['utility:timber-logs', 'timber-viewLogs:other'], 'index', false],
            [['utility:timber-logs', 'timber-viewLogs:permission-fixture'], 'index', true],
            [['utility:timber-logs', 'timber-viewLogs'], 'index', true],
            [['utility:timber-logs', 'timber-viewLogs'], 'download', false],
            [['utility:timber-logs', 'timber-viewLogs'], 'delete', false],
            [['utility:timber-logs', 'timber-download'], 'download', false],
            [['utility:timber-logs', 'timber-delete'], 'delete', false],
            [['utility:timber-logs', 'timber-viewLogs', 'timber-download'], 'download', true],
        ];
        foreach ($cases as [$permissions, $action, $allowed]) {
            Craft::$app->getUserPermissions()->saveUserPermissions($user->id, ['accessCp', ...$permissions]);
            expect(Craft::$app->getUserPermissions()->getPermissionsByUserId($user->id))->toContain('accesscp');
            Craft::$app->getUser()->setIdentity(User::find()->id($user->id)->status(null)->one());
            CpRequestContext::activate('actions/timber/logs/' . $action, 'POST', true);
            Craft::$app->getRequest()->setBodyParams(['file' => $file]);
            $canView = in_array('timber-viewLogs', $permissions, true) || in_array('timber-viewLogs:permission-fixture', $permissions, true);
            expect(in_array($file, array_column(LogFiles::visible(), 'path'), true))->toBe($canView);
            $controller = new LogsController('logs', Timber::$plugin);
            $controller->enableCsrfValidation = false;
            if ($allowed) {
                expect($controller->runAction($action))->toBeInstanceOf(yii\web\Response::class);
            } else {
                expect(fn() => $controller->runAction($action))->toThrow(ForbiddenHttpException::class);
            }
        }
    } finally {
        Craft::$app->set('request', $previousRequest);
        Craft::$app->getElements()->deleteElement($user, true);
        Craft::$app->setEdition($edition);
        unlink($file);
        $catalog->setValue(null, null);
    }
});
