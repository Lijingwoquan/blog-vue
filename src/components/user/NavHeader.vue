<template>
  <div
    id="header-container"
    :style="{ height: headerContainerHeight }"
    class="header-container"
  >
    <div class="header-container-top">
      <div class="flex items-center p-3">
        <el-icon
          class="hidden-md-and-up hover ml-4"
          size="1.2em"
          @click="drawerVisiableRef = true"
        >
          <Expand style="height: 100%; width: 100%" />
        </el-icon>

        <h5 @click="toIndex" class="title">罹景偓佺的博客</h5>
      </div>

      <div
        style="margin-left: auto"
        :style="{ width: facility == 'computer' ? '25%' : '40%' }"
        class="flex items-center justify-evenly"
      >
        <!-- search -->
        <el-icon
          :style="{ fontSize: facility == 'computer' ? '40px' : '20px' }"
          @click="openSearch"
        >
          <search
            :style="{ fontSize: facility == 'computer' ? '40px' : '20px' }"
          />
        </el-icon>
        <!--qq-->
        <a href="https://github.com/Lijingwoquan">
          <svg
            fill="#50c8fd"
            viewBox="0 0 24 24"
            :width="svgSize"
            :height="svgSize"
          >
            <path
              d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.239.425 6.287.687 6.287 0 0-.688-1.768-1.182-1.768-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.166-6.954-2.166-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </a>

        <!--wx-->
        <a href="https://github.com/Lijingwoquan">
          <svg
            fill="#60c84d"
            viewBox="0 0 24 24"
            :width="svgSize"
            :height="svgSize"
          >
            <path
              d="M2.224 21.667s4.24-1.825 4.788-2.056C15.029 23.141 22 17.714 22 11.898 22 6.984 17.523 3 12 3S2 6.984 2 11.898c0 1.86.64 3.585 1.737 5.013-.274.833-1.513 4.756-1.513 4.756zm5.943-9.707c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272zm7.583 0c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </a>

        <!-- github -->
        <a href="https://github.com/Lijingwoquan">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            :width="svgSize"
            :height="svgSize"
          >
            <path
              d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"
            ></path>
          </svg>
        </a>
      </div>
    </div>

    <NavKind class="hidden-sm-and-down header-container-bottom"></NavKind>
  </div>
  <el-drawer
    v-model="drawerVisiableRef"
    title="菜单"
    direction="ltr"
    size="250px"
    style="background-color: rgb(203, 221, 246)"
  >
    <template #default>
      <NavAsideForMobile></NavAsideForMobile>
    </template>
  </el-drawer>
  <searchEssay ref="searchEssayRef"></searchEssay>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  defineAsyncComponent,
  computed,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { listenScreen, diffrentFacilifyMap } from "~/composables/util.js";
const NavKind = defineAsyncComponent(() => import("./NavKind.vue"));
const NavAsideForMobile = defineAsyncComponent(() =>
  import("~/components/user/NavAsideForMobile.vue")
);
const searchEssay = defineAsyncComponent(() => import("./search.vue"));

const router = useRouter();
const route = useRoute();
const drawerVisiableRef = ref(false);
const toIndex = () => {
  router.push("/");
};

const { facility, handleResize } = listenScreen({
  resize: {},
});

const svgSize = computed(() => {
  return diffrentFacilifyMap(facility.value, {
    computer: "36px",
    ipad: "30px",
    mobile: "20px",
  });
});

const headerContainerHeight = computed(() => {
  return diffrentFacilifyMap(facility.value, {
    computer: "140px",
    ipad: "60px",
    mobile: "60px",
  });
});

const searchEssayRef = ref(null);
const openSearch = () => {
  searchEssayRef.value.open();
};

watch(
  () => route.path,
  () => {
    drawerVisiableRef.value = false;
  }
);

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

defineExpose({
  facility,
});
</script>

<style scoped>
.header-container {
  @apply flex flex-col fixed;
  inset: 0;
  z-index: 999;
  backdrop-filter: blur(5px);
}

.header-container-top {
  @apply flex  items-center w-[100%] h-[60px];
  background: linear-gradient(
    to right,
    rgba(42, 157, 202, 0.365),
    rgba(28, 171, 187, 0.384),
    rgba(255, 192, 203, 0.47),
    rgba(0, 255, 255, 0.53)
  );
}
.header-container-bottom {
  @apply h-[80px];
  background: linear-gradient(
    to right,
    rgba(21, 171, 231, 0.365),
    rgba(32, 198, 216, 0.384)
  );
  box-shadow: 0 0 4px rgb(52, 147, 224);
}

.header-container-fixed {
  @apply flex flex-col fixed top-0 left-0 right-0;
  opacity: 0;
}

.occur-animate {
  animation: 0.5s header-action ease-in-out forwards;
}
.disappear-animate {
  animation: 0.5s header-action ease-in-out forwards;
  animation-direction: reverse;
}

@keyframes header-action {
  from {
    opacity: 0;
    transform: translateY(-60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hover {
  @apply hover:cursor-pointer;
}

.essay-des {
  color: rgba(55, 106, 208, 0.879);
  font-weight: 600;
}

.title {
  @apply mx-3 cursor-pointer;
  text-shadow: 0 0 5px rgb(192, 120, 231), 0 0 10px rgb(220, 114, 114),
    0 0 15px rgb(202, 202, 131);
  text-align: center;
  word-wrap: break-word;
  text-wrap: nowrap;
}

:deep(.el-menu-item) {
  background-color: rgba(203, 221, 246, 0.6);
}

:deep(.el-menu-item:hover) {
  background-color: rgb(203, 221, 246, 0.8);
  color: blueviolet;
}
</style>
