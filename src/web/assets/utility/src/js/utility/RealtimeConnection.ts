/**
 * Timber only consumes invalidations from PHPSocketIO's default namespace. Its server
 * speaks Engine.IO 3 / Socket.IO 4, not the protocols used by socket.io-client 3/4.
 * Use the native WebSocket transport for this small contract without the unmaintained
 * Socket.IO 2 client dependency tree. Log bodies always come from authorised HTTP.
 */
export class RealtimeConnection {
    private socket: WebSocket | null = null;
    private timer: ReturnType<typeof setTimeout> | null = null;
    private pingTimer: ReturnType<typeof setTimeout> | null = null;
    private stopped = false;
    private retries = 0;

    constructor(
        private readonly port: number,
        private readonly token: string,
        private readonly onUpdate: (id: string) => void,
    ) {
        this.connect();
    }

    disconnect(): void {
        this.stopped = true;
        this.clearTimers();
        this.socket?.close();
        this.socket = null;
    }

    private clearTimers(): void {
        if (this.timer !== null) clearTimeout(this.timer);
        if (this.pingTimer !== null) clearTimeout(this.pingTimer);
        this.timer = this.pingTimer = null;
    }

    private connect(): void {
        if (this.stopped) return;

        const token = encodeURIComponent(this.token);
        const socket = new WebSocket(`ws://127.0.0.1:${this.port}/socket.io/?EIO=3&transport=websocket&token=${token}`);
        this.socket = socket;
        let pingInterval = 25000;
        let pingTimeout = 5000;
        let ready = false;

        // A successful TCP connection is not enough: require the Engine.IO handshake.
        this.timer = setTimeout(() => socket.close(), 10000);
        const ping = (): void => {
            if (this.stopped || this.socket !== socket) return;
            socket.send('2');
            this.timer = setTimeout(() => socket.close(), pingTimeout);
        };

        socket.onmessage = (event) => {
            if (this.stopped || this.socket !== socket || typeof event.data !== 'string') return;
            const packet = event.data;

            try {
                if (packet.startsWith('0') && !ready) {
                    const handshake = JSON.parse(packet.slice(1));
                    if (!handshake || typeof handshake.sid !== 'string'
                        || !Number.isFinite(handshake.pingInterval) || handshake.pingInterval <= 0
                        || !Number.isFinite(handshake.pingTimeout) || handshake.pingTimeout <= 0) {
                        socket.close();
                        return;
                    }
                    this.clearTimers();
                    ready = true;
                    this.retries = 0;
                    pingInterval = handshake.pingInterval;
                    pingTimeout = handshake.pingTimeout;
                    this.pingTimer = setTimeout(ping, pingInterval);
                } else if (packet === '3' && ready) {
                    this.clearTimers();
                    this.pingTimer = setTimeout(ping, pingInterval);
                } else if (packet.startsWith('42') && ready) {
                    const payload = JSON.parse(packet.slice(2));
                    if (Array.isArray(payload) && payload[0] === 'logUpdate'
                        && payload[1] && typeof payload[1].id === 'string') {
                        this.onUpdate(payload[1].id);
                    }
                } else if (packet === '1' || packet === '41') {
                    socket.close();
                }
            } catch {
                // A malformed notification must not interrupt ordinary log viewing.
            }
        };

        socket.onerror = () => socket.close();
        socket.onclose = () => {
            if (this.socket !== socket) return;
            this.clearTimers();
            this.socket = null;
            if (!this.stopped && this.retries < 3) {
                this.retries += 1;
                this.timer = setTimeout(() => this.connect(), Math.min(this.retries * 1000, 5000));
            }
        };
    }
}
