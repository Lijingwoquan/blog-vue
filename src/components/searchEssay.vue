<template>
  <el-dialog
    v-model="dialogVisible"
    :v-close-on-click-modal="true"
    :show-close="false"
    append-to-body
    :width="dialogWidth"
    style="background-color: #f9f9f9"
  >
    <el-input
      v-model="form.keyword"
      placeholder="输入回车搜索文章"
      :style="`height:${inputHeight}`"
    >
      <template #prefix>
        <el-icon :size="30">
          <search class="text-2xl" />
        </el-icon>
      </template>
    </el-input>
    <ul v-if="!loading && essayList?.length > 0">
      <el-divider />
      <div class="my-4 ml-3 font-bold text-blue-400">搜索结果</div>
      <li v-for="essay in essayList" @click="gotoApointPath(essay)">
        <el-card shadow="always" class="cursor-pointer">
          <div class="essay-des">
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
import { ref, onMounted, onUnmounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import {
  toast,
  listenScreen,
  diffrentFacilifyMap,
} from "~/composables/util.js";
import { addSearchKeyCount } from "~/api/keyword.js";

const dialogVisible = ref(false);
const router = useRouter();

const { facility, handelOnKeyUp, handleResize } = listenScreen({
  onKeyUp: {
    visiable: dialogVisible,
    getData: searchMsg,
  },
  resize: {},
});
const essayList = ref([]);
const loading = ref(false);
const form = reactive({
  keyword: "",
});

const open = () => {
  dialogVisible.value = true;
};

const gotoApointPath = (essay) => {
  router.push(essay.complexRouter);
  dialogVisible.value = false;
};

function searchMsg() {
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
}

const dialogWidth = computed(() => {
  return diffrentFacilifyMap(facility.value, {
    computer: "60%",
    ipad: "70%",
    mobile: "90%",
  });
});

const inputHeight = computed(() => {
  return diffrentFacilifyMap(facility.value, {
    computer: "70px",
    ipad: "55px",
    mobile: "45px",
  });
});

onMounted(() => {
  window.addEventListener("resize", handleResize);
  document.addEventListener("keyup", handelOnKeyUp);
});

onUnmounted(() => {
  document.removeEventListener("resize", handleResize);
  window.removeEventListener("resize", handleResize);
  document.removeEventListener("keyup", handelOnKeyUp);
});

defineExpose({
  open,
});
</script>
