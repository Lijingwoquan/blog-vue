<template>
  <div class="nav-aside" ref="navAsideRef">
    <div class="advertising">
      <img
        src="https://liuzihao.online:8080/api/img/12.png"
        alt="广告图片信息"
      />
      <div class="msg">
        <p>广告位招商</p>
        <a
          href="mailto:2115883273@qq.com?subject=博客广告位购买&body=我的联系方式是:"
          style="text-decoration: underline"
          >联系我</a
        >
      </div>
      <div class="icon" @click="closeAdvertising">
        <el-icon><Close /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

import { throttle } from "~/composables/util";

const navAsideRef = ref(null);

const handleResize = () => {
  const windowWinth = window.innerWidth;
  const navAsideWidht = windowWinth * (3.8 / 24) + "px";
  if (navAsideRef.value) {
    navAsideRef.value.style.width = navAsideWidht;
  }
  document.documentElement.style.setProperty("--nav-width", navAsideWidht);
};

const closeAdvertising = () => {
  const advertising = document.querySelector(".advertising");
  advertising.style.opcity = 0;
};

onMounted(() => {
  window.addEventListener("resize", throttle(handleResize, 200));
  handleResize();
});
onUnmounted(() => {
  window.removeEventListener("resize", throttle(handleResize, 200));
});
</script>

<style scoped>
:root {
  --nav-width: 0;
}
.nav-aside {
  @apply fixed top-[140px] left-0;
}
.nav-aside .advertising {
  @apply relative flex flex-col justify-between items-center w-[var(--nav-width)] h-[var(--nav-width)];
  background-color: rgb(200, 236, 240);
}
.nav-aside .advertising img {
  @apply w-[85%] h-auto mt-5;
}
.nav-aside .advertising .msg {
  @apply w-[100%] font-mono font-bold text-xs leading-[1.5rem] text-gray-400;
  text-align: center;
}
.nav-aside .advertising .icon {
  @apply absolute bottom-0 right-0 w-4 h-4 cursor-pointer;
  content: "";
  color: red;
}
</style>
