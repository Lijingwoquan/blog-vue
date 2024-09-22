<template>
  <h2 class="top-tips">文章分类</h2>
  <div class="flex flex-col">
    <section v-for="(item, index) in menu" :key="index" class="mt-3">
      <h3 class="kind">
        <el-icon class="mr-1">
          <component :is="item.kind?.icon"> </component>
        </el-icon>
        {{ item.kind.name }}
      </h3>

      <div
        v-for="(classify, index2) in item.classifyList"
        :key="index2"
        class="classify"
      >
        <el-icon><Share /></el-icon>
        <a
          :href="'/classify' + classify.router"
          class="text-center font-mono inline-block"
        >
          {{ classify.name }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useCommonData } from "~/composables/useCommon.js";
const { menu } = useCommonData();
</script>

<style scoped>
.top-tips {
  @apply text-lg font-semibold;
  color: transparent;
  width: fit-content;
  background: linear-gradient(
    to right,
    rgb(57, 107, 216),
    rgb(218, 192, 30),
    rgb(38, 174, 198),
    rgb(231, 37, 118)
  );
  background-clip: text;
}
.kind {
  @apply font-serif font-bold text-left flex items-center;
  width: fit-content;
  color: transparent;
  background: linear-gradient(
    to right,
    rgb(54, 54, 216),
    rgb(183, 53, 53),
    rgb(78, 205, 78)
  );
  background-clip: text;
}
.classify {
  @apply ml-3 flex items-center text-blue-500;
  line-height: 30px;
}
.classify:hover {
  @apply underline leading-loose;
  animation: text-action 0.15s ease-in-out 3;
}

@keyframes text-action {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(0, -10%);
  }
  66% {
    transform: translate(0, 10%);
  }
}
</style>
