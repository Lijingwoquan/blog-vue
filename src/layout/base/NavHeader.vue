<template>
    <div class="nav-top">
        <div class="title">罹景偓佺的博客——分享全栈知识</div>
        <div class="tool">
            <div class="nav-top-left">
                <el-icon class="logo" @click="toIndex">
                    <House />
                </el-icon>
            </div>
            <div class="nav-top-middle" @click="openSearch">
                <el-icon>
                    <search />
                </el-icon>
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
                                <el-dropdown-item @click="openUpdateUserMsg">修改信息</el-dropdown-item>
                                <el-dropdown-item @click="openLogout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                    <el-drawer v-model="dialog" title="修改用户信息" direction="rtl" append-to-body size="280px">
                        <el-form ref="formRef" :model="form" :rules="rules" class="w-[250px]">
                            <el-form-item prop="username">
                                <el-input v-model="form.username">
                                    <template #prefix>
                                        <el-icon>
                                            <user />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="email">
                                <el-input v-model="form.email">
                                    <template #prefix>
                                        <el-icon>
                                            <MessageBox />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="oldPassword" @click="cleanOldPassword">
                                <el-input type="password" show-password v-model="form.oldPassword" autocomplete="off"
                                    placeholder="旧密码">
                                    <template #prefix>
                                        <el-icon>
                                            <lock />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>

                            <el-form-item prop="password">
                                <el-input type="password" show-password v-model="form.password" autocomplete="off"
                                    placeholder="新密码">
                                    <template #prefix>
                                        <el-icon>
                                            <lock />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>


                            <el-form-item prop="rePassword">
                                <el-input type="password" show-password v-model="form.rePassword" autocomplete="off"
                                    placeholder="重复新密码">
                                    <template #prefix>
                                        <el-icon>
                                            <lock />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>


                            <el-form-item>
                                <el-button round type="primary" class="w-[250px]" :loading="loading"
                                    @click="toUpdateUserMsg">修改信息</el-button>
                            </el-form-item>
                        </el-form>
                    </el-drawer>
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
                                    <el-dropdown-item>
                                        <el-link type="primary" :underline="false" href="https://github.com/liuzihao520"
                                            target="_blank">联系作者</el-link>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from "vue"
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus'
import { toast } from '~/composables/util'

const dialogVisible = ref(false);
const store = useStore()
const essayData = store.state.essayData
const router = useRouter()

function toIndex() {
    router.push("/")
}


function openSearch() {
    dialogVisible.value = true
}
//输入框
const input = ref('')
//搜索数据
let getData = ref(false)
let satisfyDate = ref([])
//已完成
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
const loading = ref(false)
//更新用户信息
const userInfo = store.state.userInfo
const form = reactive({
    username: userInfo.username,
    email: userInfo.email,
    oldPassword: "",
    password: "",
    rePassword: "",
})
const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (form.rePassword !== '') {
            if (!(form.value === form.rePassword)) {
                callback(new Error("两次密码输入不相同"))
            }

        }
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== form.password) {
        callback(new Error("两次密码输入不相同"))
    } else {
        callback()
    }
}
const rules = {
    username: [
        { required: true, message: "用户名不能为空", trigger: "blur" }
    ],
    email: [
        { required: true, message: "邮箱不能为空", trigger: "blur" }
    ],
    oldPassword: [
        { required: true, message: "旧密码不能为空", trigger: "blur" }
    ],
    newPassword: [
        { validator: validatePass, trigger: 'blur' },
    ],
    rePassword: [
        { validator: validatePass2, trigger: 'blur' }
    ],
}
let clean = ref(false)
const cleanOldPassword = () => {
    if (clean.value === false) {
        form.oldPassword = null
        clean.value = true
    }

}
const formRef = ref(null)

const dialog = ref(false)
const openUpdateUserMsg = () => {
    dialog.value = true
}
const toUpdateUserMsg = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        loading.value = true
        store.dispatch("updateUserMsg", form).then(res => {
            toast("修改信息成功", "success")
            location.reload()
        })
            .finally(() => {
                loading.value = false
            })
    })
}

const openLogout = async () => {
    try {
        await ElMessageBox.confirm(
            '确定要退出登录?',
            '退出登录',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        );

        let username = store.state.userInfo.username;
        console.log(username);
        await store.dispatch("logout", username);
        router.push("/login");
        toast("退出成功", "success");
    } catch (error) {
        console.error("退出登录时发生错误:", error);
    }
};

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
.nav-top {
    @apply flex flex-col justify-between items-center bg-blue-400 fixed top-0 left-0 right-0;
    z-index: 100;
    height: 100px;
}

.nav-top .title {
    @apply flex justify-center items-center text-xl bg-gray-400  font-bold font-serif;
    width: 100%;
    height: 60px;
}

.nav-top .tool {
    @apply flex justify-between items-center bg-blue-400 left-0 right-0;
    width: 100%;
}

.nav-top-left {
    @apply flex justify-center items-center;
}

.nav-top-middle {
    @apply ml-auto mr-2 flex justify-center items-center text-shadow-md rounded-xl;
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
    @apply text-xl ml-1;
    height: auto;
}

.nav-top-right {
    @apply flex;
}

.input {
    height: 50px;
}

.dateShow {
    @apply bg-blue-200 flex justify-between items-center my-5;
    width: 100%;
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