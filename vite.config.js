import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import prismjs from "vite-plugin-prismjs";
import path from "path";

// ElementPlus自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
    prismjs({
      languages: [
        "go",
        "css",
        "bash",
        "shell",
        "sql",
        "dockerfile",
        "docker",
        "git",
        "json",
        "typescript",
        "javascript",
        "html",
      ],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // 自动注册ElementPlus组件
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  optimizeDeps: {
    include: ["@kangc/v-md-editor/lib/theme/vuepress.js"],
  },
});
