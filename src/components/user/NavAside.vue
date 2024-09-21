<template>
  <div :class="navStyle" ref="navAsideRef">
    <advertise :text="advertiseMsg" :position="props.position"></advertise>
    <!-- <NavKind></NavKind> -->
    <div>
      <NavKind v-if="position === 'right'"></NavKind>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  defineAsyncComponent,
} from "vue";
import { throttle } from "~/composables/util";
import advertise from "./advertise.vue";
import NavKind from "./NavKind.vue";
// const NavKind = defineAsyncComponent(() => {
//   import("./NavKind.vue");
// });

const navAsideRef = ref(null);

const handleResize = () => {
  const windowWinth = window.innerWidth;
  const precent = {
    left: 0,
    right: 0,
  };

  if (windowWinth >= 1200) {
    precent.left = 3 - 0.5;
    precent.right = 4 - 0.5;
  } else {
    precent.left = 5;
  }

  let navAsideWidht;
  if (props.position == "left") {
    navAsideWidht = windowWinth * (precent.left / 24) + "px";
    navAsideRef.value.style.width = navAsideWidht;
  } else {
    navAsideWidht = windowWinth * (precent.right / 24) + "px";
    navAsideRef.value.style.width = navAsideWidht;
  }
};

const props = defineProps({
  position: {
    type: String,
    required: true,
  },
});

const navStyle = computed(() => {
  return props.position === "left" ? "nav-aside-left" : "nav-aside-right";
});

const advertiseMsg = computed(() => {
  return props.position === "left" ? "全局广告位" : "文章页广告位";
});

onMounted(() => {
  window.addEventListener("resize", throttle(handleResize, 200));
  handleResize();
});
onUnmounted(() => {
  window.removeEventListener("resize", throttle(handleResize, 50));
});
</script>

<style scoped>
.nav-aside-left {
  @apply fixed top-[140px] left-0 ml-4;
}
.nav-aside-right {
  @apply fixed top-[140px] right-0 mr-3;
}
</style>
