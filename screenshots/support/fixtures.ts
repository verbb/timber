import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { ScreenshotSetupContext } from '@verbb/craft-screenshots/types';

const supportDir = dirname(fileURLToPath(import.meta.url));
const seedScript = readFileSync(join(supportDir, 'seed', 'seed-docs-logs.php'), 'utf8');

/** Seed the deterministic Craft log shared by Timber's overview and filter captures. */
export async function seedTimberDocsLogs(context: ScreenshotSetupContext): Promise<void> {
    const output = await context.runCraftScript(seedScript, { label: 'seed-timber-docs-logs' });
    const fixture = JSON.parse(output.trim()) as { path?: string; entries?: number; bytes?: number };

    if (!fixture.path || fixture.entries !== 10799 || fixture.bytes !== 18486395) {
        throw new Error(`Invalid Timber docs fixture payload: ${output}`);
    }
}
