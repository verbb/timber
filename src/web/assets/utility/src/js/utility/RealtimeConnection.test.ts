import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { RealtimeConnection } from './RealtimeConnection.js';

class FakeSocket {
    static instances: FakeSocket[] = [];
    onmessage?: (event: { data: string }) => void;
    onclose?: () => void;
    onerror?: () => void;
    send = vi.fn();
    close = vi.fn(() => this.onclose?.());
    constructor(readonly url: string) { FakeSocket.instances.push(this); }
    receive(data: string): void { this.onmessage?.({ data }); }
}

beforeEach(() => {
    vi.useFakeTimers();
    FakeSocket.instances = [];
    vi.stubGlobal('WebSocket', FakeSocket);
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

it('accepts the PHP server protocol and only forwards valid file invalidations', () => {
    const update = vi.fn();
    const connection = new RealtimeConnection(8085, update);
    const socket = FakeSocket.instances[0];
    expect(socket.url).toBe('ws://localhost:8085/socket.io/?EIO=3&transport=websocket');
    socket.receive('0{"sid":"test","pingInterval":25000,"pingTimeout":5000}');
    socket.receive('40');
    socket.receive('42["logUpdate",{"file":"/logs/web.log","data":["untrusted body"]}]');
    socket.receive('42["other",{"file":"/logs/other.log"}]');
    socket.receive('42["logUpdate",null]');
    socket.receive('42not-json');
    expect(update).toHaveBeenCalledExactlyOnceWith('/logs/web.log');
    vi.advanceTimersByTime(25000);
    expect(socket.send).toHaveBeenCalledExactlyOnceWith('2');
    socket.receive('3');
    vi.advanceTimersByTime(25000);
    expect(socket.send).toHaveBeenCalledTimes(2);
    connection.disconnect();
    expect(vi.getTimerCount()).toBe(0);
});

it('reconnects after missed heartbeats and stops retrying after destruction', () => {
    const connection = new RealtimeConnection(8085, vi.fn());
    FakeSocket.instances[0].receive('0{"sid":"test","pingInterval":100,"pingTimeout":50}');
    vi.advanceTimersByTime(1150);
    expect(FakeSocket.instances).toHaveLength(2);
    connection.disconnect();
    vi.advanceTimersByTime(100000);
    expect(FakeSocket.instances).toHaveLength(2);
    expect(vi.getTimerCount()).toBe(0);
});

it('bounds retries when the listener is unavailable', () => {
    const connection = new RealtimeConnection(8085, vi.fn());
    vi.advanceTimersByTime(100000);
    expect(FakeSocket.instances).toHaveLength(4);
    expect(vi.getTimerCount()).toBe(0);
    connection.disconnect();
});
