<template>
  <EssayList :essayList="tableData" :commonUse="commonUse"></EssayList>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getEssayList } from "~/api/user.js";
import { useCommonGetData, useCommonNav } from "~/composables/useCommon.js";
import EssayList from "~/components/user/EssayList.vue";
import { reactive } from "vue";

const router = useRouter();
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

const { toEssay, toKind, changePage } = useCommonNav({
  router,
  currentPage,
  getDataList,
});

const commonUse = reactive({
  toEssay,
  toKind,
  changePage,
  loading,
  currentPage,
  totalPages,
});
</script>
