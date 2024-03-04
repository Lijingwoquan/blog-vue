<template>
    <div class="essay">
        <span class="name">
            {{ satisfyData ? satisfyData.name : '' }}
        </span>
        <div class="subTitle">
            <div>
                <div>
                    <div class="mb-5 text-purple-700">
                        创建于:
                        {{ satisfyData ? satisfyData.updatedTime.split("T").join(" ").split("Z")[0].split(" ")[0] : ""
                        }}
                    </div>
                    <div class="text-purple-700">
                        更新于:
                        {{ satisfyData ? satisfyData.createdTime.split("T").join(" ").split("Z")[0]
        .split("").join("") : "" }}
                    </div>
                </div>
                <div @click="toKind">
                    {{ satisfyData ? satisfyData.kind : "" }}
                </div>
            </div>
            <span class="introduction">
                简介:{{ satisfyData ? satisfyData.introduction : "" }}
            </span>
        </div>
    </div>

    <div v-if="satisfyData && satisfyData.content">
        <v-md-editor @copy-code-success="handleCopyCodeSuccess" v-model="satisfyData.content" height="850px"
            mode="preview" />
    </div>
    <div v-else>
        <p>Loading...</p> <!-- 或者其他加载提示 -->
    </div>

</template>



<script setup>
import { useStore } from "vuex"
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { getEssayMsg } from "~/api/user.js"
import VueMarkdownEditor from '@kangc/v-md-editor';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// 引入所有语言包
import hljs from 'highlight.js';


VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs,
});
VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createCopyCodePlugin());


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


<style scoped>
.essay {
    @apply flex flex-col justify-center items-center ;
    margin-top: 20px;
}

.essay .name {
    @apply text-2xl m-auto italic font-serif font-bold sm:text-xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl;
}

.essay .subTitle {
    @apply flex flex-col justify-center items-center mb-10 font-mono;
    width: 100%;
}

.subTitle>div {
    @apply flex justify-between items-center italic text-purple-700 my-5;
    width: 100%;
}

.introduction {
    @apply mr-auto italic text-pink-500 font-sans;
}

.content {
    @apply md:text-xl lg:text-2xl xl:text-2xl xl:text-xl mx-3;
}

:deep(.v-md-editor__main) {
    overflow: unset !important;
}

:deep(.github-markdown-body) {
    padding: 5px;
}
</style>
