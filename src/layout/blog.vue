<template>
  <div class="background-color"></div>
  <el-backtop
    class="hidden-sm-and-up"
    :right="40"
    :bottom="30"
    :visibility-height="300"
  />

  <el-container>
    <el-header style="padding: 0; height: 0">
      <NavHeader />
    </el-header>
    <el-row :gutter="0">
      <el-col :xs="0" :sm="6" :md="6" :lg="3" :xl="3">
        <NavAside position="left"></NavAside>
      </el-col>
      <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="1"> </el-col>

      <el-col
        :xs="24"
        :sm="17"
        :md="17"
        :lg="percentForMainAndRight.main"
        :xl="percentForMainAndRight.main"
      >
        <el-main class="mt-[60px]">
          <router-view v-slot="{ Component }">
            <component :is="Component"> </component>
          </router-view>
        </el-main>
      </el-col>

      <el-col
        class="bg-red-100 fixed h-[100vh] w-[100%] right-0"
        :xs="0"
        :sm="0"
        :md="0"
        :lg="percentForMainAndRight.right"
        :xl="percentForMainAndRight.right"
      >
        <NavAside position="right"></NavAside>
      </el-col>
    </el-row>
  </el-container>

  <div class="hidden-md-and-down">
    <el-icon
      v-if="navRightshow"
      class="fixed top-[50%] h-[40px] w-[20px] bg-light-200 cursor-pointer"
      style="
        border-radius: 0% 100% 100% 0% / 56% 50% 50% 44%;
        transform: translateX(100%);
        right: calc(4 / 24 * 100%);
      "
      @click="oprateRightIcon"
    >
      <DArrowRight />
    </el-icon>
    <el-icon
      v-else
      class="fixed top-[50%] h-[40px] w-[20px] bg-light-200 cursor-pointer"
      style="border-radius: 100% 0% 0% 100% / 56% 50% 50% 44%; right: 0"
      @click="oprateRightIcon"
    >
      <DArrowLeft
    /></el-icon>
  </div>

  <div style="width: 100%">
    <footer class="register">
      <a class="text-sm" target="_blank" href="https://github.com/Lijingwoquan"
        >© 2024 罹景偓佺的博客 By 罹景.本站博客未经授权禁止转载.
      </a>
      <a
        class="text-sm"
        target="_blank"
        href="https://beian.miit.gov.cn/#/Integrated/index"
        >备案信息:湘ICP备2024043210号.</a
      >
    </footer>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  computed,
  defineAsyncComponent,
} from "vue";
const NavHeader = defineAsyncComponent(() =>
  import("./components/user/NavHeader.vue")
);
const NavAside = defineAsyncComponent(() =>
  import("./components/user/NavAside.vue")
);
import { throttle } from "~/composables/util.js";

let mainDom = null;

const navRightshow = ref(true);

const percentForMainAndRight = computed(() => {
  return !navRightshow.value
    ? {
        main: 20,
        right: 0,
      }
    : {
        main: 16,
        right: 4,
      };
});

const oprateRightIcon = () => {
  if (navRightshow.value) {
    navRightshow.value = false;
  } else {
    navRightshow.value = true;
  }
};

const wheelAction = (event) => {
  const headerContainerDom = document.getElementById("header-container");
  const navAnchor = document.getElementById("navAnchor");
  // 向上滑动 出现
  if (event.wheelDeltaY > 0 && event.clientY != event.pageY) {
    // event.clientY != event.pageY 可以简单理解为出现滚动条的情况
    headerContainerDom.classList.remove("disappear-animate");
    headerContainerDom.classList.add("occur-animate");
    if (navAnchor) {
      navAnchor.classList.remove("nav-anchor-up-action");
      navAnchor.classList.add("nav-anchor-down-action");
    }
  } else if (event.wheelDeltaY < 0) {
    headerContainerDom.classList.remove("occur-animate");
    headerContainerDom.classList.add("disappear-animate");
    if (navAnchor) {
      navAnchor.classList.remove("nav-anchor-down-action");
      navAnchor.classList.add("nav-anchor-up-action");
    }
  }
};

onMounted(() => {
  mainDom = document.querySelector(".el-main");
  mainDom.addEventListener("wheel", throttle(wheelAction, 300));
});
onUnmounted(() => {
  mainDom.removeEventListener("wheel", throttle(wheelAction, 300));
});
</script>

<style scoped>
.el-main {
  padding: 0;
}

.register {
  @apply flex flex-col justify-center items-center italic mt-10 mb-5;
}
</style>
