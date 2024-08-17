import { ElNotification } from "element-plus";
import { ElLoading } from "element-plus";

import nprogress from "nprogress";
import { reactive } from "vue";
//成功提示
export function toast(message, type = "success") {
  ElNotification({
    message: message,
    type: type,
    duration: 1500,
  });
}

export async function showLoading(text = "正在加载中...") {
  const loading = ElLoading.service({
    lock: true,
    text: text,
    background: "rgba(0, 0, 0, 0.7)",
  });
  await new Promise((resolve) => setTimeout(resolve, 500));
  loading.close();
}

//显示全局loading
export function showFullLoading() {
  nprogress.start();
}

//隐藏全局loading
export function hideFullLoading() {
  nprogress.done();
}

export function listenWindowWidth() {
  let currentScreenWidth;

  // 获取初始屏幕宽度
  currentScreenWidth = window.innerWidth;

  // 监听窗口resize事件
  window.addEventListener("resize", () => {
    // 获取新的屏幕宽度
    const newScreenWidth = window.innerWidth;

    // 如果新旧宽度不同,执行相应操作
    if (newScreenWidth !== currentScreenWidth) {
      // 更新当前宽度
      currentScreenWidth = newScreenWidth;

      // 执行相应操作,如更新UI布局等
      updateLayout(newScreenWidth);
    }
  });
}

// 节流函数
export function throttle(fn, delay) {
  let timer = null;
  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

// 将query参数转为url
export function queryToUrl(query) {
  let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`);
    }
  }
  let r = q.join("&");
  r = r ? "?" + r : "";
  return r;
}

export function listenScreen(opt = {}) {
  const sizeObj = reactive({});

  const handleResize = () => {
    if (Object.keys(opt.resize).length > 0) {
      let resize = opt.resize;
      let facility = "computer";
      if (resize.windowWidth < 768) {
        facility = "mobile";
      }
      for (let k in resize.facilityStandard[facility]) {
        sizeObj[k] = resize.facilityStandard[facility][k];
      }
    }
  };

  const handelOnKeyUp = (e) => {
    if (Object.keys(opt.onKeyUp).length > 0) {
      let onKeyUp = opt.onKeyUp;
      if (e.key == "Enter" && onKeyUp.visiable.value == true) {
        onKeyUp.getData();
      }
    }
  };
  return {
    sizeObj,
    handleResize,
    handelOnKeyUp,
  };
}
