<template>
  <div class="flex flex-col justify-center items-center px-15 mt-10">
    <div v-for="item in dataArr" style="width: 100%;" class="my-5">
      <el-card shadow="always" class="cardData">
        {{ item }}
      </el-card>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue"
import { getSearchKeyCount } from "~/api/keyword.js"
const dataArr = ref([])

dataArr.value = ["用户访问量", "搜索关键词排行"]
</script>

<style scoped>
  .cardData {
    @apply mx-2 rounded-3xl;
    height: 300px;
  }
</style>