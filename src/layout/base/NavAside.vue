<template>
    <div class="nav-aside" :style="{ backgroundColor: bgColor }">
        <el-menu active-text-color="red" default-active="1" style="width: 200px;"
            :style="{ backgroundColor: bgColor, color: textColor }">

            <div v-for="item in classify" :key="item.title" :index="item.title">
                <el-sub-menu v-if="item.childrenTitles.length > 0" :index="item.title" >
                    <template #title>
                        <el-icon :style="{ color: textColor }">
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span :style="{ color: textColor }">{{ item.title }}</span>
                    </template>
                    <el-menu-item v-for="item2 in item.childrenTitles" :style="{backgroundColor:bgColor,color:textColor}" :key="item2" :index="item2">
                        {{ item2 }}
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item v-else :style="{ color: textColor }">
                    <el-icon :style="{ color: textColor }">
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>   {{ item.title }}</span>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>


<script setup>
import { ModChange } from "~/composables/overall.js"

const {
    mod,
    bgColor,
    textColor,
    changeReadindMod,
} = ModChange()

const classify = [{
    title: "前端文档",
    icon: "CoffeeCup",
    childrenTitles: ["html", "css", "js", "vue", "react"]
},
{
    title: "后端文档",
    icon: "Orange",
    childrenTitles: ["goland", "c++", "java", "mysql", "redis"]
},
{
    title: "全栈开发",
    icon: "GobletSquareFull",
    childrenTitles: ["bluebell项目", "博客项目", "电商项目"]
},
{
    title: "收藏文章",
    icon: "FolderOpened",
    childrenTitles: []
},
{
    title: "笔记",
    icon: "Notebook",
    childrenTitles: []
},
{
    title: "待办事项",
    icon: "Filter",
    childrenTitles: []
},
{
    title: "讨论室",
    icon: "Connection",
    childrenTitles: []
},
{
    title: "使用教程",
    icon: "DataBoard",
    childrenTitles: []
},
{
    title: "联系作者",
    icon: "MessageBox",
    childrenTitles: []

}]


</script>





<style  scoped>
.nav-aside {
    @apply overflow-x-hidden overflow-y-auto fixed bg-white;
    top: 48px;
    width: 200px;
    bottom: 0px;
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