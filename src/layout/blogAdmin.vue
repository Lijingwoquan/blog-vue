<template>
    <NavAside></NavAside>
    <div class="main" :style="{ marginLeft: $store.state.adminAsideWidth }">
        <router-view v-slot="{ Component }">
            <keep-alive :max="5">
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
import { useStore } from "vuex"
import NavAside from "~/components/admin/NavAside.vue";

const store = useStore()
store.commit("initAsideWidth")
</script>

<style scoped>
    .main {
        margin-top: 5px;
    }
</style>