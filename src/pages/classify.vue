<template>
  <div>
    <el-container>
      <el-header>
        <nav-header></nav-header>
      </el-header>
      <el-container>
        <el-aside >
            <nav-aside></nav-aside>
        </el-aside>

        <el-main class="left-0"> 
          <classify></classify>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import NavHeader from '~/layout/base/NavHeader.vue';
import NavAside from '~/layout/base/NavAside.vue';
import classify from '~/layout/components/classify.vue';
</script>

<style scoped>
.el-header {
  --el-header-height: 48px;
}
.el-aside {
    width: 200px;
}

</style>