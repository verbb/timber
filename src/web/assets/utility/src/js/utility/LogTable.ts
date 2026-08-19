// Log table — translates `LogTable.vue` onto a real HTML `<table>` so column tracks
// stay aligned (thead + tbody share one table layout). Pagination already bounds
// row count (~limit), so we skip virtualiser here; expand/highlight behaviour preserved.

import {
    formatLevelLabel,
    formatNumber,
    getLogId,
    markSearchHits,
} from './format.js';
import type { LogTableCallbacks, LogTableProps, TimberLogEntry } from './types.js';

const SORT_COLUMNS = ['level', 'datetime', 'category', 'message'] as const;
type SortColumn = (typeof SORT_COLUMNS)[number];

export class LogTable {
    private readonly host: HTMLElement;
    private readonly callbacks: LogTableCallbacks;

    private props: LogTableProps = {
        logs: [],
        searchText: '',
        orderBy: 'datetime desc',
        pageInfo: {},
        supportsLevel: true,
        supportsCategory: true,
        updatedLogs: [],
    };

    /** Expand map keyed by getLogId — sparse object like BEFORE `toggledLogs`. */
    private toggledLogs: Record<string, TimberLogEntry> = {};

    private wrap!: HTMLElement;
    private table!: HTMLTableElement;
    private colgroup!: HTMLElement;
    private theadRow!: HTMLTableRowElement;
    private updatesBody!: HTMLTableSectionElement;
    private pagination!: HTMLElement;

    constructor(host: HTMLElement, callbacks: LogTableCallbacks) {
        this.host = host;
        this.callbacks = callbacks;
        this.buildDom();
    }

    update(props: Partial<LogTableProps>): void {
        this.props = { ...this.props, ...props };
        this.sync();
    }

    destroy(): void {
        this.host.replaceChildren();
    }

    // -------------------------------------------------------------------------
    // DOM
    // -------------------------------------------------------------------------

    private buildDom(): void {
        this.host.replaceChildren();
        this.host.classList.add('ti-table-root');

        this.wrap = document.createElement('div');
        this.wrap.className = 'ti-table-wrap';

        this.table = document.createElement('table');
        this.table.className = 'ti-table';

        this.colgroup = document.createElement('colgroup');

        const thead = document.createElement('thead');
        thead.className = 'ti-thead';
        this.theadRow = document.createElement('tr');
        thead.appendChild(this.theadRow);

        this.updatesBody = document.createElement('tbody');
        this.updatesBody.className = 'ti-tbody-updates-row';
        this.updatesBody.hidden = true;

        this.table.append(this.colgroup, thead, this.updatesBody);
        this.wrap.appendChild(this.table);

        this.pagination = document.createElement('div');
        this.pagination.className = 'ti-pagination flex';

        this.host.append(this.wrap, this.pagination);
    }

    // -------------------------------------------------------------------------
    // Sync
    // -------------------------------------------------------------------------

    private sync(): void {
        this.renderColgroup();
        this.renderThead();
        this.renderUpdatesBanner();
        this.renderRows();
        this.renderPagination();
    }

    /**
     * Column widths live in CSS (incl. mobile overrides). Inline widths would beat
     * those queries. Message has no track so it absorbs the remainder.
     */
    private renderColgroup(): void {
        const columns = [
            { className: 'col-level', show: this.props.supportsLevel },
            { className: 'col-datetime', show: true },
            { className: 'col-category', show: this.props.supportsCategory },
            { className: 'col-message', show: true },
        ].filter((column) => column.show);

        this.colgroup.replaceChildren();

        for (const column of columns) {
            const col = document.createElement('col');
            col.className = column.className;
            this.colgroup.appendChild(col);
        }
    }

    private detailColspan(): number {
        let count = 2; // datetime + message

        if (this.props.supportsLevel) {
            count += 1;
        }

        if (this.props.supportsCategory) {
            count += 1;
        }

        return count;
    }

