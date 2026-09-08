/**
 * Seed sample log files into Craft's storage/logs for Timber docs screenshots.
 *
 * Echoes JSON: utilityRoute, logFile.
 * Note: no opening PHP tag — @verbb/docs-screenshots injects this into a bootstrap.
 *
 * Starter seed: writes a small, deterministic web.log so the Logs utility renders rows.
 * Expand with more levels/categories as the Phase 1 virtualised log table lands.
 */

use craft\helpers\FileHelper;
use craft\helpers\Json;

$adminPath = Craft::$app->getConfig()->getGeneral()->cpTrigger ?: 'admin';
$logsPath = Craft::getAlias('@storage/logs');

FileHelper::createDirectory($logsPath);

$logFile = $logsPath . DIRECTORY_SEPARATOR . 'web.log';

$lines = [
    '2026-07-21 09:14:02 [-][1][-][info][application] Bootstrap Craft CMS 5',
    '2026-07-21 09:14:03 [-][1][-][info][yii\\web\\Session::open] Session started',
    '2026-07-21 09:14:04 [-][1][-][info][yii\\db\\Connection::open] Opening DB connection: mysql:host=localhost;dbname=craft4',
    '2026-07-21 09:14:05 [-][1][-][info][presseddigital\\linkit\\Linkit::init] Linkit plugin loaded',
    '2026-07-21 09:14:06 [-][1][-][info][craft\\elements\\db\\ElementQuery::prepare] SELECT `elements`.`id` FROM `elements` LIMIT 100',
    '2026-07-21 09:14:08 [-][1][-][warning][application] Deprecated template tag used in "_layout.twig"',
    '2026-07-21 09:15:11 [-][1][-][warning][application] Request context: $_GET = [ \'p\' => \'admin/utilities/timber-logs\' ]',
    '2026-07-21 09:15:42 [-][1][-][error][nystudio107\\plugininvite\\helpers\\FileHelper::fetchResponse] cURL error 7: Failed to connect to localhost port 4020',
    '2026-07-21 09:16:47 [-][1][-][error][application] Unable to connect to remote source "vimeo": timeout',
    '2026-07-21 09:17:01 [-][1][-][info][yii\\db\\Command::query] SELECT * FROM {{%entries}} WHERE [[sectionId]] = 3',
    '2026-07-21 09:17:20 [-][1][-][info][application] Cache cleared: data',
    '2026-07-21 09:18:05 [-][1][-][trace][yii\\db\\Command::query] SELECT * FROM {{%entries}} LIMIT 100',
];

file_put_contents($logFile, implode("\n", $lines) . "\n");

echo Json::encode([
    'utilityRoute' => "/{$adminPath}/utilities/timber-logs",
    'logFile' => 'web.log',
    'logPath' => $logFile,
], JSON_THROW_ON_ERROR);
