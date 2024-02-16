<template>
  <el-container>
    <el-header>
      <nav-header></nav-header>
    </el-header>
    <el-row>
      <el-col :xs="0" :sm="4" :md="3" :lg="3" :xl="3">
        <el-aside>
          <nav-aside class="hidden-xs-only"></nav-aside>
        </el-aside>
      </el-col>
      <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
        <nav-aside-for-mini class="hidden-sm-and-up"></nav-aside-for-mini>
        <el-main>
          <essay></essay>
        </el-main>
      </el-col>
      <el-col :xs="0" :sm="2" :md="3" :lg="3" :xl="3">
      </el-col>
    </el-row>
  </el-container>
</template>
<script setup>
import NavHeader from '~/layout/base/NavHeader.vue';
import NavAside from '~/layout/base/NavAside.vue';
import essay from '~/layout/components/essay.vue';
import NavAsideForMini from '~/layout/base/NavAsideForMini.vue';
</script>
  
<style scoped>

.el-header {
  --el-header-height: 100px;
}

.el-main {
  padding: 0;
}

.el-aside {
  width: 110px;
}
</style>