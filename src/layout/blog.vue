<template>
  <div class="background-color"></div>
  <el-backtop
    class="hidden-sm-and-up"
    :right="40"
    :bottom="30"
    :visibility-height="300"
  />

  <el-container>
    <el-header style="padding: 0">
      <NavHeader ref="navHeaderRef" @openSearch="handleOpenSearch" />
    </el-header>

    <el-row>
      <el-main>
        <router-view v-slot="{ Component }">
          <component :is="Component"> </component>
        </router-view>
      </el-main>
    </el-row>
  </el-container>

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
import { ref, onMounted, watch, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import NavHeader from "~/components/user/NavHeader.vue";
import NavAside from "~/components/user/NavAside.vue";
import { throttle } from "~/composables/util.js";

const navHeaderRef = ref(null);

const essayComponent = ref(null);

const handleOpenSearch = () => {
  if (essayComponent.value) {
    essayComponent.value.showAnchorIcon();
  }
};

const headerAction = async (event) => {
  const headerContainerDom = document.getElementById("headerContainer");
  // 向上滑动
  if (event.wheelDeltaY > 0 && event.clientY != event.pageY) {
    // event.clientY != event.pageY 可以简单理解为出现滚动条的情况
    headerContainerDom.classList.remove("disappear-animate");
    setTimeout(() => {
      headerContainerDom.classList.add("occur-animate");
      headerContainerDom.classList.add("headerContainerFixed");
    }, 100);
  } else if (
    headerContainerDom.classList.contains("occur-animate") &&
    event.wheelDeltaY < 0
  ) {
    headerContainerDom.classList.remove("occur-animate");
    setTimeout(() => {
      headerContainerDom.classList.add("disappear-animate");
    }, 100);
  } else {
    headerContainerDom.classList.remove("headerContainerFixed");
  }
};

let mainDom = null;

onMounted(() => {
  mainDom = document.querySelector(".el-main");
  mainDom.addEventListener("wheel", throttle(headerAction));
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
