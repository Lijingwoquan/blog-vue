import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs"; //中文语言包
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import App from "./App.vue";
import { router } from "~/router/index.js";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import VueResizeObserver from "vue-resize-observer"; // vue-resize-observer

import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

import store from "~/store/index.js";
import "~/style.css";

// highlightjs
import hljs from "highlight.js";

VMdEditor.use(vuepressTheme, {
  Hljs: hljs,
  config: {
    toc: {
      includeLevel: [1, 2, 3, 4, 5, 6],
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(store);
// app.use(VueResizeObserver);
app.use(VMdEditor);

app.use(ElementPlus, {
  locale: zhCn,
});

//全局引入elment plus图标的相关处理
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
import "virtual:windi.css";

import "./permission";

import "nprogress/nprogress.css";

app.mount("#app");
