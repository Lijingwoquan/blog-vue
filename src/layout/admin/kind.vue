<template>
    <div class="aside" @click="openMenu">
        <div>
            <el-icon>
                <ArrowRightBold />
            </el-icon>
        </div>
    </div>

    <el-drawer v-model="dialogMenuForKind" title="kind菜单" direction="ltr" append-to-body size="500px">
        <span>修改分类图标</span>
        <div v-for="(kind, index) in classifiesKind" class="lists">
            <div class="list">
                <el-input v-model="kind.kind" placeholder="分类名" class="input"></el-input>
                <el-input v-model="kind.icon" placeholder="分类名" class="input"></el-input>
                <el-button type="primary" size="default"
                    @click="updateKind(kind.id, kind.kind, kind.icon)">提交</el-button>
            </div>
        </div>
    </el-drawer>
</template>


<script setup>
import { useStore } from "vuex"
import { updateKind } from "~/api/manager.js"
import { ref } from "vue"
const dialogMenuForKind = ref(false)
const store = useStore()
const classifiesKind = store.state.classifyKind
function openMenu() {
    dialogMenuForKind.value = true
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
    @apply flex justify-center;
}

.lists .kind {
    @apply ml-3 w-35 text-gray-600 inline-flex items-center;
}

.lists .input {
    @apply text-red-700 mr-2;
}
</style>