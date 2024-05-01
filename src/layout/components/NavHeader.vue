<template>
    <div class="Headercontainer">
        <div class="left">
            <el-icon class="logoHouse" size="20px" @click="toIndex">
                <House />
            </el-icon>
            <el-icon class="logoExpand hidden-sm-and-up" size="20px" @click="openMenu">
                <Expand />
            </el-icon>
            <el-drawer v-model="dialogMenu" title="菜单" direction="ltr" class="bg-light-800" size="220px">
                <NavAsideForModel style="z-index: 10000 !important;"></NavAsideForModel>
            </el-drawer>
        </div>
        <div class="middle">
            <span>罹景偓佺的博客</span>
        </div>

        <div class="right">
            <div class="search" @click="openSearch">
                <el-icon size="20px">
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
                            <el-link type="primary" :underline="false" href="https://github.com/Lijingwoquan"
                                target="_blank">联系作者</el-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
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
                <el-divider v-if="satisfyDate.length > 0" />
                <li v-for="essay in satisfyDate" @click="gotoApointPath(essay.path)">
                    <div class="essayList">
                        <div class="ml-3">
                            文章:{{ essay.name }}
                        </div>
                        <div class="mr-3">
                            分类:{{ essay.kind }}
                        </div>
                    </div>
                    <el-divider />
                </li>
            </ul>
        </el-dialog>
    </template>
</template>


<script setup>
import NavAsideForModel from '~/layout/components/NavAsideForModel.vue';
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
    if (input.value == "") {
        toast("请输入搜索内容", "warning")
        return
    }
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





<style scoped>
    .Headercontainer {
        @apply flex justify-between items-center fixed top-0 left-0 right-0;
        z-index: 100;
        height: 60px;
        background-color: rgba(107, 95, 175, 0.168);
    }

    .Headercontainer .left {
        @apply flex justify-start items-center;
        width: 65px;
        margin-right: 0;
    }


    .Headercontainer .left .logoHouse {
        @apply text-xl mx-3;
        height: auto;
    }

    .Headercontainer .left .logoExpand {
        @apply text-xl;
        height: auto;
    }

    .Headercontainer .middle {
        @apply text-sm font-bold font-serif;
        padding-left: 10%;
        white-space: nowrap;
    }

    .Headercontainer .right {
        @apply flex justify-end items-center left-0 right-0;
        width: 100px;
    }

    .Headercontainer .right .search {
        @apply flex justify-center items-center mr-3;
    }

    .Headercontainer .right .help {
        @apply flex justify-center items-center mr-1;
        height: 24px;
    }

    .Headercontainer .right .help .text {
        width: 28px;
    }

    .Headercontainer .right .help .icon {
        @apply mr-2;
    }

    .Headercontainer .right .search:hover {
        border-color: red;
        /* 悬停时改变边框颜色 */
    }


    .input {
        height: 50px;
    }

    .essayList {
        @apply flex justify-between items-center;
        background-color: rgba(107, 95, 175, 0.168);
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

    :deep(.el-drawer__body) {
        padding: 0 !important;
    }
</style>
