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
            <el-text truncated class="text-green-500">
                {{ essay.introduction }}
            </el-text>
        </div>
        <el-divider border-style="dotted" />

    </div>
    <el-pagination background layout="prev, pager, next" :page-count="pageMax" @update:current-page="changePage"
        class="mt-5 justify-center" />
</template>



<style scoped>
.essay {
    @apply flex flex-col justify-center items-center mt-5 ml-5 mr-5;
    height: auto;
}

.essay .top {
    @apply flex justify-between items-center;
    width: 100%;
}

.essay .middle {
    @apply flex my-3;
    width: 100%;
}

.middle .kind {
    @apply text-purple-700 mr-auto text-xl font-mono;
}

.middle .date {
    @apply text-sm font-mono text-red-800 ml-auto text-xl text-purple-700;
}



.essay .bottom {
    @apply flex justify-start my-3 font-sans;
    width: 100%;
}

.essay .top .title {
    @apply italic font-bold font-serif m-auto text-2xl;
    color: black;
}
</style>

<script setup>
import { useStore } from "vuex"
import { useRouter } from 'vue-router';
import { ref } from "vue"

const router = useRouter()
const store = useStore()
const essayData = store.state.essayData
const orderByTimeEssayDate = ref([]);
const pageMax = ref(1)
let satisfyData = ref([])
let count = 0
function orderByTime(page) {
    // 清空数组，只保留一个默认的日期
    orderByTimeEssayDate.value = [];
    //orderByTimeEssayDate整合数据
    essayData.forEach(essay => {
        count++
        if (count > 10) {
            count = 0
            pageMax.value++
        }
        // 将 essay.updatedTime 转换为日期对象，并添加到数组
        let createdTime = new Date(essay.createdTime)
        let name = essay.name
        let router = essay.router
        let kind = essay.kind
        let introduction = essay.introduction
        let page = pageMax.value
        // 格式化日期
        let year = createdTime.getFullYear().toString();
        let month = (createdTime.getMonth() + 1).toString().padStart(2, '0');
        let day = createdTime.getDate().toString().padStart(2, '0');
        let formattedDate = `${year}/${month}/${day}`;

        orderByTimeEssayDate.value.push({ page, createdTime: formattedDate, name, router, kind, introduction });
    });
    // 对日期数组进行排序
    orderByTimeEssayDate.value.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
}
function paging(page) {
    orderByTimeEssayDate.value.forEach(essay => {
        if (essay.page == page) {
            satisfyData.value.push(essay)
        }
    })
}
// 调用排序函数
orderByTime();
paging(1)
function toEssay(r) {
    console
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
