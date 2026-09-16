<?php
namespace verbb\timber\controllers;

use verbb\timber\Timber;
use verbb\timber\helpers\LogFiles;

use Craft;
use craft\helpers\FileHelper;
use craft\helpers\StringHelper;
use craft\web\Controller;

use yii\base\Exception;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\Response;

use Throwable;
use ZipArchive;

class LogsController extends Controller
{
    // Constants
    // =========================================================================

    private const MAX_DOWNLOAD_FILES = 250;
    private const MAX_DOWNLOAD_BYTES = 1_073_741_824;


    // Public Methods
    // =========================================================================

    public function actionIndex(): ?Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $this->requirePermission('utility:timber-logs');

        $logFile = $this->request->getRequiredParam('file');
        $orderBy = $this->request->getParam('orderBy');
        $limit = $this->request->getParam('limit');
        $page = $this->request->getParam('page', 0);
        $search = $this->request->getParam('search');
        $levels = $this->request->getParam('levels');
        $categories = $this->request->getParam('categories');

        if (!LogFiles::isAccessibleLogPath($logFile)) {
            return $this->asFailure(Craft::t('timber', 'Invalid file.'));
        }

        LogFiles::requireView($logFile);

        /* @var \verbb\timber\models\Settings $settings */
        $settings = Timber::$plugin->getSettings();
        $maxPage = $settings->getMaxPageSize();
        $defaultLimit = max(1, min((int)$settings->paginationLimit ?: 100, $maxPage));
        $limit = (int)($limit ?? $defaultLimit);
        $limit = max(1, min($limit, $maxPage));
        $page = max(0, (int)$page);

        $supportsLevel = false;
        $supportsCategory = false;

        $logQuery = Timber::$plugin->getService()->getLogs($logFile);
        $logQuery->orderBy($orderBy);

        // Parse/filter/sort once from the cached bounded window. The previous query
        // pipeline rescanned the entire in-memory log set for facets, count and page.
        $matchingLogs = $logQuery->all();

        // Generate file info for levels, categories and more.
        $logInfo = [
            'levels' => [],
            'categories' => [],
        ];
        $filteredLogs = [];
        $levels = is_array($levels) ? $levels : null;
        $categories = is_array($categories) ? $categories : null;

        foreach ($matchingLogs as $log) {
            // The parser stores escaped HTML; users search the text they actually see.
            if (is_string($search) && $search !== ''
                && mb_stripos(htmlspecialchars_decode($log['message'], ENT_QUOTES), $search) === false) {
                continue;
            }

            $level = $log['level'] ?? null;
            $supportsLevel = $supportsLevel || (bool)$level;

            if ($level) {
                if (!isset($logInfo['levels'][$level])) {
                    $logInfo['levels'][$level] = 0;
                }

                $logInfo['levels'][$level] += 1;
            }

            $category = $log['category'] ?? null;
            $supportsCategory = $supportsCategory || (bool)$category;

            if ($category) {
                if (!isset($logInfo['categories'][$category])) {
                    $logInfo['categories'][$category] = 0;
                }

                $logInfo['categories'][$category] += 1;
            }

            if ($levels !== null && !in_array($level, $levels, true)) {
                continue;
            }

            if ($categories !== null && !in_array($category, $categories, true)) {
                continue;
            }

            $filteredLogs[] = $log;
        }

        ksort($logInfo['levels']);
        ksort($logInfo['categories']);

        $totalCount = count($filteredLogs);
        $offset = $page * $limit;
        $logs = array_slice($filteredLogs, $offset, $limit);

