<template>
  <div class="Headercontainer">
    <div class="left">
      <el-icon class="logoHouse" :size="sizeObj.iconSize" @click="toIndex">
        <House />
      </el-icon>
      <el-icon
        class="logoExpand hidden-sm-and-up"
        :size="sizeObj.iconSize"
        @click="openMenu"
      >
        <Expand />
      </el-icon>

      <el-drawer
        v-model="dialogMenu"
        title="菜单"
        direction="ltr"
        class="bg-light-800"
        size="200px"
      >
        <NavAsideForMobile></NavAsideForMobile>
      </el-drawer>
    </div>
    <div class="middle">
      <span :class="sizeObj.textSize">罹景偓佺的博客</span>
    </div>

    <div class="right">
      <div class="search" @click="openSearch">
        <el-icon :size="sizeObj.iconSize">
          <search />
        </el-icon>
      </div>
      <el-dropdown>
        <div class="help">
          <div class="text">帮助</div>
          <el-icon class="icon" :size="sizeObj.iconSize">
            <arrow-down />
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

  <el-dialog
    style="
      background: linear-gradient(
        to right,
        rgba(42, 157, 202, 0.365),
        rgba(28, 171, 187, 0.384),
        rgba(255, 192, 203, 0.47),
        rgba(0, 255, 255, 0.53)
      );
    "
    v-model="dialogVisible"
    :v-close-on-click-modal="true"
    :show-close="false"
    append-to-body
    @close="$emit('closeSearch')"
    width="85%"
  >
    <el-input v-model="input" placeholder="搜索文档" class="input">
      <template #prefix>
        <el-icon class="mx-2">
          <search />
        </el-icon>
      </template>
      <template #suffix>
        {{ searchBtnLoading }}
        <el-button type="primary" @click="searchMsg" :loading="searchBtnLoading"
          >搜索</el-button
        >
      </template>
    </el-input>
    <ul v-if="getData">
      <el-divider v-if="satisfyDate.length > 0" />
      <!-- <el-tooltip effect="light" :content="'关键字: ' + essay.keywords.join(' ; ')" placement="bottom"> -->
      <li v-for="essay in satisfyDate" @click="gotoApointPath(essay.path)">
        <div class="essayList">
          <div class="ml-3">文章:{{ essay.name }}</div>
          <div class="mr-3">分类:{{ essay.kind }}</div>
        </div>
        <el-divider />
      </li>
      <!-- </el-tooltip> -->
    </ul>
  </el-dialog>
</template>

<script setup>
import NavAsideForMobile from "~/components/user/NavAsideForMobile.vue";
import { ref, onMounted, onBeforeMount, watch, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { toast } from "~/composables/util";
import { addSearchKeyCount } from "~/api/keyword.js";

const dialogVisible = ref(false);
const store = useStore();
const essayData = computed(() => store.state.essayData);
const router = useRouter();
const route = useRoute();
const dialogMenu = ref(false);
const input = ref("");
const getData = ref(false);
const satisfyDate = ref([]);

const sizeObj = reactive({
  textSize: "",
  iconSize: "",
});

const emits = defineEmits(["openSearch", "closeSearch"]);

const openMenu = () => {
  dialogMenu.value = true;
};

const toIndex = () => {
  router.push("/");
};

const openSearch = () => {
  dialogVisible.value = true;
  emits("openSearch");
};

const gotoApointPath = (path) => {
  router.push("/essay" + path);
  dialogVisible.value = false;
};

const searchBtnLoading = ref(false);
const searchMsg = async () => {
  searchBtnLoading.value = true;
  if (input.value == "") {
    toast("请输入搜索内容", "warning");
    return;
  }
  await addSearchKeyCount(input.value).finally(() => {
    searchBtnLoading.value = false;
  });
  satisfyDate.value = [];
  for (let index = 0; index < essayData.value.length; index++) {
    let essay = essayData.value[index];
    let keywords = [
      ...essay.keywords,
      essay.name.split(" ").join("").toLowerCase(),
    ];

    for (let index2 = 0; index2 < keywords.length; index2++) {
      let keyword = keywords[index2];
      let name = essay.name;
      let path = essay.router;
      let kind = essay.kind;
      if (keyword.includes(input.value.split(" ").join("").toLowerCase())) {
        satisfyDate.value.push({ name, path, kind, keywords });
        break;
      }
    }
  }

  if (!(satisfyDate.value.length > 0)) {
    toast("没用查找到相关文章", "warning");
  } else {
    toast(`搜索成功,共有${satisfyDate.value.length}篇文章`);
  }
  getData.value = true;
};

const onKeyUp = (e) => {
  if (e.key == "Enter" && dialogVisible.value == true) {
    searchMsg();
  }
};

const handleResize = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    sizeObj.iconSize = "16px";
    sizeObj.textSize = "text-md";
  } else {
    sizeObj.iconSize = "25px";
    sizeObj.textSize = "text-lg";
  }
};

