import { defineScreenshotScenario } from '@verbb/craft-screenshots/api';

import { seedTimberDocsLogs } from '../../support/fixtures';
import { createTimberCaptureFrameStep } from '../../support/presets';

const viewport = {
    width: 1100,
    height: 655,
    deviceScaleFactor: 2,
};

export default defineScreenshotScenario({
    id: 'timber-feature-tour-log-filters',
    output: 'feature-tour/timber-filter.png',
    route: '/admin/utilities/timber-logs',
    viewport,
    expectedOutput: {
        width: 1145,
        height: 697,
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
        { type: 'click', selector: '#timber-screenshot-frame .ti-dropdown-level' },
        { type: 'wait', waitFor: { type: 'selector', selector: '.tippy-box .timber-menu-level', state: 'visible' } },
        { type: 'wait', waitFor: { type: 'timeout', ms: 300 } },
    ],
    target: {
        type: 'clip',
        x: 0,
        y: 0,
        width: 573,
        height: 349,
    },
    caption: 'Timber log-level filters with the current log visible behind the menu.',
    intent: 'Recreates the production Features-page filter detail at its original 1145×697 dimensions using the current Craft 5 interface.',
});
