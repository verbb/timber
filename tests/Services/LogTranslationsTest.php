<?php

use craft\i18n\PhpMessageSource;
use craft\web\View;
use verbb\timber\web\assets\utility\TimberAsset;

it('exports site translations for log controls and pagination to the browser', function() {
    $directory = sys_get_temp_dir() . '/timber-translations-' . bin2hex(random_bytes(6));
    mkdir($directory . '/de', 0777, true);
    $messages = [
        'Download' => 'Herunterladen',
        'Log File' => 'Protokolldatei',
        'Search for log message' => 'Nachricht suchen',
        'Previous Page' => 'Vorherige Seite',
        '{min}-{max} of {total} entries' => '{min}-{max} von {total} Einträgen',
    ];
    file_put_contents($directory . '/de/timber.php', '<?php return ' . var_export($messages, true) . ';');
    $language = Craft::$app->language;
    $i18n = Craft::$app->getI18n();
    $source = $i18n->getMessageSource('timber');
    $translations = Craft::getAlias('@translations');
    try {
        Craft::$app->language = 'de';
        Craft::setAlias('@translations', $directory);
        $i18n->translations['timber'] = new PhpMessageSource([
            'basePath' => Craft::getAlias('@verbb/timber/translations'),
            'sourceLanguage' => 'en',
            'allowOverrides' => true,
        ]);
        expect(Craft::t('timber', 'Download'))->toBe('Herunterladen');
        $view = new View();
        (new ReflectionMethod(TimberAsset::class, '_registerTranslations'))->invoke(new TimberAsset(), $view);
        $script = implode("\n", $view->js[View::POS_BEGIN] ?? []);
        foreach ($messages as $message => $translation) {
            expect($script)->toContain($message)->toContain($translation);
        }
    } finally {
        $i18n->translations['timber'] = $source;
        Craft::setAlias('@translations', $translations);
        Craft::$app->language = $language;
        craft\helpers\FileHelper::removeDirectory($directory);
    }
});
