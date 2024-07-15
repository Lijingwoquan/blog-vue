<template>
    <div class="nav-head">
        <div class="nav-head-left">
            <el-icon style="height: 100%;" class="flex  items-center text-blue-300">
                <Burger />
            </el-icon>
            <div class="flex items-center ml-3 text-purple-300">
                后台管理系统
            </div>
            <el-icon style="height: 100%;" class="flex items-center text-blue-300 ml-3 hover:cursor-pointer"
                @click="$store.commit('handleAdminAsideWidth')">
                <Fold v-if="$store.state.adminAsideWidth === '250px'" />
                <Expand v-else />
            </el-icon>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex"

const store = useStore()
</script>

<style scoped>
    .nav-head {
        @apply fixed flex;
        top: 0;
        left: 0;
        right: 0;
        height: 80px;
        background-color: rgb(91, 141, 162);
        z-index: 1;
    }

    .nav-head-left {
        @apply flex text-2xl p-2;
    }
</style>