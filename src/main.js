import { createApp } from "vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import App from "./App.vue";
import { router } from "~/router/index.js";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import store from "~/store/index.js";
import "~/style.css";

const app = createApp(App);
app.use(router);
app.use(store);

//全局引入elment plus图标的相关处理
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
import "virtual:windi.css";

import "./permission";

import "nprogress/nprogress.css";

app.mount("#app");
