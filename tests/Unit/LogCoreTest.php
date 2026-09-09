<?php

declare(strict_types=1);

use craft\elements\User;
use verbb\timber\events\ModifyLogParsersEvent;
use verbb\timber\helpers\LogFiles;
use verbb\timber\helpers\LogParser;
use verbb\timber\models\Settings;
use verbb\timber\services\Service;
use yii\base\Event;

describe('LogFiles stem', function() {
    it('extracts stems from rotated and compressed filenames', function() {
        $cases = [
            'web-2026-08-19.log' => 'web',
            'phperrors.log' => 'phperrors',
            'web.log' => 'web',
            'web.log.1' => 'web',
            'web.log.1.gz' => 'web',
            'web.log-20260325.gz' => 'web',
            'custom.txt' => 'custom',
            'queue-2026-08-19.log' => 'queue',
        ];

        foreach ($cases as $filename => $expected) {
            expect(LogFiles::stem('/storage/logs/' . $filename))->toBe($expected);
        }
    });
});

describe('LogParser', function() {
    it('parses common Craft and third-party formats', function() {
        $defaultLog = '/storage/logs/web-2026-08-19.log';

        $craft5 = LogParser::parseEntry("2026-08-18 17:00:27 [web.INFO] [yii\\db\\Connection::open] Opening DB connection\n", $defaultLog);
        expect($craft5['datetime'])->toBe('2026-08-18 17:00:27');
        expect($craft5['channel'])->toBe('web');
        expect($craft5['level'])->toBe('INFO');
        expect($craft5['category'])->toBe('yii\\db\\Connection::open');

        $craft3 = LogParser::parseEntry("2024-01-15 10:30:45 [web][application][-][error][craft\\services\\Plugins] Something failed\n", $defaultLog);
        expect($craft3['datetime'])->toBe('2024-01-15 10:30:45');
        expect($craft3['level'])->toBe('error');

        $monolog = LogParser::parseEntry("[2024-01-15T10:30:45+00:00] app.INFO: Something happened\n", $defaultLog);
        expect($monolog['datetime'])->toBe('2024-01-15T10:30:45+00:00');
        expect($monolog['channel'])->toBe('app');
        expect($monolog['level'])->toBe('INFO');

        $formie = LogParser::parseEntry("2026-04-14 14:15:37 [ERROR] Submission failed\n", $defaultLog);
        expect($formie['datetime'])->toBe('2026-04-14 14:15:37');
        expect($formie['level'])->toBe('ERROR');

        $blitz = LogParser::parseEntry("[2026-04-15 07:33:42] Cache cleared\n", $defaultLog);
        expect($blitz['datetime'])->toBe('2026-04-15 07:33:42');

        $bare = LogParser::parseEntry("2026-04-10 14:30:42 ondemand message\n", $defaultLog);
        expect($bare['datetime'])->toBe('2026-04-10 14:30:42');

        $raw = LogParser::parseEntry("not a normal log line at all\n", $defaultLog);
        expect($raw['datetime'])->toBeNull();
        expect($raw['message'])->toBe("not a normal log line at all\n");
    });

    it('supports EVENT_MODIFY_LOG_PARSERS for custom formats', function() {
        $nginxPath = '/var/log/nginx/error.log';

        $handler = function(ModifyLogParsersEvent $event) use ($nginxPath): void {
            if ($event->logFile !== $nginxPath) {
                return;
            }

            $event->lineStartPattern = '/^\d{4}\/\d{2}\/\d{2}/';
            array_unshift($event->parsers, LogParser::parser(
                '/^(?P<datetime>\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}) \[(?P<level>\w+)\] (?P<message>.*)/s',
                ['datetime', 'level', 'message'],
            ));
        };

        Event::on(LogParser::class, LogParser::EVENT_MODIFY_LOG_PARSERS, $handler);

        try {
            $parsed = LogParser::parseEntry("2026/04/15 08:01:02 [error] upstream timed out\n", $nginxPath);
            expect($parsed['datetime'])->toBe('2026/04/15 08:01:02');
            expect($parsed['level'])->toBe('error');
        } finally {
            Event::off(LogParser::class, LogParser::EVENT_MODIFY_LOG_PARSERS, $handler);
        }
    });
});

describe('Settings budgets', function() {
    it('caps page size and floors log read bytes', function() {
        $settings = new Settings([
            'maxPaginationLimit' => 5000,
            'maxLogReadBytes' => 100,
        ]);

        expect($settings->getMaxPageSize())->toBe(2000);
        expect($settings->getMaxLogReadBytes())->toBe(1_048_576);
    });
});

describe('LogFiles canView', function() {
    it('fails closed without a user', function() {
        expect(LogFiles::canView('/tmp/nope.log', null))->toBeFalse();
    });

    it('allows admins when the path is in the catalog', function() {
        $admin = User::find()->admin(true)->status(null)->one();
        expect($admin)->not->toBeNull();

        $files = LogFiles::findAll();
        if ($files === []) {
            $this->markTestSkipped('No log files present in the test install catalog.');
        }

        expect(LogFiles::canView($files[0]['path'], $admin))->toBeTrue();
    });
});

describe('Service cache invalidation', function() {
    it('invalidates when same-size content is replaced', function() {
        $service = new Service();
        $file = tempnam(sys_get_temp_dir(), 'timber-log-');
        file_put_contents($file, "2026-08-18 17:00:27 [web.INFO] [synthetic] AAA\n");
        clearstatcache(true, $file);

        $one = $service->getLogs($file)->all();
        usleep(1_100_000);
        file_put_contents($file, "2026-08-18 17:00:27 [web.INFO] [synthetic] BBB\n");
        clearstatcache(true, $file);
        $two = $service->getLogs($file)->all();
        unlink($file);

        expect($one)->not->toBe($two);
    });
});

describe('Realtime payload contract', function() {
    it('emits invalidation-only payloads from the console watcher', function() {
        $source = (string)file_get_contents(dirname(__DIR__, 2) . '/src/console/controllers/LogsController.php');

        expect($source)->toContain("\$emitter->emit('logUpdate'");
        expect($source)->toContain("'file' => \$file");
        // Payload array should only pass the file path — no log bodies.
        expect($source)->toMatch("/emit\('logUpdate',\s*\[\s*'file'\s*=>\s*\\\$file,\s*\]/s");
    });
});
