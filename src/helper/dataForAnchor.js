import { ref } from 'vue';
// 在essay页处理数据 然后将anchors传给anchor
export function diposeHAndGetAnchors(previewRef = {}, { route, router } = {}) {
    const anchorElement = ref([])
    const anchors = ref([])
    const hTags = ref([])

    // 锚点数据处理
    const anchorDataDispose = () => {
        anchorElement.value = previewRef.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')

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

    const initAnchorPosition = () => {
        // 由hash拿到lineIndex 
        anchors.value = anchors.value.map((anchor) => {
            if (route.hash === anchor.id) {
                return { ...anchor, active: true }
            } else {
                return anchor
            }
        })
        const activeAnchor = anchors.value.find(anchor => anchor.active === true)
        handleAnchorClick(activeAnchor)
    }

    // 锚点跳转
    const handleAnchorClick = (anchor) => {
        const { lineIndex } = anchor;
        const heading = previewRef.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
        if (heading) {
            previewRef.value.previewScrollToTarget({
                target: heading,
                scrollContainer: window,
            });
        }
        router.push(`${anchor.id}`)
    }


    // 添加滚动事件监听器
    if (anchors.value[0]) {
        anchors.value[0].active = true
    }

    anchorDataDispose()
    initAnchorPosition()

    return {
        anchors,
        anchorElement,
    }
}