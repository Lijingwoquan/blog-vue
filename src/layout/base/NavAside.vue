<template>
    <div class="nav-aside" :style="{ backgroundColor: bgColor }">
        <el-menu unique-opened active-text-color="blue" :default-active="defaultActive" class="menu" @select="handleSelect"
            :style="{ backgroundColor: bgColor, color: textColor }">

            <el-menu-item :style="{ backgroundColor: bgColor, color: textColor }" :key="'/'" :index="'/'">
                <el-icon>
                    <House />
                </el-icon>
                <span> 首页 </span>
            </el-menu-item>

            <div v-for="(item, index) in menu" :key="item.index" :index="item.index">
                <el-sub-menu v-if="item.classifyDetails.length > 0" :index="item.icon">
                    <template #title>
                        <el-icon :style="{ color: textColor }">
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span :style="{ color: textColor }">{{ item.classifyKind }}</span>
                    </template>
                    <el-menu-item v-for="item2 in item.classifyDetails"
                        :style="{ backgroundColor: bgColor, color: textColor }" :key="item2.router"
                        :index="'/classify' + item2.router">
                        {{ item2.name }}
                    </el-menu-item>
                </el-sub-menu>
            </div>

            <el-menu-item :style="{ backgroundColor: bgColor, color: textColor }" :key="'/memo'" :index="'/memo'">
                <el-icon>
                    <Notebook />
                </el-icon>
                <span> 备忘录 </span>
            </el-menu-item>


        </el-menu>
    </div>
</template>


<script setup>
import { ModChange } from "~/composables/overall.js"
import { useRouter, useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';


const {
    mod,
    bgColor,
    textColor,
    changeReadindMod,
} = ModChange()

const router = useRouter()
const store = useStore()
const route = useRoute()
const defaultActive = ref(route.path)

const menu = computed(() => store.state.indexData)


const handleSelect = (e) => {
    router.push(e)
}
</script>





<style  scoped>
.nav-aside {
    @apply overflow-x-hidden overflow-y-auto fixed bg-white;
    top: 48px;
    width: 200px;
    bottom: 0px;
}

.nav-aside .menu {
    z-index: 0;
    width: 200px;
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
}</style>