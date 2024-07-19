<template>
    <div class="ml-2" :class="anchorClass" ref="anchorContainer">
        <div v-for="anchor in props.anchors" :style="{
            padding: `5px 5px 5px ${anchor.indent * 20}px`,
            fontSize: `${props.facility === 'computer' ? 24 - anchor.indent * 1.5 : 18 - anchor.indent * 1.5}px`
        }" @click="handleAnchorClick(anchor)">
            <p style="cursor: pointer;color:dodgerblue;" class="text-shadow-sm" :class="{ active: anchor.active }">
                {{ anchor.title.split("🔗")[1] }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { throttle } from '~/composables/common.js';
import anime from 'animejs';

const router = useRouter()
const anchorContainer = ref(null)

const props = defineProps({
    anchors: {
        type: Array,
        required: true
    },
    facility: {
        type: String,
        default: "computer"
    },
    anchorElement: {
        required: true
    },
    previewRef: {
        type: Object,
        required: true
    }
})

// 样式计算
const anchorClass = computed(() => {
    if (props.facility == "computer") {
        return "anchorForComputer"
    } else {
        return "anchorForMobil"
    }
})

// 锚点跳转
const handleAnchorClick = (anchor) => {
    const { lineIndex } = anchor;
    const heading = props.previewRef.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
    if (heading) {
        props.previewRef.previewScrollToTarget({
            target: heading,
            scrollContainer: window,
        });
    }
    router.push(`${anchor.id}`)
}

// anchor自动滑动
const scrollToAnchor = (targetIndex) => {
    const container = anchorContainer.value
    if (container && container.children && container.children.length > 0) {

        const targetElement = container.children[targetIndex] // 获取目标元素
        if (targetElement && targetElement.offsetTop > 0) {
            const targetScrollTop = targetElement.offsetTop
            // 使用 anime.js 实现平滑滚动动画
            anime({
                targets: container,
                scrollTop: targetScrollTop,
                duration: 300, // 动画持续时间为 300 毫秒
                easing: 'easeInOutQuad', // 使用 easeInOutQuad 缓动函数
                complete: () => {
                    // 动画完成后的回调函数
                }
            })
        }
    }
}

// 滚动函数 实现文章内部滚动
function scrollThrottleFn() {
    // 获取当前滚动到的位置
    const scrollPosition = window.scrollY || window.pageYOffset;


    // 确保 props.anchorElement 不为空
    if (props.anchorElement && props.anchorElement.length > 0) {
        let closestAnchor = null
        let closestDistance = Infinity //距离默认无穷大
        const viewportHeight = window.innerHeight

        props.anchorElement.forEach(anchor => {
            // 获取元素的位置信息
            const rect = anchor.getBoundingClientRect()

            // 元素距离窗口top的位置 加上已经滑动位置
            const elementTop = rect.top + scrollPosition

            // 元素距离窗口bottom的位置 加上已经滑动位置
            const elementBottom = rect.bottom + scrollPosition

            // 是否在当前窗口可见
            const isPartiallyVisible = elementBottom > scrollPosition && elementTop < (scrollPosition + viewportHeight)

            if (isPartiallyVisible) {
                // 元素距离窗体top的位置 
                const distance = Math.abs(elementTop - scrollPosition)

                // 找到距离视口顶部最近的元素
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestAnchor = anchor;
                }
            }
        })
        // 移除所有高亮样式
        props.anchors.forEach((anchor) => {
            if (closestAnchor) {
                anchor.active = false
            }
        })

        // 如果找到最近的元素 则高亮显示它
        if (closestAnchor) {
            let index = null
            const activeTitle = props.anchors.find((anchor) => {
                if (anchor.id === closestAnchor.id) {
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
    window.addEventListener('scroll', throttle(scrollThrottleFn, 100))
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', throttle(scrollThrottleFn, 100))
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
            linear-gradient(to right bottom,
                rgb(110, 216, 220) 30%,
                rgb(53, 235, 235) 60%,
                pink);
        z-index: 2;
        border: 1px solid rgba(193, 24, 94, 0.4);
        padding: 3px;
        box-sizing: border-box;
    }

    .active {
        @apply  text-shadow-md;
        color: rgb(232, 18, 189) !important;
    }
</style>