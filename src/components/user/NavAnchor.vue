<template>
    <div :class="anchorClass" ref="anchorContainer">
        <div v-for="anchor in titles" :style="{
            padding: `5px 5px 5px ${anchor.indent * 20}px`,
        }" @click="handleAnchorClick(anchor)">
            <p style="cursor: pointer;color:dodgerblue;" class="text-shadow-sm" :class="{ active: anchor.active }">
                {{ anchor.title }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue'
import anime from 'animejs'; // 如果你使用模块化开发

const anchors = ref("")
const titles = ref("")
const hTags = ref("")
const anchorContainer = ref(null)
const indexRef = ref("")

const props = defineProps({
    preview: {
        type: Object,
        required: true
    },
    mode: {
        type: String,
        default: "computer"
    }
})

// 锚点跳转
const handleAnchorClick = (anchor = getIndex.value) => {
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

const getIndex = computed(() => {
    return indexRef.value
})

// 侧边自动滑动
const scrollToAnchor = (targetIndex = getIndex.value) => {
    const container = anchorContainer.value
    if (container.children && container.children.length > 0) {

        const targetElement = container.children[targetIndex]; // 获取目标元素
        if (targetElement && targetElement.offsetTop > 0) {
            const targetScrollTop = targetElement.offsetTop - 120;
            // 使用 anime.js 实现平滑滚动动画
            anime({
                targets: container,
                scrollTop: targetScrollTop,
                duration: 300, // 动画持续时间为 500 毫秒
                easing: 'easeInOutQuad', // 使用 easeInOutQuad 缓动函数
                complete: () => {
                    // 动画完成后的回调函数
                }
            })
        }
    }
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
        })

        // 如果找到最近的元素,则高亮显示它
        if (closestAnchor) {
            let index = null
            const activeTitle = titles.value.find((title) => {
                if (title.id === closestAnchor.id) {
                    indexRef.value = title
                    index = parseInt(title.id.split('-')[1])
                    return true
                }
            })
            if (activeTitle && index !== null) {
                activeTitle.active = true;
                scrollToAnchor(index)
            }
        }
    }
}, 100)); // 节流滚动事件,每 200 毫秒执行一次

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

const anchorClass = computed(() => {
    if (props.mode == "computer") {
        return "anchorForComputer"
    } else {
        return "anchorForMobil"
    }
})

defineExpose({
    handleAnchorClick,
})

onMounted(() => {
    showAnchor()
    titles.value[0].active = true
})
onUpdated(() => {
    scrollToAnchor()
})

</script>

<style scoped>
    .anchorForComputer {
        @apply fixed overflow-x-visible overflow-y-scroll mt-5 mr-2;
        width: auto;
        top: 60px;
        height: 80vh;
    }

    .anchorForMobil {
        @apply fixed overflow-x-visible overflow-y-scroll rounded-md;
        border-radius: 6px;
        top: 240px;
        width: 210px;
        height: 300px;
        right: 30px;
        background:
            linear-gradient(to right bottom, rgba(110, 216, 220, 0.63) 5%, cyan 45%, pink 75%, rgba(174, 92, 92, 0.575));
        z-index: 2;
        border: 1px solid rgba(193, 24, 94, 0.4);
        padding: 3px;
        box-sizing: border-box;
    }

    .active {
        @apply text-stroke-sm text-shadow-lg text-lg;
        color: rgba(199, 44, 109, 0.621) !important;
    }
</style>