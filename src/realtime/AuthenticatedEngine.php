<?php
namespace verbb\timber\realtime;

use verbb\timber\helpers\RealtimeToken;

use PHPSocketIO\Engine\Engine;

class AuthenticatedEngine extends Engine
{
    public function checkRequest($req, $res, $fn)
    {
        $token = is_string($req->_query['token'] ?? null) ? $req->_query['token'] : '';
        $origin = is_string($req->headers['origin'] ?? null) ? $req->headers['origin'] : '';

        if (!RealtimeToken::validate($token, $origin)) {
            return $fn(self::ERROR_BAD_REQUEST, false, $req, $res);
        }

        return parent::checkRequest($req, $res, $fn);
    }
}
