<template>
  <el-dialog
    v-model="dialogVisible"
    :close-on-click-modal="facility === 'mobile' ? false : true"
    :show-close="true"
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
      <li v-for="essay in essayList">
        <el-card shadow="always">
          <div class="essay-des">
            <div class="flex justify-between">
              <div class="name cursor-pointer">
                <router-link
                  :to="getEssayHref(essay)"
                  @click="dialogVisible = false"
                  >文章名:{{ essay.name }}
                </router-link>
              </div>
              <div class="kind">
                <router-link
                  :to="getKindHref(essay)"
                  @click="dialogVisible = false"
                >
                  隶属:{{ essay.kind }}
                </router-link>
              </div>
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
import { ref, onMounted, onUnmounted, reactive, computed, watch } from "vue";
import {
  toast,
  listenScreen,
  diffrentFacilifyMap,
} from "~/composables/util.js";
import { searchData } from "~/api/keyword.js";
import { useCommonNav } from "~/composables/useCommon";

const { getEssayHref, getKindHref } = useCommonNav();

const dialogVisible = ref(false);

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
  ifAdd: true,
});

const open = () => {
  dialogVisible.value = true;
};

function searchMsg() {
  essayList.value = [];
  loading.value = true;
  if (form.keyword == "") {
    toast("请输入搜索内容", "warning");
    return;
  }
  searchData(form)
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

watch(
  () => dialogVisible.value,
  (data) => {
    data
      ? document.addEventListener("keyup", handelOnKeyUp)
      : document.removeEventListener("keyup", handelOnKeyUp);
  }
);

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

defineExpose({
  open,
});
</script>

<style>
.essay-des {
  color: rgba(55, 106, 208, 0.879);
  font-weight: 600;
}

.essay-des .name {
  @apply cursor-pointer;
  /* 
  text-align: center;
  word-wrap: break-word;
  text-wrap: nowrap; */
}
</style>
