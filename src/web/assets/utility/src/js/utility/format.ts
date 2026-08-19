import type { TimberLogEntry } from './types.js';

/** Shallow JSON clone — same as BEFORE `utils/object.clone` (filter arrays must not mutate in-flight). */
export const clone = <T>(value: T): T => {
    if (value === undefined) {
        return undefined as T;
    }

    return JSON.parse(JSON.stringify(value)) as T;
};

/** `@storage/logs/<filename>` with muted prefix span (matches BEFORE `getPrettyPath`). */
export const getPrettyPathText = (value: string | null | undefined): string => {
    if (!value) {
        return '';
    }

    const filename = value.split(/[\\/]/).pop() ?? value;

    return `@storage/logs/${filename}`;
};

export const getPrettyPathHtml = (value: string | null | undefined): string => {
    const text = getPrettyPathText(value);

    if (!text) {
        return '';
    }

    return `<span>@storage/logs/</span>${escapeHtml(text.replace('@storage/logs/', ''))}`;
};

export const getPrettySize = (bytes: number | null | undefined, decimals = 2): string => {
    if (!bytes) {
        return '';
    }

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

/**
 * Stable expand key — BEFORE: `[datetime, level, channel, category, message.slice(0,200)].join(':')`
 * with newlines stripped.
 */
export const getLogId = (log: TimberLogEntry): string => {
    return [log.datetime, log.level, log.channel, log.category, (log.message || '').slice(0, 200)]
        .join(':')
        .replace(/(\r\n|\n|\r)/gm, '');
};

export const formatLevelLabel = (level: string | null | undefined, toLowerCase = false): string => {
    if (!level) {
        return '';
    }

    if (toLowerCase) {
        return level.toLowerCase();
    }

    return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
};

/** Wrap search hits in `<mark>` — same RegExp(global) behaviour as BEFORE (no escape). */
export const markSearchHits = (message: string, searchText: string): string => {
    if (!searchText) {
        return message;
    }

    return message.replace(new RegExp(searchText, 'g'), '<mark>$&</mark>');
};

export const escapeHtml = (value: string): string => {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};

export const formatNumber = (number: number | null | undefined, decimals?: number): string => {
    return Craft.formatNumber(number ?? 0, decimals);
};
