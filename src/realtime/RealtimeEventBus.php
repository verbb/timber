<?php
namespace verbb\timber\realtime;

use Craft;
use craft\helpers\Json;

use yii\helpers\StringHelper;

use RuntimeException;
use Throwable;

use Workerman\Connection\TcpConnection;
use Workerman\Worker;

class RealtimeEventBus
{
    private const CONNECT_ADDRESS = 'tcp://127.0.0.1:2206';
    private const LISTEN_ADDRESS = 'text://127.0.0.1:2206';
    private const EVENT = 'logUpdate';
    private const LIFETIME = 30;
    private const MAX_MESSAGE_SIZE = 2_048;
    private const PURPOSE = 'timber-realtime-event';

    public static function create(string $id): string
    {
        $payload = Json::encode([
            'purpose' => self::PURPOSE,
            'event' => self::EVENT,
            'id' => $id,
            'expires' => time() + self::LIFETIME,
        ]);

        return StringHelper::base64UrlEncode(Craft::$app->getSecurity()->hashData($payload));
    }

    public static function validate(string $message): ?array
    {
        if ($message === '' || strlen($message) > self::MAX_MESSAGE_SIZE) {
            return null;
        }

        try {
            $signed = StringHelper::base64UrlDecode($message);
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
            || count($claims) !== 4
            || ($claims['purpose'] ?? null) !== self::PURPOSE
            || ($claims['event'] ?? null) !== self::EVENT
            || !is_string($claims['id'] ?? null)
            || preg_match('/\A[a-f0-9]{32}\z/D', $claims['id']) !== 1
            || !is_int($claims['expires'] ?? null)
            || $claims['expires'] < $now
            || $claims['expires'] > $now + self::LIFETIME
        ) {
            return null;
        }

        return ['id' => $claims['id']];
    }

    public static function createWorker(callable $onUpdate): Worker
    {
        $worker = new Worker(self::LISTEN_ADDRESS);
        $worker->name = 'TimberRealtimeEvents';

        $worker->onConnect = static function(TcpConnection $connection): void {
            $connection->maxPackageSize = self::MAX_MESSAGE_SIZE;
        };

        $worker->onMessage = static function(TcpConnection $connection, string $message) use ($onUpdate): void {
            $payload = self::validate($message);

            if ($payload !== null) {
                $onUpdate($payload);
            }

            $connection->close();
        };

        return $worker;
    }

    public static function publish(string $id): void
    {
        $errorCode = 0;
        $errorMessage = '';
        $socket = @stream_socket_client(self::CONNECT_ADDRESS, $errorCode, $errorMessage, 1);

        if ($socket === false) {
            throw new RuntimeException(sprintf('Unable to connect to the realtime event server: %s (%d).', $errorMessage, $errorCode));
        }

        try {
            $message = self::create($id) . "\n";

            while ($message !== '') {
                $written = fwrite($socket, $message);

                if ($written === false || $written === 0) {
                    throw new RuntimeException('Unable to publish the realtime log update.');
                }

                $message = substr($message, $written);
            }
        } finally {
            fclose($socket);
        }
    }
}
