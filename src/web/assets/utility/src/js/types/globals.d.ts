// Craft/Garnish/jQuery are provided globally by the Craft control panel.
declare const Craft: any;
declare const Garnish: any;
declare const $: any;

interface Window {
    Craft: any;
    Garnish: any;
}

declare module 'lodash-es' {
    export function debounce<T extends (...args: never[]) => unknown>(
        func: T,
        wait?: number,
    ): T & { cancel(): void };
    export function get(object: unknown, path: string, defaultValue?: unknown): unknown;
}
