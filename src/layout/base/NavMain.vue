<template>
    <el-backtop :right="30" :bottom="30" />
    <div v-for="(essay, index) in satisfyData" class="essay" :key="index">
        <div class="top" @click="toEssay(essay.router)">
            <el-link class="title" target="_self" type="info">{{
                essay.name }}</el-link>
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
            <el-text truncated>
                {{ essay.introduction }}
            </el-text>
        </div>
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
    @apply text-yellow-600 mr-auto;
}

.middle .date {
    @apply text-sm italic text-red-800 ml-auto;
}



.essay .bottom {
    @apply flex justify-start my-3 text-sm;
    width: 100%;
    color: blue;
}

.essay .top .title {
    @apply text-2xl italic font-bold;
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
        orderByTimeEssayDate.value.push({ page, createdTime, name, router, kind, introduction });
    });
    // 对日期数组进行排序
    orderByTimeEssayDate.value.sort((a, b) => b.createdTime - a.createdTime);
    //格式化日期并且实现分页
    orderByTimeEssayDate.value.forEach(essay => {
        let formattedDate = essay.createdTime.toLocaleDateString('zh-CN', { year: 'numeric', month: 'numeric', day: 'numeric' });
        essay.createdTime = formattedDate
    })
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

