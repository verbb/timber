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

afterEach(() => vi.unstubAllGlobals());

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
