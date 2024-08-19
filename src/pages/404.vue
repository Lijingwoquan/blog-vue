<template>
  <div>
    <el-result icon="warning" title="404提示" sub-title="页面走丢了">
      <template #extra>
        <el-button type="primary" @click="redirectToHome">回到首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const redirectToHome = () => {
  router.push("/");
};
</script>
