import type { ScreenshotStep } from '@verbb/craft-screenshots/types';

/**
 * Move Timber's hydrated utility into the same fixed canvas used by both
 * captures. Keeping the live node preserves its Vue state and Tippy menus.
 */
export function createTimberCaptureFrameStep(): ScreenshotStep {
    return {
        type: 'evaluate',
        expression: `
            (() => {
                document.getElementById('timber-screenshot-frame')?.remove();

                const utility = document.querySelector('.timber-table');
                if (!(utility instanceof HTMLElement)) {
                    throw new Error('Timber utility was not found.');
                }

                const frame = document.createElement('div');
                frame.id = 'timber-screenshot-frame';
                frame.style.cssText = [
                    'position:fixed',
                    'inset:0 auto auto 0',
                    'width:1100px',
                    'height:655px',
                    'overflow:hidden',
                    'background:#f3f7fc',
                    'z-index:2147483600',
                ].join(';');

                utility.style.width = '1100px';
                utility.style.height = '655px';
                utility.style.margin = '0';
                utility.querySelectorAll('.ti-wrap').forEach((element) => {
                    if (element instanceof HTMLElement) {
                        element.style.height = '655px';
                    }
                });

                frame.appendChild(utility);
                document.body.appendChild(frame);

                document.documentElement.style.background = '#f3f7fc';
                document.body.style.margin = '0';
                document.body.style.overflow = 'hidden';
                window.scrollTo(0, 0);
            })();
        `,
    };
}
