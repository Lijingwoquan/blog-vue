<template>
  <div v-if="!loading">
    <div
      v-for="essay in tableData"
      class="flex flex-col justify-center mt-5"
      :key="essay.id"
    >
      <div @click="toEssay(essay)">
        <div class="flex justify-between items-center">
          <h2
            class="font-serif font-bold m-auto hover:(cursor-pointer line-through)"
            style="white-space: nowrap; color: black"
          >
            {{ essay.name }}
          </h2>
        </div>

        <div class="px-4 ">
          <div class="flex my-3">
            <h4
              class="font-mono mr-auto text-purple-700 hover:(cursor-pointer text-blue-400)"
            >
              {{ essay.kind }}
            </h4>
            <div class="flex-1"></div>
            <h4 class="font-mono ml-auto text-purple-700">
              {{ essay.createdTime.split("T")[0] }}
            </h4>
          </div>

          <div class="flex justify-start my-3 p-3">
            <el-text truncated class="font-sans text-pink-500">
              {{ essay.introduction }}
            </el-text>
          </div>
        </div>
      </div>

      <el-divider border-style="dotted" />
    </div>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="totalPages"
      :current-page="currentPage"
      @update:current-page="changePage"
      class="mt-5 justify-center"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getEssayList } from "~/api/user.js";
import { useCommonGetData, useCommonNav } from "~/composables/useCommon.js";

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
</script>
