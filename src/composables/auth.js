import { useCookies } from "@vueuse/integrations/useCookies";
const tokenKey = "token";
const indexPageKey = "index-page";
const ExpendAside = "expend";

const cookie = useCookies();

//获取token
export function getToken() {
  return cookie.get(tokenKey);
}
//设置token
export function setToken(token) {
  return cookie.set(tokenKey, token);
}

export function removeToken(token) {
  return cookie.remove(tokenKey);
}

//设置首页页码
export function setIndexPage(page) {
  return cookie.set(indexPageKey, page);
}
//获取首页页码
export function getIndexPage() {
  return cookie.get(indexPageKey);
}

//获取expend
export function getExpendAside() {
  return cookie.get(ExpendAside);
}
//设置expend
export function setExpendAside(value) {
  return cookie.set(ExpendAside, value);
}
