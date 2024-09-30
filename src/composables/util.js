import { ElNotification } from "element-plus";
import { ElLoading } from "element-plus";

import nprogress from "nprogress";
import { reactive, ref } from "vue";
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
  await new Promise((resolve) => setTimeout(resolve, 800));
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
export function throttle(fn, delay = 200) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return; // 如果距离上次调用时间小于delay，则不执行
    }
    lastCall = now;
    return fn.apply(this, args);
  };
}

// 防抖函数
export function debounce(fn, delay = 200) {
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
  const facility = ref("");
  const resize = () => {
    let windowWidth = window.innerWidth;
    let facilityType = "computer";
    if (windowWidth < 768) {
      facilityType = "mobile";
    } else if (768 <= windowWidth && windowWidth < 992) {
      facilityType = "ipad";
    }
    facility.value = facilityType;

    if (opt.resizeFunc && typeof opt.resizeFunc === "function") {
      opt.resizeFunc(facility.value);
    }
  };

  const handleResize = throttle(resize, 100);

  handleResize();
  const handelOnKeyUp = (e) => {
    if (Object.keys(opt.onKeyUp).length > 0) {
      let onKeyUp = opt.onKeyUp;
      if (
        e.key == "Enter" &&
        onKeyUp.visiable &&
        onKeyUp.visiable.value == true
      ) {
        onKeyUp.getData();
      } else if (e.key == "Enter") {
        onKeyUp.getData();
      }
    }
  };
  return {
    facility,
    handleResize,
    handelOnKeyUp,
  };
}

export function diffrentFacilifyMap(facility, opt = {}) {
  switch (facility) {
    case "computer":
      return opt.computer;
      break;
    case "ipad":
      return opt.ipad;
      break;
    default:
      return opt.mobile;
  }
}
