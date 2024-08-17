import { ref, reactive, computed } from "vue";

export function initEssayCommonUse() {
  const facility = ref("");
  const previewRef = ref(null);
  const anchorData = reactive({
    anchors: [],
    anchorElement: [],
    scrollThrottleFn: null,
  });
  const anchorShow = ref(false);
  const anchorContentShow = ref(false);

  const fontMode = computed(() => {
    return facility.value === "computer"
      ? "computer-text-size"
      : "mobile-text-size";
  });

  //复制代码成功
  const handleCopyCodeSuccess = () => {
    toast("复制成功", "success");
  };

  // 控制anchor的开关
  const oppositedAnchor = () => {
    anchorContentShow.value = !anchorContentShow.value;
  };

  // 作用于全局 关闭anchor
  const closeAnchor = () => {
    anchorContentShow.value = false;
  };

  // 根据窗口大小来修改模式
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 768) {
      facility.value = "mobile";
    } else {
      facility.value = "computer";
    }
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
    facility,
    previewRef,
    anchorData,
    anchorShow,
    anchorContentShow,
    fontMode,
    handleCopyCodeSuccess,
    oppositedAnchor,
    closeAnchor,
    handleResize,
    hideAnchor,
    showAnchor,
    handelScoll,
  };
}
