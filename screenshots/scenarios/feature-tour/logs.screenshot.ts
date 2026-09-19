import { defineScreenshotScenario } from '@verbb/craft-screenshots/api';

import { seedTimberDocsLogs } from '../../support/fixtures';
import { createTimberCaptureFrameStep } from '../../support/presets';

const viewport = {
    width: 1100,
    height: 655,
    deviceScaleFactor: 2,
};

export default defineScreenshotScenario({
    id: 'timber-feature-tour-logs',
    output: 'feature-tour/timber.png',
    route: '/admin/utilities/timber-logs',
    viewport,
    expectedOutput: {
        width: 2199,
        height: 1309,
    },
    setup: seedTimberDocsLogs,
    waitFor: [
        { type: 'selector', selector: '.timber-table .ti-file-item', state: 'visible' },
    ],
    preSteps: [
        { type: 'click', selector: '.timber-table .ti-file-item' },
        { type: 'click', selector: '.tippy-box .timber-menu-file a[role="option"]:has-text("web-2023-02-21.log")' },
        { type: 'wait', waitFor: { type: 'selector', selector: '.timber-table .ti-tbody-row', state: 'visible' } },
        createTimberCaptureFrameStep(),
        { type: 'wait', waitFor: { type: 'selector', selector: '#timber-screenshot-frame', state: 'visible' } },
        { type: 'wait', waitFor: { type: 'timeout', ms: 300 } },
    ],
    target: {
        type: 'selector',
        selector: '#timber-screenshot-frame',
        padding: 0,
    },
    caption: 'Timber displaying a populated Craft web log with levels, categories and message search.',
    intent: 'Recreates the production Features-page overview at its original 2199×1309 dimensions using the current Craft 5 interface.',
});
