import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'

import blog from '~/layout/blog.vue'
import Index from '~/pages/index.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/login.vue'
import Classify from "~/pages/classify.vue"
import Essay from "~/pages/essay.vue"
import Admin from "~/pages/admin.vue"

//默认路由 所有用户共享
const routes = [{
    path: "/",
    component: blog,
    name: "blog",
},
{
    path: "/login",
    component: Login
},
{
    path: "/admin/lzh",
    component: Admin
},
{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
},
]

const index = {
    path: "/",
    component: Index,
    meta: {
        title: "后台首页"
    }
}



export const router = createRouter({
    history: createWebHistory(),
    routes
})

//添加首页路由
export function addIndexRouter() {
    router.addRoute("blog", index)
}


//动态添加路由
export function addRouters(dataAboutIndexMenu) {
    //是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutes = (arr) => {
        arr.forEach(element => {
            let classifyDetails = element.classifyDetails
            if (classifyDetails == null) {
                return
            }
            classifyDetails.forEach(Details => {
                let classifyPath = Details.router
                let classify = {
                    path: "/classify" + classifyPath,
                    component: Classify,
                    meta: {
                        title: Details.name
                    }
                };

                if (!router.hasRoute(classify.path)) {
                    hasNewRoutes = true
                    router.addRoute("blog", classify)
                }

                let essayArr = Details.essay
                if (essayArr && essayArr.length > 0) {
                    findAndAddRoutesForChild(classifyPath, essayArr)
                }
            })

        });
    }
    const findAndAddRoutesForChild = (classifyPath, essayArr) => {
        essayArr.forEach(element => {
            let essayPath = element.router
            let essay = {
                path: "/essay" + classifyPath + essayPath,
                component: Essay,
                meta: {
                    title: element.name
                }
            };
            if (!router.hasRoute(essay.path)) {
                router.addRoute("blog", essay)
            }
        });
    }
    findAndAddRoutes(dataAboutIndexMenu)


    //当前全部得到路由
    return hasNewRoutes
}