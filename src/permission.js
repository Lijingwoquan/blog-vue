import { router, addRouters, addIndexRouter } from "~/router"
import {
    toast,
    showFullLoading,
    hideFullLoading
} from "~/composables/util"
import { getToken } from "~/composables/auth"
import store from "./store"
import { config } from "/config.js"

//全局前置守卫
let hasGetInfo = false


router.beforeEach(async (to, from, next) => {
    //显示loading
    showFullLoading()
    if (to.path === `/admin/${config.MANAGER_URL}`) {
        const token = getToken()
        //没有登录,强制跳转到登录页面
        if (!token && to.path != "/login") {
            toast("请先登录", "error")
            return next({ path: "/login" })
        }
        //防止重复登录
        if (token && to.path == "/login") {
            toast("请勿重复登录", "warning")
            return next({ path: from.path ? from.path : `/admin/${config.MANAGER_URL}` })
        }
    }

    let hasNewRoutes = false
    if (!hasGetInfo) {
        let { dataAboutIndexMenu } = await store.dispatch("getIndexInfo")
        // {dataAboutIndexMenu} 是解构 把res 里面的dataAboutIndexMenu解构出来
        hasGetInfo = true
        //添加路由首页路由
        addIndexRouter()

        //动态添加路由
        hasNewRoutes = addRouters(dataAboutIndexMenu)
    }

    hasNewRoutes ? next(to.fullPath) : next();
});

router.afterEach((to, from) => {
    //隐藏loading
    hideFullLoading()
});