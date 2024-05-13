<template>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
            <div v-show="showEssay" @click="closeAnchor">
                <div class="essayBasic">
                    <span class="name">
                        {{ satisfyData ? satisfyData.name : '' }}
                    </span>
                    <div class="subTitle">
                        <div>
                            <div>
                                <div class="left mb-5">
                                    创建于:
                                    {{
                                        satisfyData ? satisfyData.updatedTime.split("T").join(" ").split("Z")[0]
                                            .split(" ").join(" ").split(" ")[0] : ""
                                    }}
                                </div>

                                <div class="left">
                                    更新于:
                                    {{
                                        satisfyData ? satisfyData.updatedTime.split("T").join(" ").split("Z")[0]
                                            .split(" ").join(" ").split(" ")[0] : "" }}
                                </div>
                            </div>

                            <div>
                                <div class="right mb-5 ml-auto" @click="toKind">
                                    <span class="ml-auto ">
                                        {{ satisfyData ? satisfyData.kind : "" }}
                                    </span>
                                </div>
                                <div class="right">
                                    <span class="ml-auto"> {{ satisfyData ? satisfyData.visitedTimes : "" }}次
                                    </span>
                                </div>
                            </div>
                        </div>

                        <span class="introduction">
                            简介:{{ satisfyData ? satisfyData.introduction : "" }}
                        </span>
                    </div>
                </div>
                <div>
                    <v-md-editor @copy-code-success="handleCopyCodeSuccess" v-if="satisfyData"
                        v-model="satisfyData.content" height="auto" mode="preview" ref="previewRef" />
                </div>
            </div>
        </el-col>
        <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="1">
        </el-col>
        <el-col :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
            <NavAnchor v-show="showEssay" v-if="mode == 'computer' && previewRef" :preview="previewRef"></NavAnchor>
        </el-col>
    </el-row>

    <el-icon @click="oppositedAnchor" class="anchorIcon hidden-sm-and-up" size="40px">
        <Memo />
    </el-icon>

    <keep-alive>
        <div v-show="anchorShow">
            <NavAnchor ref="navAnchorRef" v-if="previewRef" mode="model" :preview="previewRef"></NavAnchor>
        </div>
    </keep-alive>
</template>

<script setup>
import { useStore } from "vuex"
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted, onUnmounted } from "vue";
import { getEssayMsg } from "~/api/user.js"
import {
    toast,
    showLoading
} from "~/composables/util.js"
import NavAnchor from "~/layout/components/NavAnchor.vue";

//富文本插件
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// vuepressTheme主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 代码高亮
import Prism from 'prismjs';
//代码快捷复制
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
// 代码行数 
// import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
//todolist
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
//mermaid(流程图等)
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
    extend(md) {
    },
});

// VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createCopyCodePlugin());
VueMarkdownEditor.use(createTodoListPlugin());
VueMarkdownEditor.use(createMermaidPlugin());

const store = useStore()
const route = useRoute()
const router = useRouter()

const previewRef = ref(null)
const navAnchorRef = ref(null)

const kind = ref(null)
const satisfyData = ref(null)  //存储文章的数据
const mode = ref("")
const showEssay = ref(false)
const anchorShow = ref(false)

//根据文章名字去获取文章详细内容
const getCurrentData = async () => {
    const essayRouter = "/" + route.path.split("/").slice(2, 4).join("/")
    // 去查文章的名字
    const essayData = store.state.essayData
    let essayId = null
    for (const essay of essayData) {
        if (essay.router == essayRouter) {
            kind.value = essay.kind
            essayId = essay.id
            break
        }
    }
    //从后端得到相关文章的数据
    await getEssayMsg(essayId).then(res => {
        satisfyData.value = res
    })
}

//跳转到分类页面
const toKind = (() => {
    let essayRouter = "/" + route.path.split("/").slice(2, 4).join("/")
    router.push("/classify/" + essayRouter.split("/")[1])
})

//复制代码成功
const handleCopyCodeSuccess = (content) => {
    toast("复制成功", "success");
};

// 控制anchor的开关
const oppositedAnchor = () => {
    anchorShow.value = !anchorShow.value
}

// 作用于全局 关闭anchor
const closeAnchor = () => {
    anchorShow.value = false
}

// 根据窗口大小来修改模式
const handleResize = () => {
    const windowWidth = window.innerWidth
    if (windowWidth < 768) {
        mode.value = 'mobile'
    } else {
        mode.value = 'computer'
    }
}

watch(anchorShow, () => {
    if (anchorShow.value === true) {
    }
})


onMounted(async () => {
    let waiting = false
    getCurrentData()
    waiting = await showLoading("正在加载文章中...", satisfyData.value)
    if (waiting === true) {
        showEssay.value = true
    }
    handleResize()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
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
        @apply flex justify-between items-center text-purple-700 my-5 px-2;
        width: 100%;

    }

    .subTitle>div>div .right {
        @apply text-purple-700 mr-1 flex ml-auto;
        white-space: nowrap;
    }


    .subTitle>div>div .left {
        @apply text-purple-700;
    }


    .introduction {
        @apply mr-auto italic text-pink-500 font-sans px-2;
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

    .anchorIcon {
        @apply fixed hover:cursor-pointer;
        z-index: 9999;
        top: 200px;
        right: 40px;
    }
</style>
