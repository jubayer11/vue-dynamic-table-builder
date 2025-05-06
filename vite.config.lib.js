// vite.config.lib.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src/lib', import.meta.url)),
        },
    },
    build: {
        lib: {
            entry: fileURLToPath(new URL('./src/lib/index.js', import.meta.url)),
            name: 'VueDynamicTableBuilder',
            fileName: (format) => `vue-dynamic-table-builder.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css' || assetInfo.name?.endsWith('.css')) {
                        return 'style.css'; // ✅ always output CSS as style.css
                    }
                    return assetInfo.name;
                },
            },
        },
        cssCodeSplit: true,
    },
});
