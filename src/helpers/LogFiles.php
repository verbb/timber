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
    // Static Methods
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

        // A dated Craft log can itself be rotated. Remove outer suffixes first so
        // every generation retains the same base name for configuration and grants.
        $filename = preg_replace('/(\.(?:log|txt))(?:-\d{4}-\d{2}-\d{2})?(?:\.\d+|-\d{8})?$/', '$1', $filename);

        // Craft dated: web-2026-08-19.log
        if (preg_match('/^(.+?)-\d{4}-\d{2}-\d{2}\.(log|txt)$/', $filename, $matches)) {
            return $matches[1];
        }

        // Plain: web.log, phperrors.log, custom.txt
        if (preg_match('/^(.+?)\.(log|txt)$/', $filename, $matches)) {
            return $matches[1];
        }

        return pathinfo($filename, PATHINFO_FILENAME);
    }

    public static function viewPermission(string $stem): string
    {
        // Craft lowercases permission names; a fixed-length digest preserves stem identity.
        return 'timber-viewLogFile:' . hash('sha256', $stem);
    }

    public static function findAll(bool $refresh = false): array
    {
        if ($refresh) {
            self::$allFiles = null;
            clearstatcache();
        }

        if (self::$allFiles !== null) {
            return self::$allFiles;
        }

        $files = [];
        $logsDir = Craft::getAlias('@storage/logs');
        $resolvedLogsDir = is_string($logsDir) ? realpath($logsDir) : false;

        if ($resolvedLogsDir !== false && is_dir($resolvedLogsDir)) {
            $paths = FileHelper::findFiles($resolvedLogsDir, [
                'only' => ['*.log', '*.log.*', '*.log-*', '*.txt', '*.txt.*', '*.txt-*', '*.gz'],
                // Never recurse through directory links. A linked file is considered
                // below only when its canonical target remains inside the log root.
                'filter' => static fn(string $path): ?bool => is_dir($path) && is_link($path) ? false : null,
            ]);

            sort($paths);

            foreach ($paths as $path) {
                if (!self::_isDiscoverableLogFilename(basename($path))) {
                    continue;
                }

                $resolved = realpath($path);

                if ($resolved === false || !self::_isWithinDirectory($resolved, $resolvedLogsDir)) {
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

        return self::$allFiles = self::_normalizeLogFiles($files);
    }

    /**
     * Active `.log` files suitable for `tail -f` realtime updates (not rotations or gzip).
     */
    public static function watchablePaths(bool $refresh = false): array
    {
        $paths = [];

        foreach (self::findAll($refresh) as $file) {
            $watchable = $file['watchable'] ?? (!$file['compressed'] && str_ends_with($file['path'], '.log'));
            $path = self::_currentCatalogPath($file);

            if (!$watchable || $path === null) {
                continue;
            }

            // Respect plugin include/exclude stems (same policy as the CP utility).
            if (!self::_passesConfig($file['stem'])) {
                continue;
            }

            $paths[] = $path;
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
            $path = self::_currentCatalogPath($file);

            if ($path === null || !self::_canViewFile($file, $user)) {
                continue;
            }

            $visible[] = [
                'path' => $path,
                'size' => filesize($path) ?: 0,
                'id' => self::identifier($path),
                'deletable' => self::canDelete($path),
            ];
        }

        return $visible;
    }

    public static function canView(string $path, ?User $user = null): bool
    {
        $user = $user ?? Craft::$app->getUser()->getIdentity();
        $file = self::_catalogFile($path);

        return $file !== null && self::_canViewFile($file, $user);
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
        $file = self::_catalogFile($path);

        return $file !== null && self::_currentCatalogPath($file) !== null;
    }

    /**
     * Return the current canonical path for a catalogued file, or null when it has
     * disappeared or changed identity (for example, was replaced by a symlink).
     */
    public static function resolveCatalogPath(string $path): ?string
    {
        $file = self::_catalogFile($path);

        return $file === null ? null : self::_currentCatalogPath($file);
    }

    /** Whether the submitted path names an entry in the cached catalog, even if stale. */
    public static function isCataloguedLogPath(string $path): bool
    {
        return self::_catalogFile($path) !== null;
    }

    /**
     * Open a catalogued regular file and verify the descriptor still represents the
     * same filesystem entry. Callers should perform all reads through this handle.
     *
     * @return resource|false
     */
    public static function openForReading(string $path, bool $requireCatalog = true)
    {
        $path = $requireCatalog ? self::resolveCatalogPath($path) : realpath($path);

        if (!is_string($path)) {
            return false;
        }

        clearstatcache(true, $path);
        $before = @lstat($path);

        if (!self::_isRegularStat($before)) {
            return false;
        }

        $handle = @fopen($path, 'rb');

        if ($handle === false) {
            return false;
        }

        $opened = @fstat($handle);
        clearstatcache(true, $path);
        $after = @lstat($path);

        if (!self::_isSameFile($before, $opened) || !self::_isSameFile($opened, $after)
            || realpath($path) !== $path) {
            fclose($handle);
            return false;
        }

        return $handle;
    }

    /** Opaque identifier used by realtime invalidations instead of filesystem paths. */
    public static function identifier(string $path): string
    {
        // Keep this lexical: resolving again could make an invalidation follow a
        // concurrently replaced directory to a different filesystem location.
        $path = str_replace('\\', '/', $path);
        $signed = Craft::$app->getSecurity()->hashData("timber-log\0" . $path);

        return substr(hash('sha256', $signed), 0, 32);
    }

    /**
     * Delete only direct children of the canonical log root. PHP has no portable
     * unlinkat()/directory-descriptor API, so nested or external paths cannot be
     * unlinked without an ancestor-directory replacement race.
     */
    public static function delete(string $path): bool
    {
        $path = self::resolveCatalogPath($path);

        if ($path === null || !self::canDelete($path)) {
            return false;
        }

        clearstatcache(true, $path);
        $stat = @lstat($path);

        return self::_isRegularStat($stat) && realpath($path) === $path && FileHelper::unlink($path);
    }

    public static function canDelete(string $path): bool
    {
        $path = self::resolveCatalogPath($path);
        $logsDir = realpath(Craft::getAlias('@storage/logs'));

        return $path !== null && $logsDir !== false
            && dirname(str_replace('\\', '/', $path)) === rtrim(str_replace('\\', '/', $logsDir), '/');
    }

    public static function isCompressed(string $path): bool
    {
        return self::_catalogFile($path)['compressed'] ?? str_ends_with(strtolower($path), '.gz');
    }

    private static function _canViewFile(array $file, ?User $user): bool
    {
        if (!$user) {
            return false;
        }

        $stem = $file['stem'];

        if (!self::_passesConfig($stem)) {
            return false;
        }

        // Admins and the parent “view all” permission skip per-stem checks (including
        // stems that appear later). File-specific grants only apply when the
        // parent is not granted. Users with neither parent nor a matching nested grant
        // are denied — do not fail open to every config-visible file.
        if ($user->admin || $user->can('timber-viewLogs')) {
            return true;
        }

        return $user->can(self::viewPermission($stem));
    }

    private static function _catalogFile(string $path): ?array
    {
        $resolved = self::_normalizePath($path);

        foreach (self::findAll() as $file) {
            if ($file['path'] === $path || self::_normalizePath($file['path']) === $resolved) {
                return $file;
            }
        }

        return null;
    }

    private static function _isDiscoverableLogFilename(string $filename): bool
    {
        if ($filename === '' || str_starts_with($filename, '.')) {
            return false;
        }

        return (bool)preg_match(
            '/^(?:.+\.(?:log|txt)(?:-\d{4}-\d{2}-\d{2})?(?:\.\d+|-\d{8})?|.+\.(?:log|txt))(?:\.gz)?$/',
            $filename
        );
    }

    private static function _normalizeLogFiles(array $files): array
    {
        $normalized = [];
        $seen = [];

        foreach ($files as $file) {
            $path = is_string($file) ? $file : (string)($file['path'] ?? '');

            if ($path === '' || !self::_isDiscoverableLogFilename(basename($path)) || !is_file($path)) {
                continue;
            }

            $resolved = realpath($path);

            if ($resolved === false || isset($seen[$resolved])) {
                continue;
            }

            $seen[$resolved] = true;
            $compressed = (is_array($file) && isset($file['compressed']))
                ? (bool)$file['compressed']
                : str_ends_with(strtolower($path), '.gz');

            $normalized[] = [
                'path' => $resolved,
                'size' => (is_array($file) && isset($file['size']) && is_numeric($file['size']))
                    ? (int)$file['size']
                    : (filesize($resolved) ?: 0),
                'stem' => (is_array($file) && ($file['stem'] ?? '') !== '')
                    ? (string)$file['stem']
                    : self::stem($path),
                'compressed' => $compressed,
                // Symlink targets may not retain the discovered file's suffix.
                'watchable' => !$compressed && str_ends_with($path, '.log'),
            ];
        }

        usort($normalized, static fn(array $a, array $b): int => strcmp($a['path'], $b['path']));

        return $normalized;
    }

    private static function _normalizePath(string $path): string
    {
        $resolved = realpath($path);

        if ($resolved !== false) {
            $path = $resolved;
        }

        return str_replace('\\', '/', $path);
    }

    private static function _currentCatalogPath(array $file): ?string
    {
        $path = $file['path'];
        clearstatcache(true, $path);
        $resolved = realpath($path);

        if ($resolved === false || str_replace('\\', '/', $resolved) !== str_replace('\\', '/', $path)
            || !is_file($path) || is_link($path)) {
            return null;
        }

        return $resolved;
    }

    private static function _isWithinDirectory(string $path, string $directory): bool
    {
        $path = rtrim(self::_normalizePath($path), '/');
        $directory = rtrim(self::_normalizePath($directory), '/');

        return $path === $directory || str_starts_with($path, $directory . '/');
    }

    private static function _isRegularStat(array|false $stat): bool
    {
        return is_array($stat) && (($stat['mode'] & 0170000) === 0100000);
    }

    private static function _isSameFile(array|false $left, array|false $right): bool
    {
        return self::_isRegularStat($left) && self::_isRegularStat($right)
            && $left['dev'] === $right['dev'] && $left['ino'] === $right['ino'];
    }

    private static function _passesConfig(string $stem): bool
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


    // Constants
    // =========================================================================

    public const EVENT_MODIFY_LOG_FILES = 'modifyLogFiles';


    // Properties
    // =========================================================================

    private static ?array $allFiles = null;
}
