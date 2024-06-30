<template>
    <div class="background-color">
    </div>
    <NavAside></NavAside>
    <div class="main">
        <router-view v-slot="{ Component }">
            <keep-alive :max="10">
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>

</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import { useRoute } from 'vue-router';
import NavAside from "~/components/admin/NavAside.vue";

</script>

<style scoped>
    .background-color {
        @apply fixed;
        left: 250px;
        right: 0;
        top: 0;
        bottom: 0;
        /* background:
            linear-gradient(to right top,
                rgba(0, 0, 255, 0.554),
                rgba(255, 192, 203, 0.565)); */
    }

    .main {
        margin-left: 250px;
    }
</style>