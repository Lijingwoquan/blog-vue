<template>
  <NavAside></NavAside>
  <div
    class="mt-[10px] nav-main"
    :style="{ marginLeft: $store.state.adminAsideWidth }"
  >
    <router-view v-slot="{ Component }">
      <keep-alive :max="5">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { defineAsyncComponent } from "vue";
const NavAside = defineAsyncComponent(() =>
  import("./components/admin/NavAside.vue")
);

const store = useStore();
store.commit("initAsideWidth");
</script>

<style scoped>
.nav-main {
  transition: all 0.5s linear;
}
</style>
