<template>
  <div class="nav-aside" :style="{ width: $store.state.adminAsideWidth }">
    <div class="nav-aside-head" style="height: 80px">
      <el-icon
        style="height: 100%"
        class="flex items-center text-blue-300 ml-3 hover:cursor-pointer"
        @click="$store.commit('handleAdminAsideWidth')"
      >
        <Fold v-if="$store.state.adminAsideWidth === '250px'" />
        <Expand v-else />
      </el-icon>
      <div
        v-show="$store.state.adminAsideWidth === '250px'"
        style="height: 100%"
        class="flex items-center text-purple-200"
      >
        后台管理系统
      </div>
    </div>
    <div>
      <div
        v-for="(item, index) in menu"
        :key="index"
        class="nav-aside-item"
        style="height: 40px"
        @click="switchTool(item)"
        :class="{ active: item.route === activeToolRoute }"
      >
        <el-icon
          style="height: 100%"
          class="flex justify-center items-center"
          text
        >
          <component :is="item.icon" />
        </el-icon>
        <span
          v-show="$store.state.adminAsideWidth === '250px'"
          style="height: 100%"
          class="flex justify-center items-center"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { config } from "/config.js";
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const router = useRouter();

const activeToolRoute = ref("/");

const menu = [
  {
    name: "数据展示",
    route: "/",
    icon: "DataLine",
  },
  {
    name: "创建文章",
    route: "/createEssay",
    icon: "FolderAdd",
  },
  {
    name: "管理文章",
    route: "/manageEssay",
    icon: "EditPen",
  },
  {
    name: "修改数据",
    route: "/updateData",
    icon: "Operation",
  },
];

const switchTool = (item) => {
  router.push(`${config.MANAGER_URL}${item.route}`);
};

const initActiveToolBar = () => {
  if (route.path.split("/").length > 3) {
    activeToolRoute.value = "/" + route.path.split("/")[3];
  } else {
    activeToolRoute.value = "/";
  }
};
initActiveToolBar();
watch(
  () => route.path,
  () => {
    initActiveToolBar();
  }
);
</script>

<style scoped>
.nav-aside {
  @apply fixed;
  box-sizing: border-box;
  top: 0;
  bottom: 0;
  color: rgb(224, 218, 218);
  background-color: rgba(32, 167, 225, 0.884);
  transition: width 0.5s linear;
}
.nav-aside div {
  animation: nav-aside-action 0.5s linear;
}
.nav-aside div div span {
  animation: nav-aside-action 0.5s linear;
}
@keyframes nav-aside-action {
  0%,
  90% {
    opacity: 0;
    font-size: 0;
  }
  100% {
    opacity: 1;
    font-size: initial;
  }
}

.nav-aside-head {
  @apply flex justify-around text-xl p-2;
  background-color: rgba(91, 141, 162, 0.868);
}

.nav-aside-item {
  @apply flex justify-around mt-6 text-lg;
}

.nav-aside-item:hover {
  cursor: pointer;
  color: rgba(20, 231, 122, 0.825);
}

.active {
  color: rgb(182, 20, 231);
}
</style>
