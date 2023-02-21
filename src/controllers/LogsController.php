<?php
namespace verbb\timber\controllers;

use verbb\timber\Timber;

use Craft;
use craft\helpers\App;
use craft\helpers\FileHelper;
use craft\helpers\StringHelper;
use craft\web\Controller;

use yii\base\Exception;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\Response;

use ZipArchive;

class LogsController extends Controller
{
    // Public Methods
    // =========================================================================

    public function actionIndex(): ?Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();

        $logFile = $this->request->getRequiredParam('file');
        $orderBy = $this->request->getParam('orderBy');
        $limit = $this->request->getParam('limit');
        $page = $this->request->getParam('page', 0);
        $search = $this->request->getParam('search');
        $levels = $this->request->getParam('levels');
        $categories = $this->request->getParam('categories');

        if (!str_ends_with($logFile, '.log')) {
            return $this->asFailure(Craft::t('timber', 'Invalid file.'));
        }

        $supportsLevel = true;
        $supportsCategory = true;

        $logQuery = Timber::$plugin->getService()->getLogs($logFile);
        $logQuery->orderBy($orderBy);

        if ($search) {
            $logQuery->andFilterWhere(['like', 'message', $search]);
        }

        // Generate file info for levels, categories and more
        $logInfo = [
            'levels' => [],
            'categories' => [],
        ];

        // Fetch all logs for a search string here. This allows us to get the full set of logs
        // before adding in filtering options like levels and pagination. We need the full set of
        // data to get the info for the entire data set
        foreach ($logQuery->all() as $log) {
            $level = $log['level'] ?? null;
            $supportsLevel = (bool)$level;

            if ($level) {
                if (!isset($logInfo['levels'][$level])) {
                    $logInfo['levels'][$level] = 0;
                }

                $logInfo['levels'][$level] += 1;
            }

            $category = $log['category'] ?? null;
            $supportsCategory = (bool)$category;

            if ($category) {
                if (!isset($logInfo['categories'][$category])) {
                    $logInfo['categories'][$category] = 0;
                }

                $logInfo['categories'][$category] += 1;
            }
        }

        ksort($logInfo['levels']);
        ksort($logInfo['categories']);

        // Always filter, as even empty arrays will search all
        if ($supportsLevel) {
            $logQuery->andFilterWhere(['in', 'level', $levels]);
        }

        if ($supportsCategory) {
            $logQuery->andFilterWhere(['in', 'category', $categories]);
        }

        // Save here before paginating
        $totalCount = $logQuery->count();

        // Paginate now we've saved all we need for other bits
        $offset = $page * $limit;
        $logQuery->limit($limit)->offset($offset);

        $logs = $logQuery->all();

        return $this->asJson([
            'logs' => $logs,
            'info' => $logInfo,
            'supportsLevel' => $supportsLevel,
            'supportsCategory' => $supportsCategory,
            'pagination' => [
                'page' => $page,
                'count' => count($logs),
                'totalCount' => $totalCount,
                'min' => $offset + 1,
                'max' => min($totalCount, $offset + $limit),
            ],
        ]);
    }

    public function actionDownload(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();

        $logFile = $this->request->getRequiredParam('file');

        if (!$logFile) {
            throw new BadRequestHttpException(Craft::t('timber', 'The log file you’re trying to download does not exist.'));
        }

        $currentUser = static::currentUser();

        if (!$currentUser || !$currentUser->can('timber-download')) {
            throw new ForbiddenHttpException(Craft::t('timber', 'User not authorized to download log.'));
        }

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

        $currentUser = static::currentUser();

        if (!$currentUser || !$currentUser->can('timber-download')) {
            throw new ForbiddenHttpException(Craft::t('timber', 'User not authorized to download log.'));
        }

        $zipPath = Craft::$app->getPath()->getTempPath() . '/' . StringHelper::UUID() . '.zip';
        $zip = new ZipArchive();

        if ($zip->open($zipPath, ZipArchive::CREATE) !== true) {
            throw new Exception('Cannot create zip at ' . $zipPath);
        }

        App::maxPowerCaptain();

        $logFiles = FileHelper::findFiles(Craft::getAlias('@storage/logs'), [
            'only' => ['*.log'],
        ]);

        foreach ($logFiles as $logFile) {
            $file = @fopen($logFile, 'rb');

            $zip->addFromString(basename($logFile), stream_get_contents($file));
        }

        $zip->close();

        return $this->response->sendFile($zipPath, 'logs.zip');
    }

    public function actionDelete(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();

        $logFile = $this->request->getRequiredParam('file');

        if (!$logFile) {
            throw new BadRequestHttpException(Craft::t('timber', 'The log file you’re trying to delete does not exist.'));
        }

        $currentUser = static::currentUser();

        if (!$currentUser || !$currentUser->can('timber-delete')) {
            throw new ForbiddenHttpException(Craft::t('timber', 'User not authorized to delete log.'));
        }

        if (file_exists($logFile)) {
            FileHelper::unlink($logFile);
        }

        return $this->asJson(['success' => true]);
    }

    public function actionDeleteAll(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();

        $currentUser = static::currentUser();

        if (!$currentUser || !$currentUser->can('timber-delete')) {
            throw new ForbiddenHttpException(Craft::t('timber', 'User not authorized to delete log.'));
        }

        $logs = Craft::getAlias('@storage/logs');

        FileHelper::clearDirectory($logs);

        return $this->asJson(['success' => true]);
    }
}
