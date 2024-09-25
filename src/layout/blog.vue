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
      <el-col :xs="0" :sm="6" :md="6" :lg="4" :xl="4">
        <NavAside
          position="left"
          advertise-msg="全局广告位"
          advertise-img="/advertising.png"
          advertise-href="mailto:2115883273@qq.com
                          ?subject=博客广告位购买%0A
                          全局广告位一月150/位%0A
                          单篇文章永久广告位100/位
                          &body=我的联系方式是:%0A
                          我想租用的广告位类型(文章位请填写文章链接):%0A
                          我想租用的时间(文章位请无视):%0A
                          我的广告信息(附带图片和不超过二十字的描述信息):
        "
        ></NavAside>
      </el-col>

      <el-col
        :xs="24"
        :sm="18"
        :md="18"
        :lg="percentForMainAndRight.main"
        :xl="percentForMainAndRight.main"
        style="transition: 0.5s"
      >
        <el-main class="mt-[60px]">
          <router-view v-slot="{ Component }">
            <component :is="Component" ref="componentRef"> </component>
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
        style="transition: 0.5s"
      >
        <NavAside
          position="right"
          v-if="componentRef"
          :advertise-msg="componentRef.oneData?.advertiseMsg"
          :advertise-img="
            config.serviveUrl + 'img/' + componentRef.oneData?.advertiseImg
          "
          :advertise-href="componentRef.oneData?.advertiseHref"
        ></NavAside>
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
      <a class="text-xs" target="_blank" href="https://github.com/Lijingwoquan"
        >© 2024 罹景偓佺的博客 By 罹景.本站博客未经授权禁止转载.
      </a>
      <a
        class="text-xs"
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
import { config } from "/config.js";

const NavHeader = defineAsyncComponent(() =>
  import("./components/user/NavHeader.vue")
);
const NavAside = defineAsyncComponent(() =>
  import("./components/user/NavAside.vue")
);
import { throttle } from "~/composables/util.js";

let mainDom = null;

const componentRef = ref(null);

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

  if (event.clientY != event.pageY) {
    // event.clientY != event.pageY 可以简单理解为出现滚动条的情况
    if (event.wheelDeltaY > 0) {
      //向上滑动
      headerContainerDom.classList.remove("disappear-animate");
      headerContainerDom.classList.add("occur-animate");
      if (navAnchor) {
        navAnchor.classList.remove("nav-anchor-up-action");
        navAnchor.classList.add("nav-anchor-down-action");
      }
    } else if (event.wheelDeltaY < 0) {
      //向下滑动
      headerContainerDom.classList.remove("occur-animate");
      headerContainerDom.classList.add("disappear-animate");
      if (navAnchor) {
        navAnchor.classList.remove("nav-anchor-down-action");
        navAnchor.classList.add("nav-anchor-up-action");
      }
    }
  }
};

onMounted(() => {
  mainDom = document.querySelector(".el-main");
  mainDom.addEventListener("wheel", throttle(wheelAction, 50));
});
onUnmounted(() => {
  mainDom.removeEventListener("wheel", throttle(wheelAction, 50));
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
