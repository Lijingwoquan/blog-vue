<template>
  <div>
    <el-container>
      <el-header>
       <nav-header></nav-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <nav-aside></nav-aside>
        </el-aside>
        <el-main>
          <nav-main></nav-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import NavHeader from '~/layout/components/NavHeader.vue';
import NavAside from '~/layout/components/NavAside.vue';
import NavMain from '~/layout/components/NavMain.vue';



</script>