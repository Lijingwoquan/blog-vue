import { ref, reactive } from "vue";

export function initEssayCommonUse() {
  const anchorData = reactive({
    anchors: [],
  });

  const anchorShow = ref(true);

  const hideAnchor = () => {
    anchorShow.value = false;
  };

  const showAnchor = () => {
    anchorShow.value = true;
  };

  return {
    anchorData,
    anchorShow,
    hideAnchor,
    showAnchor,
  };
}
