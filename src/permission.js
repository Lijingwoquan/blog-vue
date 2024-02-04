import { router,addRouters } from "~/router"
import {
    toast,
    showFullLoading,
    hideFullLoading
} from "~/composables/util"
import { getToken } from "~/composables/auth"
import store from "./store"

//全局前置守卫
let hasGetInfo = false

router.beforeEach(async (to, from, next) => {
    //显示loading
    showFullLoading()

    const token = getToken()

    //没有登录,强制跳转到登录页面
    if (!token && to.path !="/login") {
        toast("请先登录", "error")
        return next({ path: "/login" })
    }
    //防止重复登录
    if (token && to.path == "/login") {
        toast("请勿重复登录", "warning")
        return next({ path:from.path ? from.path :"/"}) 
    }
    //如果用户登录了,自动获取用户信息,并且储存到vuex中
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
        let  {dataAboutIndexMenu}  = await store.dispatch("getIndexInfo")
        // {dataAboutIndexMenu} 是解构 把res 里面的dataAboutIndexMenu解构出来
        hasGetInfo = true
        //动态添加路由
        hasNewRoutes = addRouters(dataAboutIndexMenu)
        console.log(hasNewRoutes)
    }
    
      hasNewRoutes ? next(to.fullPath) : next();  //what mean?
});

router.afterEach((to, from) => {
    //隐藏loading
    hideFullLoading()
});