<template>
    <el-backtop :right="30" :bottom="30" />

    <el-row :gutter="20">
        <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
            <el-main>
                <div v-show="showEssay">
                    <div class="essayBasic">
                        <span class="name">
                            {{ satisfyData ? satisfyData.name : '' }}
                        </span>
                        <div class="subTitle">
                            <div>
                                <div>
                                    <div class="left mb-5">
                                        创建于:
                                        {{ satisfyData ?
                                            satisfyData.createdTime.split("T").join("").split("Z")[0].split(" ")[0] : "" }}
                                    </div>

                                    <div class="left">
                                        更新于:
                                        {{ satisfyData ? satisfyData.updatedTime.split("T").join(" ").split("Z")[0]
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
            </el-main>
        </el-col>

        <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
            <el-aside class="anchor">
                <div v-for="anchor in titles" :style="{
                    padding: `5px 0 5px ${anchor.indent * 20}px`,
                }" @click="handleAnchorClick(anchor)">
                    <p style="cursor: pointer" class="text-gray-500" :class="{ active: anchor.active }">{{ anchor.title
                        }}</p>
                </div>
            </el-aside>
        </el-col>
    </el-row>
</template>

<script setup>
import { useStore } from "vuex"
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch, computed } from "vue";
import { getEssayMsg } from "~/api/user.js"
import {
    toast,
    showLoading
} from "~/composables/util.js"

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

const showEssay = ref(false)
const kind = ref(null)
const satisfyData = ref(null)  //存储文章的数据
const previewRef = ref("")
const anchors = ref("")
const titles = ref("")
const hTags = ref("")

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

//锚点跳转
const handleAnchorClick = (anchor) => {
    const preview = previewRef.value;
    const { lineIndex } = anchor;

    const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

    if (heading) {
        // 注意：如果你使用的是编辑组件的预览模式,则这里的方法名改为 previewScrollToTarget
        preview.previewScrollToTarget({
            target: heading,
            scrollContainer: window,
            top: 50,
        });
    }
}

//锚点数据处理
const openAnchor = () => {
    anchors.value = previewRef.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
    titles.value = Array.from(anchors.value).filter((title) => !!title.innerText.trim())
    hTags.value = Array.from(new Set(titles.value.map((title) => title.tagName))).sort();
    titles.value = titles.value.map((el, index) => ({
        id: `title-${index}`, // 添加唯一 id
        title: el.innerText,
        lineIndex: el.getAttribute("data-v-md-line"),
        indent: hTags.value.indexOf(el.tagName),
        active: false,
    }));

    // 为每个标题元素设置 id
    titles.value.forEach((title, index) => {
        anchors.value[index].id = title.id;
    });
}

//复制代码成功
const handleCopyCodeSuccess = (content) => {
    toast("复制成功", "success");
};


// 添加滚动事件监听器
window.addEventListener('scroll', throttle(() => {
    // 获取当前滚动位置
    const scrollPosition = window.scrollY || window.pageYOffset;

    // 确保 anchors.value 不为空
    if (anchors.value && anchors.value.length > 0) {
        let closestAnchor = null;
        let closestDistance = Infinity;

        anchors.value.forEach(anchor => {
            // 获取元素的位置信息
            const rect = anchor.getBoundingClientRect();
            const elementTop = rect.top + scrollPosition;
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

            // 如果元素可见且在视口顶部附近
            if (isVisible) {
                const distance = Math.abs(elementTop - scrollPosition);

                // 找到距离视口顶部最近的元素
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestAnchor = anchor;
                }
            }
        });
        // 移除所有高亮样式
        titles.value.forEach((title) => (title.active = false));

        // 如果找到最近的元素,则高亮显示它
        if (closestAnchor) {
            const activeTitle = titles.value.find(
                (title) => title.id === closestAnchor.id
            );
            if (activeTitle) {
                activeTitle.active = true;
            }
        }
    }
}, 200)); // 节流滚动事件,每 100 毫秒执行一次

// 节流函数
function throttle(fn, delay) {
    let timer = null;
    return function () {
        const context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

onMounted(async () => {
    let waiting = false
    await getCurrentData()
    waiting = await showLoading("正在加载文章中...", satisfyData.value)
    if (waiting === true) {
        showEssay.value = true
    }
    openAnchor()
});

</script>


<style scoped>
.highlighted {
    @apply bg-red-500;
    background-color: red;
}

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
    @apply flex justify-between items-center text-purple-700 my-5;
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

.anchor {
    @apply fixed overflow-x-visible overflow-y-scroll;
    width: auto;
    top: 60px;
    bottom: 0px;
}

.active {
    @apply text-blue-400;
}
</style>
