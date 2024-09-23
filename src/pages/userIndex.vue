<template>
  <essayList :essayList="tableData" :listUse="listUse"></essayList>
</template>

<script setup>
import { reactive, defineAsyncComponent } from "vue";
import { getEssayList } from "~/api/user.js";
import { useCommonGetData } from "~/composables/useCommon.js";
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

const changePage = (p) => {
  currentPage.value = p;
};

const listUse = reactive({
  loading,
  currentPage,
  totalPages,
});

changePage(route.query.page ? parseInt(route.query.page) : 1);

getDataList();
</script>
