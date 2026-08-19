import '../css/timber.css';

import { allDefined } from '@verbb/plugin-kit-web/plugin-kit';

import { TIMBER_PK_COMPONENTS } from './timberPkComponents.js';
import { TimberUtility } from './utility/TimberUtility';

const UTILITY_SELECTOR = '[data-timber-auto-mount], .timber-utility-app';

const mounted = new WeakSet<Element>();

const mount = (root: Element): void => {
    if (!(root instanceof HTMLElement) || mounted.has(root)) {
        return;
    }

    new TimberUtility(root).init();
    mounted.add(root);
};

const mountAll = (scope: ParentNode = document): void => {
    if (scope instanceof HTMLElement && scope.matches(UTILITY_SELECTOR)) {
        mount(scope);
    }

    scope.querySelectorAll(UTILITY_SELECTOR).forEach(mount);
};

Craft.Timber = Craft.Timber || {};
Craft.Timber.mountAll = mountAll;

const pkMatch = (tag: string): boolean => tag.startsWith('pk-');

const bootstrap = async (): Promise<void> => {
    await allDefined({ match: pkMatch, additionalElements: [...TIMBER_PK_COMPONENTS] });

    Craft.Timber.mountAll();
};

void bootstrap();
