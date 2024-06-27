<template>
  <div class="background-color">
  </div>
  <div class="flex justify-center items-center px-15 pt-10">
    <div v-for="item in 4" style="width: 100%;">
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



</script>


<style scoped>
  .background-color {
    @apply fixed;
    left: 250px;
    right: 0;
    top: 0;
    bottom: 0;
    background:
      linear-gradient(to right top,
        rgba(109, 32, 114, 0.407),
        rgba(62, 165, 202, 0.393),
        rgba(41, 39, 192, 0.393));
  }

  .cardData {
    @apply mx-2 rounded-3xl;
    height: 300px;
  }
</style>