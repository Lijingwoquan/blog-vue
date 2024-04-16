<template>
    <div v-for="(essay, index) in satisfyData" class="essay" :key="essay.router">
        <div class="top" @click="toEssay(essay.router)">
            <el-link class="title" target="_self" type="info">{{
        essay.name }}</el-link>
        </div>

        <div class="middle">
            <div class="kind">
                {{ essay.kind }}
            </div>
            <div  class="flex-1" @click="toEssay(essay.router)"></div>
            <span class="date" @click="toEssay(essay.router)">
                {{ essay.createdTime.split(" ")[0] }}
            </span>
        </div>

        <div class="bottom" @click="toEssay(essay.router)">
            <el-text truncated class="introduction">
                {{ essay.introduction }}
            </el-text>
        </div>

        <el-divider border-style="dotted" />

    </div>

    <el-pagination background layout="prev, pager, next" :page-count="pageMax" @update:current-page="changePage"
        class="page" />
</template>


<script setup>
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
const store = useStore()
const route = useRoute()
const router = useRouter()
const pageMax = ref(1)
let satisfyData = ref([])

const getCurrentData = ((page) => {
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
            if (essay.page == page) {
                satisfyData.value.push(essay)
            }
            if (pageMax.value < essay.page) {
                pageMax.value = essay.page
            }
        }

    }
})

getCurrentData(1)

const toEssay = ((r) => {
    router.push('/essay' + r)
})

function changePage(p) {
    satisfyData.value = []
    getCurrentData(p)
}


// 监听路由变化，当路由变化时更新 ref 值
watch(() => route.fullPath, () => {
    satisfyData.value = []
    pageMax.value = 1
});


</script>


<style scoped>
.essay {
    @apply flex flex-col justify-center items-center mt-5 ml-5 mr-5;
    height: auto;
}

.essay .top {
    @apply flex justify-between items-center;
    width: 100%;
}

.essay .top .title {
    @apply text-2xl  font-serif font-bold m-auto;
    white-space: nowrap; 
    color: black;
}


.essay .middle {
    @apply flex my-3;
    width: 100%;
}

.middle .kind {
    @apply text-lg  font-mono mr-auto  text-purple-700;
}

.middle .date {
    @apply text-lg font-mono  ml-auto text-purple-700;
}


.bottom {
    @apply flex justify-start my-3;
    width: 100%;
}
.bottom .introduction{
    @apply  font-sans text-pink-500;
}

.page {
    @apply mt-5 justify-center;
}
</style>