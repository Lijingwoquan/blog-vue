<template>
    <div class="aside">
        <span>修改分类图标</span>
        <div v-for="(kind, index) in classifiesKind" class="lists">
            <div class="list">
                <el-input v-model="kind.kind" placeholder="分类名" class="input"></el-input>
                <el-input v-model="kind.icon" placeholder="分类名" class="input"></el-input>
                <el-button type="primary" size="default" @click="updateKind(kind.id,kind.kind,kind.icon)">提交</el-button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useStore } from "vuex"
import {updateKind} from "~/api/manager.js"
const store = useStore()
const classifiesKind = store.state.classifyKind
</script>


<style>
.aside {
    height: auto;
    width: auto;
    @apply flex flex-col justify-between items-center ml-2;
}

.lists {
    height: auto;
    width: auto;
    @apply flex flex-col justify-between items-center my-2;
}

.lists .list {
    height: auto;
    @apply flex justify-center;
}
.lists .kind{
    @apply ml-3 w-35 text-gray-600 inline-flex items-center;
}
.lists .input {
    @apply text-red-700 mr-2;
}
</style>


