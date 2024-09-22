<template>
  <essayList :essayList="tableData" :commonUse="commonUse"></essayList>
</template>

<script setup>
import { reactive, defineAsyncComponent } from "vue";
import { getEssayList } from "~/api/user.js";
import { useCommonGetData, useCommonNav } from "~/composables/useCommon.js";
import { useRoute } from "vue-router";
const route = useRoute();
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

const { getEssayHref, getKindHref, changePage } = useCommonNav({
  currentPage,
});

const commonUse = reactive({
  getEssayHref,
  getKindHref,
  changePage,
  loading,
  currentPage,
  totalPages,
});
changePage(route.query.page ? parseInt(route.query.page) : 1);
getDataList();
</script>
