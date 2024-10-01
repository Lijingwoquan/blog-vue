import axios from "axios";
import { toast } from "~/composables/util.js";
import { getToken } from "~/composables/auth.js";
import { removeToken } from "~/composables/auth";
import { router } from "./router";
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    //往header头自动添加token
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    //对响应数据进行处理
    return response.data.data; //后续请求响应数据写起来更加优雅
  },
  function (error) {
    // 检查 error.response 是否存在
    if (error.response) {
      const msg = error.response.data.msg || "请求失败";
      if (msg === "需要登录") {
        removeToken();
        router.push("/login");
      }
      toast(msg, "error");
      return Promise.reject(msg); // 返回 msg
    } else {
      // 网络错误或其他错误情况
      toast("请求失败", "error");
      return Promise.reject("请求失败");
    }
  }
);

export default service;
