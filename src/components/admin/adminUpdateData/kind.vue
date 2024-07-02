<template>
    <div class="flex flex-col items-center">
        <span>修改kind</span>
        <div v-for="(kind, index) in classifiesKind" class="lists">
            <div class="list">
                <el-input style="width: 35%;" v-model="kind.kind" placeholder="分类名" class="input"></el-input>
                <iconChoose class="mx-3" style="width: 30%;" :modelValue="kind.icon"
                    @update:modelValue="(icon) => chooseIcon(kind, icon)"></iconChoose>
                <el-button style="width: 30%;" type="primary" size="default"
                    @click="updateKindHandel(kind)">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex"
import { updateKind } from "~/api/manager.js"
import { toast } from '~/composables/util'
import iconChoose from "./iconChoose.vue";

const store = useStore()
const classifiesKind = computed(() => store.state.classifyKind)

// 选择图标
const chooseIcon = (kind, icon) => {
    kind.icon = icon
}

// 更新kind
const updateKindHandel = (kind) => {
    updateKind(kind)
        .then(async () => {
            toast("修改分类种类成功", "success")
            await store.dispatch("getIndexInfo")
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