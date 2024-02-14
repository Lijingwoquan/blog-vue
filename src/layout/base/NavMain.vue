<template>
    <el-row>
        <el-col :span="20" class="ml-2">
            <div v-for="(essay, index) in essayData" class="essay" :key="index" @click="toEssay(essay.router)">
                <div class="top">
                    <el-link class="title" :href="'http://localhost:5173/#/essay' + essay.router" target="_self"
                        type="info">{{
                            essay.name }}</el-link>
                </div>
                <div class="kind">
                    <span class="kind">分类:{{ essay.kind }}</span>
                </div>
                <span class="date">
                    更新于:{{ essay.updatedTime }}
                </span>
                <div class="bottom">
                    <el-text  truncated>
                        简介：{{ essay.introduction }}
                    </el-text>
                </div>
            </div>
        </el-col>
        <el-col :span="4">
        </el-col>
    </el-row>
</template>
  
<script setup>
import { useStore } from "vuex"
import { useRouter } from 'vue-router';


const router = useRouter()
const store = useStore()
const essayData = store.state.essayData
function toEssay(r) {
    router.push("essay" + r)
}


</script>

<style scoped>
.essay {
    @apply flex flex-col justify-center items-center my-5;
    height: auto;
}

.essay .top {
    @apply flex justify-between items-center;
    width: 100%;
}

.essay .kind {
    @apply mr-auto mt-1 text-yellow-600;
}

.essay .date {
    @apply text-sm italic text-red-800 mt-1 ml-auto;
}

.essay .bottom {
    @apply flex justify-start my-3 text-sm;
    width: 100%;
    color: blue;
}

.essay .top .title {
    @apply text-2xl;
    color: black;
}
</style>