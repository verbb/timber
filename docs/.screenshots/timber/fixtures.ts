import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { ScreenshotSetupContext } from '@verbb/docs-screenshots/types';

export type TimberDocsFixture = {
    utilityRoute: string;
    logFile: string;
    logPath: string;
};

const fixtureDir = dirname(fileURLToPath(import.meta.url));
const seedScript = readFileSync(join(fixtureDir, 'seed-docs-logs.php'), 'utf8');

/**
 * Seed a few sample log files into Craft's storage/logs so the Logs utility has content
 * to render. Returns the utility route to capture.
 */
export async function seedTimberDocsFixture(context: ScreenshotSetupContext): Promise<TimberDocsFixture> {
    const output = await context.runCraftScript(seedScript, { label: 'seed-timber-docs-logs' });
    const fixture = JSON.parse(output.trim()) as TimberDocsFixture;

    if (!fixture.utilityRoute) {
        throw new Error(`Invalid Timber docs fixture payload: ${output}`);
    }

    return fixture;
}
