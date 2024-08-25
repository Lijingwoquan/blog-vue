<template>
  <div class="nav-aside pl-4 pr-3">
    <div v-for="(item, index) in menu" :key="index" class="mt-2">
      <h4 class="mb-2" style="color: rgb(16, 159, 241); font-weight: 600">
        {{ item.kind?.name }}
      </h4>
      <section class="mb-5 ml-4">
        <div
          class="flex justify-center flex-col"
          v-if="
            Array.isArray(item.classifyList) && item.classifyList.length > 0
          "
        >
          <span
            class="list"
            v-for="(classify, index2) in item.classifyList"
            :key="index2"
            @click="chooseKind(classify)"
            :class="{
              active: activeClassify === '/classify' + classify.router,
            }"
          >
            {{ classify.name }}
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
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

const chooseKind = (item) => {
  activeClassify.value = "/classify" + item.router;
  router.push(activeClassify.value);
};

watch(
  () => route.path,
  () => {
    activeClassify.value = "/classify/" + route.path.split("/")[2];
  }
);
</script>

<style scoped>
.nav-aside {
  @apply overflow-x-hidden overflow-y-scroll fixed;
  top: 60px;
  bottom: 0px;
  width: 15%;
}

.list {
  @apply leading-loose hover:(cursor-pointer underline text-shadow-sm);
  color: rgb(58, 132, 139);
  font-size: 105%;
}

.active {
  @apply underline underline-pink-400 text-stroke-sm text-shadow-sm;
  color: blueviolet;
  font-size: 130%;
}
</style>
