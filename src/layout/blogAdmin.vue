<template>
    <!-- <div class="background-color">
    </div> -->
    <NavAside></NavAside>
    <div class="main">
        <router-view v-slot="{ Component }">
            <keep-alive :max="3">
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
    /* .background-color {
        @apply fixed;
        left: 250px;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
    } */

    .main {
        margin-left: 250px;
    }
</style>