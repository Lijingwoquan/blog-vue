import { createRouter, createWebHistory } from "vue-router";

import { config } from "/config.js";

const Login = () => import("~/pages/login.vue");
const blog = () => import("~/layout/blog.vue");
const blogAdmin = () => import("~/layout/blogAdmin.vue");

const userIndex = () => import("~/pages/userIndex.vue");
const userClassify = () => import("~/pages/userClassify.vue");
const userEssay = () => import("~/pages/userEssay/list.vue");

const adminIndex = () => import("~/pages/adminIndex.vue");
const adminCreateEssay = () => import("~/pages/adminCreateEssay.vue");
const adminManageEssay = () => import("~/pages/adminManageEssay.vue");
const adminUpdateData = () => import("~/pages/adminUpdateData/list.vue");
const NotFound = () => import("~/pages/404.vue");

//默认路由 所有用户共享
const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: blog,
    name: "blog",
  },
  {
    path: `${config.MANAGER_URL}`,
    component: blogAdmin,
    name: "blogAdmin",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const userIndexRouter = {
  path: "/",
  component: userIndex,
  meta: {
    title: "首页",
  },
};

const adminRouters = [
  {
    path: `${config.MANAGER_URL}/`,
    component: adminIndex,
    meta: {
      title: "后台首页",
    },
  },
  {
    path: `${config.MANAGER_URL}/createEssay`,
    component: adminCreateEssay,
    meta: {
      title: "新建文章",
    },
  },
  {
    path: `${config.MANAGER_URL}/manageEssay`,
    component: adminManageEssay,
    meta: {
      title: "管理文章",
    },
  },
  {
    path: `${config.MANAGER_URL}/updateData`,
    component: adminUpdateData,
    meta: {
      title: "更新数据",
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

//添加首页路由
export function addUserIndexRouter() {
  let hasNewRoutes = false;
  if (!router.hasRoute(userIndexRouter.path)) {
    hasNewRoutes = true;
    router.addRoute("blog", userIndexRouter);
  }
  return hasNewRoutes;
}

//添加管理路由
export function addAdminIndexRouter() {
  adminRouters.forEach((component) => {
    if (!router.hasRoute(component.path)) {
      router.addRoute("blogAdmin", component);
      // hasNewRoutes = true;
    }
  });
}

//动态添加路由
export function addIndexMenuRouters(menu) {
  //是否有新的路由
  let hasNewRoutes = false;
  const findAndAddRoutes = (menu) => {
    menu.forEach((o) => {
      let classifyList = o.classifyList;
      classifyList.forEach((classifyObj) => {
        let classify = {
          path: decodeURIComponent("/classify" + classifyObj.router),
          component: userClassify,
          meta: {
            title: classifyObj.name,
          },
        };
        if (!router.hasRoute(classify.path)) {
          hasNewRoutes = true;
          router.addRoute("blog", classify);
        }
      });
    });
  };

  findAndAddRoutes(menu);

  return hasNewRoutes;
}

export function addEssayRouters(essayRoute) {
  let hasNewRoutes = false;
  let essay = {
    path: essayRoute,
    component: userEssay,
    meta: {
      title: essayRoute,
    },
    name: essayRoute,
  };

  if (!router.hasRoute(essayRoute)) {
    hasNewRoutes = true;
    router.addRoute("blog", essay);
  }
  return hasNewRoutes;
}
