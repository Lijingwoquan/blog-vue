<template>
    <div v-if="satisfyData != null">
        <el-row>
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
                <div @click="closeAnchor" :class="fontMode">
                    <div class="essayBasic">
                        <span class="name">
                            {{ satisfyData.name }}
                        </span>
                        <div class="subTitle">
                            <div>
                                <div>
                                    <div class="left mb-5">
                                        创建于:
                                        {{
                                            satisfyData.createdTime.split("T").join(" ").split("Z")[0]
                                                .split(" ").join(" ").split(" ")[0]
                                        }}
                                    </div>

                                    <div class="left">
                                        更新于:
                                        {{
                                            satisfyData.updatedTime.split("T").join(" ").split("Z")[0]
                                                .split(" ").join(" ").split(" ")[0] }}
                                    </div>
                                </div>

                                <div>
                                    <div class="right mb-5 ml-auto hover:(cursor-pointer text-blue-400)"
                                        @click="toKind">
                                        <span class="ml-auto ">
                                            {{ satisfyData.kind }}
                                        </span>
                                    </div>
                                    <div class="right">
                                        <span class="ml-auto"> {{ satisfyData.visitedTimes }}次
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <span class="introduction">
                                简介:{{ satisfyData.introduction }}
                            </span>
                        </div>
                    </div>
                    <div>
                        <v-md-editor :class="fontMode" class="bg-red" @copy-code-success="handleCopyCodeSuccess"
                            v-model="satisfyData.content" height="auto" mode="preview" ref="previewRef" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
                <NavAnchor v-if="facility == 'computer' && previewRef != null" :facility="facility"
                    :preview="previewRef">
                </NavAnchor>
            </el-col>
        </el-row>

        <el-icon v-show="anchorShow" @click="oppositedAnchor" class="anchorIcon hidden-sm-and-up" size="40px">
            <Memo />
        </el-icon>

        <NavAnchor v-if="facility == 'mobile' && previewRef != null" v-show="anchorContentShow" :facility="facility"
            :preview="previewRef">
        </NavAnchor>
    </div>
</template>

<script setup>
import { useStore } from "vuex"
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted, onUnmounted, computed } from "vue";
import { getEssayMsg } from "~/api/user.js"
import {
    toast,
    showLoading
} from "~/composables/util.js"
import NavAnchor from "~/components/user/NavAnchor.vue";

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

const kind = ref(null)
const satisfyData = ref(null)  //存储文章的数据
const facility = ref("")
const showEssay = ref(false)
const anchorShow = ref(false)
const anchorContentShow = ref(false)

const fontMode = computed(() => {
    return facility.value === 'computer' ? "computer-text-size" : "mobile-text-size"

})

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
}

// 控制anchor的开关
const oppositedAnchor = () => {
    anchorContentShow.value = !anchorContentShow.value
}

// 作用于全局 关闭anchor
const closeAnchor = () => {
    anchorContentShow.value = false
}

// 根据窗口大小来修改模式
const handleResize = () => {
    const windowWidth = window.innerWidth
    if (windowWidth <= 768) {
        facility.value = 'mobile'
    } else {
        facility.value = 'computer'
    }
}

const hideAnchor = () => {
    anchorShow.value = false
}

const showAnchor = () => {
    anchorShow.value = true
}

const handelScoll = () => {
    const scrollPosition = document.documentElement.scrollTop || window.pageYOffset;
    if (scrollPosition >= 500) { // 滚动超过 500 像素时显示
        anchorShow.value = true
    } else {
        anchorShow.value = false
        closeAnchor()
    }
}

watch(
    () => route.path,
    async () => {
        await initEssayData()
    }
)

const initEssayData = async () => {
    handleResize()
    await getCurrentData()
    await showLoading("正在加载文章中...", satisfyData)
    showEssay.value = true
    anchorShow.value = true
    handelScoll()
}


onMounted(async () => {
    await initEssayData()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handelScoll)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.addEventListener('scroll', handelScoll)
})

defineExpose({
    hideAnchor,
    showAnchor,
    handelScoll
})
</script>


<style scoped>
    .essayBasic {
        @apply flex flex-col justify-center items-center overflow-hidden;
        padding: 16px 5px 10px 5px;
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

    :deep(.vuepress-markdown-body) {
        font-size: var(--markdown-font-size);
    }

    .computer-text-size {
        font-size: 140%;
    }

    .mobile-text-size {
        font-size: initial;
    }
</style>
