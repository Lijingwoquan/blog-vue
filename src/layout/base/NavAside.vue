<template>
    <div class="nav-aside">
        <el-menu unique-opened active-text-color="blue" :default-active="defaultActive" class="menu" @select="handleSelect">
            <el-menu-item :key="'/'" :index="'/'">
                <el-icon>
                    <House />
                </el-icon>
                <span> 首页 </span>
            </el-menu-item>

            <div v-for="(item, index) in menu" :key="item.id" :index="item.id">
                <el-sub-menu v-if="item.classifyDetails.length > 0" :index="item.id">
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';


const router = useRouter()
const store = useStore()
const route = useRoute()
const defaultActive = ref(route.path)

//进入文章之后绑定的defaultActive
if (route.path.split("/").length > 3) {
    defaultActive.value = '/classify/' + route.path.split('/')[2]
}
const menu = computed(() => store.state.indexData)

const handleSelect = (e) => {
    router.push(e)
}
</script>



<style  scoped>
.nav-aside {
    @apply overflow-x-hidden overflow-y-auto fixed bg-white;
    width: auto;
    top: 100px;
    bottom: 0px;
}

.nav-aside .menu {
    z-index: 0;
}

.nav-aside::-webkit-scrollbar {
    width: 0px;
}

:deep(.el-menu) {
    border-right: 0px;
    background-color: '' !important;
    color: '' !important;
}

.el-sub-menu:hover {
    background-color: transparent;
}

.el-menu-item:hover {
    background-color: rgb(139, 202, 230) !important;

}

.el-sub-menu {
    --el-menu-hover-bg-color: #007BFF;
}
</style>