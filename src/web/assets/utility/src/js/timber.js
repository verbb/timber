// CSS needs to be imported here as it's treated as a module
import '@/scss/style.scss';

// Accept HMR as per: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
    import.meta.hot.accept();
}

import { debounce } from 'lodash-es';

//
// Start Vue Apps
//

if (typeof Craft.Timber === typeof undefined) {
    Craft.Timber = {};
}

import { createVueApp } from './config';

import TimberUtility from './components/TimberUtility.vue';

Craft.Timber.Utility = Garnish.Base.extend({
    init() {
        const app = createVueApp({
            components: {
                TimberUtility,
            },
        });

        app.mount('.timber-table');
    },
});

// Re-broadcast the custom `vite-script-loaded` event so that we know that this module has loaded
// Needed because when <script> tags are appended to the DOM, the `onload` handlers
// are not executed, which happens in the field Settings page, and in slideouts
// Do this after the document is ready to ensure proper execution order
$(document).ready(() => {
    // Create a global-loaded flag when switching entry types. This won't be fired multiple times.
    Craft.TimberReady = true;

    document.dispatchEvent(new CustomEvent('vite-script-loaded', { detail: { path: 'utility/src/js/timber.js' } }));
});
