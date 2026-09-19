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

const bindSearchInput = (utility: TimberUtility) => {
    const input = Object.assign(new EventTarget(), { value: '' });
    Object.assign(utility, {
        searchInput: input, levelMenu: new EventTarget(), categoryMenu: new EventTarget(),
        fileCombobox: new EventTarget(),
    });
    utility['bindEvents']();
    return input;
};

it('loads cleared search only once when the input emits both clear and input events', async () => {
    vi.useFakeTimers();
    const { utility, request } = makeUtility({ logs: [{ message: 'Result' }] });
    Object.assign(utility, { search: 'old term', searchText: 'old term' });
    const input = bindSearchInput(utility);
    input.dispatchEvent(new Event('pk-clear'));
    input.dispatchEvent(new Event('input'));
    await vi.advanceTimersByTimeAsync(1000);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request.mock.lastCall?.[2].data.search).toBe('');
});

it('loads changed search text without repeating unchanged input requests', async () => {
    vi.useFakeTimers();
    const { utility, request } = makeUtility({ logs: [{ message: 'Result' }] });
    const input = bindSearchInput(utility);
    input.value = 'new term';
    input.dispatchEvent(new Event('input'));
    await vi.advanceTimersByTimeAsync(1000);
    expect(request.mock.lastCall?.[2].data.search).toBe('new term');
    input.dispatchEvent(new Event('input'));
    await vi.advanceTimersByTimeAsync(1000);
    expect(request).toHaveBeenCalledTimes(1);
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
        const { utility, request } = makeUtility({ success: true, deleted: ['/logs/raw.log'] });
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
        const { utility, request } = makeUtility({ success: true, deleted: ['/logs/raw.log'] });
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
        const { utility, request } = makeUtility({ success: true, deleted: ['/logs/raw.log'] });
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
    const { utility, request } = makeUtility({ success: true, deleted: ['/logs/other.log'] });
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

it.each(['/logs/raw.log', '/logs/removed.log'])('reconciles partial bulk deletion while selecting %s', async (selected) => {
    const { utility, request } = makeUtility({});
    vi.stubGlobal('confirm', () => true);
    Object.assign(Craft, { t: (_category: string, text: string) => text });
    Object.assign(utility, { logFile: selected, proxyLogFiles: [
        { path: '/logs/raw.log', size: 10, id: 'raw', deletable: true },
        { path: '/logs/removed.log', size: 10, id: 'removed', deletable: true },
    ] });
    request.mockRejectedValue({ response: { data: {
        success: false, deleted: ['/logs/removed.log'], message: 'Check <directory> permissions.',
    } } });
    await utility['deleteAllLogs']();
    expect(utility['proxyLogFiles'].map((file) => file.path)).toEqual(['/logs/raw.log']);
    expect(utility['logFile']).toBe(selected === '/logs/removed.log' ? null : selected);
    expect(utility['error']).toBe(true);
    expect(utility['errorMessage']).toBe('Check &lt;directory&gt; permissions.');
});

it('shows an actionable read failure and recovers when refresh succeeds', async () => {
    const { utility, request } = makeUtility({ logs: [{ message: 'Restored content' }], info: {} });
    request.mockRejectedValueOnce({ response: { data: { message: 'Check <file> permissions.' } } });
    await utility['fetchLog']();
    expect(utility['error']).toBe(true);
    expect(utility['errorMessage']).toBe('Check &lt;file&gt; permissions.');
    expect(utility['loading']).toBe(false);
    await utility['fetchLog']();
    expect(utility['error']).toBe(false);
    expect(utility['logs']).toEqual([{ message: 'Restored content' }]);
});

describe.each(['levels', 'categories'] as const)('%s selections across searches', (type) => {
    const prepare = (selected: string[]) => {
        const result = makeUtility({ logs: [], info: {} });
        Object.assign(Craft, { t: (_category: string, text: string) => text, formatNumber: String });
        Object.assign(result.utility, {
            [type]: selected, logInfo: { [type]: { ERROR: 1, WARNING: 1 } },
            syncFilterMenuSelections: vi.fn(), debouncedFetch: vi.fn(),
        });
        return result;
    };

    it('does not select an unchecked value when a hidden selection makes counts equal', async () => {
        const { utility, request } = prepare(['INFO']);
        utility['toggleFilterOption'](type, 'ERROR');
        expect(utility['filterSelectText'](type)).toBe('Select all');
        await utility['fetchLog']();
        expect(request.mock.lastCall?.[2].data[type]).toEqual(['INFO', 'ERROR']);
    });

    it('selects all visible values when equally many hidden values were selected', async () => {
        const { utility, request } = prepare(['INFO', 'DEBUG']);
        expect(utility['filterSelectText'](type)).toBe('Select all');
        utility['filterSelectAll'](type);
        expect(request.mock.lastCall?.[2].data[type]).toBeNull();
    });

    it('deselects all when every visible value and a hidden value are selected', () => {
        const { utility, request } = prepare(['INFO', 'ERROR', 'WARNING']);
        expect(utility['filterSelectText'](type)).toBe('Deselect all');
        utility['filterSelectAll'](type);
        expect(request.mock.lastCall?.[2].data[type]).toEqual([]);
    });
});
