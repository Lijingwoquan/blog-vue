<template>
  <el-container>
    <el-header>
      <nav-header></nav-header>
    </el-header>
    <el-row>
      <el-col :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
        <el-aside>
          <nav-aside class="hidden-xs-only"></nav-aside>
        </el-aside>
      </el-col>
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <el-main  class="m-2">
          <essay></essay>
        </el-main>
      </el-col>
      <el-col :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
        <notice class="right"></notice>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
import NavHeader from '~/layout/base/NavHeader.vue';
import NavAside from '~/layout/base/NavAside.vue';
import essay from '~/layout/components/essay.vue';
import notice from '~/layout/components/notice.vue';

</script>

<style scoped>
.el-header {
  --el-header-height: 60px;
}

.el-main {
  padding: 0;
}

:deep(.el-aside) {
  width: 110px;
  top:60px;
}

.right {
  position: fixed;
}
</style>