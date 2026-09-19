/**
 * Seed the deterministic Craft log used by Timber's screenshot scenarios.
 *
 * Echoes JSON with path, entry count and byte size. The generated file matches
 * the visible legacy sample and its filter totals without containing any real
 * environment data.
 */

use craft\helpers\FileHelper;

$logsPath = Craft::getAlias('@storage/logs');
FileHelper::createDirectory($logsPath);

$path = $logsPath . '/web-2023-02-21.log';
$rows = [
    ['2023-02-21 09:20:10', 'INFO', 'yii\\db\\Connection::open', 'Opening DB connection: mysql:host=localhost;dbname=craft5 {"memory":31859408}'],
    ['2023-02-21 09:20:10', 'INFO', 'yii\\web\\Session::open', 'Session started {"memory":31859408}'],
    ['2023-02-21 09:20:10', 'INFO', 'pressedigital\\linkit\\Linkit::init', 'Linkit plugin loaded {"memory":45355704}'],
    ['2023-02-21 09:20:10', 'WARNING', 'craft\\elements\\db\\ElementQuery::prepare', 'Element query executed before Craft is fully initialized. {"memory":64004856}'],
    ['2023-02-21 09:20:10', 'WARNING', 'craft\\web\\View::createTwig', 'Twig instantiated before Craft is fully initialized. {"memory":64004856}'],
    ['2023-02-21 09:20:10', 'ERROR', 'nystudio107\\pluginvite\\helpers\\FileHelper::fetchResponse', 'cURL error 7: Failed to connect to localhost port 4200: Connection refused'],
    ['2023-02-21 09:20:10', 'INFO', 'application', 'Request context: $_GET = [\'p\' => \'admin/utilities/timber-logs\']'],
    ['2023-02-21 09:20:00', 'INFO', 'yii\\db\\Connection::open', 'Opening DB connection: mysql:host=localhost;dbname=craft5 {"memory":31859408}'],
    ['2023-02-21 09:13:42', 'INFO', 'application', 'Request context: $_GET = [\'site\' => \'default\']'],
    ['2023-02-21 09:13:01', 'INFO', 'yii\\db\\Connection::open', 'Opening DB connection: mysql:host=localhost;dbname=craft5 {"memory":30756848}'],
    ['2023-02-21 09:13:01', 'INFO', 'yii\\web\\Session::open', 'Session started {"memory":30756848}'],
    ['2023-02-21 09:13:01', 'INFO', 'pressedigital\\linkit\\Linkit::init', 'Linkit plugin loaded {"memory":43612336}'],
];

$remaining = [
    'INFO' => 7218,
    'WARNING' => 3241,
    'ERROR' => 328,
];

foreach ($remaining as $level => $count) {
    for ($index = 0; $index < $count; $index++) {
        $second = str_pad((string)($index % 60), 2, '0', STR_PAD_LEFT);
        $rows[] = [
            '2023-02-21 08:00:' . $second,
            $level,
            'application',
            match ($level) {
                'ERROR' => 'A background task could not be completed.',
                'WARNING' => 'A configuration value should be reviewed.',
                default => 'Craft completed a routine application request.',
            },
        ];
    }
}

$contents = '';
foreach ($rows as [$datetime, $level, $category, $message]) {
    $contents .= "{$datetime} [web.{$level}] [{$category}] {$message}\n";
}

$targetBytes = 18486395;
if (strlen($contents) > $targetBytes) {
    throw new RuntimeException('The Timber screenshot fixture exceeds its intended file size.');
}

// Preserve the legacy 17.63 MB label without generating extra log records.
$contents = str_pad($contents, $targetBytes, 'x');
file_put_contents($path, $contents);
Craft::$app->getCache()->flush();

echo json_encode([
    'path' => $path,
    'entries' => count($rows),
    'bytes' => filesize($path),
], JSON_THROW_ON_ERROR);
