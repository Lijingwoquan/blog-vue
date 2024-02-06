<template>
    <div class="nav-top" >
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

        <template>
            <el-dialog v-model="dialogVisible" :v-close-on-click-modal="true" :show-close="false" append-to-body :draggable="true">
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
                    找到数据了
                </ul>

            </el-dialog>
        </template>


        <div class="nav-top-right">
            <div class="icon-text ">
                <el-dropdown>
                    <span class="icon-text-details">
                        用户
                        <el-icon>
                            <arrow-down />
                        </el-icon>
                    </span>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="gotoSelf">修改信息</el-dropdown-item>
                            <el-dropdown-item @click="gotoQuit">退出登录</el-dropdown-item>
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
                                <el-dropdown-item @click="gotoHelp">使用教程</el-dropdown-item>
                                <el-dropdown-item @click="gotoContact">联系作者</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>

            <div class="nav-top-right">
                <div class="icon-text ">
                    <span class="icon-text-details">
                        <!-- <el-icon @click="changeReadindMod">
                            <Sunny v-show="mod == 'day'" />
                            <Moon v-show="mod == 'night'" />
                        </el-icon> -->
                    </span>
                </div>
            </div>
        
        
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue"
import { useStore } from 'vuex';



const dialogVisible = ref(false);

function openSearch() {
    dialogVisible.value = true
}

let getData = ref(null)

const store = useStore()
const essayData = store.state.indexData

//待补充
function searchMsg() {
    console.log("正在搜索")
console.log(essayData) 
    getData.value = true
}

const input = ref('')

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

//前往前端
function gotoSelf() {
    console.log(1)
}
//前往退出
function gotoQuit() {
    console.log(2)
}
//前往帮助
function gotoHelp() {
    console.log(4)
}

//前往联系作者
function gotoContact() {
    console.log(3)
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

.input {
    height: 50px;
}

.icon-text {
    @apply flex items-center mx-3;
    height: 24px;
}

.icon-text-details {
    @apply flex justify-center items-center;
    height: 24px;
}



.el-dialog__headerbtn {
    display: none;
}

:deep(.el-dialog__header) {
    padding: 0px !important;
    padding-bottom: 10px !important;
    margin-right: 16px !important;
}

:deep(.el-dialog__headerbtn) {
    display: none;
}
</style>