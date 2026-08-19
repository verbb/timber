<?php
/**
 * Log file stem + discovery checks — run with: php tests/unit/LogFilesTest.php
 */

declare(strict_types=1);

use verbb\timber\helpers\LogFiles;

require dirname(__DIR__, 3) . '/craft-after/vendor/autoload.php';

function assertSame(mixed $expected, mixed $actual, string $label): void
{
    if ($expected !== $actual) {
        fwrite(STDERR, "FAIL: {$label}\n  expected: " . var_export($expected, true) . "\n  actual:   " . var_export($actual, true) . "\n");
        exit(1);
    }

    echo "OK: {$label}\n";
}

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

foreach ($cases as $filename => $expectedStem) {
    assertSame($expectedStem, LogFiles::stem('/storage/logs/' . $filename), "stem({$filename})");
}

echo "\nAll LogFiles stem checks passed.\n";
