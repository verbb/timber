<?php

use craft\elements\User;
use craft\enums\CmsEdition;
use craft\helpers\Json;
use craft\services\UserPermissions;
use craft\services\Utilities;
use PHPSocketIO\Socket;
use verbb\timber\Timber;
use verbb\timber\console\controllers\LogsController;
use verbb\timber\helpers\LogFiles;
use verbb\timber\helpers\RealtimeToken;
use verbb\timber\realtime\AuthenticatedEngine;
use verbb\timber\realtime\AuthenticatedSocketIO;
use verbb\timber\realtime\RealtimeEventBus;
use yii\base\Event;
use yii\helpers\StringHelper;

it('binds realtime tokens to their signed origin and expiry', function() {
    $origin = 'https://control-panel.example.test';
    $token = RealtimeToken::create(42, $origin);
    $expired = StringHelper::base64UrlEncode(Craft::$app->getSecurity()->hashData(Json::encode([
        'purpose' => 'timber-realtime',
        'userId' => 42,
        'origin' => $origin,
        'expires' => time() - 1,
    ])));

    expect(RealtimeToken::validate($token, $origin))->toBeTrue()
        ->and(RealtimeToken::getUserId($token, $origin))->toBe(42)
        ->and(RealtimeToken::validate($token, 'https://attacker.example.test'))->toBeFalse()
        ->and(RealtimeToken::getUserId($token, 'https://attacker.example.test'))->toBeNull()
        ->and(RealtimeToken::validate($token . 'tampered', $origin))->toBeFalse()
        ->and(RealtimeToken::validate($expired, $origin))->toBeFalse();
});

it('rejects the engine handshake unless its origin-bound token is valid', function() {
    $origin = 'https://control-panel.example.test';
    $admin = User::find()->admin(true)->status(null)->one();
    $token = RealtimeToken::create($admin->id, $origin);
    $engine = new AuthenticatedEngine();
    $check = static function(string $candidate, string $candidateOrigin) use ($engine): bool {
        $request = (object)[
            '_query' => ['token' => $candidate],
            'headers' => ['origin' => $candidateOrigin],
        ];
        $accepted = null;
        $engine->checkRequest($request, null, static function($error, $success) use (&$accepted): void {
            $accepted = $error === null && $success === true;
        });

        return $accepted === true;
    };

    expect($check($token, $origin))->toBeTrue()
        ->and($check('', $origin))->toBeFalse()
        ->and($check($token, ''))->toBeFalse()
        ->and($check($token, 'https://attacker.example.test'))->toBeFalse();
});

