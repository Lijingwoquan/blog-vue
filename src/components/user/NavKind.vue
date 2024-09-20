<template>
  <div class="flex items-center justify-center">
    <div v-for="(item, index) in menu" :key="index" class="kind-container">
      <div class="min-w-[300px] text-center">
        <a href="/kind" class="font-serif inline-block text-xl">
          {{ item.kind?.name }}
        </a>
      </div>
      <div
        class="list"
        v-if="Array.isArray(item.classifyList) && item.classifyList.length > 0"
      >
        <div
          class="item"
          v-for="(classify, index2) in item.classifyList"
          :key="index2"
        >
          <a
            :href="'/classify' + classify.router"
            v-if="index2 < 3"
            class="text-center font-mono text-sm"
            :class="{
              active: activeClassify === '/classify' + classify.router,
            }"
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
  height: 100%;
  @apply flex flex-col justify-evenly;
  z-index: 1;
}

.kind-container:nth-child(1) {
  background-color: rgb(146, 237, 187);
}

.list {
  @apply flex justify-around  gap-x-4;
}

a:hover,
.item:hover {
  cursor: pointer;
  animation: text-action 0.15s ease-in-out 3;
}
.active {
  color: rgb(189, 42, 111);
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
