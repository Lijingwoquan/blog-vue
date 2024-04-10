<template>
    <div v-if="showEssay">
        <el-backtop :right="30" :bottom="30" />

        <div class="essayBasic">
            <span class="name">
                {{ satisfyData ? satisfyData.name : '' }}
            </span>
            <div class="subTitle">
                <div>
                    <div>
                        <div class="createTime">
                            创建于:
                            {{ satisfyData ? satisfyData.createdTime.split("T").join(" ").split("Z")[0].split(" ")[0] :
        "" }}
                        </div>

                        <div class="updatetime">
                            更新于:
                            {{ satisfyData ? satisfyData.updatedTime.split("T").join(" ").split("Z")[0]
        .split(" ").join(" ") : "" }}
                        </div>
                    </div>

                    <div class="kind" @click="toKind">
                        {{ satisfyData ? satisfyData.kind : "" }}
                    </div>
                </div>

                <span class="introduction">
                    简介:{{ satisfyData ? satisfyData.introduction : "" }}
                </span>
            </div>


        </div>
        <div>
            <v-md-editor class="overflow-y-hidden overflow-x-auto" @copy-code-success="handleCopyCodeSuccess"
                v-model="satisfyData.content" height="auto" mode="preview" />

        </div>
    </div>
</template>


<script setup>
import { useStore } from "vuex"
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { getEssayMsg } from "~/api/user.js"
import { toast } from "~/composables/util.js"
import { ElLoading } from 'element-plus'
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

const showEssay = ref(false)
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

const handleCopyCodeSuccess = (content) => {
    // if (!navigator.clipboard) {
    //     toast("浏览器不支持复制到剪贴板功能", "error");
    //     return;
    // }
    toast("复制成功", "success");

    navigator.clipboard.writeText(content).then(() => {
        // toast("复制成功", "success");
    }).catch((error) => {
        // toast("复制失败", "error");
    });
};


onMounted(() => {
    const loading = ElLoading.service({
        lock: true,
        text: '正在努力加载文章中 Loading...',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    setTimeout(async () => {
        while (satisfyData.value === null) {
            console.log(satisfyData.value)
            await new Promise(resolve => setTimeout(resolve, 100)); // 等待100毫秒
        }
        loading.close()
        showEssay.value = true;
    }, 1000)
});

watch(() => route.fullPath, () => {
    satisfyData.value = null  //存储文章的数据
    getCurrentData()
})

</script>


<style scoped>
.essayBasic {
    @apply flex flex-col justify-center items-center overflow-hidden;
    margin-top: 20px;
}

.essayBasic .name {
    @apply text-2xl m-auto font-serif font-bold;
    white-space: nowrap !important;
}

.essayBasic .subTitle {
    @apply flex flex-col justify-center items-center mb-10 font-mono;
    width: 100%;
}

.subTitle>div {
    @apply flex justify-between items-center italic text-purple-700 my-5;
    width: 100%;

}

.subTitle>div .kind {
    @apply text-purple-700 mr-1;
    white-space: nowrap;
}


.subTitle>div>div .createTime {
    @apply mb-5 text-purple-700;
}

.subTitle>div>div .updatetime {
    @apply text-purple-700;
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