it('re-evaluates per-log permissions for every realtime handshake', function() {
    $edition = Craft::$app->getEdition();
    $generalConfig = Craft::$app->getConfig()->getGeneral();
    $disabledUtilities = $generalConfig->disabledUtilities;
    Craft::$app->setEdition(Craft::Pro);
    $logsDir = Craft::getAlias('@storage/logs');
    $allowedFile = $logsDir . '/realtime-allowed.log';
    $restrictedFile = $logsDir . '/realtime-restricted.log';
    file_put_contents($allowedFile, "2026-10-04 08:00:00 [web.INFO] Allowed\n");
    file_put_contents($restrictedFile, "2026-10-04 08:00:00 [web.INFO] Restricted\n");
    $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
    $catalog->setValue(null, null);
    // Other integration tests may already have registered these console-only fixtures.
    Event::off(UserPermissions::class, UserPermissions::EVENT_REGISTER_PERMISSIONS);
    Event::off(Utilities::class, Utilities::EVENT_REGISTER_UTILITIES);
    (new ReflectionMethod(Timber::class, '_registerUtilities'))->invoke(Timber::$plugin);
    (new ReflectionMethod(Timber::class, '_registerPermissions'))->invoke(Timber::$plugin);
    Craft::$app->getUserPermissions()->reset();
    $user = new User([
        'username' => 'realtime-permission-fixture',
        'email' => 'realtime-permission-fixture@example.test',
        'active' => true,
    ]);
    expect(Craft::$app->getElements()->saveElement($user))->toBeTrue();
    $origin = 'https://control-panel.example.test';
    $token = RealtimeToken::create($user->id, $origin);
    $teamGroup = null;
    $allowedId = LogFiles::identifier($allowedFile);
    $restrictedId = LogFiles::identifier($restrictedFile);
    $authorize = static function() use ($token, $origin): array {
        $request = (object)[
            '_query' => ['token' => $token],
            'headers' => ['origin' => $origin],
        ];
        $accepted = null;
        (new AuthenticatedEngine())->checkRequest($request, null, static function($error, $success) use (&$accepted): void {
            $accepted = $error === null && $success === true;
        });

        return [$accepted === true, AuthenticatedEngine::logIds($request)];
    };

    try {
        Craft::$app->getUserPermissions()->saveUserPermissions($user->id, [
            'accessCp',
            'utility:timber-logs',
            LogFiles::viewPermission('realtime-allowed'),
        ]);
        $freshUser = User::find()->id($user->id)->status(null)->one();
        $freshPermissions = (new UserPermissions())->getPermissionsByUserId($user->id);
        expect($freshUser?->getStatus())->toBe(User::STATUS_ACTIVE)
            ->and($freshPermissions)->toContain('accesscp')
            ->and($freshPermissions)->toContain('utility:timber-logs')
            ->and($freshPermissions)->toContain(strtolower(LogFiles::viewPermission('realtime-allowed')));
        [$accepted, $ids] = $authorize();
        expect($accepted)->toBeTrue()
            ->and($ids)->toContain($allowedId)
            ->and($ids)->not->toContain($restrictedId);

        Craft::$app->setEdition(CmsEdition::Team);
        $teamGroup = Craft::$app->getUserGroups()->getTeamGroup();
        expect(Craft::$app->getUserGroups()->saveGroup($teamGroup))->toBeTrue()
            ->and(Craft::$app->getUsers()->assignUserToGroups($user->id, [$teamGroup->id]))->toBeTrue();
        Craft::$app->getUserPermissions()->saveGroupPermissions($teamGroup->id, [
            'utility:timber-logs',
            LogFiles::viewPermission('realtime-allowed'),
        ]);
        [$accepted, $ids] = $authorize();
        expect($accepted)->toBeTrue()
            ->and($ids)->toContain($allowedId)
            ->and($ids)->not->toContain($restrictedId);

        $generalConfig->disabledUtilities[] = 'timber-logs';
        [$accepted, $ids] = $authorize();
        expect($accepted)->toBeFalse()
            ->and($ids)->toBe([]);
        $generalConfig->disabledUtilities = $disabledUtilities;
        Craft::$app->setEdition(Craft::Pro);
        expect(Craft::$app->getUserGroups()->deleteGroup($teamGroup))->toBeTrue();
        $teamGroup = null;

        Craft::$app->getUserPermissions()->saveUserPermissions($user->id, [
            'accessCp',
            'utility:timber-logs',
            'timber-viewLogs',
        ]);
        [$accepted, $ids] = $authorize();
        expect($accepted)->toBeTrue()
            ->and($ids)->toContain($allowedId)
            ->and($ids)->toContain($restrictedId);

        Craft::$app->getUserPermissions()->saveUserPermissions($user->id, [
            'accessCp',
            'utility:timber-logs',
        ]);
        [$accepted, $ids] = $authorize();
        expect($accepted)->toBeTrue()
            ->and($ids)->not->toContain($allowedId)
            ->and($ids)->not->toContain($restrictedId);

        Craft::$app->getUserPermissions()->saveUserPermissions($user->id, ['accessCp']);
        [$accepted, $ids] = $authorize();
        expect($accepted)->toBeFalse()
            ->and($ids)->toBe([]);
    } finally {
        Craft::$app->setEdition(Craft::Pro);
        if ($teamGroup?->id) {
            Craft::$app->getUserGroups()->deleteGroup($teamGroup);
        }
        Craft::$app->getElements()->deleteElement($user, true);
        Craft::$app->setEdition($edition);
        $generalConfig->disabledUtilities = $disabledUtilities;
        @unlink($allowedFile);
        @unlink($restrictedFile);
        $catalog->setValue(null, null);
        Craft::$app->getUserPermissions()->reset();
        Event::off(UserPermissions::class, UserPermissions::EVENT_REGISTER_PERMISSIONS);
        Event::off(Utilities::class, Utilities::EVENT_REGISTER_UTILITIES);
    }
});

