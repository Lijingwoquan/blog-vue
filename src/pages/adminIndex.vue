<template>
  <div class="flex justify-center items-center px-15 pt-10">
    <div v-for="item in dataArr" style="width: 100%;">
      <el-card shadow="always" class="cardData">
        {{ item }}
      </el-card>
    </div>
  </div>
  <div class="px-15 pt-10">
    <el-card shadow="always" class="cardData">
      文章进度
    </el-card>
  </div>
</template>


<script setup>
import { ref } from "vue"
import { getSearchKeyCount } from "~/api/keyword.js"
const dataArr = ref([])

dataArr.value = ["文章新增阅读量", "搜索关键词排行", "用户访问量"]
</script>

<style scoped>
  .cardData {
    @apply mx-2 rounded-3xl;
    height: 300px;
  }
</style>