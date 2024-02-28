import { useCookies } from '@vueuse/integrations/useCookies';
import { useRouter } from 'vue-router'
const tokenKey = "token"
const cookie = useCookies()
const router = useRouter()

//获取token
export function getToken() {
    return cookie.get(tokenKey)
}
//设置token
export function setToken(token) {
    return cookie.set(tokenKey, token)
}
//移除token
export function removeToken() {
    return cookie.remove(tokenKey)
}

