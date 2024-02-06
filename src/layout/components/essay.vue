<template>
    <el-row class="ml-50">
        <el-col :span="24">
          {{ satisfyData }}
        </el-col>
    </el-row>
</template>
  
<script setup>
import { useStore } from "vuex"
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import {getEssayMsg} from "~/api/user.js"
const store = useStore()
const route = useRoute()
let satisfyData = ref(null)  //存储文章的数据

//根据文章名字去获取文章详细内容
const getCurrentData = (() => {
    const essayRouter = "/"+route.path.split("/").slice(2,4).join("/")
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

watch(() => route.fullPath,()=>{
    console.log()
    satisfyData = ref(null)  //存储文章的数据
    getCurrentData()
})
</script>
