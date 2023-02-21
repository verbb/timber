<template>
    <div class="ti-table-wrap">
        <table class="ti-table">
            <thead class="ti-thead">
                <tr>
                    <th v-if="supportsLevel" scope="col" class="ti-thead-cell col-level">
                        <div class="ti-thead-cell-wrap" @click.prevent="sortColumn('level')">
                            <span>{{ t('timber', 'Level') }}</span>
                            <svg :class="sortClass('level')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                        </div>
                    </th>

                    <th scope="col" class="ti-thead-cell col-datetime" @click.prevent="sortColumn('datetime')">
                        <div class="ti-thead-cell-wrap">
                            <span>{{ t('timber', 'Time') }}</span>
                            <svg :class="sortClass('datetime')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                        </div>
                    </th>

                    <th v-if="supportsCategory" scope="col" class="ti-thead-cell col-category" @click.prevent="sortColumn('category')">
                        <div class="ti-thead-cell-wrap">
                            <span>{{ t('timber', 'Category') }}</span>
                            <svg :class="sortClass('category')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                        </div>
                    </th>

                    <th scope="col" class="ti-thead-cell col-message" @click.prevent="sortColumn('message')">
                        <div class="ti-thead-cell-wrap">
                            <span>{{ t('timber', 'Message') }}</span>
                            <svg :class="sortClass('message')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody v-if="updatedLogs.length" class="ti-tbody-updates-row">
                <td :colspan="detailColspan">
                    <button type="button" @click.prevent="fetchLogs">{{ t('timber', '{num} new logs available, click to load', { num: updatedLogs.length }) }}</button>
                </td>
            </tbody>

            <tbody v-for="(log, index) in logs" :key="index" :class="['ti-tbody', 'ti-log-level-' + getLevel(log.level, true), showDetail(log) ? 'is-active' : '']">
                <tr class="ti-tbody-row" @click.prevent="toggleDetail(log)">
                    <td v-if="supportsLevel" class="ti-tbody-cell col-level">
                        <span class="ti-level-cell">
                            <svg v-if="getLevel(log.level, true) === 'error'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                            <svg v-if="getLevel(log.level, true) === 'warning'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                            <svg v-if="getLevel(log.level, true) === 'info'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>

                            <span>{{ getLevel(log.level) }}</span>
                        </span>
                    </td>

                    <td class="ti-tbody-cell col-datetime">{{ log.datetime }}</td>

                    <td v-if="supportsCategory" class="ti-tbody-cell col-category">
                        <span class="ti-category-cell">{{ log.category }}</span>
                    </td>

                    <td class="ti-tbody-cell col-message" v-html="filteredMessage(log.message)"></td>
                </tr>

                <tr v-if="showDetail(log)" class="ti-tbody-detail-row">
                    <td :colspan="detailColspan">
                        <pre class="log-detail" v-html="filteredMessage(log.message)"></pre>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="ti-pagination flex">
        <div id="count-container" class="light flex-grow">
            <div class="flex pagination">
                <nav class="flex" aria-label="entry pagination">
                    <button role="button" class="page-link prev-page" :disabled="!canPrev" :class="!canPrev ? 'disabled' : ''" title="Previous Page" @click.prevent="prevPage()"></button>
                    <button role="button" class="page-link next-page" :disabled="!canNext" :class="!canNext ? 'disabled' : ''" title="Next Page" @click.prevent="nextPage()"></button>
                </nav>

                <div class="page-info">{{ paginationRange }} of {{ formatNumber(pageInfo.totalCount) }} entries</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'LogTable',

    props: {
        searchText: {
            type: String,
            default: '',
        },

        orderBy: {
            type: String,
            default: '',
        },

        supportsLevel: {
            type: Boolean,
            default: true,
        },

        supportsCategory: {
            type: Boolean,
            default: true,
        },

        pageInfo: {
            type: Object,
            default: () => { return {}; },
        },

        logs: {
            type: Array,
            default: () => { return []; },
        },

        updatedLogs: {
            type: Array,
            default: () => { return []; },
        },
    },

    emits: ['paginate', 'fetch', 'update:orderBy'],

    data() {
        return {
            toggledLogs: [],
        };
    },

    computed: {
        canPrev() {
            return this.min > 1;
        },

        canNext() {
            return this.max < this.totalCount;
        },

        totalCount() {
            return this.pageInfo.totalCount || 0;
        },

        min() {
            return this.pageInfo.min || 0;
        },

        max() {
            return this.pageInfo.max || 0;
        },

        paginationRange() {
            return `${this.formatNumber(this.min)}-${this.formatNumber(this.max)}`;
        },

        detailColspan() {
            let colspan = 2;

            if (this.supportsLevel) {
                colspan++;
            }

            if (this.supportsCategory) {
                colspan++;
            }

            return colspan;
        },
    },

    methods: {
        formatNumber(number, decimals) {
            return Craft.formatNumber(number, decimals);
        },

        prevPage() {
            this.$emit('paginate', 'prev');
        },

        nextPage() {
            this.$emit('paginate', 'next');
        },

        getLevel(level, toLowerCase = false) {
            if (!this.supportsLevel || !level) {
                return '';
            }

            if (toLowerCase) {
                return level.toLowerCase();
            }

            return level.charAt(0).toUpperCase() + level.substr(1).toLowerCase();
        },

        getLogId(log) {
            return [log.datetime, log.level, log.channel, log.category, log.message.substr(0, 200)].join(':').replace(/(\r\n|\n|\r)/gm, '');
        },

        showDetail(log) {
            const id = this.getLogId(log);

            return this.toggledLogs[id];
        },

        toggleDetail(log) {
            const id = this.getLogId(log);

            if (this.toggledLogs[id]) {
                delete this.toggledLogs[id];
            } else {
                this.toggledLogs[id] = log;
            }
        },

        filteredMessage(message) {
            if (!this.searchText) {
                return message;
            }

            return message.replace(new RegExp(this.searchText, 'g'), '<mark>$&</mark>');
        },

        sortClass(column) {
            const classes = [];

            if (!this.orderBy.includes(column)) {
                classes.push('hidden');
            }

            if (!this.orderBy.includes(' asc')) {
                classes.push('reverse');
            }

            return classes;
        },

        sortColumn(column) {
            const orderBy = [column];

            if (this.orderBy.includes(' desc') && this.orderBy.includes(column)) {
                orderBy.push('asc');
            } else {
                orderBy.push('desc');
            }

            this.$emit('update:orderBy', orderBy.join(' '));
        },

        fetchLogs() {
            this.$emit('fetch');
        },
    },
};

