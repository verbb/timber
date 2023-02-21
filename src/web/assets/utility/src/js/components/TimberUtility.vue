<template>
    <div class="ti-wrap">
        <div class="ti-head">
            <div class="ti-file">
                <strong class="ti-file-label">{{ t('timber', 'Log File:') }}</strong>

                <div class="ti-file-wrap">
                    <button type="button" class="ti-file-item">
                        <span v-show="logFile" class="ti-file-name" v-html="getPrettyPath(logFileInfo.path)"></span>
                        <span v-show="logFile" class="ti-file-size">{{ getPrettySize(logFileInfo.size) }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                    </button>

                    <div id="ti-file-template" class="timber-menu timber-menu-file" style="display: none;">
                        <transition-group class="padded" role="listbox" aria-hidden="true" name="list" tag="ul">
                            <li v-if="!proxyLogFiles.length">
                                <a>{{ t('timber', 'No log files available') }}</a>
                            </li>

                            <li v-for="(item, index) in proxyLogFiles" :key="item.path">
                                <a role="option" tabindex="-1" :class="logFile === item.path ? 'is-active' : ''" @click.prevent="selectLog(item.path)">
                                    <span class="ti-file-name" v-html="getPrettyPath(item.path)"></span>
                                    <span class="ti-file-size">{{ getPrettySize(item.size) }}</span>

                                    <button v-if="canDownload" class="ti-file-download" @click.stop="downloadLog(item.path)">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                    </button>

                                    <button v-if="canDelete" class="ti-file-delete" :class="deleteLoading === item.path ? 'timber-loading' : ''" @click.stop="deleteLog(item.path, index)">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
                                    </button>
                                </a>
                            </li>
                        </transition-group>
                    </div>
                </div>

                <button v-if="logFile" type="button" class="ti-button ti-button-refresh" style="margin-left: 0.5rem;" @click.prevent="selectLog(logFile)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" /></svg>
                </button>

                <button type="button" class="ti-button ti-button-settings" style="margin-left: 0.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                </button>

                <div v-if="canDelete || canDownload" id="ti-settings-template" class="timber-menu timber-menu-settings" style="display: none;">
                    <ul class="padded" role="listbox" aria-hidden="true">
                        <li v-if="canDownload">
                            <a data-icon="download" role="option" tabindex="-1" @click.prevent="downloadAllLogs">{{ t('timber', 'Download all logs') }}</a>
                        </li>

                        <hr v-if="canDelete && canDownload">

                        <li v-if="canDelete">
                            <a class="error" data-icon="remove" role="option" tabindex="-1" @click.prevent="deleteAllLogs">{{ t('timber', 'Delete all logs') }}</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-show="logFile" class="ti-header">
                <div v-show="supportsLevel" class="ti-dropdown-wrap" style="margin-right: 1rem;">
                    <button type="button" class="ti-dropdown ti-dropdown-level">
                        <span>{{ t('timber', 'Level') }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                    </button>

                    <div id="ti-level-template" class="timber-menu timber-menu-level" style="display: none;">
                        <div v-if="!filterInfo('levels').length">
                            <div class="no-results">{{ t('timber', 'There are no filters to display because no entries have been found.') }}</div>
                        </div>

                        <div v-else>
                            <div class="level-header">
                                <span class="level-header-label">{{ t('timber', 'Level') }}</span>
                                <span class="level-header-button" @click.prevent="filterSelect('levels')" v-html="filterSelectText('levels')"></span>
                            </div>

                            <button v-for="(item, index) in filterInfo('levels')" :key="index" class="level-row" @click.prevent="selectFilter('levels', item.value); debouncedFetch();">
                                <div class="level-icon">
                                    <svg v-if="levels.includes(item.value)" viewBox="0 0 18 18" fill="currentColor" width="18" height="18"><path d="M11.9393398,6 C12.232233,5.70710678 12.7071068,5.70710678 13,6 C13.2928932,6.29289322 13.2928932,6.76776695 13,7.06066017 L7.5,12.5606602 L5,10.0606602 C4.70710678,9.76776695 4.70710678,9.29289322 5,9 C5.29289322,8.70710678 5.76776695,8.70710678 6.06066017,9 L7.5,10.4393398 L11.9393398,6 Z" /></svg>
                                </div>

                                <span class="level-text">
                                    <span :class="['log-label', 'log-level-' + item.class]">{{ item.label }}</span>
                                    <span class="log-count">{{ item.count }}</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div v-show="supportsCategory" class="ti-dropdown-wrap" style="margin-right: 1rem;">
                    <button type="button" class="ti-dropdown ti-dropdown-category">
                        <span>{{ t('timber', 'Category') }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                    </button>

                    <div id="ti-category-template" class="timber-menu timber-menu-category" style="display: none;">
                        <div v-if="!filterInfo('categories').length">
                            <div class="no-results">{{ t('timber', 'There are no filters to display because no entries have been found.') }}</div>
                        </div>

                        <div v-else>
                            <div class="level-header">
                                <span class="level-header-label">{{ t('timber', 'Level') }}</span>
                                <span class="level-header-button" @click.prevent="filterSelect('categories')" v-html="filterSelectText('categories')"></span>
                            </div>

                            <button v-for="(item, index) in filterInfo('categories')" :key="index" class="level-row" @click.prevent="selectFilter('categories', item.value); debouncedFetch();">
                                <div class="level-icon">
                                    <svg v-if="categories.includes(item.value)" viewBox="0 0 18 18" fill="currentColor" width="18" height="18"><path d="M11.9393398,6 C12.232233,5.70710678 12.7071068,5.70710678 13,6 C13.2928932,6.29289322 13.2928932,6.76776695 13,7.06066017 L7.5,12.5606602 L5,10.0606602 C4.70710678,9.76776695 4.70710678,9.29289322 5,9 C5.29289322,8.70710678 5.76776695,8.70710678 6.06066017,9 L7.5,10.4393398 L11.9393398,6 Z" /></svg>
                                </div>

                                <span class="level-text">
                                    <span class="log-label">{{ item.label }}</span>
                                    <span class="log-count">{{ item.count }}</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="ti-search">
                    <div class="ti-search-prefix-icon">
                        <label for="query" class="sr-only">{{ t('timber', 'Search') }}</label>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
                    </div>

                    <div class="ti-search-input">
                        <input id="query" v-model="searchText" type="text" placeholder="Search for log message" @input="onSearch">

                        <div v-if="searchText" class="clear-search">
                            <button @click.prevent="clearSearch()">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" class="timber-loading-pane">
            <div class="timber-loading timber-loading-lg"></div>
        </div>

        <div v-else-if="error" class="timber-error-pane error">
            <div class="timber-error-content">
                <span data-icon="alert"></span>

                <span class="error" v-html="errorMessage"></span>
            </div>
        </div>

        <div v-else-if="!logFile" class="timber-loading-pane">
            <span class="ti-empty-text">{{ t('timber', 'Select a log file to view') }}</span>
        </div>

        <log-table
            v-else-if="logs.length"
            v-model:order-by="orderBy"
            :logs="logs"
            :search-text="search"
            :page-info="pageInfo"
            :supports-level="supportsLevel"
            :supports-category="supportsCategory"
            :updated-logs="updatedLogs"
            @paginate="paginate"
            @fetch="fetchNewLogs"
        />

        <div v-else-if="logFile" class="timber-loading-pane">
            <span class="ti-empty-text">{{ t('timber', 'No results') }}</span>
        </div>
    </div>
</template>

<script>
import { debounce, get } from 'lodash-es';

import io from 'socket.io-client';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

import LogTable from './LogTable.vue';

export default {
    name: 'TimberUtility',

    components: {
        LogTable,
    },

    props: {
        logFiles: {
            type: Array,
            default: () => { return []; },
        },

        limit: {
            type: Number,
            default: 100,
        },

        socketPort: {
            type: Number,
            default: 8085,
        },

        canDelete: {
            type: Boolean,
            default: true,
        },

        canDownload: {
            type: Boolean,
            default: true,
        },

        enableRealTimeUpdates: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            fileTippy: null,
            levelTippy: null,
            categoryTippy: null,
            settingsTippy: null,

            initFilters: false,
            currentPage: 0,
            orderBy: 'datetime desc',
            logFile: null,
            searchText: '',
            search: '',
            levels: [],
            categories: [],
            updatedLogs: [],

            proxyLogFiles: [],
            logs: [],
            logInfo: {},
            pageInfo: {},
            supportsLevel: true,
            supportsCategory: true,

            deleteLoading: '',
            loading: false,
            error: false,
            errorMessage: '',
        };
    },

    computed: {
        logFileInfo() {
            let path = '';
            let size = '';

            if (this.logFile) {
                const logFile = this.proxyLogFiles.find((item) => {
                    return item.path === this.logFile;
                });

                if (logFile) {
                    path = logFile.path;
                    size = logFile.size;
                }
            }

            return { path, size };
        },
    },

    watch: {
        orderBy(newValue) {
            this.fetchLog();
        },
    },

    created() {
        this.proxyLogFiles = this.logFiles;

        if (this.enableRealTimeUpdates) {
            this.startSocketServer();
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.initFileTippy();
            this.initLevelTippy();
            this.initCategoryTippy();
            this.initSettingsTippy();

            // this.selectLog(this.proxyLogFiles[39].path);
        });
    },

    methods: {
        formatNumber(number, decimals) {
            return Craft.formatNumber(number, decimals);
        },

        initFileTippy() {
            const $template = this.$el.querySelector('#ti-file-template');
            const $trigger = this.$el.querySelector('.ti-file-item');

            if ($template) {
                $template.style.display = 'block';

                this.fileTippy = tippy($trigger, {
                    content: $template,
                    trigger: 'click',
                    allowHTML: true,
                    arrow: false,
                    interactive: true,
                    placement: 'bottom-end',
                    theme: 'light-border timber-tippy-menu timber-tippy-file-menu',
                    maxWidth: '',
                    zIndex: 10,
                    offset: [0, 3],
                    hideOnClick: true,
                });
            }
        },

        initLevelTippy() {
            const $template = this.$el.querySelector('#ti-level-template');
            const $trigger = this.$el.querySelector('.ti-dropdown-level');

            if ($template) {
                $template.style.display = 'block';

                this.levelTippy = tippy($trigger, {
                    content: $template,
                    trigger: 'click',
                    allowHTML: true,
                    arrow: true,
                    interactive: true,
                    placement: 'bottom-start',
                    theme: 'light-border timber-tippy-menu timber-tippy-level-menu',
                    zIndex: 10,
                    hideOnClick: true,
                });
            }
        },

        initCategoryTippy() {
            const $template = this.$el.querySelector('#ti-category-template');
            const $trigger = this.$el.querySelector('.ti-dropdown-category');

            if ($template) {
                $template.style.display = 'block';

                this.levelTippy = tippy($trigger, {
                    content: $template,
                    trigger: 'click',
                    allowHTML: true,
                    arrow: true,
                    interactive: true,
                    placement: 'bottom-start',
                    theme: 'light-border timber-tippy-menu timber-tippy-category-menu',
                    zIndex: 10,
                    hideOnClick: true,
                });
            }
        },

        initSettingsTippy() {
            const $template = this.$el.querySelector('#ti-settings-template');
            const $trigger = this.$el.querySelector('.ti-button-settings');

            if ($template) {
                $template.style.display = 'block';

                this.settingsTippy = tippy($trigger, {
                    content: $template,
                    trigger: 'click',
                    allowHTML: true,
                    arrow: true,
                    interactive: true,
                    placement: 'bottom-end',
                    theme: 'light-border timber-tippy-menu timber-tippy-settings-menu',
                    zIndex: 10,
                    offset: [6, 3],
                    hideOnClick: true,
                });
            }
        },

        getPrettyPath(value) {
            if (!value) {
                return '';
            }

            const filename = value.split(/[\\/]/).pop();

            return `<span>@storage/logs/</span>${filename}`;
        },

        getPrettySize(bytes, decimals = 2) {
            if (!bytes) {
                return '';
            }

            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
        },

        filterInfo(type) {
            if (this.logInfo[type]) {
                const data = [];

                Object.keys(this.logInfo[type]).forEach((item) => {
                    const label = type === 'levels' ? item.charAt(0).toUpperCase() + item.substr(1).toLowerCase() : item;

                    data.push({
                        label,
                        class: item.toLowerCase(),
                        value: item,
                        count: this.formatNumber(this.logInfo[type][item]),
                    });
                });

                return data;
            }

            return [];
        },

        filterSelectText(type) {
            if (this[type].length !== this.filterInfo(type).length) {
                return Craft.t('timber', 'Select all');
            }

            return Craft.t('timber', 'Deselect all');
        },

        filterSelect(type) {
            const action = (this[type].length !== this.filterInfo(type).length) ? 'add' : 'remove';

            Object.keys(this.logInfo[type]).forEach((item) => {
                if (action === 'add') {
                    this[type].push(item);
                } else {
                    this[type] = [];
                }
            });

            this.fetchLog();
        },

        selectFilter(type, item) {
            if (this[type].includes(item)) {
                const index = this[type].indexOf(item);

                if (index !== -1) {
                    this[type].splice(index, 1);
                }
            } else {
                this[type].push(item);
            }
        },

        debouncedFetch: debounce(function(e) {
            this.fetchLog();
        }, 800),

        onSearch: debounce(function(e) {
            this.search = e.target.value;

            this.fetchLog();
        }, 800),

        paginate(direction) {
            if (direction === 'next') {
                this.currentPage += 1;
            } else {
                this.currentPage -= 1;
            }

            this.fetchLog(false);
        },

        clearSearch() {
            this.searchText = '';
            this.search = '';

            this.fetchLog();
        },

        selectLog(file) {
            this.logs = [];
            this.logFile = file;
            this.initFilters = false;

            this.fetchLog();

            if (this.fileTippy) {
                this.fileTippy.hide();
            }
        },

        fetchNewLogs() {
            // Add the logs from the update, and also reset all filters to keep things sane
            this.orderBy = 'datetime desc';

            this.logs = this.updatedLogs.concat(this.logs);

            this.updatedLogs = [];
        },

        deleteLog(file, index) {
            const data = {
                file,
            };

            if (confirm(Craft.t('timber', 'Are you sure you want to permanently delete this log file?'))) {
                this.deleteLoading = file;

                Craft.sendActionRequest('POST', 'timber/logs/delete', { data })
                    .then((response) => {
                        if (response.data.success) {
                            this.proxyLogFiles.splice(index, 1);

                            // Reset things if this was the current file
                            if (file === this.logFile) {
                                this.logFile = null;
                                this.logs = [];
                                this.logInfo = {};
                                this.pageInfo = {};
                                this.levels = [];
                                this.categories = [];
                                this.initFilters = false;
                            }
                        } else {
                            throw new Error(response.data);
                        }
                    })
                    .catch((error) => {
                        this.error = true;
                        this.errorMessage = error;
                    })
                    .finally(() => {
                        this.deleteLoading = '';
                    });
            }
        },

        deleteAllLogs() {
            if (confirm(Craft.t('timber', 'Are you sure you want to permanently delete all log files?'))) {
                if (this.settingsTippy) {
                    this.settingsTippy.hide();
                }

                Craft.sendActionRequest('POST', 'timber/logs/delete-all', { })
                    .then((response) => {
                        if (response.data.success) {
                            this.logFile = null;
                            this.proxyLogFiles = [];
                            this.logs = [];
                            this.logInfo = {};
                            this.pageInfo = {};
                            this.levels = [];
                            this.categories = [];
                            this.initFilters = false;
                        } else {
                            throw new Error(response.data);
                        }
                    })
                    .catch((error) => {
                        this.error = true;
                        this.errorMessage = error;
                    });
            }
        },

        downloadLog(file) {
            const $form = Craft.createForm().appendTo(Garnish.$bod);
            $form.append(Craft.getCsrfInput());
            $('<input/>', { type: 'hidden', name: 'action', value: 'timber/logs/download' }).appendTo($form);
            $('<input/>', { type: 'hidden', name: 'file', value: file }).appendTo($form);
            $('<input/>', { type: 'submit', value: 'Submit' }).appendTo($form);
            $form.submit();
            $form.remove();
        },

        downloadAllLogs() {
            const $form = Craft.createForm().appendTo(Garnish.$bod);
            $form.append(Craft.getCsrfInput());
            $('<input/>', { type: 'hidden', name: 'action', value: 'timber/logs/download-all' }).appendTo($form);
            $('<input/>', { type: 'submit', value: 'Submit' }).appendTo($form);
            $form.submit();
            $form.remove();

            if (this.settingsTippy) {
                this.settingsTippy.hide();
            }
        },

        startSocketServer() {
            const socket = io(`http://localhost:${this.socketPort}`, {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 3,
            });

            socket.on('logUpdate', (data) => {
                if (data.file === this.logFile) {
                    this.updatedLogs = this.updatedLogs.concat(data.data);
                }
            });
        },

        fetchLog(resetPage = true) {
            this.error = false;
            this.loading = true;
            this.errorMessage = '';

            // The vast majority of updates need to reset the page, because they reduce the length of logs
            if (resetPage) {
                this.currentPage = 0;
            }

            // Check if we want to filter on _no_ levels/categories, which is different to this init state
            const categories = this.clone(this.categories);
            const levels = this.clone(this.levels);

            if (!categories.length && this.initFilters) {
                categories.push('null');
            }

            if (!levels.length && this.initFilters) {
                levels.push('null');
            }

            const data = {
                file: this.logFile,
                limit: this.limit,
                page: this.currentPage,
                search: this.search,
                orderBy: this.orderBy,
                levels,
                categories,
            };

            Craft.sendActionRequest('POST', 'timber/logs', { data })
                .then((response) => {
                    if (response.data.logs) {
                        this.logs = response.data.logs;
                        this.logInfo = response.data.info;
                        this.pageInfo = response.data.pagination;
                        this.supportsLevel = response.data.supportsLevel;
                        this.supportsCategory = response.data.supportsCategory;

                        // Populate the filters to be all on, at least for the first run
                        if (!this.initFilters) {
                            this.levels = Object.keys(this.logInfo.levels);
                            this.categories = Object.keys(this.logInfo.categories);

                            this.initFilters = true;
                        }
                    } else {
                        throw new Error(response.data);
                    }
                })
                .catch((error) => {
                    this.error = true;
                    this.errorMessage = error;

                    const errorDetail = get(error, 'response.data.error');
                    const file1 = get(error, 'response.data.file');
                    const line1 = get(error, 'response.data.line');
                    const file2 = get(error, 'response.data.trace.0.file');
                    const line2 = get(error, 'response.data.trace.0.line');

                    if (errorDetail) {
                        this.errorMessage += `<br><br><small>${errorDetail}</small><br><small>${file1}:${line1}</small><br><small>${file2}:${line2}</small>`;
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },

    },
};

</script>

<style lang="scss">

.timber-table {
    margin: calc(var(--xl) * -1);
    height: calc(100vh - 270px);
    min-height: 400px;
}

.ti-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.ti-head {
    border-bottom: 1px #d4dde8 solid;
}

//
// Log File Picker
//

.ti-file {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background: #f3f7fb;
    border-radius: 5px 5px 0 0;
}

.ti-file-label {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font-size: 0.75rem;
    color: #84919e;
    font-weight: 600;
}

.ti-file-wrap {
    background-color: #fff;
    color: #27272a;
    white-space: nowrap;
    border-radius: 5px;
    display: inline-flex;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border: 1px #cdd8e4 solid;
    flex-grow: 1;
    text-align: left;
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    position: relative;
    transition: all 0.1s cubic-bezier(.4,0,.2,1);

    .ti-file-item {
        flex-grow: 1;
        text-align: left;
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0.75rem;
    }

    &:hover {
        background-color: lighten(#f3f7fb, 2%);
    }

    .ti-file-name {
        font-size: .875rem;
        line-height: 1.25rem;
        margin-right: 0.75rem;
        width: 100%;
        word-break: break-word;

        span {
            opacity: 0.5;
        }
    }

    .ti-file-size {
        color: #71717a;
        font-size: .75rem;
        line-height: 1rem;
        white-space: nowrap;
        margin-right: 0.75rem;
    }

    svg {
        width: 20px;
        height: 20px;
        margin-left: auto;
    }

    [data-tippy-root] {
        width: calc(100% + 2px);
    }

    .timber-menu-file a {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0.35rem 0.5rem 0.75rem;
    }

    .timber-menu-file .ti-file-size {
        margin-right: 0.45rem;
    }

    .ti-file-download,
    .ti-file-delete {
        border-radius: 0.25rem;
        color: #a1a1aa;
        padding: 0.25rem;
        transition: all 0.2s cubic-bezier(.4,0,.2,1);

        &:hover {
            color: #52525b;
        }

        svg {
            height: 1.25rem;
            width: 1.25rem;
        }
    }
}

.ti-button {
    border-radius: 8px;
    color: #84919e;
    cursor: pointer;
    padding: 0.5rem;
    position: relative;
    transition: all 0.2s cubic-bezier(.4,0,.2,1);

    &:hover {
        color: #84919e;
        background-color: lighten(#cdd8e5, 8%);
    }

    // &:focus {
    //     --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    //     --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    //     --tw-ring-opacity: 1;
    //     --tw-ring-color: rgb(16 185 129/var(--tw-ring-opacity));

    //     box-shadow: var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);
    //     outline: 2px solid transparent;
    //     outline-offset: 2px;
    // }

    svg {
        width: 20px;
        height: 20px;
    }
}


//
// Search
//

.ti-header {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    border-top: 1px #cdd8e4 solid;
}

.ti-search {
    display: flex;
    flex: 1 1 0%;
    min-height: 38px;

    align-items: center;
    background-color: #fff;
    border-color: #d4d4d8;
    border-radius: 4px;
    border-width: 1px;
    display: flex;
    font-size: .875rem;
    line-height: 1.25rem;
    position: relative;
    transition: all 0.2s cubic-bezier(.4,0,.2,1);
    width: 100%;
}

.ti-search .clear-search {
    position: absolute;
    right: 0;
    top: 0;

    button {
        border-radius: 0.25rem;
        color: rgb(161 161 170);
        padding: 0.25rem;
        transition: .2s all cubic-bezier(.4,0,.2,1);

        &:hover {
            color: rgb(82 82 91);
        }

        svg {
            height: 1.25rem;
            width: 1.25rem;
        }
    }
}

.ti-search-input {
    width: 100%;
    margin: 0.25rem;
    position: relative;

    input {
        --focus-ring: 0 0 0 1px hsl(var(--dark-focus-hsl)),0 0 0 2px hsla(var(--dark-focus-hsl),0.8);

        width: 100%;
        border-radius: 2px;
        padding: 0.25rem;
    }
}

.ti-search-prefix-icon {
    color: #a1a1aa;
    margin-left: 0.75rem;
    margin-right: 0.25rem;

    svg {
        width: 16px;
        height: 16px;
    }
}


//
// Level Filter
//

.ti-dropdown-wrap {
    position: relative;
    // margin-left: 1rem;
}

.ti-dropdown {
    min-height: 38px;
    background-color: #fff;
    color: #27272a;
    white-space: nowrap;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    font-size: .875rem;
    line-height: 1.25rem;
    padding: 0.25rem 0.75rem;
    transition-duration: .2s;
    border: 1px #d4d4d8 solid;
    outline: none;

    &:focus {
        outline: none;
        box-shadow: none;
    }

    svg {
        width: 16px;
        height: 16px;
        margin-left: 0.5rem;
    }
}


.timber-menu-category,
.timber-menu-level {
    min-width: 200px;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;

    .level-header {
        display: flex;
        justify-content: space-between;
        color: #84919e;
        font-size: .75rem;
        font-weight: 600;
        line-height: 1rem;
        margin: 0.25rem 1rem;
    }

    .level-header-button {
        color: #0369a1;
        font-weight: 400;
        cursor: pointer;
    }

    .level-row {
        align-items: center;
        display: flex;
        font-size: .875rem;
        line-height: 1.25rem;
        font-weight: 600;
        padding: 0.5rem 1rem;
        text-align: left;
        width: 100%;

        &:hover {
            background-color: #f3f7fc;
        }
    }

    .level-icon {
        background-color: #f3f7fb;
        border-width: 1px;
        border-radius: 0.25rem;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        display: flex;
        margin-right: 0.625rem;
    }

    .level-text {
        justify-content: space-between;
        flex: 1 1 0%;
        display: inline-flex;
        overflow: hidden;
    }

    .log-label {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .log-count {
        color: #84919e;
        margin-left: 2rem;
        white-space: nowrap;
        font-weight: 400;
    }

    .log-level-info {
        color: #0e8ed5;
    }

    .log-level-warning {
        color: #ff8200;
    }

    .log-level-error {
        color: #e11949;
    }
}

//
// Tippy
//

.tippy-box[data-theme~='timber-tippy-file-menu'] {
    .tippy-content {
        max-height: 60vh;
        overflow-y: auto;
    }
}

.tippy-box[data-theme~='timber-tippy-menu'] {
    .tippy-content {
        padding: 0;
    }

    &[data-placement="bottom-end"] .tippy-arrow {
        right: 15px;
        left: auto !important;
        transform: none !important;
    }
}


//
// Content Table
//


//
// State
//

.timber-loading-pane,
.timber-error-pane {
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 24px;
    border-radius: 0 0 5px 5px;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #f3f7fc;
    background-image: linear-gradient(to right, #ecf2f9 1px, transparent 0px), linear-gradient(to bottom, #ecf2f9 1px, transparent 1px);
    background-size: 24px 24px;
    background-position: -1px -1px;
    box-shadow: inset 0 1px 3px -1px #acbed2;
}

.ti-empty-text {
    font-size: 1.2rem;
    opacity: 0.7;
}

.timber-error-content [data-icon] {
    margin-right: 0.5rem;
}

.timber-error-content {
    text-align: center;
}

.no-results {
    color: #71717a;
    font-size: .75rem;
    line-height: 1rem;
    padding: 0.25rem 1rem;
    text-align: center;
}


//
// File List Transition
//

.list-enter-active {
    animation: fade-in .5s ease-in-out;
}

.list-leave-active {
    animation: fade-in .5s ease-in-out reverse;
}

@keyframes fade-in {
    0% {
        opacity: 0;
        max-height: 0px;
    }
    50% {
        opacity: 0;
    }
    100% {
        max-height: 50px;
    }
}

</style>
