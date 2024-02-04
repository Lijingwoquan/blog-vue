import { useCookies } from '@vueuse/integrations/useCookies';
const tokenKey = "token"
const cookie = useCookies()

//获取token
export function getToken() {
    return cookie.get(tokenKey)
}
//设置token
export function setToken(token) {
    return cookie.set(tokenKey,token)
}
//移除token
export function removeToken() {
    return cookie.remove(tokenKey)
}