import type {
    ScreenshotStep,
    ScreenshotTarget,
    ScreenshotViewport,
} from '@verbb/docs-screenshots/types';
import {
    createCpDetailViewPreset as createBaseCpDetailViewPreset,
    createCpFocusedRegionPreset as createBaseCpFocusedRegionPreset,
    createCpFullScreenPreset as createBaseCpFullScreenPreset,
    createCpModalPreset as createBaseCpModalPreset,
} from '@verbb/docs-screenshots/presets';

// Plugin-local preset layer. Generic capture math lives in @verbb/docs-screenshots;
// this file only adds Timber-specific CP chrome cleanup + framing steps. As the Phase 1
// virtualised log table lands, add promo-crop steps here (model on Hyper's presets.ts).

type CpPresetOptions = {
    selector?: string;
    viewport?: ScreenshotViewport;
    padding?: NonNullable<Extract<ScreenshotTarget, { type: 'selector' }>['padding']>;
    hidePlaceholder?: boolean;
};

/** Craft CP page wash — use when the shot should read as in-CP, not a cutout. */
export const TIMBER_CP_GRAY = '#f3f7fc';

const scrollResetSelectors = [
    'html',
    'body',
    '#content-container',
    '#main-content',
    '#content',
    '.content-pane',
];

function buildCleanupCss({ hidePlaceholder = true }: { hidePlaceholder?: boolean }): string {
    const rules = [
        'craft-global-sidebar, footer#global-footer { display: none !important; }',
        'craft-global-sidebar { width: 0 !important; min-width: 0 !important; flex: 0 0 0 !important; }',
        '#global-header * { display: none !important; }',
        '#details-container { position: static !important; }',
        'body.fixed-header #header { position: static !important; top: auto !important; }',
        'body.fixed-header #content-container { padding-top: 0 !important; }',
        '#content-container, #main-content, #content { max-width: none !important; }',
        '#content-container { padding: 24px !important; }',
        '#main-content { padding-top: 0 !important; }',
        '#page-container, #content-container, #main-content, #content, .content-pane { left: 0 !important; margin-left: 0 !important; }',
        'html, body, * { scrollbar-width: none !important; -ms-overflow-style: none !important; }',
        'html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }',
    ];

    if (hidePlaceholder) {
        rules.push('.cp-placeholder, .placeholder { display: none !important; }');
    }

    return rules.join('\n');
}

/** Strip Craft chrome (global sidebar/header/footer, scrollbars) for focused utility crops. */
export function createTimberCleanupStep({ hidePlaceholder = true }: { hidePlaceholder?: boolean } = {}): ScreenshotStep {
    const css = buildCleanupCss({ hidePlaceholder });

    return {
        type: 'evaluate',
        expression: `
            (() => {
                const styleId = 'timber-docs-screenshot-cleanup';
                let style = document.getElementById(styleId);

                if (!(style instanceof HTMLStyleElement)) {
                    style = document.createElement('style');
                    style.id = styleId;
                    document.head.appendChild(style);
                }

                style.textContent = ${JSON.stringify(css)};

                ${JSON.stringify(scrollResetSelectors)}.forEach((selector) => {
                    document.querySelectorAll(selector).forEach((element) => {
                        if (element instanceof HTMLElement) {
                            element.scrollTop = 0;
                            element.scrollLeft = 0;
                        }
                    });
                });

                window.scrollTo(0, 0);
            })();
        `,
    };
}

/**
 * Fit the log panel to its content, square outer edges, and stage flush so the
 * crop has no CP wash bleeding through soft radii.
 */
