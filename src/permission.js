import {
  router,
  addIndexMenuRouters,
  addUserIndexRouter,
  addAdminIndexRouter,
  addEssayRouters,
} from "~/router/index.js";
import { toast, showFullLoading, hideFullLoading } from "~/composables/util";
import { getToken } from "~/composables/auth";
import store from "~/store/index.js";
import { config } from "/config.js";

//全局前置守卫
let hasGetInfo = false;
router.beforeEach(async (to, from, next) => {
  //显示loading
  showFullLoading();

  // 去除路由最后的"/"
  const toPath = decodeURIComponent(
    to.path.length > 1 ? to.path.replace(/\/$/, "") : to.path
  );
  if (toPath.split("/")[1] === config.MANAGER_URL.split("/")[1]) {
    addAdminIndexRouter();
    const token = getToken();
    //没有登录,强制跳转到登录页面
    if (!token && to.path != "/login") {
      toast("请先登录", "error");
      return next({ path: "/login" });
    }
    //防止重复登录
    if (token && to.path == "/login") {
      toast("请勿重复登录", "warning");
      return next({
        path: from.path
          ? decodeURIComponent(from.path)
          : `${config.MANAGER_URL}`,
      });
    }
  }

  let hasNewRoutes = false;
  if (!hasGetInfo) {
    let { menu } = await store.dispatch("getIndexInfo");
    hasGetInfo = true;
    //添加路由首页路由
    addUserIndexRouter();
    //动态添加路由
    hasNewRoutes = addIndexMenuRouters(menu);
  }

  if (toPath.split("/")[1] && toPath.split("/")[1] === "essay") {
    hasNewRoutes = addEssayRouters(toPath);
  }
  hasNewRoutes
    ? next({ path: toPath, query: to.query, hash: to.hash })
    : next();
});

router.afterEach((to, from) => {
  //隐藏loading
  hideFullLoading();
});
