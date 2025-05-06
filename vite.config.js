import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/vue-dynamic-table-builder/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@demo': fileURLToPath(new URL('./src/demo', import.meta.url))
    },
  },

})
