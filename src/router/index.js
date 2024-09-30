import { createRouter, createWebHistory } from "vue-router";
import { config } from "/config.js";

// 使用命名的动态导入
const Login = () => import(/* webpackChunkName: "login" */ "~/pages/login.vue");
const Blog = () => import(/* webpackChunkName: "blog" */ "~/layout/blog.vue");
const BlogAdmin = () =>
  import(/* webpackChunkName: "blogAdmin" */ "~/layout/blogAdmin.vue");
const NotFound = () =>
  import(/* webpackChunkName: "notFound" */ "~/pages/404.vue");

// 将用户相关页面分组
const UserPages = {
  Index: () => import(/* webpackChunkName: "user" */ "~/pages/userIndex.vue"),
  Classify: () =>
    import(/* webpackChunkName: "user" */ "~/pages/userClassify.vue"),
  Essay: () =>
    import(/* webpackChunkName: "user" */ "~/pages/userEssay/list.vue"),
};

// 将管理员相关页面分组
const AdminPages = {
  Index: () => import(/* webpackChunkName: "admin" */ "~/pages/adminIndex.vue"),
  CreateEssay: () =>
    import(/* webpackChunkName: "admin" */ "~/pages/adminCreateEssay.vue"),
  ManageEssay: () =>
    import(/* webpackChunkName: "admin" */ "~/pages/adminManageEssay.vue"),
  UpdateData: () =>
    import(/* webpackChunkName: "admin" */ "~/pages/adminUpdateData/list.vue"),
};

// 默认路由 所有用户共享
const routes = [
  { path: "/login", component: Login },
  { path: "/", component: Blog, name: "blog" },
  { path: `${config.MANAGER_URL}`, component: BlogAdmin, name: "blogAdmin" },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 添加首页路由
export function addUserIndexRouter() {
  if (!router.hasRoute("/")) {
    router.addRoute("blog", {
      path: "/",
      component: UserPages.Index,
      meta: { title: "首页" },
    });
    return true;
  }
  return false;
}

// 添加管理路由
export function addAdminIndexRouter() {
  const adminRoutes = [
    {
      path: `${config.MANAGER_URL}/`,
      component: AdminPages.Index,
      meta: { title: "后台首页" },
    },
    {
      path: `${config.MANAGER_URL}/createEssay`,
      component: AdminPages.CreateEssay,
      meta: { title: "新建文章" },
    },
    {
      path: `${config.MANAGER_URL}/manageEssay`,
      component: AdminPages.ManageEssay,
      meta: { title: "管理文章" },
    },
    {
      path: `${config.MANAGER_URL}/updateData`,
      component: AdminPages.UpdateData,
      meta: { title: "更新数据" },
    },
  ];

  adminRoutes.forEach((route) => {
    if (!router.hasRoute(route.path)) {
      router.addRoute("blogAdmin", route);
    }
  });
}

// 动态添加路由
export function addIndexMenuRouters(menu) {
  let hasNewRoutes = false;
  menu.forEach((o) => {
    o.classifyList.forEach((classifyObj) => {
      const path = decodeURIComponent("/classify" + classifyObj.router);
      if (!router.hasRoute(path)) {
        router.addRoute("blog", {
          path,
          component: UserPages.Classify,
          meta: { title: classifyObj.name },
        });
        hasNewRoutes = true;
      }
    });
  });
  return hasNewRoutes;
}

export function addEssayRouters(essayRoute) {
  if (!router.hasRoute(essayRoute)) {
    router.addRoute("blog", {
      path: essayRoute,
      component: UserPages.Essay,
      meta: { title: essayRoute },
      name: essayRoute,
    });
    return true;
  }
  return false;
}
