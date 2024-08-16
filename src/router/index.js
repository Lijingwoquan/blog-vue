import { createRouter, createWebHistory } from "vue-router";

import { config } from "/config.js";
import Login from "~/pages/login.vue";
import blog from "~/layout/blog.vue";
import blogAdmin from "~/layout/blogAdmin.vue";

import userIndex from "~/pages/userIndex.vue";
import userClassify from "~/pages/userClassify.vue";
import userEssay from "~/pages/userEssay.vue";

import adminIndex from "~/pages/adminIndex.vue";
import adminCreateEssay from "~/pages/adminCreateEssay.vue";
import adminManageEssay from "~/pages/adminManageEssay.vue";
import adminUpdateData from "~/pages/adminUpdateData.vue";

import NotFound from "~/pages/404.vue";

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

const userIndexPage = {
  path: "/",
  component: userIndex,
  meta: {
    title: "首页",
  },
};

const adminPages = [
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
  router.addRoute("blog", userIndexPage);
}

//添加管理路由
export function addAdminIndexRouter() {
  adminPages.forEach((element) => {
    router.addRoute("blogAdmin", element);
  });
}

//动态添加路由
export function addIndexRouters(dataAboutIndexMenu) {
  //是否有新的路由
  let hasNewRoutes = false;
  const findAndAddRoutes = (menu) => {
    menu.forEach((DataAboutIndexMenu) => {
      let classifyDetails = DataAboutIndexMenu.classifyDetails;
      if (classifyDetails == null) {
        return;
      }
      classifyDetails.forEach((Details) => {
        let classifyPath = Details.router;
        let classify = {
          path: "/classify" + classifyPath,
          component: userClassify,
          meta: {
            title: Details.name,
          },
        };

        if (!router.hasRoute(classify.path)) {
          hasNewRoutes = true;
          router.addRoute("blog", classify);
        }
      });
    });
  };
  findAndAddRoutes(dataAboutIndexMenu);

  //当前全部得到路由
  return hasNewRoutes;
}

export function addEssayRouters(essayList) {
  essayList.forEach((essayMSg) => {
    let essayRouter = essayMSg.router;
    let essayKind = essayMSg.kind;
    let essay = {
      path: `/essay/${essayKind}/${essayRouter}`,
      component: userEssay,
      meta: {
        title: essayMSg.name,
      },
      name: "/essay" + essayKind + essayRouter,
    };
    if (!router.hasRoute(essay.path)) {
      router.addRoute("blog", essay);
    }
  });
}
