<?php
namespace verbb\timber\helpers;

use Craft;
use craft\helpers\Json;

use yii\helpers\StringHelper;

use Throwable;

class RealtimeToken
{
    private const PURPOSE = 'timber-realtime';
    private const LIFETIME = 43_200;

    public static function create(int $userId, string $origin): string
    {
        $payload = Json::encode([
            'purpose' => self::PURPOSE,
            'userId' => $userId,
            'origin' => self::_normalizeOrigin($origin),
            'expires' => time() + self::LIFETIME,
        ]);

        return StringHelper::base64UrlEncode(Craft::$app->getSecurity()->hashData($payload));
    }

    public static function validate(string $token, string $origin): bool
    {
        if ($token === '' || $origin === '') {
            return false;
        }

        try {
            $signed = StringHelper::base64UrlDecode($token);
            $payload = Craft::$app->getSecurity()->validateData($signed);

            if ($payload === false) {
                return false;
            }

            $claims = Json::decode($payload);
        } catch (Throwable) {
            return false;
        }

        return is_array($claims)
            && ($claims['purpose'] ?? null) === self::PURPOSE
            && is_int($claims['userId'] ?? null) && $claims['userId'] > 0
            && is_int($claims['expires'] ?? null) && $claims['expires'] >= time()
            && $claims['expires'] <= time() + self::LIFETIME
            && is_string($claims['origin'] ?? null)
            && hash_equals($claims['origin'], self::_normalizeOrigin($origin));
    }

    private static function _normalizeOrigin(string $origin): string
    {
        return strtolower(rtrim(trim($origin), '/'));
    }
}
