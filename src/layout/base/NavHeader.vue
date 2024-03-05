<template>
    <div class="Headercontainer">
        <div class="left">
            <el-icon class="logoHouse" @click="toIndex">
                <House />
            </el-icon>
            <el-icon class="logoExpand hidden-sm-and-up" @click="openMenu">
                <Expand />
            </el-icon>

            <el-drawer v-model="dialogMenu" title="菜单" direction="ltr" class="bg-light-800" append-to-body size="200px">
                <nav-aside></nav-aside>
            </el-drawer>
        </div>

        <span class="middle">罹景偓佺的博客——分享全栈知识</span>

        <div class="right">
            <div class="search" @click="openSearch">
                <el-icon>
                    <search />
                </el-icon>
            </div>
            <el-dropdown>
                <div class="help">
                    <div class="text">帮助</div>
                    <el-icon class="icon">
                        <arrow-down />
                    </el-icon>
                </div>

                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <el-link type="primary" :underline="false" href="https://github.com/liuzihao520"
                                target="_blank">联系作者</el-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>


        <template>
            <el-dialog v-model="dialogVisible" :v-close-on-click-modal="true" :show-close="false" append-to-body
                :draggable="true" width="80%">
                <el-input v-model="input" placeholder="搜索文档" class="input">
                    <template #prefix>
                        <el-icon class="mx-2">
                            <search />
                        </el-icon>
                    </template>

                    <template #suffix>
                        <el-button type="primary" @click="searchMsg">搜索</el-button>
                    </template>
                </el-input>
                <ul v-if="getData">
                    <li v-for="(essay, index) in satisfyDate" class="dateShow" @click="gotoApointPath(essay.path)">
                        <div class="ml-10">文章:{{ essay.name }}</div>
                        <div class="mr-10">分类:{{ essay.kind }}</div>
                    </li>
                </ul>
            </el-dialog>
        </template>

    </div>
</template>


<style scoped>
.Headercontainer {
    @apply flex justify-around items-center fixed top-0 left-0 right-0;
    z-index: 100;
    height: 60px;
    background-color: rgba(165, 162, 183, 0.297);
}


.Headercontainer .middle {
    @apply flex flex justify-center items-center  text-sm font-bold font-serif;
    width: 100%;
}

.Headercontainer .left {
    @apply flex justify-center items-center;

}

.Headercontainer .left .logoHouse {
    @apply text-xl mx-2;
    height: auto;
}
.Headercontainer .left .logoExpand {
    @apply text-xl mr-2;
    height: auto;
}
.right {
    @apply flex justify-center items-center left-0 right-0;
}

.right .search {
    @apply flex justify-center items-center mr-2;
}

.right .help {
    @apply flex justify-center items-center;
    height: 24px;
}

.right .help .text {
    width: 28px;
}

.right .help .icon {
    @apply mr-2;
}

.search:hover {
    border-color: red;
    /* 悬停时改变边框颜色 */
}


.input {
    height: 50px;
}

.dateShow {
    @apply bg-blue-200 flex justify-between items-center my-5;
    width: 100%;
    height: 50px;
}


:deep(.el-dialog__header) {
    padding: 0px !important;
    padding-bottom: 0px !important;
    margin-right: 0px !important;
}

:deep(.el-dialog__headerbtn) {
    display: none;
}
</style>


<script setup>
import NavAside from '~/layout/base/NavAside.vue';

import { ref, onMounted, onBeforeMount, watch } from "vue"
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { toast } from '~/composables/util'

const dialogVisible = ref(false);
const store = useStore()
const essayData = store.state.essayData
const router = useRouter()
const route = useRoute()
const dialogMenu = ref(false);

function openMenu() {
    dialogMenu.value = true
}
watch(() => route.fullPath, () => {
    dialogMenu.value = false
})
function toIndex() {
    router.push("/")
}


function openSearch() {
    dialogVisible.value = true
}
const input = ref('')
let getData = ref(false)
let satisfyDate = ref([])

function searchMsg() {
    satisfyDate.value = []
    essayData.forEach(essay => {
        if (essay.name.includes(input.value)) {
            let name = essay.name
            let path = essay.router
            let kind = essay.kind
            satisfyDate.value.push({ name, path, kind })
        }
    })
    if (!(satisfyDate.value.length > 0)) {
        toast("没用查找到相关文章", "warning")
    }
    getData.value = true
}
const gotoApointPath = (path) => {
    router.push("/essay" + path)
    dialogVisible.value = false
}


function onKeyUp(e) {
    if (e.key == "Enter" && dialogVisible.value == true) {
        searchMsg()
    }
}
//添加键盘的监听
onMounted(() => {
    document.addEventListener("keyup", onKeyUp)
})
//移除键盘监听
onBeforeMount(() => {
    document.removeEventListener("keyup", onKeyUp)
})
</script>
