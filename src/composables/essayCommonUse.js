import { ref, reactive, computed } from "vue";

export function initEssayCommonUse() {
  const previewRef = ref({});
  const anchorData = reactive({
    anchors: [],
    anchorElement: [],
    scrollThrottleFn: null,
  });
  const anchorShow = ref(false);
  const anchorContentShow = ref(false);

  const oppositedAnchor = () => {
    anchorContentShow.value = !anchorContentShow.value;
  };

  // 作用于全局 关闭anchor
  const closeAnchor = () => {
    anchorContentShow.value = false;
  };

  const hideAnchor = () => {
    anchorShow.value = false;
  };

  const showAnchor = () => {
    anchorShow.value = true;
  };

  const handelScoll = () => {
    const scrollPosition =
      document.documentElement.scrollTop || window.pageYOffset;
    if (scrollPosition >= 500) {
      // 滚动超过 500 像素时显示
      anchorShow.value = true;
    } else {
      anchorShow.value = false;
      closeAnchor();
    }
  };

  return {
    previewRef,
    anchorData,
    anchorShow,
    anchorContentShow,
    oppositedAnchor,
    closeAnchor,
    hideAnchor,
    showAnchor,
    handelScoll,
  };
}
