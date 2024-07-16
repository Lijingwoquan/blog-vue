import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { throttle } from '~/composables/common.js';
import anime from 'animejs';


// 在essay页处理数据 然后将anchors传给anchor
export function diposeHAndGetAnchors(preview = {}) {
    const router = useRouter()
    const route = useRoute()

    const anchorElement = ref([])
    const anchors = ref([])
    const hTags = ref([])
    const anchorContainer = ref(null)

    const previewMsg = ref(props.preview)

    // 锚点数据处理
    const anchorDataDispose = () => {
        anchorElement.value = previewMsg.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')

        // 为每个h标签加上子元素a标签
        anchorElement.value.forEach((anchor, index) => {
            // 检查是否已经包含 a 标签
            const existingATag = anchor.querySelector('a');

            if (!existingATag) {
                // 如果没有 a 标签，创建新的 a 元素
                const aTag = document.createElement('a');

                const hrefValue = `#anchor-${index}`;
                aTag.setAttribute('href', hrefValue);

                // 保存原有的内容
                const originalContent = anchor.innerHTML;

                // 清空原有的 h 标签内容
                anchor.innerHTML = '';

                // 添加链接图标和原有内容
                aTag.innerHTML = '🔗' + originalContent;

                // 添加点击事件
                aTag.addEventListener('click', (event) => {
                    event.preventDefault();
                    handleAnchorClick(anchors.value[index]);
                });

                anchor.appendChild(aTag);
            }
        })

        // 去掉空格h标签 !!的作用是将字符串转化为布尔值
        anchors.value = Array.from(anchorElement.value).filter((anchor) => !!anchor.innerText.trim())

        hTags.value = Array.from(new Set(anchors.value.map((anchor) => anchor.tagName))).sort()

        anchors.value = anchors.value.map((el, index) => ({
            id: `#anchor-${index}`, // 添加唯一 id
            title: el.innerText,
            lineIndex: el.getAttribute("data-v-md-line"),
            indent: hTags.value.indexOf(el.tagName),
            active: false,
        }))

        // 为每个标题元素设置 id
        anchors.value.forEach((anchor, index) => {
            anchorElement.value[index].id = anchor.id;
        })
    }

    // 滚动函数 实现文章内部滚动
    function scrollThrottleFn() {
        // 获取当前滚动到的位置
        const scrollPosition = window.scrollY || window.pageYOffset;

        // 确保 anchorElement.value 不为空
        if (anchorElement.value && anchorElement.value.length > 0) {
            let closestAnchor = null
            let closestDistance = Infinity //距离默认无穷大
            const viewportHeight = window.innerHeight

            anchorElement.value.forEach(anchor => {
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
            anchors.value.forEach((anchor) => {
                if (closestAnchor) {
                    anchor.active = false
                }
            })

            // 如果找到最近的元素 则高亮显示它
            if (closestAnchor) {
                let index = null
                const activeTitle = anchors.value.find((anchor) => {
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

    // 初始化锚点位置
    const initAnchorPosition = () => {
        // 由hash拿到lineIndex 
        const anchor = anchors.value.find((anchor) => route.hash === anchor.id)

        if (anchor) {
            const heading = previewMsg.value.$el.querySelector(`[data-v-md-line="${anchor.lineIndex}"]`);
            previewMsg.value.previewScrollToTarget({
                target: heading,
                scrollContainer: window,
            });
        }
    }

    // 锚点跳转
    const handleAnchorClick = (anchor) => {
        const { lineIndex } = anchor;
        const heading = previewMsg.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
        if (heading) {
            previewMsg.value.previewScrollToTarget({
                target: heading,
                scrollContainer: window,
            });
        }
        router.push(`${anchor.id}`)
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
}