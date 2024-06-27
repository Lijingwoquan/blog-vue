<template>
    <div class="nav-aside">
        <div class="nav-aside-head" style="height: 80px;">
            <el-icon style="height: 100%;" class="flex items-center text-rose-300">
                <Burger />
            </el-icon>
            <div style="height: 100%;" class="flex items-center text-purple-200">后台管理系统</div>
        </div>
        <div class="item-background-color">
            <div v-for="(item, index) in menu" :key="index" class="nav-aside-item" style="height: 40px;"
                @click="switchTool(item)" :class="{ active: item.route === activeToolRoute }">
                <el-icon style="height: 100%;" class="flex justify-center items-center " :size="30" text>
                    <component :is="item.icon" />
                </el-icon>
                <span style="height: 100%;" class="flex justify-center items-center ">
                    {{ item.name }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { config } from "/config.js"
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';

const route = useRoute()
const router = useRouter()

const activeToolRoute = ref("")

const menu = [
    {
        name: "数据展示",
        route: "/",
        icon: "Operation"
    },
    {
        name: "创建文章",
        route: "/createEssay",
        icon: "MoonNight"
    },
    {
        name: "修改文章",
        route: "/updateEssay",
        icon: "Edit"
    },
    {
        name: "修改数据",
        route: "/updateData",
        icon: "WindPower"
    }
]

const switchTool = (item) => {
    router.push(`${config.MANAGER_URL}${item.route}`)
}

watch(() => route.path, () => {
    activeToolRoute.value = "/" + route.path.split("/")[3]
})
onMounted(() => {
    activeToolRoute.value = "/" + route.path.split("/")[3]
})
</script>

<style scoped>
    .nav-aside {
        @apply fixed;
        box-sizing: border-box;
        width: 250px;
        top: 0;
        bottom: 0;
        color: rgb(224, 218, 218);
        background:
            linear-gradient(to bottom,
                rgba(164, 154, 230, 0.75) 80px,
                rgba(227, 107, 129, 0.82),
                rgba(164, 148, 135, 0.821));
    }

    .nav-aside-head {
        @apply flex justify-around text-2xl p-2;
        background: linear-gradient(to right, rgba(121, 110, 220, 0.622), rgba(52, 78, 226, 0.643) 75%, rgba(79, 170, 43, 0.575));
    }

    .nav-aside-item {
        @apply flex justify-around mt-6 text-xl hover:(cursor-pointer text-blue-500);
    }

    .active {
        @apply text-blue-500;
    }
</style>