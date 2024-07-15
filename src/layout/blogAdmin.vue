<template>
    <NavHead ></NavHead>
    <NavAside></NavAside>
    <div class="main">
        <router-view v-slot="{ Component }">
            <keep-alive :max="5">
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>

import NavAside from "~/components/admin/NavAside.vue";
import NavHead from "~/components/admin/NavHead.vue";

</script>

<style scoped>
    .main {
        margin-top: 85px;
        margin-left: 250px;
    }
</style>