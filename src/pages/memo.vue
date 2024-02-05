<template>
    <div>
      <el-container>
        <el-header>
          <nav-header></nav-header>
        </el-header>
        <el-container>
          <el-aside :style="{ backgroundColor: bgColor, color: textColor }">
              <nav-aside></nav-aside>
          </el-aside>
  
          <el-main class="left-0"> 
            <memo></memo>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script setup>
  import NavHeader from '~/layout/base/NavHeader.vue';
  import NavAside from '~/layout/base/NavAside.vue';
  import memo from '~/layout/components/memo.vue';
  import { ModChange } from "~/composables/overall.js"
  const {
      mod,
      bgColor,
      textColor,
      changeReadindMod,
  } = ModChange()
  
  
  </script>
  
  <style scoped>
  .el-header {
    --el-header-height: 48px;
  }
  .el-aside {
      width: 200px;
  }
  
  </style>