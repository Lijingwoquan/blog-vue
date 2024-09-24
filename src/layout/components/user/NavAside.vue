<template>
  <div :class="navStyle" ref="navAsideRef">
    <div>
      <navKind v-if="position === 'right'"></navKind>
    </div>
    <advertise
      v-if="advertiseMsg && advertiseImg"
      :text="advertiseMsg"
      :position="props.position"
      :advertising-img="advertiseImg"
    ></advertise>
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
const advertise = defineAsyncComponent(() =>
  import("~/components/advertise.vue")
);
const navKind = defineAsyncComponent(() => import("~/components/navKind.vue"));

const navAsideRef = ref(null);

const handleResize = () => {
  const windowWinth = window.innerWidth;
  const precent = {
    left: 0,
    right: 0,
  };

  if (windowWinth >= 1200) {
    precent.left = 4 - 0.7;
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
  advertiseMsg: {
    type: String,
  },
  advertiseImg: {
    type: String,
  },
});

const navStyle = computed(() => {
  return props.position === "left" ? "nav-aside-left" : "nav-aside-right";
});

onMounted(() => {
  handleResize();
  window.addEventListener("resize", throttle(handleResize, 30));
});
onUnmounted(() => {
  window.removeEventListener("resize", throttle(handleResize, 30));
});
</script>

<style scoped>
.nav-aside-left {
  @apply fixed top-[140px] left-0 ml-4;
}
.nav-aside-right {
  @apply fixed top-[70px] right-0 mr-3;
}
</style>
