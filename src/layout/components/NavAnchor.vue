<template>
    <el-aside class="anchor" >
        <div v-for="anchor in titles" :style="{
            padding: `5px 5px 5px ${anchor.indent * 20}px`,
        }" @click="handleAnchorClick(anchor)">
            <p style="cursor: pointer" class="text-gray-500" :class="{ active: anchor.active }">
                {{ anchor.title }}
            </p>
        </div>
    </el-aside>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const anchors = ref("")
const titles = ref("")
const hTags = ref("")

const props = defineProps({
    preview: {
        type: Object,
        required: true
    }
})

// 锚点跳转
const handleAnchorClick = (anchor) => {
    const { lineIndex } = anchor;

    const heading = props.preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

    if (heading) {
        props.preview.previewScrollToTarget({
            target: heading,
            scrollContainer: window,
            top: 50,
        });
    }
}

// 锚点数据处理
const showAnchor = () => {
    anchors.value = props.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
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
        titles.value.forEach((title) => {
            if (closestAnchor) {
                title.active = false
            }
        }
        );

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
}, 100)); // 节流滚动事件,每 100 毫秒执行一次

// // 节流函数
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

onMounted(() => {
    showAnchor()
})
</script>

<style scoped>
    .anchor {
        @apply fixed overflow-x-visible overflow-y-scroll my-5;
        width: auto;
        top: 60px;
        bottom: 0px;
    }

    .active {
        @apply text-blue-400 text-stroke-sm text-shadow-sm text-lg;
    }
</style>