<?php
namespace verbb\timber\realtime;

use PHPSocketIO\SocketIO;

class AuthenticatedSocketIO extends SocketIO
{
    public function attach($srv, $opts = []): static
    {
        $engine = new AuthenticatedEngine();
        $this->eio = $engine->attach($srv, $opts);
        $this->worker = $srv;
        $this->bind($engine);

        return $this;
    }
}
