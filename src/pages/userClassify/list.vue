<template>
  <div v-if="!loading">
    <div v-for="essay in tableData" class="essay" :key="essay.id">
      <div class="top" @click="toEssay(essay)">
        <el-link class="title" target="_self" type="info">{{
          essay.name
        }}</el-link>
      </div>

      <div class="middle">
        <div class="kind">
          {{ essay.kind }}
        </div>
        <div class="flex-1" @click="toEssay(essay)"></div>
        <span class="date" @click="toEssay(essay)">
          {{ essay.createdTime.split("T")[0] }}
        </span>
      </div>

      <div class="bottom" @click="toEssay(essay)">
        <el-text truncated class="introduction">
          {{ essay.introduction }}
        </el-text>
      </div>

      <el-divider border-style="dotted" />
    </div>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="totalPages"
      :current-page="currentPage"
      @update:current-page="changePage"
      class="page"
    />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed, watch } from "vue";
import { getEssayList } from "~/api/user.js";
import {
  useCommonGetData,
  useCommonData,
  useCommonNav,
} from "~/composables/useCommon.js";

const route = useRoute();
const router = useRouter();

const { classifyList } = useCommonData();

const classifyRouter = computed(() => {
  return "/" + route.fullPath.split("/")[2];
});

const getNowClassify = () => {
  classifyList.value.forEach((classify) => {
    if (classifyRouter.value === classify.router) {
      return classify.name;
    }
  });
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

const { toEssay, changePage } = useCommonNav({
  router,
  currentPage,
  getDataList,
});
getDataList();

watch(
  () => route.path,
  async () => {
    getNowClassify();
    searchForm.classify = getNowClassify();
    await getDataList();
    console.log(tableData);
  }
);
</script>

<style scoped>
.essay {
  @apply flex flex-col justify-center items-center mt-5 ml-5 mr-5;
  height: auto;
}

.essay .top {
  @apply flex justify-between items-center;
  width: 100%;
}

.essay .top .title {
  @apply text-2xl font-serif font-bold m-auto;
  white-space: nowrap;
  color: black;
}

.essay .middle {
  @apply flex my-3;
  width: 100%;
}

.middle .kind {
  @apply text-lg font-mono mr-auto text-purple-700 hover:(cursor-pointer text-blue-400);
}

.middle .date {
  @apply text-lg font-mono ml-auto text-purple-700;
}

.bottom {
  @apply flex justify-start my-3;
  width: 100%;
}

.bottom .introduction {
  @apply font-sans text-pink-500;
}

.page {
  @apply mt-5 justify-center;
}
</style>
