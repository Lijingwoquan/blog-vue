<template>
  <div v-if="!loading">
    <div v-for="essay in tableData" class="essay" :key="essay.id">
      <div class="top" @click="toEssay(essay)">
        <span class="title">{{ essay.name }}</span>
      </div>
      <div class="middle">
        <div class="kind" @click="toKind(essay)">
          {{ essay.kind }}
        </div>
        <div style="width: auto" class="flex-1" @click="toEssay(essay)"></div>
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
      :current-page="currentPage"
      :page-count="totalPages"
      @update:current-page="changePage"
      class="page"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getEssayList } from "~/api/user.js";
import {
  useCommonInitData,
  useCommonInitForm,
} from "~/composables/useCommon.js";
import { useCommonNav } from "~/composables/useCommon";

const router = useRouter();
const { form } = useCommonInitForm({
  form: {
    page: 1,
    pageSize: 5,
  },
});

const { tableData, currentPage, totalPages, loading, getData } =
  useCommonInitData({
    form,
    getData: getEssayList,
  });

const { toEssay, toKind, changePage } = useCommonNav({
  router,
  currentPage,
  getData,
});
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
