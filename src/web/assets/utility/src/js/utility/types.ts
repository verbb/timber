/** Shared Timber utility types — mirror `timber-before` Vue props/payloads. */

export interface TimberLogFile {
    path: string;
    size: number;
}

export interface TimberSettings {
    logFiles: TimberLogFile[];
    limit: number;
    socketPort: number;
    enableRealTimeUpdates: boolean;
    canDownload: boolean;
    canDelete: boolean;
}

export interface TimberLogEntry {
    datetime?: string;
    level?: string;
    channel?: string;
    category?: string;
    message: string;
    [key: string]: unknown;
}

export interface TimberPageInfo {
    totalCount?: number;
    min?: number;
    max?: number;
}

/** Server `info` bag: `{ levels: { error: 12, … }, categories: { … } }`. */
export interface TimberLogInfo {
    levels?: Record<string, number>;
    categories?: Record<string, number>;
}

export type TimberFilterType = 'levels' | 'categories';

export interface TimberFilterOption {
    label: string;
    class: string;
    value: string;
    count: string;
}

export interface LogTableCallbacks {
    onOrderBy: (orderBy: string) => void;
    onPaginate: (direction: 'prev' | 'next') => void;
    onFetchUpdates: () => void;
}

export interface LogTableProps {
    logs: TimberLogEntry[];
    searchText: string;
    orderBy: string;
    pageInfo: TimberPageInfo;
    supportsLevel: boolean;
    supportsCategory: boolean;
    /** Count of pending realtime invalidations (not buffered log bodies). */
    pendingUpdates: number;
}
