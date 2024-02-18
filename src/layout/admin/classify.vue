<template>
    <div class="menu" @click="openMenu">
        <div>
            <el-icon>
                <ArrowDownBold />
            </el-icon>
        </div>
    </div>


    <el-drawer v-model="dialogMenuForClassify" title="classify菜单" direction="ttb" append-to-body size="500px">
        <div class="top">
            <div>
                <span>修改分类相关信息</span>
                <el-button type="primary" size="default" @click="addClassifyPre" class="btn">
                    添加分类
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-button>
            </div>
            <div class="classify">
                <el-space wrap>
                    <div v-for="(classify, index) in classifiesKind">
                        <el-button type="primary" size="default" @click="updateClassifyPre(classify.kind)"
                            class="classifyKind">
                            {{ classify.kind }}
                        </el-button>
                    </div>
                </el-space>
            </div>
        </div>
    </el-drawer>

    <template>
        <el-dialog v-model="dialogVisibleForAddKind" :v-close-on-click-modal="false" :show-close="true" append-to-body
            :draggable="true" width="70%">
            <div class="dialogForAddClassify">
                <div class="container">
                    <span class="pre">kind</span>
                    <el-input v-model="classifyParms.kind" class="input">
                    </el-input>
                </div>

                <div class="container">
                    <span class="pre">name</span>
                    <el-input v-model="classifyParms.name" class="input">
                    </el-input>
                </div>

                <div class="container">
                    <span class="pre">router</span>
                    <el-input v-model="classifyParms.router" class="input">
                    </el-input>
                </div>

                <div class="container">
                    <span class="pre">icon</span>
                    <el-input v-model="classifyParms.icon" class="input">
                    </el-input>
                </div>

                <el-button type="primary" size="default" @click="addClassify(classifyParms)" class="btn">提交</el-button>
            </div>

        </el-dialog>
    </template>

    <template>
        <el-dialog v-model="dialogVisibleForUpdateClassify" :v-close-on-click-modal="true" :show-close="true" append-to-body
            :draggable="true" width="70%">
            <ul>
                <li v-for="(classify, index ) in satisfyClassify">
                    <div class="updateClassify">
                        <div>
                            {{ classify.id }}
                            <el-input v-model="classify.name" placeholder="分类名字" class="mx-5"></el-input>
                            <el-input v-model="classify.router" placeholder="分类路由" class="mx-5"></el-input>
                            <el-button type="primary" size="default"
                                @click="updateClassify(classify.id, classify.name, classify.router)">修改分类</el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </el-dialog>
    </template>
</template>


<style scoped>
.menu {
    @apply fixed bg-red-500;
    left: 40px;
    right: 0px;
    height: 40px;
}

.menu>div {
    @apply flex justify-center items-center;
    height: 100%;
}

.top {
    @apply flex flex-col justify-center items-center mt-5;
}

.top>div {
    @apply mb-3;
}

.top .btn {
    @apply ml-5;
}

.top .classify {
    @apply flex justify-center justify-center;
}

.classifyKind {
    @apply mx-3;
    width: 150px;
}

.updateClassify {
    @apply flex flex-col justify-between items-center bg-blue-300 text-red-700 my-3;
    height: auto;
}

.updateClassify>div {
    @apply flex justify-center items-center my-3;
}

.dialogForAddClassify {
    @apply flex flex-col justify-center items-center;
}

.dialogForAddClassify .container {
    @apply flex items-center;
}

.container .input {
    @apply my-2;
}


.container .pre {
    @apply text-xl text-red-500 ml-auto;
    width: 80px;
}

.dialogForAddClassify .btn {
    @apply my-2;
    width: 100%;
}
</style>


<script setup>
import { useStore } from "vuex"
import { ref, reactive } from "vue"
import { updateClassify, addClassify } from "~/api/manager.js"
const store = useStore()
const classifyParms = reactive({
    kind: "",
    name: "",
    router: "",
    icon: "",
})

const classifiesKind = store.state.classifyKind
const classifies = store.state.classifyData
const satisfyClassify = ref([])
const dialogMenuForClassify = ref(false)
const dialogVisibleForUpdateClassify = ref(false)
const dialogVisibleForAddKind = ref(false)
function openMenu() {
    dialogMenuForClassify.value = true
}

function updateClassifyPre(kind) {
    satisfyClassify.value = []
    dialogVisibleForUpdateClassify.value = true
    classifies.forEach(classify => {
        if (classify.kind == kind) {
            let id = classify.id
            let name = classify.name
            let router = classify.router
            satisfyClassify.value.push({ id, name, router })
        }
    });
}

function addClassifyPre() {
    dialogVisibleForAddKind.value = true
}
</script>

