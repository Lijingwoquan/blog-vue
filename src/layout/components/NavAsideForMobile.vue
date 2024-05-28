<template>
    <div class="nav-aside">
        <el-menu unique-opened active-text-color="blue" :default-active="defaultActive" class="menu"
            @select="handleSelect">
            <div v-for="(item, index) in menu" :key="index" :index="index">
                <el-sub-menu v-if="Array.isArray(item.classifyDetails) && item.classifyDetails.length > 0"
                    :index="item.icon">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.classifyKind }}</span>
                    </template>
                    <el-menu-item v-for="item2 in item.classifyDetails" :key="item2.router"
                        :index="'/classify' + item2.router">
                        {{ item2.name }}
                    </el-menu-item>
                </el-sub-menu>
            </div>
        </el-menu>
    </div>
</template>


<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';


const router = useRouter()
const store = useStore()
const route = useRoute()
const defaultActive = ref(route.path)

//进入文章之后绑定的defaultActive
if (route.path.split("/").length > 3) {
    defaultActive.value = '/classify/' + route.path.split('/')[2]
}
const menu = store.state.indexData

const handleSelect = (e) => {
    router.push(e)
}

watch(() => route.fullPath, () => {
    defaultActive.value = '/classify/' + route.path.split('/')[2]
})

</script>


<style scoped>
    .nav-aside {
        @apply overflow-x-hidden overflow-y-auto fixed;
        width: auto;
        top: 60px;
        bottom: 0px;

    }

    .nav-aside .menu {
        z-index: 0;
        height: 100%;
        background: linear-gradient(to right, rgb(230, 228, 242, 0.2), rgb(157, 169, 224, 0.2));
    }

    .nav-aside::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }


    .el-sub-menu {
        /* menu鼠标hover的颜色 */
        --el-menu-hover-bg-color: rgb(157, 169, 224, 0.5);
    }
</style>
