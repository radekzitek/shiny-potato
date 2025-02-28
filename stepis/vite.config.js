import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), sentryVitePlugin({
    org: "radek-zitek",
    project: "javascript-vue"
  })],

  build: {
    sourcemap: true
  }
})