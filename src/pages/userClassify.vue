<template>
  <essayList
    :essayList="tableData"
    :listUse="listUse"
    navType="classify"
  ></essayList>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, reactive, defineAsyncComponent } from "vue";
import { getEssayList } from "~/api/user.js";
import { useCommonGetData, useCommonData } from "~/composables/useCommon.js";

const essayList = defineAsyncComponent(() =>
  import("~/components/essayList.vue")
);

const route = useRoute();

const { classifyList } = useCommonData();

const classifyRouter = computed(() => {
  return "/" + route.fullPath.split("?")[0].split("/")[2];
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

const listUse = reactive({
  loading,
  currentPage,
  totalPages,
});

const changePage = (p) => {
  currentPage.value = p;
};

getNowClassify();
searchForm.classify = getNowClassify();
changePage(route.query.page ? parseInt(route.query.page) : 1);
getDataList();
</script>
