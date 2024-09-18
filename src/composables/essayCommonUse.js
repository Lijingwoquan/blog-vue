import { ref, reactive } from "vue";

export function initEssayCommonUse() {
  const anchorData = reactive({
    anchors: [],
  });

  const anchorIconShowRef = ref(true);

  const hideAnchorIcon = () => {
    anchorIconShowRef.value = false;
  };

  const showAnchorIcon = () => {
    anchorIconShowRef.value = true;
  };

  return {
    anchorData,
    anchorIconShowRef,
    hideAnchorIcon,
    showAnchorIcon,
  };
}
