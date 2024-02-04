import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

import Index from '~/pages/index.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/login.vue'
//默认路由 所有用户共享
const routes = [{
    path: "/",
    name: "index",
    component: Index,
}, {
    path: "/login",
    component: Login
}, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
},]



export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//动态添加路由
export function addRouters(dataAboutIndexMenu) {
    const findAndAddRoutes = (arr) => {
        arr.forEach(element => {
            let classifyDetails = element.classifyDetails
            classifyDetails.forEach(Details => {
                let currentPath = Details.router
                let item = {
                    path: currentPath,
                    name: currentPath,
                    component: Index,  // 这里你可能需要根据实际情况修改
                    meta: {
                        title: Details.name
                    }
                };
                if (!router.hasRoute(item.name)) {
                    router.addRoute("index", item)
                }

                let childArr = Details.essay
                if (childArr && childArr.length > 0) {
                    findAndAddRoutesForChild(currentPath,childArr)
                }
            })

        });
    }
    const findAndAddRoutesForChild = (parentRouter,arr) => {
        arr.forEach(element => {
            let currentPath = element.router
            let item = {
                path: parentRouter+currentPath,
                name: parentRouter+currentPath,
                component: Index,  // 这里你可能需要根据实际情况修改
                meta: {
                    title: element.name
                }
            };
            if (!router.hasRoute(parentRouter+currentPath)) {
                router.addRoute("index", item)
            }
        });
    }
    findAndAddRoutes(dataAboutIndexMenu)
    //当前全部得到路由
    console.log(router.getRoutes())
}