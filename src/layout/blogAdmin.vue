<template>
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
    .main {
        margin-left: 250px;
    }
</style>