</script>

<style lang="scss">


.ti-table-wrap {
    overflow: auto;
    height: 100%;
}

.ti-table {
    border-spacing: 0;
    border-collapse: separate;
    table-layout: fixed;
    max-width: 100%;
    min-width: 100%;
    border-collapse: collapse;
    border-color: inherit;
    text-indent: 0;
}

table:not(.data).ti-table td,
table:not(.data).ti-table th {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;

    &:first-child {
        padding-left: 1rem;
    }

    &:last-child {
        padding-right: 1rem;
    }
}

table:not(.data).ti-table td:not(:last-child),
table:not(.data).ti-table th:not(:last-child) {
    padding-right: 0.5rem;
}

table:not(.data).ti-table td:not(:first-child),
table:not(.data).ti-table th:not(:first-child) {
    padding-left: 0.5rem;
}

.ti-thead {
    background-color: var(--gray-050);
    border-bottom: 1px lighten(#cdd8e4, 2%) solid;
}

.ti-thead-cell {
    color: #84919e;
    font-weight: 500;
    line-height: 1.25rem;
    padding: 0.5rem;
    text-align: left;
    padding: 0;
    cursor: pointer;

    .ti-thead-cell-wrap {
        display: inline-flex;
        align-items: center;
        width: 100%;
    }

    svg {
        width: 16px;
        height: 16px;
        margin-left: auto;
        transform: rotate(180deg);

        &.reverse {
            transform: rotate(0deg);
        }
    }
}

.ti-tbody {
    position: relative;
}

.ti-tbody-row {
    background-color: #fff;
    cursor: pointer;

    .ti-log-level-info &:hover,
    .ti-log-level-debug &:hover,
    .ti-log-level-info.is-active &,
    .ti-log-level-debug.is-active & {
        background-color: lighten(#0e8ed5, 53%);
    }

    .ti-log-level-warning &:hover,
    .ti-log-level-warning.is-active & {
        background-color: lighten(#ff8200, 47%);
    }

    .ti-log-level-error &:hover,
    .ti-log-level-error.is-active & {
        background-color: lighten(#e11949, 47%);
    }
}

.ti-tbody-cell {
    border-bottom: 1px #e1e1e4 solid;

    .ti-table tbody:last-child & {
        border: 0;
    }
}


table:not(.data).ti-table td,
table:not(.data).ti-table th {
    &.col-level {
        white-space: nowrap;
    }

    &.col-datetime {
        white-space: nowrap;
    }

    &.col-category {
        white-space: nowrap;
        // max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &.col-message {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        max-width: 1px;
    }
}

.ti-category-cell {
    font-size: 0.7rem;
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
}

.ti-level-cell {
    display: flex;
    align-items: center;

    svg {
        width: 18px;
        height: 18px;
        opacity: .75;
        margin-right: 0.25rem;
    }

    .ti-log-level-info &,
    .ti-log-level-debug & {
        color: #0e8ed5;
    }

    .ti-log-level-warning & {
        color: #ff8200;
    }

    .ti-log-level-error & {
        color: #e11949;
    }
}

.ti-tbody-updates-row {
    td {
        text-align: center;
        padding: 0 !important;
    }

    button {
        background: #f3f7fc;
        width: 100%;
        padding: 0.75em;
        transition: all 0.1s cubic-bezier(.4,0,.2,1);

        background-color: #f3f7fc;
        background-image: linear-gradient(to right, #ecf2f9 1px, transparent 0px), linear-gradient(to bottom, #ecf2f9 1px, transparent 1px);
        background-size: 24px 24px;
        background-position: -1px -1px;
        box-shadow: inset 0 0 3px -1px #acbed2;

        &:hover {
            background-color: darken(#f3f7fc, 2%);
        }
    }
}

.ti-tbody-detail-row {
    font-size: 0.7rem;
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
    border-bottom: 1px #e1e1e4 solid;

    .log-detail {
        padding: 0.5rem 0;
        white-space: pre-wrap;
        word-break: break-all;
    }
}

.ti-table-wrap mark {
    background-color: rgb(253 230 138);
    border-radius: 0.25rem;
    color: rgb(24 24 27);
    padding: 0.125rem 0.25rem;
}

.ti-pagination {
    background-color: var(--gray-050);
    border-radius: 0 0 var(--large-border-radius) var(--large-border-radius);
    bottom: 0;
    box-sizing: border-box;
    min-height: 50px;
    padding: var(--s) var(--xl);
    z-index: 1;
    border-top: 1px lighten(#cdd8e4, 2%) solid;
}

</style>
