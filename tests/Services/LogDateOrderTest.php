<?php

use Tests\Support\AdminUser;
use Tests\Support\CpRequestContext;
use verbb\timber\Timber;
use verbb\timber\controllers\LogsController;
use verbb\timber\helpers\LogFiles;

it('sorts offset timestamps chronologically before paginating and preserves their displayed values', function(array $timestamps) {
    $file = Craft::getAlias('@storage/logs') . '/date-sorting-fixture.log';
    file_put_contents($file, "[{$timestamps[0]}] app.INFO: Earlier\n[{$timestamps[1]}] app.INFO: Latest\n[{$timestamps[2]}] app.INFO: Later\n");
    $catalog = new ReflectionProperty(LogFiles::class, 'allFiles');
    $catalog->setValue(null, null);
    try {
        AdminUser::login();
        foreach ([['datetime desc', 0, 'Latest', $timestamps[1]], ['datetime desc', 1, 'Later', $timestamps[2]], ['datetime asc', 0, 'Earlier', $timestamps[0]]] as [$orderBy, $page, $message, $datetime]) {
            CpRequestContext::activate('actions/timber/logs/index', 'POST', true);
            Craft::$app->getRequest()->setBodyParams(['file' => $file, 'orderBy' => $orderBy, 'limit' => 1, 'page' => $page]);
            $controller = new LogsController('logs', Timber::$plugin);
            $controller->enableCsrfValidation = false;
            $data = $controller->runAction('index')->data;
            expect(trim($data['logs'][0]['message']))->toBe($message);
            expect($data['logs'][0]['datetime'])->toBe($datetime);
            expect($data['pagination']['totalCount'])->toBe(3);
        }
    } finally {
        unlink($file);
        $catalog->setValue(null, null);
    }
})->with([
    'Monolog offsets and fractions' => [['2026-04-05T02:50:00+11:00', '2026-04-05T02:10:00.000001+10:00', '2026-04-05T02:10:00+10:00']],
    'PHP timezone abbreviations' => [['01-Nov-2026 01:50:00 EDT', '01-Nov-2026 01:11:00 EST', '01-Nov-2026 01:10:00 EST']],
]);

it('retains raw and invalid dates and supports secondary and non-date sorting', function() {
    $file = tempnam(sys_get_temp_dir(), 'timber-dates-');
    file_put_contents($file, "Raw entry\n[2026-99-99] Invalid date\n2026-09-17 10:00:00 [INFO] B entry\n2026-09-17 10:00:00 [INFO] A entry\n");
    try {
        $service = Timber::$plugin->getService();
        $rows = $service->getLogs($file)->orderBy('datetime desc, message asc')->all();
        expect(array_map(fn($row) => trim($row['message']), $rows))->toBe(['A entry', 'B entry', 'Invalid date', 'Raw entry']);
        expect($service->getLogs($file)->orderBy('message desc')->all()[0]['message'])->toContain('Raw entry');
    } finally {
        unlink($file);
    }
});
