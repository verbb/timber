import { afterEach, describe, expect, it, vi } from 'vitest';
import { TimberUtility } from './TimberUtility.js';

const makeUtility = (response: Record<string, unknown>) => {
    const request = vi.fn().mockResolvedValue({ data: response });
    vi.stubGlobal('Craft', { sendActionRequest: request });
    const utility = new TimberUtility({ getAttribute: () => null } as unknown as HTMLElement);
    Object.assign(utility, {
        renderBody: vi.fn(), syncFileTrigger: vi.fn(), rebuildFileOptions: vi.fn(),
        syncFilterVisibility: vi.fn(), scheduleFilterMenuRebuild: vi.fn(),
        logFile: '/logs/raw.log',
    });
    return { utility, request };
};

afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
});

describe('Log filter requests', () => {
    it('keeps missing level and category filters unrestricted after the first raw-log load', async () => {
        const { utility, request } = makeUtility({ logs: [{ message: 'Raw message' }], info: {}, supportsLevel: false, supportsCategory: false });
        await utility['fetchLog']();
        await utility['fetchLog']();
        expect(request.mock.lastCall?.[2].data).toMatchObject({ levels: null, categories: null });
    });

    it('keeps all selected facets unrestricted so raw entries and new levels remain visible', async () => {
        const { utility, request } = makeUtility({ logs: [{ message: 'Message' }], info: { levels: { INFO: 1 }, categories: { app: 1 } }, supportsLevel: true, supportsCategory: true });
        await utility['fetchLog']();
        await utility['fetchLog']();
        expect(request.mock.lastCall?.[2].data).toMatchObject({ levels: null, categories: null });
    });

    it('clears file-specific filter selections when changing logs', async () => {
        const { utility, request } = makeUtility({ logs: [], info: {} });
        Object.assign(utility, { levels: ['ERROR'], categories: ['old'] });
        utility['selectLog']('/logs/new.log');
        expect(request.mock.lastCall?.[2].data).toMatchObject({ file: '/logs/new.log', levels: null, categories: null });
    });

    it('preserves an explicit empty selection instead of using a real category as a sentinel', async () => {
        const { utility, request } = makeUtility({ logs: [], info: {} });
        Object.assign(utility, { levels: [], categories: [], supportsLevel: true, supportsCategory: true });
        await utility['fetchLog']();
        expect(request.mock.lastCall?.[2].data).toMatchObject({ levels: [], categories: [] });
    });
});

it('preserves chosen facets through a search with no matching entries', async () => {
    const { utility, request } = makeUtility({ logs: [], info: {}, supportsLevel: false, supportsCategory: false });
    Object.assign(utility, { levels: ['ERROR'], categories: ['app'] });
    await utility['fetchLog']();
    await utility['fetchLog']();
    expect(request.mock.lastCall?.[2].data).toMatchObject({ levels: ['ERROR'], categories: ['app'] });
});

describe.each(['single', 'all'])('%s log deletion', (mode) => {
    const deleteLogs = (utility: TimberUtility) => mode === 'single'
        ? utility['deleteLog']('/logs/raw.log')
        : utility['deleteAllLogs']();

    it('clears the loading state and ignores a late failed read after deletion succeeds', async () => {
        const { utility, request } = makeUtility({ success: true });
        vi.stubGlobal('confirm', () => true);
        Object.assign(Craft, { t: (_category: string, text: string) => text });
        let rejectRead!: (reason: Error) => void;
        request.mockImplementationOnce(() => new Promise((_resolve, reject) => { rejectRead = reject; }));
        const read = utility['fetchLog']();

        await deleteLogs(utility);
        expect(utility['logFile']).toBeNull();
        expect(utility['loading']).toBe(false);
        rejectRead(new Error('The deleted file is unavailable'));
        await read;
        expect(utility['error']).toBe(false);
        expect(utility['logs']).toEqual([]);
    });

    it('recovers from an earlier read error and cancels pending filter requests', async () => {
        vi.useFakeTimers();
        const { utility, request } = makeUtility({ success: true });
        vi.stubGlobal('confirm', () => true);
        Object.assign(Craft, { t: (_category: string, text: string) => text });
        Object.assign(utility, { error: true, errorMessage: 'Earlier failure' });
        utility['debouncedFetch']();

        await deleteLogs(utility);
        await vi.runAllTimersAsync();
        expect(utility['error']).toBe(false);
        expect(utility['errorMessage']).toBe('');
        expect(request).toHaveBeenCalledTimes(1);
    });

    it('discards a successful read that arrives after deletion', async () => {
        const { utility, request } = makeUtility({ success: true });
        vi.stubGlobal('confirm', () => true);
        Object.assign(Craft, { t: (_category: string, text: string) => text });
        let resolveRead!: (value: unknown) => void;
        request.mockImplementationOnce(() => new Promise((resolve) => { resolveRead = resolve; }));
        const read = utility['fetchLog']();
        await deleteLogs(utility);
        resolveRead({ data: { logs: [{ message: 'Deleted content' }] } });
        await read;
        expect(utility['logs']).toEqual([]);
        expect(utility['logFile']).toBeNull();
    });

    it('retains the selected file when deletion fails', async () => {
        const { utility } = makeUtility({ success: false });
        vi.stubGlobal('confirm', () => true);
        Object.assign(Craft, { t: (_category: string, text: string) => text });
        await deleteLogs(utility);
        expect(utility['logFile']).toBe('/logs/raw.log');
        expect(utility['error']).toBe(true);
    });
});

it('keeps the selected log request active when a different file is deleted', async () => {
    const { utility, request } = makeUtility({ success: true });
    vi.stubGlobal('confirm', () => true);
    Object.assign(Craft, { t: (_category: string, text: string) => text });
    let resolveRead!: (value: unknown) => void;
    request.mockImplementationOnce(() => new Promise((resolve) => { resolveRead = resolve; }));
    const read = utility['fetchLog']();
    await utility['deleteLog']('/logs/other.log');
    resolveRead({ data: { logs: [{ message: 'Selected file remains readable' }] } });
    await read;
    expect(utility['logFile']).toBe('/logs/raw.log');
    expect(utility['logs']).toEqual([{ message: 'Selected file remains readable' }]);
});
