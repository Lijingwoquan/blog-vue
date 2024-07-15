<template>
    <div :class="anchorClass" ref="anchorContainer">
        <div v-for="anchor in anchors" :style="{
            padding: `5px 5px 5px ${anchor.indent * 20}px`,
        }" @click="handleAnchorClick(anchor)">
            <p style="cursor: pointer;color:dodgerblue;" class="text-shadow-sm" :class="{ active: anchor.active }">
                {{ anchor.title }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUpdated, onBeforeUnmount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { throttle } from '~/composables/common.js';
import anime from 'animejs'; // 如果你使用模块化开发

const router = useRouter()
const route = useRoute()
const anchorElement = ref([])
const anchors = ref([])
const hTags = ref([])
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

// 初始化锚点位置
const initAnchorPosition = () => {
    // 由hash拿到lineIndex 
    const anchor = anchors.value.find((anchor) => route.hash === anchor.id)

    if (anchor) {
        const heading = props.preview.$el.querySelector(`[data-v-md-line="${anchor.lineIndex}"]`);
        props.preview.previewScrollToTarget({
            target: heading,
            scrollContainer: window,
        });
    }
}

// 锚点跳转
const handleAnchorClick = (anchor) => {
    const { lineIndex } = anchor;
    const heading = props.preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
    if (heading) {
        props.preview.previewScrollToTarget({
            target: heading,
            scrollContainer: window,
        });
    }
    router.push(`${anchor.id}`)
}


// 锚点数据处理
const anchorDataDispose = () => {
    anchorElement.value = props.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
    anchorElement.value.forEach((anchor, index) => {
        // 创建一个新的 a 元素
        const aTag = document.createElement('a');

        // 设置 a 标签的 href 属性
        // 这里假设你想要使用标题的文本内容作为 href 的一部分
        // 你可以根据需要修改这个逻辑
        const hrefValue = `#anchor-${index}`;
        aTag.setAttribute('href', hrefValue);

        // 设置 a 标签的其他属性（如果需要）
        // aTag.classList.add('anchor-link');

        // 保存父代的文本
        const textContent = anchor.textContent;

        // 清空原有的 h 标签内容，然后将 a 标签添加进去
        anchor.textContent = '';
        aTag.textContent = '🔗' + textContent;

        // 添加点击事件
        aTag.addEventListener('click', (event) => {
            event.preventDefault();
            handleAnchorClick(anchors.value[index])
        });

        anchor.appendChild(aTag);
    });

    anchors.value = Array.from(anchorElement.value).filter((anchor) => !!anchor.innerText.trim())

    hTags.value = Array.from(new Set(anchors.value.map((anchor) => anchor.tagName))).sort();

    anchors.value = anchors.value.map((el, index) => ({
        id: `#anchor-${index}`, // 添加唯一 id
        title: el.innerText,
        lineIndex: el.getAttribute("data-v-md-line"),
        indent: hTags.value.indexOf(el.tagName),
        active: false,
    }));

    // 为每个标题元素设置 id
    anchors.value.forEach((anchor, index) => {
        anchorElement.value[index].id = anchor.id;
    });
}

// 计算属性
const getIndex = computed(() => {
    return indexRef.value
})

const anchorClass = computed(() => {
    if (props.mode == "computer") {
        return "anchorForComputer"
    } else {
        return "anchorForMobil"
    }
})

// 侧边自动滑动
const scrollToAnchor = (targetIndex = getIndex.value) => {
    const container = anchorContainer.value
    if (container && container.children && container.children.length > 0) {

        const targetElement = container.children[targetIndex]; // 获取目标元素
        if (targetElement && targetElement.offsetTop > 0) {
            const targetScrollTop = targetElement.offsetTop;
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

// 滚动函数
function scrollThrottleFn() {
    // 获取当前滚动位置
    const scrollPosition = window.scrollY || window.pageYOffset;

    // 确保 anchorElement.value 不为空
    if (anchorElement.value && anchorElement.value.length > 0) {
        let closestAnchor = null;
        let closestDistance = Infinity;

        anchorElement.value.forEach(anchor => {
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
        anchors.value.forEach((anchor) => {
            if (closestAnchor) {
                anchor.active = false
            }
        })

        // 如果找到最近的元素,则高亮显示它
        if (closestAnchor) {
            let index = null
            const activeTitle = anchors.value.find((anchor) => {
                if (anchor.id === closestAnchor.id) {
                    indexRef.value = anchor
                    index = parseInt(anchor.id.split('-')[1])
                    return true
                }
            })
            if (activeTitle && index !== null) {
                activeTitle.active = true;
                scrollToAnchor(index)
            }
        }
    }
}

onMounted(() => {
    // 添加滚动事件监听器
    window.addEventListener('scroll', throttle(scrollThrottleFn, 100)); // 节流滚动事件,每 100 毫秒执行一次
    if (anchors.value[0]) {
        anchors.value[0].active = true
    }
    anchorDataDispose()
    initAnchorPosition()
})


onBeforeUnmount(() => {
    window.removeEventListener('scroll', throttle(scrollThrottleFn, 100)); // 节流滚动事件,每 100 毫秒执行一次
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