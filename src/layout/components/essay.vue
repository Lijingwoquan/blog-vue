<template>
    <el-backtop :right="30" :bottom="30" />
    <div class="essay">
        <span class="name">
            {{ satisfyData ? satisfyData.name : '' }}
        </span>
        <div class="subTitle">
            <div class="flex justify-between  italic text-blue-500 my-5 " style="width: 100%;">
                <div>
                    {{ satisfyData ? satisfyData.updatedTime.split("T").join(" ").split("Z")[0].split(" ")[0] : "" }}
                </div>
                <div @click="toKind">
                    {{ satisfyData ? satisfyData.kind : "" }}
                </div>
            </div>
            <span class="mr-auto italic text-red-500">
                {{ satisfyData ? satisfyData.introduction : "" }}
            </span>
        </div>
        <span v-html="satisfyData ? satisfyData.content : ''">
        </span>
    </div>
</template>
  
<script setup>
import { useStore } from "vuex"
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { getEssayMsg } from "~/api/user.js"
const store = useStore()
const route = useRoute()
const router = useRouter()
const kind = ref(null)
const satisfyData = ref(null)  //存储文章的数据
//根据文章名字去获取文章详细内容
const getCurrentData = (() => {
    const essayRouter = "/" + route.path.split("/").slice(2, 4).join("/")
    // 去查文章的名字
    const essayData = store.state.essayData
    let essayId = null
    for (const essay of essayData) {
        if (essay.router == essayRouter) {   //有一个好处 就算后端加router时router一样 但是分类不一样 这样也不会导致数据读取失败
            kind.value = essay.kind
            essayId = essay.id
            break
        }
    }
    //从后端得到相关文章的数据
    getEssayMsg(essayId).then(res => {
        satisfyData.value = res
    }).catch(err => {
        console.log(err)
    })
})
getCurrentData()


const toKind = (() => {
    let essayRouter = "/" + route.path.split("/").slice(2, 4).join("/")
    router.push("/classify/" + essayRouter.split("/")[1])
})


watch(() => route.fullPath, () => {
    satisfyData.value = null  //存储文章的数据
    getCurrentData()
})
</script>

<style>
.essay {
    @apply flex flex-col justify-center items-center ml-5 mr-5;
    margin-top: 35px;
}

.essay .name {
    @apply text-2xl mr-auto italic font-bold;
}

.essay .subTitle {
    @apply flex flex-col justify-center items-center mb-10;
    width: 100%;
}
</style>