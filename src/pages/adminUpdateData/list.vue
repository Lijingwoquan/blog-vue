<template>
  <div class="flex justify-between items-start">
    <div class="mt-10 ml-10" style="width: 50%">
      <kind></kind>
    </div>
    <div class="mt-10 mr-10" style="width: 50%">
      <classify></classify>
    </div>
  </div>
  <div class="background" :style="{ left: $store.state.adminAsideWidth }"></div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
const classify = defineAsyncComponent(() =>
  import("./components/classify.vue")
);
const kind = defineAsyncComponent(() => import("./components/kind.vue"));
</script>

<style scoped>
.background {
  @apply fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    to right,
    rgba(173, 173, 38, 0.1),
    rgba(100, 17, 202, 0.1),
    rgba(223, 94, 43, 0.1)
  );
  z-index: 100;
  pointer-events: none;
}
</style>
