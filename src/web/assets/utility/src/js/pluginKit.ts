import '@verbb/plugin-kit-web/plugin-kit.css';

// Named deep imports — importing a component module runs its `@customElement`
// registration side effect. Referencing the classes from the registrar keeps the
// decorator modules from being tree-shaken.
import { PkButton } from '@verbb/plugin-kit-web/components/button/pk-button.js';
import { PkCombobox } from '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import { PkDropdownItem } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import { PkDropdownLabel } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js';
import { PkDropdownMenu } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import { PkDropdownSeparator } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
import { PkIcon } from '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { PkInput } from '@verbb/plugin-kit-web/components/input/pk-input.js';
import { PkOption } from '@verbb/plugin-kit-web/components/select/pk-option.js';
import { PkSpinner } from '@verbb/plugin-kit-web/components/spinner/pk-spinner.js';

// Opt-in glyphs for `<pk-icon icon="…">`.
import {
    check,
    chevronDown,
    circle,
    download,
    ellipsis,
    gear,
    registerIcons,
    search,
    trash,
    triangleExclamation,
    xmark,
} from '@verbb/plugin-kit-icons';

import { circleInfo, timberRefresh } from './icons.js';
import { TIMBER_PK_COMPONENTS } from './timberPkComponents.js';

registerIcons({
    check,
    chevronDown,
    circle,
    circleInfo,
    download,
    ellipsis,
    gear,
    search,
    trash,
    triangleExclamation,
    timberRefresh,
    xmark,
});

/** Constructors whose modules run `@customElement` — must stay reachable so Rollup can't DCE them. */
const TIMBER_PK_CTORS = [
    PkButton,
    PkCombobox,
    PkDropdownItem,
    PkDropdownLabel,
    PkDropdownMenu,
    PkDropdownSeparator,
    PkIcon,
    PkInput,
    PkOption,
    PkSpinner,
] as const;

let registered = false;

/** Entry hook for the plugin-kit-register bundle. */
export async function registerTimberPluginKit(): Promise<void> {
    if (registered) {
        return;
    }

    for (const Ctor of TIMBER_PK_CTORS) {
        if (typeof Ctor !== 'function') {
            throw new Error('Timber Plugin Kit constructor missing from bundle');
        }
    }

    await Promise.all(TIMBER_PK_COMPONENTS.map((tag) => customElements.whenDefined(tag)));
    registered = true;
}
