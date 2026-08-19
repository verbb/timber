import path from 'path';
import AnalyzePlugin from 'rollup-plugin-analyzer';
import CompressionPlugin from 'vite-plugin-compression';

// Web-components utility bundle (Plugin Kit v2), modelled on Hyper.
// Two entries: `pluginKit` registers the `pk-*` custom elements first, then the
// `timber` app entry mounts the log-viewer once those elements are defined.
export default {
    root: './src/web/assets',
    base: '',

    build: {
        outDir: 'utility/dist',
        emptyOutDir: true,
        manifest: 'manifest.json',
        sourcemap: true,
        rollupOptions: {
            input: {
                pluginKit: '/utility/src/js/plugin-kit-register.ts',
                timber: '/utility/src/js/timber.ts',
            },
        },
    },

    server: {
        origin: 'http://localhost:4020',
        hmr: { protocol: 'ws' },
    },

    plugins: [
        AnalyzePlugin({ summaryOnly: true, limit: 10 }),
        CompressionPlugin({ filter: /\.(js|mjs|json|css|map)$/i }),
    ],

    resolve: {
        alias: { '@': path.resolve('./src/web/assets/utility/src') },
        preserveSymlinks: false,
    },

    optimizeDeps: { include: ['lodash-es', 'socket.io-client'] },
};