        return $this->asJson([
            'logs' => $logs,
            'info' => $logInfo,
            'supportsLevel' => $supportsLevel,
            'supportsCategory' => $supportsCategory,
            'pagination' => [
                'page' => $page,
                'count' => count($logs),
                'totalCount' => $totalCount,
                'min' => $logs === [] ? 0 : $offset + 1,
                'max' => min($totalCount, $offset + $limit),
            ],
        ]);
    }

    public function actionDownload(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $this->requirePermission('utility:timber-logs');

        $logFile = $this->request->getRequiredParam('file');

        if (!LogFiles::isAccessibleLogPath($logFile)) {
            throw new BadRequestHttpException(Craft::t('timber', 'The log file you’re trying to download does not exist.'));
        }

        $currentUser = static::currentUser();

        if (!$currentUser || !$currentUser->can('timber-download')) {
            throw new ForbiddenHttpException(Craft::t('timber', 'User not authorized to download log.'));
        }

        LogFiles::requireView($logFile, $currentUser);

        $file = @fopen($logFile, 'rb');

        return $this->response->sendStreamAsFile($file, basename($logFile), [
            'fileSize' => filesize($logFile),
            'mimeType' => 'text/plain',
        ]);
    }

    public function actionDownloadAll(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $this->requirePermission('utility:timber-logs');

        $currentUser = static::currentUser();

        if (!$currentUser || !$currentUser->can('timber-download')) {
            throw new ForbiddenHttpException(Craft::t('timber', 'User not authorized to download log.'));
        }

        $files = LogFiles::visible($currentUser);
        if ($files === []) {
            throw new BadRequestHttpException(Craft::t('timber', 'No log files are available to download.'));
        }

        $totalBytes = array_sum(array_column($files, 'size'));

        if (count($files) > self::MAX_DOWNLOAD_FILES || $totalBytes > self::MAX_DOWNLOAD_BYTES) {
            throw new BadRequestHttpException(Craft::t('timber', 'The selected logs are too large to download together. Download individual files instead.'));
        }

        $zipPath = Craft::$app->getPath()->getTempPath() . '/' . StringHelper::UUID() . '.zip';
        $zip = new ZipArchive();
        $zipOpened = false;

        try {
            if ($zip->open($zipPath, ZipArchive::CREATE) !== true) {
                throw new Exception('Cannot create zip at ' . $zipPath);
            }
            $zipOpened = true;

            $archiveNames = [];

            foreach ($files as $file) {
                $basename = basename($file['path']);
                $name = $basename;
                $suffix = 2;

                // Recursive and event-added logs can share a basename. ZIP entries must
                // remain unique, including on case-insensitive extraction filesystems.
                while (isset($archiveNames[strtolower($name)])) {
                    $name = $suffix++ . '-' . $basename;
                }

                $archiveNames[strtolower($name)] = true;

                // Let libzip stream from disk; addFromString() duplicated every log in PHP memory.
                if (!$zip->addFile($file['path'], $name)) {
                    throw new Exception('Cannot add log to zip: ' . basename($file['path']));
                }
            }

            if (!$zip->close()) {
                throw new Exception('Cannot finish zip at ' . $zipPath);
            }
            $zipOpened = false;
        } catch (Throwable $e) {
            if ($zipOpened) {
                $zip->close();
            }
            FileHelper::unlink($zipPath);

            throw $e;
        }

        $response = $this->response->sendFile($zipPath, 'logs.zip');
        $response->on(Response::EVENT_AFTER_SEND, static function() use ($zipPath): void {
            FileHelper::unlink($zipPath);
        });

        return $response;
    }

    public function actionDelete(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $this->requirePermission('utility:timber-logs');

        $logFile = $this->request->getRequiredParam('file');

        if (!LogFiles::isAccessibleLogPath($logFile)) {
            throw new BadRequestHttpException(Craft::t('timber', 'The log file you’re trying to delete does not exist.'));
        }

        $currentUser = static::currentUser();

        if (!$currentUser || !$currentUser->can('timber-delete')) {
            throw new ForbiddenHttpException(Craft::t('timber', 'User not authorized to delete log.'));
        }

        LogFiles::requireView($logFile, $currentUser);

        if (file_exists($logFile) && !FileHelper::unlink($logFile)) {
            $this->response->setStatusCode(500);

            return $this->asJson([
                'success' => false,
                'message' => Craft::t('timber', 'Unable to delete the log file. Check its directory permissions and try again.'),
            ]);
        }

        return $this->asJson(['success' => true]);
    }

    public function actionDeleteAll(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $this->requirePermission('utility:timber-logs');

        $currentUser = static::currentUser();

        if (!$currentUser || !$currentUser->can('timber-delete')) {
            throw new ForbiddenHttpException(Craft::t('timber', 'User not authorized to delete log.'));
        }

        $deleted = [];
        $failed = false;

        foreach (LogFiles::visible($currentUser) as $file) {
            if (file_exists($file['path']) && !FileHelper::unlink($file['path'])) {
                $failed = true;
            } else {
                $deleted[] = $file['path'];
            }
        }

        if ($failed) {
            $this->response->setStatusCode(500);

            return $this->asJson([
                'success' => false,
                'deleted' => $deleted,
                'message' => Craft::t('timber', 'Some log files could not be deleted. Check their directory permissions and try again.'),
            ]);
        }

        return $this->asJson(['success' => true]);
    }
}