    private renderThead(): void {
        const { supportsLevel, supportsCategory, orderBy } = this.props;
        this.theadRow.replaceChildren();

        const cols: { key: SortColumn; label: string; show: boolean; className: string }[] = [
            { key: 'level', label: Craft.t('timber', 'Level'), show: supportsLevel, className: 'col-level' },
            { key: 'datetime', label: Craft.t('timber', 'Time'), show: true, className: 'col-datetime' },
            { key: 'category', label: Craft.t('timber', 'Category'), show: supportsCategory, className: 'col-category' },
            { key: 'message', label: Craft.t('timber', 'Message'), show: true, className: 'col-message' },
        ];

        for (const col of cols) {
            if (!col.show) {
                continue;
            }

            const th = document.createElement('th');
            th.scope = 'col';
            th.className = `ti-thead-cell ${col.className}`;

            const wrap = document.createElement('button');
            wrap.type = 'button';
            wrap.className = 'ti-thead-cell-wrap';
            wrap.addEventListener('click', (event) => {
                event.preventDefault();
                this.sortColumn(col.key);
            });

            const label = document.createElement('span');
            label.textContent = col.label;

            const icon = document.createElement('pk-icon');
            icon.setAttribute('icon', 'chevron-down');
            icon.className = this.sortIconClass(col.key, orderBy);

            wrap.append(label, icon);
            th.appendChild(wrap);
            this.theadRow.appendChild(th);
        }
    }

    private renderUpdatesBanner(): void {
        const { updatedLogs } = this.props;
        this.updatesBody.replaceChildren();

        if (!updatedLogs.length) {
            this.updatesBody.hidden = true;
            return;
        }

        this.updatesBody.hidden = false;

        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = this.detailColspan();

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'ti-updates-banner-btn';
        button.textContent = Craft.t('timber', '{num} new logs available, click to load', {
            num: updatedLogs.length,
        });
        button.addEventListener('click', (event) => {
            event.preventDefault();
            this.callbacks.onFetchUpdates();
        });

        td.appendChild(button);
        tr.appendChild(td);
        this.updatesBody.appendChild(tr);
    }

    private renderRows(): void {
        const { logs, supportsLevel, supportsCategory, searchText } = this.props;

        // One tbody per log (BEFORE) — wipe previous log bodies, keep updates banner.
        this.table.querySelectorAll('tbody.ti-tbody').forEach((node) => node.remove());

        for (const log of logs) {
            const levelKey = formatLevelLabel(log.level, true);
            const expanded = Boolean(this.toggledLogs[getLogId(log)]);
            const messageHtml = markSearchHits(log.message || '', searchText);

            const group = document.createElement('tbody');
            group.className = `ti-tbody ti-log-level-${levelKey}${expanded ? ' is-active' : ''}`;

            const row = document.createElement('tr');
            row.className = 'ti-tbody-row';
            row.addEventListener('click', (event) => {
                event.preventDefault();
                this.toggleDetail(log);
            });

            if (supportsLevel) {
                const levelTd = document.createElement('td');
                levelTd.className = 'ti-tbody-cell col-level';
                const levelCell = document.createElement('span');
                levelCell.className = 'ti-level-cell';
                const icon = this.createLevelIcon(levelKey);
                if (icon) {
                    levelCell.appendChild(icon);
                }
                const label = document.createElement('span');
                label.textContent = formatLevelLabel(log.level);
                levelCell.appendChild(label);
                levelTd.appendChild(levelCell);
                row.appendChild(levelTd);
            }

            const timeTd = document.createElement('td');
            timeTd.className = 'ti-tbody-cell col-datetime';
            timeTd.textContent = log.datetime ?? '';
            row.appendChild(timeTd);

            if (supportsCategory) {
                const categoryTd = document.createElement('td');
                categoryTd.className = 'ti-tbody-cell col-category';
                const category = document.createElement('span');
                category.className = 'ti-category-cell';
                category.textContent = log.category ?? '';
                categoryTd.appendChild(category);
                row.appendChild(categoryTd);
            }

            const messageTd = document.createElement('td');
            messageTd.className = 'ti-tbody-cell col-message';
            messageTd.innerHTML = messageHtml;
            row.appendChild(messageTd);

            group.appendChild(row);

            if (expanded) {
                const detailRow = document.createElement('tr');
                detailRow.className = 'ti-tbody-detail-row';
                const detailTd = document.createElement('td');
                detailTd.colSpan = this.detailColspan();
                const pre = document.createElement('pre');
                pre.className = 'log-detail';
                pre.innerHTML = messageHtml;
                detailTd.appendChild(pre);
                detailRow.appendChild(detailTd);
                group.appendChild(detailRow);
            }

            this.table.appendChild(group);
        }
    }

