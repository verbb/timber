// Plugin Kit web components the Timber utility relies on. The register bundle defines
// these before the app entry queries them, and the app entry `allDefined()`-gates on
// this list so we never touch a `pk-*` element before it has upgraded.
export const TIMBER_PK_COMPONENTS = [
    'pk-icon',
    'pk-button',
    'pk-combobox',
    'pk-input',
    'pk-spinner',
    'pk-dropdown-menu',
    'pk-dropdown-item',
    'pk-dropdown-separator',
    'pk-dropdown-label',
    'pk-option',
] as const;