export function createTimberLogsSquareCropStep({
    maxWidth = 1120,
}: {
    /** Cap panel width for docs cutouts (default ~200px narrower than full CP). */
    maxWidth?: number;
} = {}): ScreenshotStep {
    return {
        type: 'evaluate',
        expression: `
            (() => {
                document.getElementById('timber-docs-screenshot-stage')?.remove();

                const app = document.querySelector('.timber-utility-app');
                const wrap = document.querySelector('.ti-wrap');
                if (!(app instanceof HTMLElement) || !(wrap instanceof HTMLElement)) {
                    throw new Error('Timber utility / .ti-wrap not found for square crop.');
                }

                const maxWidth = ${maxWidth};

                // Utility defaults to viewport height — collapse so the bbox matches the panel.
                app.style.setProperty('height', 'auto', 'important');
                app.style.setProperty('min-height', '0', 'important');
                app.style.setProperty('margin', '0', 'important');
                wrap.style.setProperty('height', 'auto', 'important');
                wrap.style.setProperty('width', maxWidth + 'px', 'important');
                wrap.style.setProperty('max-width', maxWidth + 'px', 'important');

                const styleId = 'timber-docs-screenshot-square-crop';
                let style = document.getElementById(styleId);
                if (!(style instanceof HTMLStyleElement)) {
                    style = document.createElement('style');
                    style.id = styleId;
                    document.head.appendChild(style);
                }

                // Hard-square the panel shells; keep inner control radii alone.
                style.textContent = [
                    '.ti-wrap, .ti-head, .ti-file, .ti-pagination, .ti-body, .timber-utility-app {',
                    '  border-radius: 0 !important;',
                    '}',
                    '.ti-wrap {',
                    '  overflow: hidden !important;',
                    '  background: #fff !important;',
                    '  box-shadow: none !important;',
                    '  outline: 1px solid rgba(96, 125, 159, 0.25) !important;',
                    '  outline-offset: -1px !important;',
                    '}',
                ].join('\\n');

                const stage = document.createElement('div');
                stage.id = 'timber-docs-screenshot-stage';
                // Match panel fill — never CP gray, or corner antialias will show wash.
                stage.style.cssText = [
                    'position:fixed',
                    'left:0',
                    'top:0',
                    'z-index:2147483640',
                    'background:#ffffff',
                    'padding:0',
                    'margin:0',
                    'box-sizing:border-box',
                    'overflow:hidden',
                    'border-radius:0',
                ].join(';');

                stage.appendChild(wrap);
                document.body.appendChild(stage);

                document.documentElement.style.setProperty('background', '#ffffff', 'important');
                document.body.style.setProperty('background', '#ffffff', 'important');

                Array.from(document.body.children).forEach((child) => {
                    if (child instanceof HTMLElement && child.id !== 'timber-docs-screenshot-stage') {
                        child.style.setProperty('display', 'none', 'important');
                    }
                });

                // Size stage to the laid-out wrap after reparent (next frame).
                return new Promise((resolve) => {
                    requestAnimationFrame(() => {
                        const box = wrap.getBoundingClientRect();
                        stage.style.width = Math.ceil(box.width) + 'px';
                        stage.style.height = Math.ceil(box.height) + 'px';
                        resolve(true);
                    });
                });
            })();
        `,
    };
}

/** Select the seeded log file in the combobox, then wait for rows. */
export function createTimberSelectLogSteps(logPath: string): ScreenshotStep[] {
    const pathJson = JSON.stringify(logPath);

    return [
        {
            type: 'evaluate',
            expression: `
                (() => {
                    const combo = document.querySelector('pk-combobox.ti-file-combobox');
                    if (!(combo instanceof HTMLElement)) {
                        throw new Error('Timber file combobox not found.');
                    }

                    const wanted = ${pathJson};
                    const options = Array.from(combo.querySelectorAll('pk-option'));
                    const match = options.find((el) => {
                        const value = (el).value || el.getAttribute('value') || '';
                        return value === wanted || value.endsWith('/web.log') || value.endsWith('\\\\web.log');
                    });

                    if (!(match instanceof HTMLElement)) {
                        const available = options.map((el) => (el).value || el.getAttribute('value') || '').join(', ');
                        throw new Error('Seeded web.log option not found. Available: ' + available);
                    }

                    const value = (match).value || match.getAttribute('value') || '';
                    (combo).value = value;
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
        { type: 'wait', waitFor: { type: 'timeout', ms: 400 } },
    ];
}

export function createCpFocusedRegionPreset(options: CpPresetOptions = {}) {
    const preset = createBaseCpFocusedRegionPreset(options);

    return {
        ...preset,
        steps: [
            createTimberCleanupStep({ hidePlaceholder: options.hidePlaceholder }),
            ...preset.steps,
        ] satisfies ScreenshotStep[],
    };
}

export function createCpFullScreenPreset(options: CpPresetOptions = {}) {
    const preset = createBaseCpFullScreenPreset(options);

    return {
        ...preset,
        steps: [
            createTimberCleanupStep({ hidePlaceholder: options.hidePlaceholder }),
            ...preset.steps,
        ] satisfies ScreenshotStep[],
    };
}

export function createCpModalPreset(options: CpPresetOptions = {}) {
    return createBaseCpModalPreset(options);
}

export function createCpDetailViewPreset(options: CpPresetOptions = {}) {
    const preset = createBaseCpDetailViewPreset(options);

    return {
        ...preset,
        steps: [
            createTimberCleanupStep({ hidePlaceholder: options.hidePlaceholder }),
            ...preset.steps,
        ] satisfies ScreenshotStep[],
    };
}
