<template>
  <div class="headerContainer">
    <div class="w-[150px]">
      <el-icon @click="toIndex" class="mx-3 hover" size="1.2em">
        <House style="height: 100%; width: 100%" />
      </el-icon>
      <el-icon
        class="hidden-sm-and-up hover"
        size="1.2em"
        @click="drawerVisiableRef = true"
      >
        <Expand style="height: 100%; width: 100%" />
      </el-icon>
    </div>

    <div class="mx-auto text-sm font-bold font-serif" style="text-wrap: nowrap">
      <h5>罹景偓佺的博客</h5>
    </div>

    <div class="flex w-[150px]">
      <div class="ml-auto my-auto flex items-center">
        <div @click="openSearch">
          <el-icon class="mx-3 hover" size="1.2em">
            <search style="height: 100%; width: 100%" />
          </el-icon>
        </div>

        <div>
          <el-dropdown :aria-expanded="false">
            <div class="flex items-center">
              <el-icon class="mx-3" size="1.2em">
                <arrow-down style="height: 100%; width: 100%" />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-link
                    type="primary"
                    :underline="false"
                    href="https://github.com/Lijingwoquan"
                    target="_blank"
                    >联系作者</el-link
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>

  <span>
    <el-drawer
      v-model="drawerVisiableRef"
      title="菜单"
      direction="ltr"
      class="bg-light-800"
      size="250px"
    >
      <template #default>
        <NavAsideForMobile></NavAsideForMobile>
      </template>
    </el-drawer>
  </span>

  <el-dialog
    v-model="dialogVisible"
    :v-close-on-click-modal="true"
    :show-close="false"
    append-to-body
    @close="$emit('closeSearch')"
    width="60%"
    style="background-color: #f9f9f9"
  >
    <el-input v-model="form.keyword" placeholder="搜索文章" class="h-[70px]">
      <template #prefix>
        <el-icon :size="30">
          <search class="text-2xl" />
        </el-icon>
      </template>
    </el-input>
    <ul v-if="!loading && essayList.length > 0">
      <el-divider />
      <div class="my-4 ml-3 font-bold text-blue-400">搜索结果</div>
      <li v-for="essay in essayList" @click="gotoApointPath(essay)">
        <el-card shadow="always" class="hover">
          <div class="essayDes">
            <div class="flex justify-between">
              <div>文章:{{ essay.name }}</div>
              <div>分类:{{ essay.kind }}</div>
            </div>
            <div class="mt-3">
              <el-text class="text-pink-400" line-clamp="2">
                介绍:{{ essay.introduction }}
              </el-text>
            </div>
          </div>
        </el-card>
        <el-divider />
      </li>
    </ul>
  </el-dialog>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeMount,
  watch,
  reactive,
  defineAsyncComponent,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { toast, listenScreen } from "~/composables/util.js";
import { addSearchKeyCount } from "~/api/keyword.js";
const NavAsideForMobile = defineAsyncComponent(() =>
  import("~/components/user/NavAsideForMobile.vue")
);
const dialogVisible = ref(false);
const router = useRouter();
const route = useRoute();
const drawerVisiableRef = ref(false);

const openSearch = () => {
  dialogVisible.value = true;
  emits("openSearch");
};

const emits = defineEmits(["openSearch", "closeSearch"]);

const gotoApointPath = (essay) => {
  router.push(essay.complexRouter);
  dialogVisible.value = false;
};
const toIndex = () => {
  router.push("/");
};

const form = reactive({
  keyword: "",
});

const essayList = ref([]);
const loading = ref(false);
const searchMsg = () => {
  essayList.value = [];
  loading.value = true;
  if (form.keyword == "") {
    toast("请输入搜索内容", "warning");
    return;
  }
  addSearchKeyCount(form)
    .then((res) => {
      essayList.value = res;
      if (!res) {
        toast("没有相关文章", "warning");
      } else {
        toast(`查找到${essayList.value.length}篇相关文章`);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const { handelOnKeyUp } = listenScreen({
  onKeyUp: {
    visiable: dialogVisible,
    getData: searchMsg,
  },
});

watch(
  () => route.path,
  () => {
    drawerVisiableRef.value = false;
  }
);

onMounted(() => {
  document.addEventListener("keyup", handelOnKeyUp);
});

onBeforeMount(() => {
  document.removeEventListener("keyup", handelOnKeyUp);
});
</script>

<style scoped>
.headerContainer {
  @apply flex  items-center fixed top-0 left-0 right-0;
  z-index: 100;
  height: 60px;
  background: linear-gradient(
    to right,
    rgba(42, 157, 202, 0.365),
    rgba(28, 171, 187, 0.384),
    rgba(255, 192, 203, 0.47),
    rgba(0, 255, 255, 0.53)
  );
}

.hover {
  @apply hover:cursor-pointer;
}

.essayDes {
  color: rgba(55, 106, 208, 0.879);
  font-weight: 600;
}

:deep(.el-drawer__header) {
  background: linear-gradient(to left, rgb(132, 223, 159), rgb(79, 169, 214));
  padding: 10px !important;
  height: 60px;
}
:deep(.el-menu-item) {
  background: linear-gradient(
    to right bottom,
    rgba(144, 137, 187, 0.31),
    rgba(91, 106, 170, 0.227),
    rgba(64, 118, 200, 0.307)
  );
}
</style>
