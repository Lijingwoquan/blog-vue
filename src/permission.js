import {
  router,
  addIndexRouters,
  addUserIndexRouter,
  addAdminIndexRouter,
  addEssayRouters,
} from "~/router/index.js";
import { toast, showFullLoading, hideFullLoading } from "~/composables/util";
import { getToken } from "~/composables/auth";
import store from "./store";
import { config } from "/config.js";

//全局前置守卫
let hasGetInfo = false;

router.beforeEach(async (to, from, next) => {
  //显示loading
  showFullLoading();

  // 去除路由最后的"/"
  const toPath = to.path.length > 1 ? to.path.replace(/\/$/, "") : to.path;

  if (toPath.split("/")[1] && toPath.split("/")[1] == "essay") {
    console.log("aaa");
    console.log(toPath);
    await addEssayRouters(toPath);
  }

  if (toPath === `${config.MANAGER_URL}`) {
    const token = getToken();
    //没有登录,强制跳转到登录页面
    if (!token && to.path != "/login") {
      toast("请先登录", "error");
      return next({ path: "/login" });
    }
    //防止重复登录
    if (token && to.path == "/login") {
      toast("请勿重复登录", "warning");
      return next({ path: from.path ? from.path : `${config.MANAGER_URL}` });
    }
  }

  let hasNewRoutes = false;
  if (!hasGetInfo) {
    let { dataAboutIndexMenu } = await store.dispatch("getIndexInfo");
    hasGetInfo = true;
    //添加路由首页路由
    addUserIndexRouter();
    addAdminIndexRouter();
    //动态添加路由
    hasNewRoutes = addIndexRouters(dataAboutIndexMenu);
  }
  hasNewRoutes
    ? next({ path: toPath, query: to.query, hash: to.hash })
    : next();
});

router.afterEach((to, from) => {
  //隐藏loading
  hideFullLoading();
});
