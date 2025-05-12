// vite.config.docs.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    base: '/vue-dynamic-table-builder/', // ← matches your GitHub repo name
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src/lib', import.meta.url)),
            '@demo': fileURLToPath(new URL('./src/demo', import.meta.url)),
        },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: fileURLToPath(new URL('./index.html', import.meta.url)),
        },
    },
});
