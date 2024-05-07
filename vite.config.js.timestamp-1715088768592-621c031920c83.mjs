// vite.config.js
import { defineConfig } from "file:///E:/0.web/blog/node_modules/.store/vite@5.2.11/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/0.web/blog/node_modules/.store/@vitejs+plugin-vue@4.6.2/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import WindiCSS from "file:///E:/0.web/blog/node_modules/.store/vite-plugin-windicss@1.9.3/node_modules/vite-plugin-windicss/dist/index.mjs";
import prismjs from "file:///E:/0.web/blog/node_modules/.store/vite-plugin-prismjs@0.0.11/node_modules/vite-plugin-prismjs/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "E:\\0.web\\blog";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8081/api",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  plugins: [
    vue(),
    WindiCSS(),
    prismjs({
      languages: ["go", "css", "bash", "shell", "sql", "dockerfile", "docker", "git", "json", "typescript", "javascript", "html"]
    })
  ],
  optimizeDeps: {
    include: ["@kangc/v-md-editor/lib/theme/vuepress.js"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFwwLndlYlxcXFxibG9nXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFwwLndlYlxcXFxibG9nXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8wLndlYi9ibG9nL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFdpbmRpQ1NTIGZyb20gJ3ZpdGUtcGx1Z2luLXdpbmRpY3NzJ1xuaW1wb3J0IHByaXNtanMgZnJvbSAndml0ZS1wbHVnaW4tcHJpc21qcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIn5cIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIilcbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzEyNy4wLjAuMTo4MDgxL2FwaScsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxuICAgICAgfSxcbiAgICB9XG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBXaW5kaUNTUygpLFxuICAgIHByaXNtanMoe1xuICAgICAgICAgICAgbGFuZ3VhZ2VzOiBbJ2dvJywnY3NzJywnYmFzaCcsJ3NoZWxsJywnc3FsJywnZG9ja2VyZmlsZScsJ2RvY2tlcicsJ2dpdCcsJ2pzb24nLCd0eXBlc2NyaXB0JywnamF2YXNjcmlwdCcsXCJodG1sXCJdLFxuICAgICAgICB9KSxcbiAgXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogWydAa2FuZ2Mvdi1tZC1lZGl0b3IvbGliL3RoZW1lL3Z1ZXByZXNzLmpzJ10sXG4gIH0sXG59KVxuXG5cblxuXG5cblxuXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStOLFNBQVMsb0JBQW9CO0FBQzVQLE9BQU8sU0FBUztBQUNoQixPQUFPLGNBQWM7QUFDckIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sVUFBVTtBQUpqQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsTUFDQSxXQUFXLENBQUMsTUFBSyxPQUFNLFFBQU8sU0FBUSxPQUFNLGNBQWEsVUFBUyxPQUFNLFFBQU8sY0FBYSxjQUFhLE1BQU07QUFBQSxJQUNuSCxDQUFDO0FBQUEsRUFDUDtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLDBDQUEwQztBQUFBLEVBQ3REO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
