import { defineScreenshotScenario } from '@verbb/docs-screenshots/api';
import { seedTimberDocsFixture } from '../.screenshots/timber/fixtures';
import { createTimberCleanupStep } from '../.screenshots/timber/presets';

// Starter scenario — seeds sample log files and captures the Timber Logs utility. Retarget
// the selector at the virtualised log table once the Phase 1 UI is built out.
let utilityRoute = '/admin/utilities/timber-logs';

export default defineScreenshotScenario({
    id: 'feature-tour-logs',
    output: '_screenshots/feature-tour/logs.png',
    route: () => utilityRoute,
    viewport: {
        width: 1320,
        height: 820,
        deviceScaleFactor: 2,
    },
    async setup(context) {
        const fixture = await seedTimberDocsFixture(context);
        utilityRoute = fixture.utilityRoute;
    },
    waitFor: [
        { type: 'selector', selector: '#content', state: 'visible' },
    ],
    preSteps: [
        createTimberCleanupStep(),
    ],
    steps: [],
    target: {
        type: 'selector',
        selector: '#content',
        padding: 20,
    },
    caption: 'The Timber Logs utility.',
    intent: 'Show the log viewer utility with filterable, virtualised log rows.',
});