    private createLevelIcon(levelKey: string): HTMLElement | null {
        let iconName: string | null = null;

        if (levelKey === 'error' || levelKey === 'warning') {
            iconName = 'triangle-exclamation';
        } else if (levelKey === 'info') {
            iconName = 'circle-info';
        } else if (levelKey === 'debug') {
            iconName = 'circle';
        }

        if (!iconName) {
            return null;
        }

        const icon = document.createElement('pk-icon');
        icon.setAttribute('icon', iconName);
        return icon;
    }

    private renderPagination(): void {
        const { pageInfo } = this.props;
        const totalCount = pageInfo.totalCount || 0;
        const min = pageInfo.min || 0;
        const max = pageInfo.max || 0;
        const canPrev = min > 1;
        const canNext = max < totalCount;

        this.pagination.replaceChildren();

        const container = document.createElement('div');
        container.id = 'count-container';
        container.className = 'light flex-grow';

        const flex = document.createElement('div');
        flex.className = 'flex pagination';

        const nav = document.createElement('nav');
        nav.className = 'flex';
        nav.setAttribute('aria-label', 'entry pagination');

        const prev = document.createElement('button');
        prev.type = 'button';
        prev.className = `page-link prev-page${canPrev ? '' : ' disabled'}`;
        prev.disabled = !canPrev;
        prev.title = 'Previous Page';
        prev.addEventListener('click', (event) => {
            event.preventDefault();
            if (canPrev) {
                this.callbacks.onPaginate('prev');
            }
        });

        const next = document.createElement('button');
        next.type = 'button';
        next.className = `page-link next-page${canNext ? '' : ' disabled'}`;
        next.disabled = !canNext;
        next.title = 'Next Page';
        next.addEventListener('click', (event) => {
            event.preventDefault();
            if (canNext) {
                this.callbacks.onPaginate('next');
            }
        });

        nav.append(prev, next);

        const info = document.createElement('div');
        info.className = 'page-info';
        info.textContent = `${formatNumber(min)}-${formatNumber(max)} of ${formatNumber(totalCount)} entries`;

        flex.append(nav, info);
        container.appendChild(flex);
        this.pagination.appendChild(container);
    }

    // -------------------------------------------------------------------------
    // Behaviour
    // -------------------------------------------------------------------------

    private toggleDetail(log: TimberLogEntry): void {
        const id = getLogId(log);

        if (this.toggledLogs[id]) {
            delete this.toggledLogs[id];
        } else {
            this.toggledLogs[id] = log;
        }

        this.renderRows();
    }

    private sortIconClass(column: SortColumn, orderBy: string): string {
        const classes = ['ti-sort-icon'];

        if (!orderBy.includes(column)) {
            classes.push('hidden');
        }

        // BEFORE: chevron points up for asc (`reverse`), down (rotated) for desc.
        if (!orderBy.includes(' asc')) {
            classes.push('reverse');
        }

        return classes.join(' ');
    }

    private sortColumn(column: SortColumn): void {
        const orderBy = [column];

        if (this.props.orderBy.includes(' desc') && this.props.orderBy.includes(column)) {
            orderBy.push('asc');
        } else {
            orderBy.push('desc');
        }

        this.callbacks.onOrderBy(orderBy.join(' '));
    }
}
