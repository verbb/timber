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
        return self::getUserId($token, $origin) !== null;
    }

    public static function getUserId(string $token, string $origin): ?int
    {
        if ($token === '' || $origin === '') {
            return null;
        }

        try {
            $signed = StringHelper::base64UrlDecode($token);
            $payload = Craft::$app->getSecurity()->validateData($signed);

            if ($payload === false) {
                return null;
            }

            $claims = Json::decode($payload);
        } catch (Throwable) {
            return null;
        }

        $now = time();

        if (!is_array($claims)
            || ($claims['purpose'] ?? null) !== self::PURPOSE
            || !is_int($claims['userId'] ?? null) || $claims['userId'] <= 0
            || !is_int($claims['expires'] ?? null) || $claims['expires'] < $now
            || $claims['expires'] > $now + self::LIFETIME
            || !is_string($claims['origin'] ?? null)
            || !hash_equals($claims['origin'], self::_normalizeOrigin($origin))
        ) {
            return null;
        }

        return $claims['userId'];
    }

    private static function _normalizeOrigin(string $origin): string
    {
        return strtolower(rtrim(trim($origin), '/'));
    }
}
