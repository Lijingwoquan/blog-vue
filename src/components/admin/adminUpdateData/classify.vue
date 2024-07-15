<template>
    <div class="containerClassify">
        <div class="flex justify-center">
            <span>修改classify分类</span>
            <el-button type="success" size="default" @click="addClassifyPre" class="btn">
                添加分类
                <el-icon>
                    <Plus />
                </el-icon>
            </el-button>
        </div>
        <div class="classifyList">
            <div v-for="(classify, index) in classifiesKind">
                <el-button type="primary" size="default" @click="updateClassifyPre(classify.kind)" class="btn">
                    {{ classify.kind }}
                </el-button>
            </div>
        </div>
    </div>

    <!-- 添加分类抽屉 -->
    <el-drawer v-model="drawerVisibleForAddKind" title="添加classify" direction="rtl" append-to-body size="700px">
        <div class="drawerForAddClassify" destroy-on-close>
            <span class="title">类型</span>
            <el-select v-model="classifyParms.kind" class="AddClassify" placeholder="选择分类">
                <el-option v-for="item in classifiesKind" :key="item.kind" :label="item.kind" :value="item.kind" />
                <el-option label="自定义" value="" @click="customInputPre" />
            </el-select>
            <el-input v-if="customInput == true" v-model="classifyParms.kind" placeholder="输入分类"
                class="mt-6 AddClassify"></el-input>

            <span class="title">分类名称</span>
            <el-input v-model="classifyParms.name" class="AddClassify">
            </el-input>

            <span class="title">路由</span>
            <el-input v-model="classifyParms.router" class="AddClassify">
            </el-input>

            <span class="title">图标</span>
            <div style="width: 100%;" class="flex items-center mt-2">
                <iconChoose class="AddClassify ml-1"  style="width: 30%;" :modelValue="classifyParms.icon"
                    @update:modelValue="(icon) => chooseIcon(classifyParms, icon)"></iconChoose>
            </div>

            <el-button type="primary" size="default" @click="addClassifyHandel(classifyParms)"
                class="btn">提交</el-button>
        </div>
    </el-drawer>



    <!-- 修改分类窗口 -->
    <template>
        <el-dialog v-model="dialogVisibleForUpdateClassify" :v-close-on-click-modal="true" :show-close="true"
            append-to-body :draggable="false" width="80%">

            <div class="text-center text-xl text-blue-400">该kind下的classify</div>
            <ul>
                <li>
                    <div class="updateClassify">
                        <div>
                            <el-input disabled placeholder="分类名称" class="mx-5"></el-input>
                            <el-input disabled placeholder="分类路由" class="mx-5"></el-input>
                            <el-button disabled type="primary" size="default">修改分类</el-button>
                        </div>
                    </div>
                </li>
                <li v-for="(classify, index ) in satisfyClassify">
                    <div class="updateClassify">
                        <div>
                            <el-input v-model="classify.name" placeholder="分类名称" class="mx-5"></el-input>
                            <el-input v-model="classify.router" placeholder="分类路由" class="mx-5"></el-input>
                            <el-button type="primary" size="default"
                                @click="updateClassifyHandel(classify)">修改分类</el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </el-dialog>
    </template>
    <div class="test">

    </div>
</template>

<script setup>
import { useStore } from "vuex"
import { ref, reactive, computed } from "vue"
import { updateClassify, addClassify } from "~/api/manager.js"
import { toast } from '~/composables/util'
import iconChoose from "./iconChoose.vue";

const store = useStore()
const classifyParms = reactive({
    kind: "",
    name: "",
    router: "",
    icon: "",
})

const classifiesKind = computed(() => store.state.classifyKind)
const classifies = computed(() => store.state.classifyData)


const satisfyClassify = ref([])
const customInput = ref(false)
const dialogVisibleForUpdateClassify = ref(false)
const drawerVisibleForAddKind = ref(false)


const customInputPre = () => {
    customInput.value = true
}

// 选择图标
const chooseIcon = (classifyParms, icon) => {
    classifyParms.icon = icon
}

// 添加
const addClassifyPre = () => {
    drawerVisibleForAddKind.value = true
}

const addClassifyHandel = (classifyParms) => {
    addClassify(classifyParms)
        .then(async () => {
            await store.dispatch("getIndexInfo")
            toast("添加分类种类成功")
        }).catch(() => {
            toast("添加分类种类失败", "error")
        })
}

// 更新
const updateClassifyPre = (kind) => {
    satisfyClassify.value = []
    dialogVisibleForUpdateClassify.value = true
    classifies.value.forEach(classify => {
        if (classify.kind == kind) {
            let id = classify.id
            let name = classify.name
            let router = classify.router
            satisfyClassify.value.push({ id, name, router })
        }
    });
}

const updateClassifyHandel = (classify) => {
    updateClassify(classify)
        .then(async () => {
            await store.dispatch("getIndexInfo")
            toast("修改分类成功")
        }).catch(() => {
            toast("修改分类失败", "error")
        })
}

</script>


<style scoped>
    .containerClassify {
        @apply flex flex-col justify-center items-center mt-5;
    }

    .containerClassify>div {
        @apply mb-3;
    }

    .containerClassify .btn {
        @apply ml-5;
    }

    .containerClassify .classifyList {
        @apply flex justify-center items-center flex-wrap;
    }

    .containerClassify .classifyList .btn {
        @apply mx-2 my-2;
        width: 150px;
    }

    .drawerForAddClassify {
        @apply flex flex-col justify-center items-center text-lg text-blue-700;
    }

    .drawerForAddClassify .title {
        @apply mr-auto mt-5;
    }


    .drawerForAddClassify .btn {
        @apply mr-auto my-10;
        width: 100%;
    }

    .updateClassify {
        @apply flex flex-col justify-center items-center my-5;
        height: auto;
    }

    .AddClassify {
        height: 40px;
    }

    :deep(.el-select__selection) {
        height: 40px;
    }

    .updateClassify>div {
        @apply flex justify-around my-3;
        width: 80%;
    }
</style>
