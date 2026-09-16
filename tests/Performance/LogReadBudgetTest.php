<?php

declare(strict_types=1);

use verbb\timber\Timber;
use verbb\timber\services\Service;

it('retains a complete first entry at the exact tail-window boundary', function() {
    $file = tempnam(sys_get_temp_dir(), 'timber-boundary-');
    $first = "2026-09-16 08:00:00 [INFO] First retained entry\n";
    $last = "2026-09-16 08:01:00 [INFO] Last retained entry\n";
    file_put_contents($file, "Older entry\n" . $first . $last);
    $service = new class extends Service {
        public function readWithBudget(string $path, int $bytes): array|false
        {
            return $this->readLogFile($path, $bytes);
        }
    };
    try {
        expect($service->readWithBudget($file, strlen($first . $last)))->toHaveCount(2);
    } finally {
        unlink($file);
    }
});

it('bounds a single newline-free compressed entry before allocating it in full', function() {
    $temporaryFile = tempnam(sys_get_temp_dir(), 'timber-long-line-');
    $file = $temporaryFile . '.log.gz';
    rename($temporaryFile, $file);
    $prefix = '2026-08-18 17:00:27 [web.INFO] [perf] ';
    $handle = gzopen($file, 'wb');
    gzwrite($handle, $prefix . str_repeat('x', 2 * 1024 * 1024));
    gzclose($handle);
    $service = new class extends Service {
        public function readWithBudget(string $path, int $bytes): array|false
        {
            return $this->readLogFile($path, $bytes);
        }
    };
    memory_reset_peak_usage();
    $memory = memory_get_usage(true);

    try {
        $logs = $service->readWithBudget($file, 64 * 1024);
    } finally {
        @unlink($file);
    }

    $memoryGrowth = memory_get_peak_usage(true) - $memory;
    $message = (string)($logs[0]['message'] ?? '');

    expect($logs)->toHaveCount(1)
        ->and(strlen($message))->toBeLessThanOrEqual(64 * 1024)
        ->and($memoryGrowth)->toBeLessThan(8 * 1024 * 1024);
})->group('perf');

it('keeps oversized plain-log reads inside the configured tail window', function() {
    $file = tempnam(sys_get_temp_dir(), 'timber-perf-');
    $line = static fn(int $index): string => sprintf(
        "2026-08-18 17:00:27 [web.INFO] [perf] marker-%06d %s\n",
        $index,
        str_repeat('x', 900),
    );
    $handle = fopen($file, 'wb');

    for ($i = 0; $i < 4000; $i++) {
        fwrite($handle, $line($i));
    }

    fclose($handle);
    $settings = Timber::$plugin->getSettings();
    $previous = $settings->maxLogReadBytes;
    $settings->maxLogReadBytes = 1_048_576;
    $start = hrtime(true);
    memory_reset_peak_usage();
    $memory = memory_get_usage(true);

    try {
        $logs = (new Service())->getLogs($file)->all();
    } finally {
        $settings->maxLogReadBytes = $previous;
        @unlink($file);
    }

    $elapsed = (hrtime(true) - $start) / 1_000_000_000;
    $memoryGrowth = memory_get_peak_usage(true) - $memory;
    $messages = implode('', array_column($logs, 'message'));

    expect(count($logs))->toBeLessThan(1200)
        ->and($messages)->toContain('marker-003999')
        ->and($messages)->not->toContain('marker-000000')
        ->and($elapsed)->toBeLessThan(2.0)
        ->and($memoryGrowth)->toBeLessThan(32 * 1024 * 1024);
})->group('perf');