it('emits realtime updates only to sockets in the matching log room', function() {
    $io = new AuthenticatedSocketIO();
    $queryKey = (new ReflectionClass(AuthenticatedEngine::class))->getReflectionConstant('LOG_IDS_QUERY_KEY')->getValue();
    $createSocket = static function(string $socketId, array $logIds) use ($io, $queryKey): Socket {
        $socket = new class extends Socket {
            public array $packets = [];

            public function __construct()
            {
            }

            public function packet($packet, $preEncoded = false)
            {
                $this->packets[] = $packet;
            }
        };
        $socket->id = $socketId;
        $socket->adapter = $io->sockets->adapter;
        $socket->request = (object)['_query' => [$queryKey => $logIds]];
        $io->joinAuthorizedRooms($socket);
        $io->sockets->connected[$socketId] = $socket;

        return $socket;
    };
    $allowedId = str_repeat('a', 32);
    $restrictedId = str_repeat('b', 32);
    $allowedSocket = $createSocket('allowed-socket', [$allowedId]);
    $restrictedSocket = $createSocket('restricted-socket', [$restrictedId]);

    $io->emitLogUpdate(['id' => $allowedId]);
    expect($allowedSocket->packets)->toHaveCount(1)
        ->and($restrictedSocket->packets)->toBe([]);

    $io->emitLogUpdate(['id' => $restrictedId]);
    expect($allowedSocket->packets)->toHaveCount(1)
        ->and($restrictedSocket->packets)->toHaveCount(1);

    $io->emitLogUpdate(['id' => 'invalid']);
    expect($allowedSocket->packets)->toHaveCount(1)
        ->and($restrictedSocket->packets)->toHaveCount(1);
});

it('uses stable opaque identifiers for realtime file invalidations', function() {
    $path = '/private/storage/logs/web.log';
    $identifier = LogFiles::identifier($path);

    expect($identifier)->toBe(LogFiles::identifier($path))
        ->and($identifier)->toHaveLength(32)
        ->and($identifier)->not->toContain('private')
        ->and($identifier)->not->toContain('/');

    $controller = new LogsController('logs', Timber::$plugin);
    $payload = (new ReflectionMethod($controller, '_invalidationPayload'))->invoke($controller, $path);
    expect($payload)->toBe(['id' => $identifier]);
});

it('accepts only signed and schema-valid local realtime events', function() {
    $identifier = LogFiles::identifier('/private/storage/logs/web.log');
    $message = RealtimeEventBus::create($identifier);
    $expired = StringHelper::base64UrlEncode(Craft::$app->getSecurity()->hashData(Json::encode([
        'purpose' => 'timber-realtime-event',
        'event' => 'logUpdate',
        'id' => $identifier,
        'expires' => time() - 1,
    ])));
    $unexpectedField = StringHelper::base64UrlEncode(Craft::$app->getSecurity()->hashData(Json::encode([
        'purpose' => 'timber-realtime-event',
        'event' => 'logUpdate',
        'id' => $identifier,
        'expires' => time() + 30,
        'content' => 'not accepted',
    ])));

    expect(RealtimeEventBus::validate($message))->toBe(['id' => $identifier])
        ->and(RealtimeEventBus::validate($message . 'tampered'))->toBeNull()
        ->and(RealtimeEventBus::validate($expired))->toBeNull()
        ->and(RealtimeEventBus::validate($unexpectedField))->toBeNull()
        ->and(RealtimeEventBus::validate(serialize(['id' => $identifier])))->toBeNull();
});
