<template>
    <div v-for="(essay, index) in satisfyData" class="essay" :key="essay.router">
        <div class="top" @click="toEssay(essay.router)">
            <span class="title">{{ essay.name }}</span>
        </div>
        <div class="middle">
            <div class="kind" @click="toKind(essay)">
                {{ essay.kind }}
            </div>
            <div style="width: auto;" class="flex-1" @click="toEssay(essay.router)"></div>
            <span class="date" @click="toEssay(essay.router)">
                {{ essay.createdTime }}
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
import { useRouter } from 'vue-router';
import { ref } from "vue"

const router = useRouter()
const store = useStore()
const essayData = store.state.essayData
const orderByTimeEssayId = ref([]);
const pageMax = ref(1)
let satisfyData = ref([])

function orderByTime() {
    essayData.sort((a, b) => b.id - a.id);
    let count = 0
    orderByTimeEssayId.value = [];
    //orderByTimeEssayId整合数据
    essayData.forEach(essay => {
        count++
        if (count > 10) {
            count = 0
            pageMax.value++
        }
       
        let createdTime = essay.createdTime.split(" ")[0]
        let name = essay.name
        let router = essay.router
        let kind = essay.kind
        let introduction = essay.introduction
        let page = pageMax.value


        orderByTimeEssayId.value.push({ page, createdTime, name, router, kind, introduction });
    });
}

function paging(page) {
    orderByTimeEssayId.value.forEach(essay => {
        if (essay.page == page) {
            satisfyData.value.push(essay)
        }
    })
}

// 调用排序函数
orderByTime();

paging(1)

function toEssay(r) {
    router.push("essay" + r)
}

function toKind(r) {
    router.push("classify/" + r.router.split("/")[1])
}

function changePage(p) {
    satisfyData.value = []
    paging(p)
}
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
    @apply text-2xl font-serif font-bold m-auto;
    white-space: nowrap;
    color: black;
}


.essay .middle {
    @apply flex my-3;
    width: 100%;
}

.middle .kind {
    @apply text-lg font-mono mr-auto text-purple-700;
}

.middle .date {
    @apply text-lg font-mono ml-auto text-purple-700;
}


.bottom {
    @apply flex justify-start my-3;
    width: 100%;
}

.bottom .introduction {
    @apply font-sans text-pink-500;
}

.page {
    @apply mt-5 justify-center;
}
</style>