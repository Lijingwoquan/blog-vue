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
      <NavHeader ref="navHeaderRef" />
    </el-header>

    <el-row :gutter="0">
      <el-col :span="4">
        <div>
          <NavAside id="navAside"></NavAside>
        </div>
      </el-col>
      <el-col :span="17">
        <el-main :style="{ marginTop: marginTop }">
          <router-view v-slot="{ Component }">
            <component :is="Component"> </component>
          </router-view>
        </el-main>
      </el-col>

      <el-col :span="3"></el-col>
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
import { ref, onMounted, onUnmounted, computed } from "vue";
import NavHeader from "~/components/user/NavHeader.vue";
import NavAside from "~/components/user/NavAside.vue";
import { throttle } from "~/composables/util.js";

let mainDom = null;

const wheelAction = (event) => {
  const headerContainerDom = document.getElementById("header-container");
  const navAsideDom = document.getElementById("navAside");
  // 向上滑动 出现
  if (event.wheelDeltaY > 0 && event.clientY != event.pageY) {
    // event.clientY != event.pageY 可以简单理解为出现滚动条的情况
    headerContainerDom.classList.remove("disappear-animate");
    headerContainerDom.classList.add("occur-animate");
    console.log(headerContainerDom.classList);
    mainDom.classList.remove("el-main-up-action");
    mainDom.classList.add("el-main-down-action");
  } else if (event.wheelDeltaY < 0) {
    headerContainerDom.classList.remove("occur-animate");
    headerContainerDom.classList.add("disappear-animate");

    mainDom.classList.remove("el-main-down-action");
    mainDom.classList.add("el-main-up-action");
  } else {
  }
};

const navHeaderRef = ref(null);

const marginTop = computed(() => {
  return navHeaderRef.value?.facility === "computer" ? "145px" : "65px";
});

onMounted(() => {
  mainDom = document.querySelector(".el-main");
  mainDom.addEventListener("wheel", throttle(wheelAction, 300));
});
onUnmounted(() => {
  mainDom.removeEventListener("wheel", throttle(wheelAction, 300));
});
</script>

<style scoped>
:root {
  --top-gap: 140px;
}
.el-main {
  padding: 0;
}
.el-main-up-action {
  animation: 0.5s el-main-action linear forwards;
}
.el-main-down-action {
  animation: 0.5s el-main-action-reserve linear forwards;
}

@keyframes el-main-action {
  from {
    margintop: var(--top-gap);
  }
  to {
    margin-top: 0;
  }
}
@keyframes el-main-action-reserve {
  from {
    margin-top: 0;
  }
  to {
    margintop: var(--top-gap);
  }
}
.register {
  @apply flex flex-col justify-center items-center italic mt-10 mb-5;
}
</style>
