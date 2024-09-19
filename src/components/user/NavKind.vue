<template>
  <div class="flex items-center justify-evenly">
    <div v-for="(item, index) in menu" :key="index" class="kind-container">
      <a
        href="/kind"
        class="text-center font-serif min-w-[300px] inline-block text-xl"
      >
        {{ item.kind?.name }}
      </a>
      <div
        class="list"
        v-if="Array.isArray(item.classifyList) && item.classifyList.length > 0"
      >
        <div
          class="item"
          v-for="(classify, index2) in item.classifyList"
          :key="index2"
          :class="{
            active: activeClassify === '/classify' + classify.router,
          }"
        >
          <a
            :href="'/classify' + classify.router"
            v-if="index2 < 3"
            class="text-center font-mono text-sm"
          >
            {{ classify.name }}
          </a>
          <a href="/kind" v-if="index2 === 3"> ... </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";
import { useCommonData } from "~/composables/useCommon.js";
const { menu } = useCommonData();

const router = useRouter();
const route = useRoute();

//保证刷新也能选中
const activeClassify = ref(route.path);

// 保证切换文章时也能选中
if (route.path.split("/").length > 3) {
  activeClassify.value = "/classify/" + route.path.split("/")[2];
}

watch(
  () => route.path,
  () => {
    activeClassify.value = "/classify/" + route.path.split("/")[2];
  }
);
</script>

<style scoped>
.kind-container {
  box-shadow: inset 0 0 10px pink, inset 0 0 5px blue, 0 0 10px red;
}
.list {
  @apply flex justify-around  gap-x-4;
}

.item {
  @apply hover:(cursor-pointer underline);
}

.active {
  @apply underline underline-pink-400 text-blue-400;
}
</style>
