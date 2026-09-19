<?php

use craft\helpers\Json;
use verbb\timber\Timber;
use verbb\timber\console\controllers\LogsController;
use verbb\timber\helpers\LogFiles;
use verbb\timber\helpers\RealtimeToken;
use verbb\timber\realtime\AuthenticatedEngine;
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
        ->and(RealtimeToken::validate($token, 'https://attacker.example.test'))->toBeFalse()
        ->and(RealtimeToken::validate($token . 'tampered', $origin))->toBeFalse()
        ->and(RealtimeToken::validate($expired, $origin))->toBeFalse();
});

it('rejects the engine handshake unless its origin-bound token is valid', function() {
    $origin = 'https://control-panel.example.test';
    $token = RealtimeToken::create(42, $origin);
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
