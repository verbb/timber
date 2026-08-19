<?php
/**
 * Minimal parser checks — run with: php tests/unit/LogParserTest.php
 */

declare(strict_types=1);

use verbb\timber\events\ModifyLogParsersEvent;
use verbb\timber\helpers\LogParser;
use yii\base\Event;

require dirname(__DIR__, 3) . '/craft-after/vendor/autoload.php';
require dirname(__DIR__, 3) . '/craft-after/vendor/yiisoft/yii2/Yii.php';

\Yii::$classMap = require dirname(__DIR__, 3) . '/craft-after/vendor/yiisoft/yii2/classes.php';
\Yii::$container = new yii\di\Container();

function assertSame(mixed $expected, mixed $actual, string $label): void
{
    if ($expected !== $actual) {
        fwrite(STDERR, "FAIL: {$label}\n  expected: " . var_export($expected, true) . "\n  actual:   " . var_export($actual, true) . "\n");
        exit(1);
    }

    echo "OK: {$label}\n";
}

$defaultLog = '/storage/logs/web-2026-08-19.log';

$craft5 = "2026-08-18 17:00:27 [web.INFO] [yii\\db\\Connection::open] Opening DB connection\n";
$parsed = LogParser::parseEntry($craft5, $defaultLog);
assertSame('2026-08-18 17:00:27', $parsed['datetime'], 'Craft 5 datetime');
assertSame('web', $parsed['channel'], 'Craft 5 channel');
assertSame('INFO', $parsed['level'], 'Craft 5 level');
assertSame('yii\\db\\Connection::open', $parsed['category'], 'Craft 5 category');

$craft3 = "2024-01-15 10:30:45 [web][application][-][error][craft\\services\\Plugins] Something failed\n";
$parsed = LogParser::parseEntry($craft3, $defaultLog);
assertSame('2024-01-15 10:30:45', $parsed['datetime'], 'Craft 3 datetime');
assertSame('error', $parsed['level'], 'Craft 3 level');

$monolog = "[2024-01-15T10:30:45+00:00] app.INFO: Something happened\n";
$parsed = LogParser::parseEntry($monolog, $defaultLog);
assertSame('2024-01-15T10:30:45+00:00', $parsed['datetime'], 'Monolog datetime');
assertSame('app', $parsed['channel'], 'Monolog channel');
assertSame('INFO', $parsed['level'], 'Monolog level');

$formie = "2026-04-14 14:15:37 [ERROR] Submission failed\n";
$parsed = LogParser::parseEntry($formie, $defaultLog);
assertSame('2026-04-14 14:15:37', $parsed['datetime'], 'Formie datetime');
assertSame('ERROR', $parsed['level'], 'Formie level');

$blitz = "[2026-04-15 07:33:42] Cache cleared\n";
$parsed = LogParser::parseEntry($blitz, $defaultLog);
assertSame('2026-04-15 07:33:42', $parsed['datetime'], 'Blitz datetime');

$bare = "2026-04-10 14:30:42 ondemand message\n";
$parsed = LogParser::parseEntry($bare, $defaultLog);
assertSame('2026-04-10 14:30:42', $parsed['datetime'], 'Bare datetime datetime');

$raw = "not a normal log line at all\n";
$parsed = LogParser::parseEntry($raw, $defaultLog);
assertSame(null, $parsed['datetime'], 'Raw fallback datetime');
assertSame("not a normal log line at all\n", $parsed['message'], 'Raw fallback message preserved');

assertSame(1, preg_match(LogParser::lineStartPattern($defaultLog), $craft5), 'Line start matches Craft 5');
assertSame(1, preg_match(LogParser::lineStartPattern($defaultLog), $blitz), 'Line start matches bracketed');
assertSame(0, preg_match(LogParser::lineStartPattern($defaultLog), '[previous exception] [object] (ReflectionException...)'), 'Line start ignores exception chain markers');

$nginxPath = '/var/log/nginx/error.log';

Event::on(LogParser::class, LogParser::EVENT_MODIFY_LOG_PARSERS, function(ModifyLogParsersEvent $event) use ($nginxPath): void {
    if ($event->logFile !== $nginxPath) {
        return;
    }

    $event->lineStartPattern = '/^\d{4}\/\d{2}\/\d{2}/';
    array_unshift($event->parsers, LogParser::parser(
        '/^(?P<datetime>\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}) \[(?P<level>\w+)\] (?P<message>.*)/s',
        ['datetime', 'level', 'message'],
    ));
});

LogParser::clearConfigCache();

$nginx = "2024/01/15 10:30:45 [error] upstream timed out\n";
$parsed = LogParser::parseEntry($nginx, $nginxPath);
assertSame('2024/01/15 10:30:45', $parsed['datetime'], 'Custom nginx datetime');
assertSame('error', $parsed['level'], 'Custom nginx level');
assertSame(1, preg_match(LogParser::lineStartPattern($nginxPath), $nginx), 'Custom nginx line start');

$defaultSuffix = LogParser::cacheKeySuffix($defaultLog);
$nginxSuffix = LogParser::cacheKeySuffix($nginxPath);
assertSame(false, $defaultSuffix === $nginxSuffix, 'Cache suffix differs when parsers customized');

echo "\nAll LogParser checks passed.\n";
