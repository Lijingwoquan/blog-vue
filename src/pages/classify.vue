<template>
  <el-backtop :right="30" :bottom="30" />
  <el-container>
    <el-header>
      <nav-header></nav-header>
    </el-header>
    <el-row>
      <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
        <el-aside>
          <nav-aside class="hidden-xs-only"></nav-aside>
        </el-aside>
      </el-col>
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <el-main>
          <classify></classify>
        </el-main>
      </el-col>
      <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
import NavHeader from '~/layout/base/NavHeader.vue';
import NavAside from '~/layout/base/NavAside.vue';
import classify from '~/layout/components/classify.vue';
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
  top: 60px;
}
</style>