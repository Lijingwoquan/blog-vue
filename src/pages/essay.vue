<template>
  <el-container>
    <el-header>
      <nav-header></nav-header>
    </el-header>
    <el-row>
      <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="3">
        <el-aside>
          <nav-aside class="hidden-xs-only"></nav-aside>
        </el-aside>
      </el-col>
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
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

.el-aside {
  width: 110px;
}

.right {
  position: fixed;
}
</style>