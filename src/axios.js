import axios from "axios";
import store from "./store/index";
import { getToken } from "~/composables/auth.js"
import { toast } from "~/composables/util"
const service = axios.create({
  baseURL: "/api",
})


// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //往header头自动添加token
  const token = getToken()
  if (token) {
    config.headers["Authorization"] = "Bearer " + token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
service.interceptors.response.use(function (response) {
  //对响应数据进行处理
  return response.data.data; //后续请求响应数据写起来更加优雅
}, function (error) {
  const msg = error.response.data.msg || "请求失败"
  if (msg == "需要登录") {
    store.dispatch("logout").catch((err)=>console.log(err)).finally(()=>location.reload)
  }
  toast(msg, "error",)
  return Promise.reject(error);
});

export default service