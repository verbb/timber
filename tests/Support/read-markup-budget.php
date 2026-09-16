<?php

require dirname(__DIR__) . '/runtime/bootstrap.php';
$app = require CRAFT_VENDOR_PATH . '/craftcms/cms/bootstrap/console.php';
$file = $argv[1];
$line = '2026-09-17 12:00:00 [INFO] [audit] ' . str_repeat('<div class="row">Diagnostic HTML & text</div> ', 46) . "\n";
$handle = fopen($file, 'wb');
for ($bytes = 0; $bytes < 55 * 1024 * 1024; $bytes += strlen($line)) {
    fwrite($handle, $line);
}
fclose($handle);
// Exercise the stable-file path, where cache serialization can also duplicate data.
usleep(2_100_000);
$logs = verbb\timber\Timber::$plugin->getService()->getLogs($file)->all();
echo json_encode([
    'count' => count($logs),
    'message' => $logs[0]['message'],
    'peakBytes' => memory_get_peak_usage(true),
]);
