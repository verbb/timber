<?php
namespace verbb\timber\realtime;

use verbb\timber\helpers\LogFiles;
use verbb\timber\helpers\RealtimeToken;

use Craft;
use craft\elements\User;
use craft\enums\CmsEdition;
use craft\services\UserPermissions;

use Throwable;

use PHPSocketIO\Engine\Engine;

class AuthenticatedEngine extends Engine
{
    // Static Methods
    // =========================================================================

    public static function logIds($request): array
    {
        $ids = $request->_query[self::LOG_IDS_QUERY_KEY] ?? [];
        $valid = [];

        if (!is_array($ids)) {
            return [];
        }

        foreach ($ids as $id) {
            if (is_string($id) && preg_match('/\A[a-f0-9]{32}\z/D', $id) === 1) {
                $valid[$id] = $id;
            }
        }

        return array_values($valid);
    }


    // Constants
    // =========================================================================

    private const LOG_IDS_QUERY_KEY = '_timberLogIds';


    // Public Methods
    // =========================================================================

    public function checkRequest($req, $res, $fn)
    {
        $token = is_string($req->_query['token'] ?? null) ? $req->_query['token'] : '';
        $origin = is_string($req->headers['origin'] ?? null) ? $req->headers['origin'] : '';
        $userId = RealtimeToken::getUserId($token, $origin);

        if ($userId === null) {
            return $fn(self::ERROR_BAD_REQUEST, false, $req, $res);
        }

        $authorized = false;

        try {
            $user = User::find()->id($userId)->status(null)->one();

            if ($user && $user->getStatus() === User::STATUS_ACTIVE) {
                $privileged = $user->admin || Craft::$app->edition === CmsEdition::Solo;
                // A fresh service avoids stale permission snapshots in this long-running worker.
                $permissions = $privileged ? [] : (new UserPermissions())->getPermissionsByUserId($userId);
                $permissionLookup = array_fill_keys(array_map('strtolower', $permissions), true);
                $canAccessCp = $privileged || Craft::$app->edition === CmsEdition::Team || isset($permissionLookup['accesscp']);
                $canAccessUtility = !in_array('timber-logs', Craft::$app->getConfig()->getGeneral()->disabledUtilities, true)
                    && ($privileged || isset($permissionLookup['utility:timber-logs']));

                if ($canAccessCp && $canAccessUtility) {
                    $req->_query[self::LOG_IDS_QUERY_KEY] = array_column(
                        LogFiles::visibleForPermissions($user, $permissions, true),
                        'id'
                    );
                    $authorized = true;
                }
            }
        } catch (Throwable) {
            $authorized = false;
        }

        if (!$authorized) {
            return $fn(self::ERROR_BAD_REQUEST, false, $req, $res);
        }

        return parent::checkRequest($req, $res, $fn);
    }
}
