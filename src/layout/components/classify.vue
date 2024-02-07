<template>
    <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="16">
            <div class="flex  flex-col">
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div v-for="(essay, index) in satisfyData" class="essay" :index="essay.name" :key="essay.name"
                    @click="toEssay(essay.router)">
                    <div class="top">
                        <el-link class="title"  target="_self"
                            type="info">{{ essay.name }}</el-link>
                        <span class="date">
                        创建于:{{ essay.createdTime }}  &nbsp; &nbsp; &nbsp; 更新于:{{ essay.updatedTime }}
                       </span>
                       <span class="kind">分类:{{ essay.kind }}</span>
                    </div>
                    <div class="bottom">
                        简介：{{ essay.introduction }}
                    </div>
                    <el-divider>
                        <el-icon><star-filled /></el-icon>
                    </el-divider>
                </div>
            </div>
        </el-col>
        <el-col :span="6">
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
    router.push('/essay'+r)
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
    height: 100px;
}

.essay .top {
    @apply flex justify-between items-center;
    width: 100%;
}
.essay .date{
    @apply mr-auto text-sm italic text-red-800;
}
.essay .bottom {
    @apply flex justify-start px-8 my-3;
    width: 100%;
    color: blue;
}

.essay .top .title {
    @apply text-2xl mx-5;
    color: black;
}

.essay .top .kind {
    @apply text-xl mx-5;
    color: red;
}
</style>