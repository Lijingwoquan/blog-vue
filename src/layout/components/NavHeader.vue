<template>
    <div class="nav-top" :style="{ backgroundColor: bgColor, color: textColor }">
        <div class="nav-top-left">
            <el-icon class="logo">
                <Menu />
            </el-icon>
            无尽仙码 独舞孤心
        </div>


        <div class="nav-top-middle" @click="openSearch">
            <el-icon class="mx-2">
                <search />
            </el-icon>
            搜索
            <el-icon class="mx-2">
                <Reading />
            </el-icon>
        </div>
        <el-dialog v-model="dialogVisible" title="搜索内容" draggable=true>
            <el-button @click="searchMsg">搜索</el-button>
            <el-button type="primary" @click="closeSerch">取消</el-button>
        </el-dialog>


        <div class="nav-top-right">
            <div class="icon-text ">
                <el-dropdown>
                    <span class="icon-text-details">
                        文档
                        <el-icon>
                            <arrow-down />
                        </el-icon>
                    </span>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>前端</el-dropdown-item>
                            <el-dropdown-item>后端</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

            <div class="nav-top-right">
                <div class="icon-text ">
                    <el-dropdown>
                        <span class="icon-text-details">
                            帮助
                            <el-icon>
                                <arrow-down />
                            </el-icon>
                        </span>

                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>联系作者</el-dropdown-item>
                                <el-dropdown-item>使用教程</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>

            <div class="nav-top-right">
                <div class="icon-text ">
                    <span class="icon-text-details">
                        <el-icon @click="changeReadindMod">
                            <Sunny v-show="mod == 'day'" />
                            <Moon v-show="mod == 'night'" />
                        </el-icon>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { ModChange } from "~/composables/header.js"
const {
    mod,
    bgColor,
    textColor,
    changeReadindMod,

} = ModChange()

const dialogVisible = ref(false);
function openSearch() {
    dialogVisible.value = true
}
function closeSerch() {
    dialogVisible.value = false
}
//待补充
function searchMsg() {
    dialogVisible.value = false
}


</script>
<style scoped>
.nav-top {
    @apply flex justify-between items-center bg-blue-400 fixed top-0 left-0 right-0;
    height: 48px;
}

.nav-top-left {
    @apply flex justify-center items-center;
}

.nav-top-middle {
    @apply mx-auto flex justify-center items-center text-shadow-md rounded-xl;
    border: 1px solid transparent;
    /* 初始状态下边框透明 */
    transition: border-color 0.1s;
    /* 添加过渡效果 */
    height: 36px;
}

.nav-top-middle:hover {
    border-color: red;
    /* 悬停时改变边框颜色 */
}

.logo {
    @apply text-xl mx-4;
    height: auto;
}

.nav-top-right {
    @apply flex;
}

.icon-text {
    @apply flex items-center mx-3;
    height: 24px;
}

.icon-text-details {
    @apply flex justify-center items-center;
    height: 24px;
}
</style>