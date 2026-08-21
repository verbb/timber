// Timber log-viewer utility — Plugin Kit v2 web components.
//
// Translates `timber-before/.../TimberUtility.vue` onto `pk-dropdown-menu` / `pk-input` /
// `pk-button` / `pk-icon` / `pk-spinner` + `LogTable` (real HTML table). Endpoints and
// filter/realtime behaviour preserved; Plugin Kit wins on chrome.

import { debounce, get } from 'lodash-es';
import io from 'socket.io-client';

import {
    clone,
    escapeHtml,
    formatNumber,
    getPrettyPathHtml,
    getPrettyPathText,
    getPrettySize,
} from './format.js';
import { LogTable } from './LogTable.js';
import type {
    TimberFilterOption,
    TimberFilterType,
    TimberLogEntry,
    TimberLogFile,
    TimberLogInfo,
    TimberPageInfo,
    TimberSettings,
} from './types.js';

const parseJson = <T>(raw: string | null | undefined, fallback: T): T => {
    if (!raw) {
        return fallback;
    }

    try {
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
};

type SocketLike = {
    on: (event: string, handler: (data: { file?: string; data?: TimberLogEntry[] }) => void) => void;
    disconnect?: () => void;
};

export class TimberUtility {
    private readonly root: HTMLElement;
    private readonly settings: TimberSettings;

    private initFilters = false;
    private currentPage = 0;
    private orderBy = 'datetime desc';
    private logFile: string | null = null;
    private searchText = '';
    private search = '';
    private levels: string[] = [];
    private categories: string[] = [];
    private updatedLogs: TimberLogEntry[] = [];

    private proxyLogFiles: TimberLogFile[] = [];
    private logs: TimberLogEntry[] = [];
    private logInfo: TimberLogInfo = {};
    private pageInfo: TimberPageInfo = {};
    private supportsLevel = true;
    private supportsCategory = true;

    private deleteLoading = '';
    private loading = false;
    private error = false;
    private errorMessage = '';
    private pendingLogFile: string | null = null;
    private pendingFilterMenuRebuilds = new Set<TimberFilterType>();

    private wrap!: HTMLElement;
    private fileRow!: HTMLElement;
    private fileWrap!: HTMLElement;
    private fileCombobox!: HTMLElement & { value?: string; open?: boolean };
    private fileSize!: HTMLElement;
    private filtersRow!: HTMLElement;
    private levelWrap!: HTMLElement;
    private categoryWrap!: HTMLElement;
    private levelMenu!: HTMLElement;
    private categoryMenu!: HTMLElement;
    private searchInput!: HTMLElement;
    private settingsMenu: HTMLElement | null = null;
    private bodyPane!: HTMLElement;
    private logTable: LogTable | null = null;

    private socket: SocketLike | null = null;

    /** Debounced refetch — 800ms like BEFORE (filter toggles + search). */
    private readonly debouncedFetch = debounce(() => {
        void this.fetchLog();
    }, 800);

    private readonly onSearchInput = debounce(() => {
        this.search = (this.searchInput as HTMLElement & { value?: string }).value ?? '';
        void this.fetchLog();
    }, 800);

    constructor(root: HTMLElement) {
        this.root = root;
        this.settings = parseJson<TimberSettings>(root.getAttribute('data-settings'), {
            logFiles: [],
            limit: 100,
            socketPort: 8085,
            enableRealTimeUpdates: false,
            canDownload: false,
            canDelete: false,
        });
        this.proxyLogFiles = [...(this.settings.logFiles || [])];
    }

    init(): void {
        this.buildDom();
        this.bindEvents();
        this.syncFileTrigger();
        this.rebuildFileOptions();
        this.rebuildSettingsMenu();
        this.renderBody();

        if (this.settings.enableRealTimeUpdates) {
            this.startSocketServer();
        }
    }

    destroy(): void {
        this.debouncedFetch.cancel();
        this.onSearchInput.cancel();
        this.socket?.disconnect?.();
        this.logTable?.destroy();
    }

    // -------------------------------------------------------------------------
    // DOM
    // -------------------------------------------------------------------------

    private buildDom(): void {
        this.root.replaceChildren();

        this.wrap = document.createElement('div');
        this.wrap.className = 'ti-wrap';

        const head = document.createElement('div');
        head.className = 'ti-head';

        this.fileRow = document.createElement('div');
        this.fileRow.className = 'ti-file';

        const fileLabel = document.createElement('strong');
        fileLabel.className = 'ti-file-label';
        fileLabel.textContent = Craft.t('timber', 'Log File:');

        this.fileWrap = document.createElement('div');
        this.fileWrap.className = 'ti-file-wrap';

        this.fileCombobox = document.createElement('pk-combobox') as HTMLElement & {
            value?: string;
            open?: boolean;
        };
        this.fileCombobox.className = 'ti-file-combobox';
        this.fileCombobox.setAttribute('width', 'full');
        this.fileCombobox.setAttribute('placeholder', Craft.t('timber', 'Select a log file'));
        this.fileCombobox.setAttribute('empty-message', Craft.t('timber', 'No log files available'));
        this.fileCombobox.setAttribute('aria-label', Craft.t('timber', 'Log File'));

        this.fileSize = document.createElement('span');
        this.fileSize.slot = 'end';
        this.fileSize.className = 'ti-file-size';
        this.fileCombobox.appendChild(this.fileSize);
        this.fileWrap.appendChild(this.fileCombobox);

        // `icon` on pk-button is a boolean density flag — glyphs go in slot="start".
        const refresh = this.createIconButton({
            icon: 'arrows-rotate',
            label: Craft.t('timber', 'Refresh'),
            className: 'ti-button-refresh',
            compact: false,
        });
        refresh.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.logFile) {
                this.selectLog(this.logFile);
            }
        });

        this.fileRow.append(fileLabel, this.fileWrap, refresh);

        if (this.settings.canDelete || this.settings.canDownload) {
            this.settingsMenu = document.createElement('pk-dropdown-menu');
            this.settingsMenu.className = 'ti-settings-menu';
            this.settingsMenu.setAttribute('placement', 'bottom-end');

            const settingsTrigger = this.createIconButton({
                icon: 'gear',
                label: Craft.t('timber', 'Settings'),
                slot: 'trigger',
                compact: false,
            });
            this.settingsMenu.appendChild(settingsTrigger);
            this.fileRow.appendChild(this.settingsMenu);
        }

        // Filters + search
        this.filtersRow = document.createElement('div');
        this.filtersRow.className = 'ti-header';
        this.filtersRow.hidden = true;

        this.levelWrap = document.createElement('div');
        this.levelWrap.className = 'ti-dropdown-wrap';
        this.levelMenu = this.createFilterMenu('levels', Craft.t('timber', 'Level'));
        this.levelWrap.appendChild(this.levelMenu);

        this.categoryWrap = document.createElement('div');
        this.categoryWrap.className = 'ti-dropdown-wrap';
        this.categoryMenu = this.createFilterMenu('categories', Craft.t('timber', 'Category'));
        this.categoryWrap.appendChild(this.categoryMenu);

        this.searchInput = document.createElement('pk-input');
        this.searchInput.classList.add('ti-search');
        this.searchInput.setAttribute('placeholder', Craft.t('timber', 'Search for log message'));
        this.searchInput.setAttribute('with-clear', '');
        this.searchInput.setAttribute('autocomplete', 'off');

        const searchIcon = document.createElement('pk-icon');
        searchIcon.slot = 'start';
        searchIcon.setAttribute('icon', 'magnifying-glass');

        const searchClearIcon = document.createElement('pk-icon');
        searchClearIcon.slot = 'clear-icon';
        searchClearIcon.setAttribute('icon', 'xmark');

        this.searchInput.append(searchIcon, searchClearIcon);

        this.filtersRow.append(this.levelWrap, this.categoryWrap, this.searchInput);

        head.append(this.fileRow, this.filtersRow);

        this.bodyPane = document.createElement('div');
        this.bodyPane.className = 'ti-body';

        this.wrap.append(head, this.bodyPane);
        this.root.appendChild(this.wrap);
    }

    private createFilterMenu(type: TimberFilterType, label: string): HTMLElement {
        const menu = document.createElement('pk-dropdown-menu');
        menu.className = `ti-filter-menu ti-filter-menu-${type}`;
        menu.setAttribute('placement', 'bottom-start');
        menu.dataset.filterType = type;
        menu.addEventListener('pk-select', (event) => {
            const detail = (event as CustomEvent<{ value?: string }>).detail;

            if (!detail?.value) {
                return;
            }

            // Keep checkbox menus open while Plugin Kit owns roving focus, typeahead,
            // and Enter/Space activation for the native dropdown items.
            event.preventDefault();
            this.toggleFilterOption(type, detail.value);
        });

        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.slot = 'trigger';
        trigger.className = 'ti-dropdown';
        trigger.innerHTML = `<span>${escapeHtml(label)}</span><pk-icon icon="chevron-down"></pk-icon>`;
        menu.appendChild(trigger);

        return menu;
    }

    private toggleFilterOption(type: TimberFilterType, value: string): void {
        const selected = this[type];
        const index = selected.indexOf(value);

        if (index === -1) {
            selected.push(value);
        } else {
            selected.splice(index, 1);
        }

        this.syncFilterMenuSelections(type);
        this.debouncedFetch();
    }

    /** Icon-only pk-button — `icon` is density, glyph lives in slot="start". */
    private createIconButton(options: {
        icon: string;
        label: string;
        size?: string;
        variant?: string;
        className?: string;
        slot?: string;
        compact?: boolean;
    }): HTMLElement {
        const button = document.createElement('pk-button');
        button.setAttribute('variant', options.variant ?? 'transparent');
        button.setAttribute('size', options.size ?? (options.compact === false ? 'default' : 'sm'));
        button.toggleAttribute('icon', options.compact ?? true);
        button.setAttribute('aria-label', options.label);

        if (options.slot) {
            button.slot = options.slot;
        }

        if (options.className) {
            button.className = options.className;
        }

        const glyph = document.createElement('pk-icon');
        glyph.slot = 'start';
        glyph.setAttribute('icon', options.icon);
        button.appendChild(glyph);

        return button;
    }

    private bindEvents(): void {
        this.searchInput.addEventListener('input', () => {
            this.searchText = (this.searchInput as HTMLElement & { value?: string }).value ?? '';
            this.onSearchInput();
        });

        // with-clear also emits `input`; cancel debounce so clear refetches immediately (BEFORE).
        this.searchInput.addEventListener('pk-clear', () => {
            this.onSearchInput.cancel();
            this.searchText = '';
            this.search = '';
            void this.fetchLog();
        });

        this.levelMenu.addEventListener('pk-after-hide', () => {
            this.flushFilterMenuRebuild('levels');
        });
        this.categoryMenu.addEventListener('pk-after-hide', () => {
            this.flushFilterMenuRebuild('categories');
        });

        this.fileCombobox.addEventListener('pk-change', (event) => {
            const detail = (event as CustomEvent).detail as { value?: string } | undefined;
            const value = detail?.value;

            if (!value) {
                return;
            }

            // Let Plugin Kit finish its hide animation before replacing menu items and
            // rendering the loading state; mutating the open popup made the close stutter.
            this.pendingLogFile = value;
        });

        this.fileCombobox.addEventListener('pk-after-hide', () => {
            if (!this.pendingLogFile) {
                return;
            }

            const file = this.pendingLogFile;
            this.pendingLogFile = null;
            this.selectLog(file);
        });

        if (this.settingsMenu) {
            this.settingsMenu.addEventListener('pk-select', (event) => {
                const detail = (event as CustomEvent).detail as { value?: string } | undefined;
                const value = detail?.value;

                if (value === 'download-all') {
                    this.downloadAllLogs();
                } else if (value === 'delete-all') {
                    this.deleteAllLogs();
                }
            });
        }
    }

    // -------------------------------------------------------------------------
    // File / settings menus
    // -------------------------------------------------------------------------

    private syncFileTrigger(): void {
        const info = this.logFileInfo();

        this.fileCombobox.value = this.logFile ?? '';
        this.fileSize.textContent = info.size ? getPrettySize(info.size) : '';
        this.fileSize.hidden = !info.size;

        this.filtersRow.hidden = !this.logFile;
        this.fileRow.querySelector('.ti-button-refresh')?.toggleAttribute('hidden', !this.logFile);
    }

    private logFileInfo(): { path: string; size: number | '' } {
        if (!this.logFile) {
            return { path: '', size: '' };
        }

        const found = this.proxyLogFiles.find((item) => item.path === this.logFile);

        return {
            path: found?.path ?? '',
            size: found?.size ?? '',
        };
    }

    private rebuildFileOptions(): void {
        this.fileCombobox.querySelectorAll(':scope > pk-option').forEach((option) => option.remove());

        for (const item of this.proxyLogFiles) {
            const row = document.createElement('pk-option') as HTMLElement & {
                value: string;
                label: string;
                selected: boolean;
            };
            row.value = item.path;
            row.label = getPrettyPathText(item.path);
            row.selected = this.logFile === item.path;

            const name = document.createElement('span');
            name.className = 'ti-file-name';
            name.innerHTML = getPrettyPathHtml(item.path);

            const content = document.createElement('span');
            content.className = 'ti-file-option-content';

            const size = document.createElement('span');
            size.className = 'ti-file-menu-meta';

            const sizeText = document.createElement('span');
            sizeText.className = 'ti-file-size';
            sizeText.textContent = getPrettySize(item.size);
            size.appendChild(sizeText);

            if (this.settings.canDownload) {
                const download = this.createIconButton({
                    icon: 'download',
                    label: Craft.t('timber', 'Download'),
                    size: 'none',
                    variant: 'none',
                    className: 'ti-file-download',
                });
                download.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.downloadLog(item.path);
                });
                size.appendChild(download);
            }

            if (this.settings.canDelete) {
                const del = this.createIconButton({
                    icon: 'xmark',
                    label: Craft.t('timber', 'Delete'),
                    size: 'none',
                    variant: 'none',
                    className: 'ti-file-delete',
                });

                if (this.deleteLoading === item.path) {
                    del.setAttribute('loading', '');
                }

                del.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    void this.deleteLog(item.path);
                });
                size.appendChild(del);
            }

            content.append(name, size);
            row.appendChild(content);
            this.fileCombobox.appendChild(row);
        }
    }

    private rebuildSettingsMenu(): void {
        if (!this.settingsMenu) {
            return;
        }

        const trigger = this.settingsMenu.querySelector('[slot="trigger"]');
        this.settingsMenu.replaceChildren();

        if (trigger) {
            this.settingsMenu.appendChild(trigger);
        }

        if (this.settings.canDownload) {
            const downloadAll = document.createElement('pk-dropdown-item');
            downloadAll.value = 'download-all';
            downloadAll.innerHTML = `<pk-icon slot="start" icon="download"></pk-icon>${escapeHtml(Craft.t('timber', 'Download all logs'))}`;
            this.settingsMenu.appendChild(downloadAll);
        }

        if (this.settings.canDelete && this.settings.canDownload) {
            this.settingsMenu.appendChild(document.createElement('pk-dropdown-separator'));
        }

        if (this.settings.canDelete) {
            const deleteAll = document.createElement('pk-dropdown-item');
            deleteAll.value = 'delete-all';
            deleteAll.setAttribute('destructive', '');
            deleteAll.innerHTML = `<pk-icon slot="start" icon="xmark"></pk-icon>${escapeHtml(Craft.t('timber', 'Delete all logs'))}`;
            this.settingsMenu.appendChild(deleteAll);
        }
    }

    // -------------------------------------------------------------------------
    // Filters
    // -------------------------------------------------------------------------

    private filterInfo(type: TimberFilterType): TimberFilterOption[] {
        const bag = this.logInfo[type];

        if (!bag) {
            return [];
        }

        return Object.keys(bag).map((item) => {
            const label = type === 'levels'
                ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
                : item;

            return {
                label,
                class: item.toLowerCase(),
                value: item,
                count: formatNumber(bag[item]),
            };
        });
    }

    private filterSelectText(type: TimberFilterType): string {
        if (this[type].length !== this.filterInfo(type).length) {
            return Craft.t('timber', 'Select all');
        }

        return Craft.t('timber', 'Deselect all');
    }

    private rebuildFilterMenu(type: TimberFilterType): void {
        const menu = type === 'levels' ? this.levelMenu : this.categoryMenu;
        const label = type === 'levels' ? Craft.t('timber', 'Level') : Craft.t('timber', 'Category');
        const trigger = menu.querySelector('[slot="trigger"]');

        menu.replaceChildren();

        if (trigger) {
            menu.appendChild(trigger);
        }

        const options = this.filterInfo(type);

        if (!options.length) {
            const empty = document.createElement('div');
            empty.className = 'ti-filter-empty';
            empty.textContent = Craft.t('timber', 'There are no filters to display because no entries have been found.');
            menu.appendChild(empty);
            return;
        }

        const header = document.createElement('div');
        header.className = 'ti-filter-header';

        const headerLabel = document.createElement('span');
        headerLabel.className = 'ti-filter-header-label';
        // BEFORE hardcoded 'Level' on the category menu — fixed here.
        headerLabel.textContent = label;

        const selectAll = document.createElement('button');
        selectAll.type = 'button';
        selectAll.className = 'ti-filter-header-button';
        selectAll.textContent = this.filterSelectText(type);
        selectAll.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.filterSelectAll(type);
        });

        header.append(headerLabel, selectAll);
        menu.appendChild(header);

        for (const option of options) {
            // Use the Kit item as the single hit target so its roving focus, typeahead,
            // and Enter/Space handling remain intact. The leading checkbox stays visual-only.
            const row = document.createElement('pk-dropdown-item') as HTMLElement & {
                value: string;
                updateComplete: Promise<boolean>;
            };
            row.className = 'ti-filter-row';
            row.value = option.value;
            row.dataset.value = option.value;

            const checkbox = document.createElement('span');
            checkbox.className = 'ti-filter-checkbox';
            checkbox.setAttribute('aria-hidden', 'true');
            checkbox.innerHTML = '<pk-icon icon="check"></pk-icon>';

            const content = document.createElement('span');
            content.className = 'ti-filter-row-content';

            const optionLabel = document.createElement('span');
            if (type === 'levels') {
                optionLabel.className = `log-label log-level-${option.class}`;
            } else {
                optionLabel.className = 'ti-filter-label';
            }
            optionLabel.textContent = option.label;

            const count = document.createElement('span');
            count.slot = 'details';
            count.className = 'log-count';
            count.textContent = option.count;

            content.append(checkbox, optionLabel);
            row.append(content, count);
            menu.appendChild(row);

            // `pk-dropdown-item` supplies the keyboard contract while the custom leading
            // checkbox supplies the visual treatment, so expose the matching ARIA state.
            row.classList.toggle('is-checked', this[type].includes(option.value));
            const syncAria = (): void => {
                row.setAttribute('role', 'menuitemcheckbox');
                row.setAttribute('aria-label', `${option.label} ${option.count}`);
                row.setAttribute('aria-checked', this[type].includes(option.value) ? 'true' : 'false');
                row.removeAttribute('aria-expanded');
            };
            syncAria();
            void row.updateComplete.then(() => {
                // The item's initial Lit update restores its default menuitem role.
                syncAria();
            });
        }
    }

    private syncFilterHeader(type: TimberFilterType): void {
        const menu = type === 'levels' ? this.levelMenu : this.categoryMenu;
        const button = menu.querySelector('.ti-filter-header-button');

        if (button) {
            button.textContent = this.filterSelectText(type);
        }
    }

    /**
     * Replacing an open popup's children makes its Floating UI surface briefly collapse
     * and remeasure. Keep the locally toggled checks live, but defer fresh counts/options
     * until the menu has completed its close transition.
     */
    private scheduleFilterMenuRebuild(type: TimberFilterType): void {
        const menu = type === 'levels' ? this.levelMenu : this.categoryMenu;

        if ((menu as HTMLElement & { open?: boolean }).open) {
            this.pendingFilterMenuRebuilds.add(type);
            this.syncFilterMenuSelections(type);
            return;
        }

        this.pendingFilterMenuRebuilds.delete(type);
        this.rebuildFilterMenu(type);
    }

    private flushFilterMenuRebuild(type: TimberFilterType): void {
        if (!this.pendingFilterMenuRebuilds.delete(type)) {
            return;
        }

        this.rebuildFilterMenu(type);
    }

    private syncFilterMenuSelections(type: TimberFilterType): void {
        const menu = type === 'levels' ? this.levelMenu : this.categoryMenu;

        for (const row of menu.querySelectorAll<HTMLElement>('.ti-filter-row')) {
            const checked = this[type].includes(row.dataset.value ?? '');
            row.classList.toggle('is-checked', checked);
            row.setAttribute('aria-checked', checked ? 'true' : 'false');
        }

        this.syncFilterHeader(type);
    }

    private filterSelectAll(type: TimberFilterType): void {
        const options = this.filterInfo(type);
        const action = this[type].length !== options.length ? 'add' : 'remove';

        if (action === 'add') {
            this[type] = options.map((item) => item.value);
        } else {
            this[type] = [];
        }

        this.syncFilterMenuSelections(type);
        void this.fetchLog();
    }

    private syncFilterVisibility(): void {
        this.levelWrap.hidden = !this.supportsLevel;
        this.categoryWrap.hidden = !this.supportsCategory;
    }

    // -------------------------------------------------------------------------
    // Body / table
    // -------------------------------------------------------------------------

    private renderBody(): void {
        this.bodyPane.replaceChildren();
        this.logTable = null;

        if (this.loading) {
            const pane = document.createElement('div');
            pane.className = 'timber-loading-pane';
            const spinner = document.createElement('pk-spinner');
            spinner.setAttribute('centered', '');
            pane.appendChild(spinner);
            this.bodyPane.appendChild(pane);
            return;
        }

        if (this.error) {
            const pane = document.createElement('div');
            pane.className = 'timber-error-pane error';
            const content = document.createElement('div');
            content.className = 'timber-error-content';
            content.innerHTML = `<pk-icon icon="triangle-exclamation"></pk-icon><span class="error">${this.errorMessage}</span>`;
            pane.appendChild(content);
            this.bodyPane.appendChild(pane);
            return;
        }

        if (!this.logFile) {
            this.bodyPane.appendChild(this.emptyPane(Craft.t('timber', 'Select a log file to view')));
            return;
        }

        if (!this.logs.length) {
            this.bodyPane.appendChild(this.emptyPane(Craft.t('timber', 'No results')));
            return;
        }

        const tableHost = document.createElement('div');
        tableHost.className = 'timber-table';
        this.bodyPane.appendChild(tableHost);

        this.logTable = new LogTable(tableHost, {
            onOrderBy: (orderBy) => {
                this.orderBy = orderBy;
                void this.fetchLog();
            },
            onPaginate: (direction) => {
                this.paginate(direction);
            },
            onFetchUpdates: () => {
                this.fetchNewLogs();
            },
        });

        this.syncLogTable();
    }

    private emptyPane(text: string): HTMLElement {
        const pane = document.createElement('div');
        pane.className = 'timber-loading-pane';
        const span = document.createElement('span');
        span.className = 'ti-empty-text';
        span.textContent = text;
        pane.appendChild(span);
        return pane;
    }

    private syncLogTable(): void {
        this.logTable?.update({
            logs: this.logs,
            searchText: this.search,
            orderBy: this.orderBy,
            pageInfo: this.pageInfo,
            supportsLevel: this.supportsLevel,
            supportsCategory: this.supportsCategory,
            updatedLogs: this.updatedLogs,
        });
    }

    // -------------------------------------------------------------------------
    // Actions
    // -------------------------------------------------------------------------

    private selectLog(file: string): void {
        this.logs = [];
        this.logFile = file;
        this.initFilters = false;
        this.syncFileTrigger();
        this.rebuildFileOptions();
        void this.fetchLog();
    }

    private paginate(direction: 'prev' | 'next'): void {
        if (direction === 'next') {
            this.currentPage += 1;
        } else {
            this.currentPage -= 1;
        }

        void this.fetchLog(false);
    }

    private fetchNewLogs(): void {
        // Prepend socket buffer and reset sort — same as BEFORE (no refetch).
        this.orderBy = 'datetime desc';
        this.logs = this.updatedLogs.concat(this.logs);
        this.updatedLogs = [];
        this.syncLogTable();
    }

    private async deleteLog(file: string): Promise<void> {
        if (!confirm(Craft.t('timber', 'Are you sure you want to permanently delete this log file?'))) {
            return;
        }

        this.deleteLoading = file;
        this.rebuildFileOptions();

        try {
            const response = await Craft.sendActionRequest('POST', 'timber/logs/delete', { data: { file } });

            if (!response.data.success) {
                throw new Error(response.data);
            }

            this.proxyLogFiles = this.proxyLogFiles.filter((item) => item.path !== file);

            if (file === this.logFile) {
                this.logFile = null;
                this.logs = [];
                this.logInfo = {};
                this.pageInfo = {};
                this.levels = [];
                this.categories = [];
                this.initFilters = false;
            }

            this.syncFileTrigger();
            this.rebuildFileOptions();
            this.renderBody();
        } catch (error) {
            this.error = true;
            this.errorMessage = String(error);
            this.renderBody();
        } finally {
            this.deleteLoading = '';
            this.rebuildFileOptions();
        }
    }

    private async deleteAllLogs(): Promise<void> {
        if (!confirm(Craft.t('timber', 'Are you sure you want to permanently delete all log files?'))) {
            return;
        }

        if (this.settingsMenu) {
            (this.settingsMenu as HTMLElement & { open?: boolean }).open = false;
        }

        try {
            const response = await Craft.sendActionRequest('POST', 'timber/logs/delete-all', {});

            if (!response.data.success) {
                throw new Error(response.data);
            }

            this.logFile = null;
            this.proxyLogFiles = [];
            this.logs = [];
            this.logInfo = {};
            this.pageInfo = {};
            this.levels = [];
            this.categories = [];
            this.initFilters = false;

            this.syncFileTrigger();
            this.rebuildFileOptions();
            this.renderBody();
        } catch (error) {
            this.error = true;
            this.errorMessage = String(error);
            this.renderBody();
        }
    }

    private downloadLog(file: string): void {
        const $form = Craft.createForm().appendTo(Garnish.$bod);
        $form.append(Craft.getCsrfInput());
        $('<input/>', { type: 'hidden', name: 'action', value: 'timber/logs/download' }).appendTo($form);
        $('<input/>', { type: 'hidden', name: 'file', value: file }).appendTo($form);
        $('<input/>', { type: 'submit', value: 'Submit' }).appendTo($form);
        $form.submit();
        $form.remove();
    }

    private downloadAllLogs(): void {
        const $form = Craft.createForm().appendTo(Garnish.$bod);
        $form.append(Craft.getCsrfInput());
        $('<input/>', { type: 'hidden', name: 'action', value: 'timber/logs/download-all' }).appendTo($form);
        $('<input/>', { type: 'submit', value: 'Submit' }).appendTo($form);
        $form.submit();
        $form.remove();

        if (this.settingsMenu) {
            (this.settingsMenu as HTMLElement & { open?: boolean }).open = false;
        }
    }

    private startSocketServer(): void {
        this.socket = io(`http://localhost:${this.settings.socketPort}`, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 3,
        }) as SocketLike;

        this.socket.on('logUpdate', (data) => {
            if (data.file === this.logFile && Array.isArray(data.data)) {
                this.updatedLogs = this.updatedLogs.concat(data.data);
                this.syncLogTable();
            }
        });
    }

    private async fetchLog(resetPage = true): Promise<void> {
        this.error = false;
        this.loading = true;
        this.errorMessage = '';
        this.renderBody();

        // Most updates shrink the result set — reset page unless paginating.
        if (resetPage) {
            this.currentPage = 0;
        }

        // After initFilters, empty selection ≠ "all" — send ['null'] sentinel.
        const categories = clone(this.categories);
        const levels = clone(this.levels);

        if (!categories.length && this.initFilters) {
            categories.push('null');
        }

        if (!levels.length && this.initFilters) {
            levels.push('null');
        }

        const data = {
            file: this.logFile,
            limit: this.settings.limit,
            page: this.currentPage,
            search: this.search,
            orderBy: this.orderBy,
            levels,
            categories,
        };

        try {
            const response = await Craft.sendActionRequest('POST', 'timber/logs', { data });

            if (!response.data.logs) {
                throw new Error(response.data);
            }

            this.logs = response.data.logs as TimberLogEntry[];
            this.logInfo = (response.data.info || {}) as TimberLogInfo;
            this.pageInfo = (response.data.pagination || {}) as TimberPageInfo;
            this.supportsLevel = Boolean(response.data.supportsLevel);
            this.supportsCategory = Boolean(response.data.supportsCategory);

            // First successful fetch: select every level/category.
            if (!this.initFilters) {
                this.levels = Object.keys(this.logInfo.levels || {});
                this.categories = Object.keys(this.logInfo.categories || {});
                this.initFilters = true;
            }

            this.syncFilterVisibility();
            this.scheduleFilterMenuRebuild('levels');
            this.scheduleFilterMenuRebuild('categories');
        } catch (error) {
            this.error = true;
            this.errorMessage = String(error);

            const errorDetail = get(error, 'response.data.error');
            const file1 = get(error, 'response.data.file');
            const line1 = get(error, 'response.data.line');
            const file2 = get(error, 'response.data.trace.0.file');
            const line2 = get(error, 'response.data.trace.0.line');

            if (errorDetail) {
                this.errorMessage += `<br><br><small>${errorDetail}</small><br><small>${file1}:${line1}</small><br><small>${file2}:${line2}</small>`;
            }
        } finally {
            this.loading = false;
            this.renderBody();
        }
    }
}
