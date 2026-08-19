<?php
namespace verbb\timber\helpers;

use verbb\timber\Timber;
use verbb\timber\models\Settings;

use Craft;
use craft\elements\User;
use craft\helpers\FileHelper;

use yii\web\ForbiddenHttpException;

class LogFiles
{
    // Properties
    // =========================================================================

    private static ?array $allFiles = null;


    // Public Methods
    // =========================================================================

    /**
     * Dated Craft files (`web-2026-08-19.log`) and undated plugin files (`phperrors.log`)
     * share a stem. Permissions and include/exclude lists grant the stem, not a single day.
     */
    public static function stem(string $path): string
    {
        $filename = basename($path);

        if (preg_match('/^(.+?)(?:-\d{4}-\d{2}-\d{2})?\.log$/', $filename, $matches)) {
            return $matches[1];
        }

        return pathinfo($filename, PATHINFO_FILENAME);
    }

    /**
     * @return array<int, array{path: string, size: int, stem: string}>
     */
    public static function findAll(): array
    {
        if (self::$allFiles !== null) {
            return self::$allFiles;
        }

        $logsDir = Craft::getAlias('@storage/logs');

        if (!$logsDir || !is_dir($logsDir)) {
            return self::$allFiles = [];
        }

        $paths = FileHelper::findFiles($logsDir, [
            'only' => ['*.log'],
        ]);

        sort($paths);

        $files = [];

        foreach ($paths as $path) {
            $files[] = [
                'path' => $path,
                'size' => filesize($path) ?: 0,
                'stem' => self::stem($path),
            ];
        }

        return self::$allFiles = $files;
    }

    /**
     * Unique stems currently on disk, sorted — used to register nested permissions.
     *
     * @return string[]
     */
    public static function discoverStems(): array
    {
        $stems = [];

        foreach (self::findAll() as $file) {
            $stems[$file['stem']] = true;
        }

        $stems = array_keys($stems);
        sort($stems);

        return $stems;
    }

    /**
     * Files the current user may see: site-wide include/exclude first, then permissions.
     *
     * @return array<int, array{path: string, size: int}>
     */
    public static function visible(?User $user = null): array
    {
        $user = $user ?? Craft::$app->getUser()->getIdentity();
        $visible = [];

        foreach (self::findAll() as $file) {
            if (!self::canView($file['path'], $user)) {
                continue;
            }

            $visible[] = [
                'path' => $file['path'],
                'size' => $file['size'],
            ];
        }

        return $visible;
    }

    public static function canView(string $path, ?User $user = null): bool
    {
        $user = $user ?? Craft::$app->getUser()->getIdentity();

        if (!$user || !self::isAccessibleLogPath($path)) {
            return false;
        }

        $stem = self::stem($path);

        if (!self::passesConfig($stem)) {
            return false;
        }

        // Admins and the parent “view all” permission skip per-stem checks (including
        // stems that appear later). Nested `timber-viewLogs:{stem}` only apply when the
        // parent is not granted. Users with neither keep today’s behaviour: all files
        // that pass config.
        if ($user->admin || $user->can('timber-viewLogs')) {
            return true;
        }

        $hasNestedRestriction = false;

        foreach (self::discoverStems() as $discoveredStem) {
            if (!$user->can('timber-viewLogs:' . $discoveredStem)) {
                continue;
            }

            $hasNestedRestriction = true;

            if ($discoveredStem === $stem) {
                return true;
            }
        }

        return !$hasNestedRestriction;
    }

    public static function requireView(string $path, ?User $user = null): void
    {
        if (self::canView($path, $user)) {
            return;
        }

        throw new ForbiddenHttpException(Craft::t('timber', 'User not authorized to view this log.'));
    }

    public static function isAccessibleLogPath(string $path): bool
    {
        if (!str_ends_with($path, '.log')) {
            return false;
        }

        $logsDir = realpath((string)Craft::getAlias('@storage/logs'));

        if ($logsDir === false) {
            return false;
        }

        $resolved = realpath($path);

        if ($resolved === false) {
            $parent = realpath(dirname($path));

            if ($parent === false) {
                return false;
            }

            $resolved = $parent . DIRECTORY_SEPARATOR . basename($path);
        }

        $logsDir = rtrim(str_replace('\\', '/', $logsDir), '/');
        $resolved = str_replace('\\', '/', $resolved);

        return str_starts_with($resolved, $logsDir . '/');
    }


    // Private Methods
    // =========================================================================

    private static function passesConfig(string $stem): bool
    {
        /* @var Settings $settings */
        $settings = Timber::$plugin->getSettings();
        $included = $settings->includedStems();
        $excluded = $settings->excludedStems();

        if ($included && !in_array($stem, $included, true)) {
            return false;
        }

        if (in_array($stem, $excluded, true)) {
            return false;
        }

        return true;
    }
}
