import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import prismjs from 'vite-plugin-prismjs';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  plugins: [
    vue(),
    WindiCSS(),
    prismjs({
            languages: ['go','css','bash','shell','sql','dockerfile','docker','git','json','typescript','javascript',"html"],
        }),
  ],
  optimizeDeps: {
    include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],
  },
})







