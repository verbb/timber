<?php
namespace verbb\timber\realtime;

use PHPSocketIO\Socket;
use PHPSocketIO\SocketIO;

class AuthenticatedSocketIO extends SocketIO
{
    // Public Methods
    // =========================================================================

    public function attach($srv, $opts = []): static
    {
        $engine = new AuthenticatedEngine();
        $this->eio = $engine->attach($srv, $opts);
        $this->worker = $srv;
        $this->bind($engine);
        $this->on('connection', [$this, 'joinAuthorizedRooms']);

        return $this;
    }

    public function joinAuthorizedRooms(Socket $socket): void
    {
        foreach (AuthenticatedEngine::logIds($socket->request) as $id) {
            $socket->join($this->_room($id));
        }
    }

    public function emitLogUpdate(array $payload): void
    {
        $id = $payload['id'] ?? null;

        if (!is_string($id) || preg_match('/\A[a-f0-9]{32}\z/D', $id) !== 1) {
            return;
        }

        $this->to($this->_room($id))->emit('logUpdate', ['id' => $id]);
    }


    // Private Methods
    // =========================================================================

    private function _room(string $id): string
    {
        return 'timber-log:' . $id;
    }
}
