import type { ScreenshotSetupContext } from '@verbb/docs-screenshots/types';
import { registerPluginBootstrap } from '@verbb/docs-screenshots/api';

export default registerPluginBootstrap({
    id: 'timber',
    async setup(_context: ScreenshotSetupContext) {
        // Plugin-wide screenshot setup hooks (license, global settings, etc.).
        // Per-scenario data is seeded from `.screenshots/timber/fixtures.ts`.
    },
});
