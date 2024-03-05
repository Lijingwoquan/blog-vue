<template>
    <div class="menu" @click="openMenu">
        <div>
            <el-icon>
                <ArrowDownBold />
            </el-icon>
        </div>
    </div>
    
    <!-- 下拉菜单 -->
    <el-drawer v-model="dialogMenuForClassify" title="classify菜单" direction="ttb" append-to-body size="500px">
        <div class="container">
            <div>
                <span>修改分类相关信息</span>
                <el-button type="primary" size="default" @click="addClassifyPre" class="btn">
                    添加分类
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-button>
            </div>
            <div class="fix">
                <el-space wrap>
                    <div v-for="(classify, index) in classifiesKind">
                        <el-button type="primary" size="default" @click="updateClassifyPre(classify.kind)"
                            class="list">
                            {{ classify.kind }}
                        </el-button>
                    </div>
                </el-space>
            </div>
        </div>
    </el-drawer>

    <!-- 添加分类窗口 -->
    <template>
        <el-dialog v-model="dialogVisibleForAddKind" :v-close-on-click-modal="false" :show-close="true" append-to-body
            :draggable="true" width="70%">
            <div class="dialogForAddClassify">
                <span class="title">kind</span>
                <el-select v-model="classifyParms.kind" class="input" placeholder="选择分类">
                    <el-option v-for="item in classifiesKind" :key="item.kind" :label="item.kind" :value="item.kind" />
                    <el-option label="自定义" value="" @click="customInputPre" />
                </el-select>
                <el-input v-if="customInput == true" v-model="classifyParms.kind" placeholder="输入分类"
                    class="mt-5"></el-input>

                <span class="title">name</span>
                <el-input v-model="classifyParms.name" class="input">
                </el-input>

                <span class="title">router</span>
                <el-input v-model="classifyParms.router" class="input">
                </el-input>

                <span class="title">icon</span>
                <el-input v-model="classifyParms.icon" class="input">
                </el-input>

                <el-button type="primary" size="default" @click="addClassify(classifyParms)" class="btn">提交</el-button>
            </div>

        </el-dialog>
    </template>

    <!-- 添加修改分类窗口 -->
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
.input{
    height: 35px;
}

.menu {
    @apply fixed;
    left: 40px;
    right: 0px;
    height: 40px;
    background-color: rgba(130, 120, 194, 0.297);
}

.menu>div {
    @apply flex justify-center items-center;
    height: 100%;
}

.container {
    @apply flex flex-col justify-center items-center mt-5;
}

.container>div {
    @apply mb-3;
}

.container .btn {
    @apply ml-5;
}

.container .fix {
    @apply flex justify-center justify-center;
}
.container  .fix .list {
    @apply mx-3;
    width: 150px;
}

.dialogForAddClassify {
    @apply flex flex-col justify-center items-center;
}

.dialogForAddClassify .title {
    @apply mr-auto mt-3;
}


.dialogForAddClassify .btn {
    @apply mt-4;
    width: 100%;
}

.updateClassify {
    @apply flex flex-col justify-between items-center bg-blue-300 text-red-700 my-3;
    height: auto;
}

.updateClassify>div {
    @apply flex justify-center items-center my-3;
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
const customInput = ref(false)
const dialogMenuForClassify = ref(false)
const dialogVisibleForUpdateClassify = ref(false)
const dialogVisibleForAddKind = ref(false)


function openMenu() {
    dialogMenuForClassify.value = true
}

function customInputPre() {
    customInput.value = true
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

