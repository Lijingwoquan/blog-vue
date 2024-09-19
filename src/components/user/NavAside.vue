<template></template>

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
  @apply overflow-x-hidden overflow-y-scroll;
}

.list {
  @apply leading-loose hover:(cursor-pointer underline);
}

.active {
  @apply underline underline-pink-400;
}

.nav-aside-fixed {
  @apply fixed top-[60px] left-0;
  opacity: 0;
}

.occur-animate {
  animation: 0.5s aside-action ease-in-out forwards;
}
.disappear-animate {
  animation: 0.5s aside-action ease-in-out forwards;
  animation-direction: reverse;
}
@keyframes aside-action {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
}
</style>
