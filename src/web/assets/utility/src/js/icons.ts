import type { PkIcon } from '@verbb/plugin-kit-icons';

/**
 * App-specific Font Awesome glyphs that are not in Plugin Kit's curated set.
 * They still go through the shared registry, so `<pk-icon>` owns rendering,
 * sizing, colour, and accessibility.
 */
export const circleInfo: PkIcon = {
    width: 512,
    height: 512,
    path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z',
};

/**
 * Heroicons v1 solid `refresh`, supplied from Timber's original UI.
 * Source: https://github.com/tailwindlabs/heroicons/tree/v1.0.6
 * License: MIT.
 */
export const timberRefresh: PkIcon = {
    width: 20,
    height: 20,
    path: 'M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z',
};
