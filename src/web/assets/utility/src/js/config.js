import { createApp } from 'vue';
import mitt from 'mitt';

// Vue plugins
// import VTooltip from 'floating-vue';
// import { vfmPlugin } from 'vue-final-modal';
import VueUniqueId from '@/js/vendor/vue-unique-id';

import { clone } from '@utils/object';
import { t } from '@utils/translations';

// Allows us to create a Vue app with global properties and loading plugins
export const createVueApp = (props) => {
    const app = createApp({
        // Set the delimiters to not mess around with Twig
        delimiters: ['${', '}'],

        // Add in any props defined for _this_ instance of the app, like components
        // data, methods, etc.
        ...props,
    });

    // Fix Vue warnings
    app.config.unwrapInjectedRef = true;

    //
    // Plugins
    // Include any globally-available plugins for the app.
    // Be careful about adding too much here. You can always include them per-app.
    //

    // Vue Unique ID
    // Custom - waiting for https://github.com/berniegp/vue-unique-id
    app.use(VueUniqueId);

    //
    // Global properties
    // Create global properties here, shared across multiple Vue apps.
    //

    // Provide `this.t()` for translations in SFCs.
    app.config.globalProperties.t = t;

    // Provide `this.clone()` for easy object cloning in SFCs.
    app.config.globalProperties.clone = clone,

    // Global events. Accessible via `this.$events` in SFCs.
    app.config.globalProperties.$events = mitt();

    // TODO: Try and figure out .env variables that aren't compiled
    app.config.globalProperties.$isDebug = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    return app;
};
