<template>
  <essayList
    :essayList="tableData"
    :commonUse="commonUse"
    navType="classify"
  ></essayList>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed, watch, reactive, defineAsyncComponent } from "vue";
import { getEssayList } from "~/api/user.js";
import {
  useCommonGetData,
  useCommonData,
  useCommonNav,
} from "~/composables/useCommon.js";

const essayList = defineAsyncComponent(() =>
  import("~/components/essayList.vue")
);

const route = useRoute();
const router = useRouter();

const { classifyList } = useCommonData();

const classifyRouter = computed(() => {
  return "/" + route.fullPath.split("/")[2];
});

const getNowClassify = () => {
  let classifyName = "";
  for (let index = 0; index < classifyList.value.length; index++) {
    const classify = classifyList.value[index];
    if (classifyRouter.value === classify.router) {
      classifyName = classify.name;
    }
  }
  return classifyName;
};

const { searchForm, tableData, currentPage, totalPages, loading, getDataList } =
  useCommonGetData({
    form: {
      page: 1,
      pageSize: 5,
      classify: getNowClassify(),
    },
    getDataList: getEssayList,
    loadingText: "文章列表渲染中",
  });

const { essayHref, kindHref, changePage } = useCommonNav({
  router,
  currentPage,
  getDataList,
});
getDataList();

const commonUse = reactive({
  essayHref,
  kindHref,
  changePage,
  loading,
  currentPage,
  totalPages,
});

watch(
  () => route.path,
  async () => {
    getNowClassify();
    searchForm.classify = getNowClassify();
    await getDataList();
  }
);
</script>
