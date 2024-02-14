<template>
    <el-row>
        <el-col :span="20" class="ml-2">
            <div v-for="(essay, index) in satisfyData" class="essay" :key="index" @click="toEssay(essay.router)">
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
       
    </el-row>
</template>
  
<script setup>
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
const store = useStore()
const route = useRoute()
const router = useRouter()

let satisfyData = ref([])

const getCurrentData = (() => {
    let currentClassify = ref(null)
    const classifyData = store.state.classifyData
    const essayData = store.state.essayData
    const currentRoute = "/" + route.path.split("/")[2]
    for (const classify of classifyData) {
        if (classify.router == currentRoute) {
            currentClassify.value = classify.name
            break
        }
    }
    // 这里只需要遍历一次
    for (const essay of essayData) {
        if (currentClassify.value == essay.kind) {
            satisfyData.value.push(essay)
            break
        }
    }
})
const toEssay = ((r) => {
    router.push('/essay' + r)
})
getCurrentData()


// 监听路由变化，当路由变化时更新 ref 值
watch(() => route.fullPath, () => {
    satisfyData.value = []
    getCurrentData()
});


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
    @apply mr-auto mt-2 text-yellow-600;
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