watch(
  () => route.fullPath,
  () => {
    dialogMenu.value = false;
  }
);

//添加键盘的监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
  // 监听窗口resize事件
  window.addEventListener("resize", handleResize);
  handleResize();
});

//移除键盘监听
onBeforeMount(() => {
  document.removeEventListener("keyup", onKeyUp);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.Headercontainer {
  @apply flex justify-between items-center fixed top-0 left-0 right-0;
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

.Headercontainer .left {
  @apply flex justify-start items-center;
  width: 65px;
  margin-right: 0;
}

.Headercontainer .left .logoHouse {
  @apply text-xl mx-3 hover:cursor-pointer;
  height: auto;
}

.Headercontainer .left .logoExpand {
  @apply text-xl hover:cursor-pointer;
  height: auto;
}

.Headercontainer .middle {
  @apply text-sm font-bold font-serif;
  padding-left: 10%;
  white-space: nowrap;
}

.Headercontainer .right {
  @apply flex justify-end items-center left-0 right-0;
  width: 100px;
}

.Headercontainer .right .search {
  @apply flex justify-center items-center mr-3 hover:cursor-pointer;
}

.Headercontainer .right .help {
  @apply flex justify-center items-center mr-1 hover:cursor-pointer;
  height: 25px;
}

.Headercontainer .right .help .text {
  width: 30px;
}

.Headercontainer .right .help .icon {
  @apply mr-2;
}

.Headercontainer .right .search:hover {
  border-color: red;
  /* 悬停时改变边框颜色 */
}

.input {
  height: 50px;
}

.essayList {
  @apply flex justify-between items-center text-black hover:cursor-pointer;
  background: linear-gradient(
    to right,
    rgba(68, 141, 187, 0.47),
    rgba(65, 207, 162, 0.324),
    rgba(135, 128, 196, 0.447)
  );
  width: 100%;
  height: 50px;
}

/* :deep(.el-input__wrapper) {
        background: linear-gradient(to right bottom, rgba(140, 147, 151, 0.708), rgba(116, 215, 159, 0.53), rgb(122, 118, 159));
    } */

/* :deep(.el-input__inner) {
        @apply text-red-200 ;
    } */

:deep(.el-dialog__header) {
  padding: 0px !important;
  padding-bottom: 0px !important;
  margin-right: 0px !important;
}

:deep(.el-drawer__body) {
  padding: 0 !important;
  margin: 0 !important;
}

:deep(.el-menu) {
  width: 200px !important;
  background: linear-gradient(
    to top,
    rgba(177, 167, 224, 0.2),
    rgba(157, 169, 224, 0.2)
  );
}

:deep(.el-drawer__header) {
  @apply flex justify-center items-center;
  background: linear-gradient(to left, rgb(132, 223, 159), rgb(79, 169, 214));
  margin: 0px !important;
  padding: 10px !important;
  box-sizing: border-box;
  height: 60px;
}
</style>
