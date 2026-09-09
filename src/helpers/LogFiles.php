<?php
namespace verbb\timber\helpers;

use verbb\timber\Timber;
use verbb\timber\events\ModifyLogFilesEvent;
use verbb\timber\models\Settings;

use Craft;
use craft\elements\User;
use craft\helpers\FileHelper;

use yii\base\Event;
use yii\web\ForbiddenHttpException;

class LogFiles
{
    // Constants
    // =========================================================================

    public const EVENT_MODIFY_LOG_FILES = 'modifyLogFiles';


    // Properties
    // =========================================================================

    private static ?array $allFiles = null;


    // Public Methods
    // =========================================================================

    /**
     * Dated Craft files (`web-2026-08-19.log`), rotated files (`web.log.1.gz`), and
     * undated plugin files (`phperrors.log`) share a stem. Permissions grant the stem.
     */
    public static function stem(string $path): string
    {
        $filename = basename($path);

        if (str_ends_with(strtolower($filename), '.gz')) {
            $filename = substr($filename, 0, -3);
        }

        // Craft dated: web-2026-08-19.log
        if (preg_match('/^(.+?)-\d{4}-\d{2}-\d{2}\.(log|txt)$/', $filename, $matches)) {
            return $matches[1];
        }

        // Logrotate numbered: web.log.1
        if (preg_match('/^(.+?)\.(log|txt)\.\d+$/', $filename, $matches)) {
            return $matches[1];
        }

        // Logrotate dated suffix: web.log-20260325
        if (preg_match('/^(.+?)\.(log|txt)-\d{8}$/', $filename, $matches)) {
            return $matches[1];
        }

        // Plain: web.log, phperrors.log, custom.txt
        if (preg_match('/^(.+?)\.(log|txt)$/', $filename, $matches)) {
            return $matches[1];
        }

        return pathinfo($filename, PATHINFO_FILENAME);
    }

    public static function findAll(): array
    {
        if (self::$allFiles !== null) {
            return self::$allFiles;
        }

        $files = [];
        $logsDir = Craft::getAlias('@storage/logs');

        if ($logsDir && is_dir($logsDir)) {
            $paths = FileHelper::findFiles($logsDir, [
                'only' => ['*.log', '*.log.*', '*.txt', '*.txt.*', '*.gz'],
            ]);

            sort($paths);

            foreach ($paths as $path) {
                if (!self::isDiscoverableLogFilename(basename($path))) {
                    continue;
                }

                $files[] = [
                    'path' => $path,
                    'size' => filesize($path) ?: 0,
                    'stem' => self::stem($path),
                    'compressed' => str_ends_with(strtolower($path), '.gz'),
                ];
            }
        }

        // Cache the disk list first so a handler calling findAll() won't recurse.
        self::$allFiles = $files;

        if (Event::hasHandlers(self::class, self::EVENT_MODIFY_LOG_FILES)) {
            $event = new ModifyLogFilesEvent(['logFiles' => $files]);
            Event::trigger(self::class, self::EVENT_MODIFY_LOG_FILES, $event);
            $files = $event->logFiles;
        }

        return self::$allFiles = self::normalizeLogFiles($files);
    }

    /**
     * Active `.log` files suitable for `tail -f` realtime updates (not rotations or gzip).
     */
    public static function watchablePaths(): array
    {
        $paths = [];

        foreach (self::findAll() as $file) {
            $basename = basename($file['path']);

            if ($file['compressed']) {
                continue;
            }

            if (!preg_match('/\.log$/', $basename)) {
                continue;
            }

            // Skip numbered rotations like web.log.1 — they are static archives.
            if (preg_match('/\.log\.\d+$/', $basename)) {
                continue;
            }

            // Respect plugin include/exclude stems (same policy as the CP utility).
            if (!self::passesConfig($file['stem'])) {
                continue;
            }

            $paths[] = $file['path'];
        }

        sort($paths);

        return $paths;
    }

    /**
     * Unique stems in the catalog, sorted — used to register nested permissions.
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
        $file = self::catalogFile($path);

        if (!$user || !$file) {
            return false;
        }

        $stem = $file['stem'];

        if (!self::passesConfig($stem)) {
            return false;
        }

        // Admins and the parent “view all” permission skip per-stem checks (including
        // stems that appear later). Nested `timber-viewLogs:{stem}` only apply when the
        // parent is not granted. Users with neither parent nor a matching nested grant
        // are denied — do not fail open to every config-visible file.
        if ($user->admin || $user->can('timber-viewLogs')) {
            return true;
        }

        return $user->can('timber-viewLogs:' . $stem);
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
        // The catalog is the allowlist: default `@storage/logs` discovery, plus anything
        // added (or minus anything removed) via EVENT_MODIFY_LOG_FILES.
        return self::catalogFile($path) !== null;
    }


    // Private Methods
    // =========================================================================

    private static function catalogFile(string $path): ?array
    {
        if (!self::isDiscoverableLogFilename(basename($path))) {
            return null;
        }

        $resolved = self::normalizePath($path);

        foreach (self::findAll() as $file) {
            if ($file['path'] === $path || self::normalizePath($file['path']) === $resolved) {
                return $file;
            }
        }

        return null;
    }

    private static function isDiscoverableLogFilename(string $filename): bool
    {
        if ($filename === '' || str_starts_with($filename, '.')) {
            return false;
        }

        return (bool)preg_match(
            '/^(?:.+\.(?:log|txt)(?:-\d{4}-\d{2}-\d{2})?(?:\.\d+|-\d{8})?|.+\.(?:log|txt))(?:\.gz)?$/',
            $filename
        );
    }

    private static function normalizeLogFiles(array $files): array
    {
        $normalized = [];
        $seen = [];

        foreach ($files as $file) {
            $path = is_string($file) ? $file : (string)($file['path'] ?? '');

            if ($path === '' || !self::isDiscoverableLogFilename(basename($path)) || !is_file($path)) {
                continue;
            }

            $resolved = realpath($path);

            if ($resolved === false || isset($seen[$resolved])) {
                continue;
            }

            $seen[$resolved] = true;

            $normalized[] = [
                'path' => $resolved,
                'size' => (is_array($file) && isset($file['size']) && is_numeric($file['size']))
                    ? (int)$file['size']
                    : (filesize($resolved) ?: 0),
                'stem' => (is_array($file) && ($file['stem'] ?? '') !== '')
                    ? (string)$file['stem']
                    : self::stem($resolved),
                'compressed' => (is_array($file) && isset($file['compressed']))
                    ? (bool)$file['compressed']
                    : str_ends_with(strtolower($resolved), '.gz'),
            ];
        }

        usort($normalized, static fn(array $a, array $b): int => strcmp($a['path'], $b['path']));

        return $normalized;
    }

    private static function normalizePath(string $path): string
    {
        $resolved = realpath($path);

        if ($resolved !== false) {
            $path = $resolved;
        }

        return str_replace('\\', '/', $path);
    }

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
