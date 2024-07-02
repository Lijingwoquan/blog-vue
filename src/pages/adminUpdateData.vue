<template>
  <el-container>
    <el-header style="z-index: 1000;">
      <classify></classify>
    </el-header>
    <el-row>
      <el-col :span="1">
        <el-aside style="z-index: 1000;">
          <kind></kind>
        </el-aside>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
import classify from "~/layout/admin/classify.vue"
import kind from "~/layout/admin/kind.vue"
</script>

<style scoped>
  .el-aside {
    @apply bottom-0 top-0 fixed;
    width: auto;
  }
</style>
