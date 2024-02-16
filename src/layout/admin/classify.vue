<template>
    <div class="top">
        <span>修改分类相关信息</span>
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
    <template>
        <el-dialog v-model="dialogVisible" :v-close-on-click-modal="true" :show-close="true" append-to-body
            :draggable="true" width="90%">
            <ul>
                <li v-for="(classify, index ) in satisfyClassify">
                    <div class="flex flex-col justify-between items-center bg-blue-300 text-red-700 my-3"
                        style="height: auto">
                        <div class="flex justify-center items-center my-3">
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

<script setup>
import { useStore } from "vuex"
import { ref } from "vue"
import {updateClassify} from "~/api/manager.js"


const store = useStore()

const classifiesKind = store.state.classifyKind
const classifies = store.state.classifyData
const dialogVisible = ref(false)
const satisfyClassify = ref([])


function updateClassifyPre(kind) {
    satisfyClassify.value = []
    dialogVisible.value = true
    classifies.forEach(classify => {
        if (classify.kind == kind) {
            let id = classify.id
            let name = classify.name
            let router = classify.router
            satisfyClassify.value.push({ id, name, router })
        }
    });
}



</script>

<style>
.top {
    @apply flex flex-col justify-center items-center mt-5;
}

.top .classify {
    @apply flex justify-center justify-center;
}

.classifyKind {
    @apply mx-3;
    width: 150px;
}
</style>

