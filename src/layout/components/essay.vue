<template>
    <el-row>
        <el-col :span="2">
        </el-col>
        <el-col :span="16">
            <div class="essay">
                <span class="name">
                    {{ satisfyData ? satisfyData.name : '' }}
                </span>
                <div class="subTitle">
                    <span class="top">
                        发布于:{{ satisfyData ? satisfyData.createdTime.split("T").join(" ").split("Z")[0] : "" }} | 更新于:{{
                            satisfyData ? satisfyData.updatedTime.split("T").join(" ").split("Z")[0] : "" }} | {{ satisfyData ?
        satisfyData.kind : "" }}
                    </span>
                    <span class="bottom">
                        {{ satisfyData ? satisfyData.introduction : "" }}
                    </span>
                </div>
                <span v-html="satisfyData ? satisfyData.content : ''"></span>
            </div>
        </el-col>
        
        <el-col :span="6">
        </el-col>
    </el-row>
</template>
  
<script setup>
import { useStore } from "vuex"
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { getEssayMsg } from "~/api/user.js"
const store = useStore()
const route = useRoute()
let satisfyData = ref(null)  //存储文章的数据
//根据文章名字去获取文章详细内容
const getCurrentData = (() => {
    const essayRouter = "/" + route.path.split("/").slice(2, 4).join("/")
    // 去查文章的名字
    const essayData = store.state.essayData
    let essayId = null
    for (const essay of essayData) {
        if (essay.router == essayRouter) {   //有一个好处 就算后端加router时router一样 但是分类不一样 这样也不会导致数据读取失败
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

watch(() => route.fullPath, () => {
    console.log()
    satisfyData.value = null  //存储文章的数据
    getCurrentData()
})
</script>

<style>
.essay {
    @apply flex flex-col justify-center items-center;
}

.essay .name {
    @apply text-3xl mb-5 mr-auto font-bold;
}

.essay .subTitle {
    @apply flex flex-col justify-center items-center mb-10;
    width: 100%;
}

.essay .subTitle .top {
    @apply mb-2 mr-auto italic text-blue-300;
}

.essay .subTitle .bottom {
    @apply mr-auto italic text-red-500;
}
</style>