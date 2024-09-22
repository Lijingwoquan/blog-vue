<template>
  <essayList :essayList="tableData" :commonUse="commonUse"></essayList>
</template>

<script setup>
import { reactive, defineAsyncComponent } from "vue";
import { getEssayList } from "~/api/user.js";
import { useCommonGetData, useCommonNav } from "~/composables/useCommon.js";

const essayList = defineAsyncComponent(() =>
  import("~/components/essayList.vue")
);

const { tableData, currentPage, totalPages, loading, getDataList } =
  useCommonGetData({
    form: {
      page: 1,
      pageSize: 5,
    },
    getDataList: getEssayList,
    loadingText: "文章列表渲染中",
  });
getDataList();

const { getEssayHref, getKindHref, changePage } = useCommonNav({
  currentPage,
  getDataList,
});

const commonUse = reactive({
  getEssayHref,
  getKindHref,
  changePage,
  loading,
  currentPage,
  totalPages,
});
</script>
