import { defineScreenshotScenario } from '@verbb/docs-screenshots/api';
import { seedTimberDocsFixture } from '../.screenshots/timber/fixtures';
import {
    createTimberCleanupStep,
    createTimberLogsSquareCropStep,
} from '../.screenshots/timber/presets';

let utilityRoute = '/admin/utilities/timber-logs';

export default defineScreenshotScenario({
    id: 'feature-tour-logs',
    output: '_screenshots/feature-tour/logs.png',
    route: () => utilityRoute,
    viewport: {
        width: 920,
        height: 820,
        deviceScaleFactor: 2,
    },
    async setup(context) {
        const fixture = await seedTimberDocsFixture(context);
        utilityRoute = fixture.utilityRoute;
    },
    waitFor: [
        { type: 'selector', selector: '#timber-docs-screenshot-stage', state: 'visible', timeout: 30000 },
    ],
    preSteps: [
        createTimberCleanupStep(),
        // Combobox does not auto-select — pick seeded web.log then wait for rows.
        {
            type: 'evaluate',
            expression: `
                (() => {
                    const combo = document.querySelector('pk-combobox.ti-file-combobox');
                    if (!(combo instanceof HTMLElement)) {
                        throw new Error('Timber file combobox not found.');
                    }

                    const options = Array.from(combo.querySelectorAll('pk-option'));
                    const match = options.find((el) => {
                        const value = el.value || el.getAttribute('value') || '';
                        return /web\\.log$/.test(value);
                    });

                    if (!(match instanceof HTMLElement)) {
                        const available = options.map((el) => el.value || el.getAttribute('value') || '').join(', ');
                        throw new Error('Seeded web.log option not found. Available: ' + available);
                    }

                    const value = match.value || match.getAttribute('value') || '';
                    combo.value = value;
                    combo.dispatchEvent(new CustomEvent('pk-change', { detail: { value }, bubbles: true }));
                    combo.dispatchEvent(new CustomEvent('pk-after-hide', { bubbles: true }));
                })();
            `,
        },
        {
            type: 'wait',
            waitFor: {
                type: 'selector',
                selector: 'table.ti-table tbody.ti-tbody .ti-tbody-row',
                state: 'visible',
                timeout: 30000,
            },
        },
        createTimberLogsSquareCropStep({ maxWidth: 920 }),
        { type: 'wait', waitFor: { type: 'timeout', ms: 200 } },
    ],
    steps: [],
    target: {
        type: 'selector',
        selector: '#timber-docs-screenshot-stage',
        padding: 0,
    },
    caption: 'Timber Logs utility with level filters and paginated entries.',
    intent: 'Show the log viewer utility with filterable, paginated log rows.',
});
