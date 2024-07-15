<template>
    <div class="flex flex-col items-center">
        <span>修改kind类型</span>
        <div v-for="kind in classifiesKind" class="lists">
            <div class="list">
                <el-input style="width: 35%;" v-model="kind.kind" placeholder="分类名" class="input"></el-input>
                <el-icon class="ml-2" :size="16">
                    <component :is="kind.icon"></component>
                </el-icon>
                <el-button class="ml-3" style="width: 30%;" type="primary" size="default"
                    @click="updateKindHandelPre(kind)">选择</el-button>
            </div>
        </div>
    </div>

    <el-drawer v-model="dialogForAddEssay" title="添加文章" direction="rtl" append-to-body size="700px">
        类型名
        <el-input class="mb-5" v-model="kindForm.name" placeholder="文章名" />
        图标
        <iconChoose class=" mx-3" style="width: 30%;" :modelValue="kindForm.icon"
            @update:modelValue="(icon) => chooseIcon(kindForm, icon)"></iconChoose>
        <el-button type="primary" size="large" style="width: 100%;" @click="updateKindHandel"
            class="mt-5">添加</el-button>
    </el-drawer>

</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex"
import { updateKind } from "~/api/manager.js"
import { toast } from '~/composables/util'
import iconChoose from "./iconChoose.vue";

const store = useStore()

const classifiesKind = computed(() => store.state.classifyKind)
const dialogForAddEssay = ref(false)
const kindForm = reactive({
    name: "",
    icon: "",
    id: null
})
// 选择图标
const chooseIcon = (kind, icon) => {
    kind.icon = icon
}

const updateKindHandelPre = (item) => {
    dialogForAddEssay.value = true
    kindForm.name = item.kind
    kindForm.icon = item.icon
    kindForm.id = item.id
}

// 更新kind
const updateKindHandel = () => {
    updateKind(kindForm)
        .then(() => {
            toast("修改分类种类成功")
            store.dispatch("getIndexInfo")
        }).catch(err => {
            toast("修改分类种类失败", "error")
        })
}
</script>

<style scoped>
    .aside {
        @apply flex flex-col justify-center items-center;
        height: 100%;
        width: 40px;
        background-color: rgba(130, 120, 194, 0.297);
    }

    .lists {
        height: auto;
        width: auto;
        @apply flex flex-col justify-between items-center my-2;
    }

    .lists .list {
        height: auto;
        @apply flex justify-center items-center;
    }

    .lists .input {
        @apply text-red-700 my-2;
    }


</style>