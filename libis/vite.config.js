import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true,
  },
  
  plugins: [vue(), vueDevTools(), sentryVitePlugin({
    org: "radek-zitek",
    project: "javascript-vue"
  })],

  build: {
    sourcemap: true
  }
})