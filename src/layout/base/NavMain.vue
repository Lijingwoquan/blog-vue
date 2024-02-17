<template>
    <el-backtop :right="30" :bottom="30" />
    <div v-for="(essay, index) in essayData" class="essay" :key="index">
        <div class="top" @click="toEssay(essay.router)">
            <el-link class="title" target="_self" type="info">{{
                essay.name }}</el-link>
        </div>
        <div class="middle">
            <div class="kind" @click="toKind(essay)">
                {{ essay.kind }}
            </div>
            <div style="width: auto;" class="flex-1" @click="toKind(essay)"></div>
            <span class="date" @click="toEssay(essay.router)">
                {{ essay.updatedTime }}
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
  
<script setup>
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import { ref } from "vue";

const router = useRouter()
const store = useStore()
const essayData = store.state.essayData
const orderByIdEssayDate = ref([])


function toEssay(r) {
    console
    router.push("essay" + r)
}

function toKind(r) {
    router.push("classify/" + r.router.split("/")[1])
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

.essay .middle {
    @apply flex;
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