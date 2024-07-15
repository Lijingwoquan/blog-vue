<template>
    <div class="nav-aside">
      
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item v-for="(item, index) in menu" :key="index" @click="switchTool(item)"
                :class="{ active: item.route === activeToolRoute }">
                <template #default>
                    <el-icon style="height: 100%;" class="flex justify-center items-center " :size="30" text>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
            </el-menu-item>
        </el-menu>
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
        name: "管理文章",
        route: "/manageEssay",
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
        top: 80px;
        bottom: 0;
        color: rgb(224, 218, 218);
        background-color: rgba(32, 167, 225, 0.884);
    }

  

    .nav-aside-item {
        @apply flex justify-around mt-6 text-xl;
    }

    .nav-aside-item:hover {
        cursor: pointer;
        color: rgba(20, 231, 122, 0.825);
    }

    .active {
        color: rgb(182, 20, 231);
    }
</style>