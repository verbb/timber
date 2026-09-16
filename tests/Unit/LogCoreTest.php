<?php

declare(strict_types=1);

use craft\elements\User;
use verbb\timber\events\ModifyLogParsersEvent;
use verbb\timber\events\ModifyLogFilesEvent;
use verbb\timber\console\controllers\LogsController as ConsoleLogsController;
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
        expect($craft5['message'])->toBe("Opening DB connection\n");
        expect($craft5['context'])->toBeNull();

        $craft3 = LogParser::parseEntry("2024-01-15 10:30:45 [web][application][-][error][craft\\services\\Plugins] Something failed\n", $defaultLog);
        expect($craft3['datetime'])->toBe('2024-01-15 10:30:45');
        expect($craft3['level'])->toBe('error');
        expect($craft3['category'])->toBe('craft\\services\\Plugins');
        expect($craft3['message'])->toBe("Something failed\n");

        $monolog = LogParser::parseEntry("[2024-01-15T10:30:45+00:00] app.INFO: Something happened\n", $defaultLog);
        expect($monolog['datetime'])->toBe('2024-01-15T10:30:45+00:00');
        expect($monolog['channel'])->toBe('app');
        expect($monolog['level'])->toBe('INFO');
        expect($monolog['message'])->toBe("Something happened\n");

        $formie = LogParser::parseEntry("2026-04-14 14:15:37 [ERROR] Submission failed\n", $defaultLog);
        expect($formie['datetime'])->toBe('2026-04-14 14:15:37');
        expect($formie['level'])->toBe('ERROR');
        expect($formie['message'])->toBe("Submission failed\n");

        $blitz = LogParser::parseEntry("[2026-04-15 07:33:42] Cache cleared\n", $defaultLog);
        expect($blitz['datetime'])->toBe('2026-04-15 07:33:42');
        expect($blitz['message'])->toBe("Cache cleared\n");

        $bare = LogParser::parseEntry("2026-04-10 14:30:42 ondemand message\n", $defaultLog);
        expect($bare['datetime'])->toBe('2026-04-10 14:30:42');
        expect($bare['message'])->toBe("ondemand message\n");

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

        $temporaryFile = tempnam(sys_get_temp_dir(), 'timber-catalog-');
        $file = $temporaryFile . '.log';
        rename($temporaryFile, $file);
        file_put_contents($file, "2026-08-18 17:00:27 [web.INFO] [test] Visible\n");
        $handler = function(ModifyLogFilesEvent $event) use ($file): void {
            $event->logFiles[] = $file;
        };
        Event::on(LogFiles::class, LogFiles::EVENT_MODIFY_LOG_FILES, $handler);
        $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
        $catalog->setAccessible(true);
        $catalog->setValue(null, null);

        try {
            expect(LogFiles::canView($file, $admin))->toBeTrue()
                ->and(LogFiles::canView($file . '.missing', $admin))->toBeFalse();
        } finally {
            Event::off(LogFiles::class, LogFiles::EVENT_MODIFY_LOG_FILES, $handler);
            $catalog->setValue(null, null);
            @unlink($file);
        }
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

        expect($one[0]['message'])->toContain('AAA')
            ->and($two[0]['message'])->toContain('BBB')
            ->and($two[0]['message'])->not->toContain('AAA');
    });
});

describe('Realtime payload contract', function() {
    it('emits invalidation-only payloads from the console watcher', function() {
        $controller = (new ReflectionClass(ConsoleLogsController::class))->newInstanceWithoutConstructor();
        $method = new ReflectionMethod(ConsoleLogsController::class, '_invalidationPayload');
        $method->setAccessible(true);

        expect($method->invoke($controller, '/storage/logs/web.log'))
            ->toBe(['file' => '/storage/logs/web.log']);
    });
});

describe('Multiline string parsing', function() {
    it('preserves stack trace line breaks and matches file parsing', function() {
        $data = "2026-09-16 08:00:00 [web.ERROR] [app] First line\n#0 stack frame\n#1 another frame\n2026-09-16 08:01:00 [INFO] Last line";
        $file = tempnam(sys_get_temp_dir(), 'timber-multiline-');
        file_put_contents($file, $data);
        try {
            $service = new Service();
            expect($service->getLogsFromString($file, $data))->toBe($service->getLogs($file)->all());
        } finally {
            unlink($file);
        }
    });
});
