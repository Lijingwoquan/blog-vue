<template>
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
    @update:current-page="changePage"
    class="page"
  />
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { addEssayRouters } from "~/router/index.js";
import { getEssayList } from "~/api/user.js";
import {
  useCommonInitData,
  useCommonInitForm,
} from "~/composables/useCommon.js";
import { useCommonNav } from "~/composables/useCommon";

const route = useRoute();
const router = useRouter();
const store = useStore();

const classifyRouter = computed(() => {
  return "/" + route.fullPath.split("/")[2];
});

let nowClassify = "";
const getNowClassify = () => {
  store.state.classifyData.forEach((classify) => {
    if (classifyRouter.value === classify.router) {
      nowClassify = classify.name;
    }
  });
};
getNowClassify();

const { form } = useCommonInitForm({
  form: {
    page: 1,
    pageSize: 5,
    classify: nowClassify,
  },
});

const { searchForm, tableData, currentPage, totalPages, getData } =
  useCommonInitData({
    form,
    getData: getEssayList,
  });

const { toEssay, changePage } = useCommonNav(router, currentPage, getData);

watch(
  () => tableData.value,
  () => {
    if (tableData.value) {
      addEssayRouters(tableData.value);
    }
  }
);
watch(
  () => route.fullPath,
  () => {
    getNowClassify();
    searchForm.classify = nowClassify;
    getData();
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
