<template>
  <essayList
    :essayList="tableData"
    :listUse="listUse"
    navType="classify"
  ></essayList>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, reactive, defineAsyncComponent, watch } from "vue";
import { getEssayList } from "~/api/user.js";
import { useCommonGetData, useCommonData } from "~/composables/useCommon.js";
import { router } from "~/router";

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
      return classifyName;
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
const getdata = async (page) => {
  getNowClassify();
  searchForm.classify = getNowClassify();
  changePage(page ? parseInt(page) : 1);
  await getDataList();
  if (page > totalPages.value) {
    router.push("/404");
  }
};

const nowPage = route.query?.page ? parseInt(route.query.page) : 1;

getdata(nowPage);

watch(
  () => route.query.page,
  (page) => {
    console.log(page);
    getdata(page);
  }
);
</script>
