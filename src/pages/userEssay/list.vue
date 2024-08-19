<template>
  <el-row>
    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
      <div v-if="loading">
        <div @click="closeAnchor" class="flex flex-col p-3">
          <!-- 文章名 -->
          <div class="mx-auto">
            <span
              class="text-2xl m-auto font-serif font-bold"
              style="white-space: nowrap !important"
            >
              {{ oneData.name }}
            </span>
          </div>

          <!-- 创建时间和分类 -->
          <div
            class="flex items-center justify-between font-mono text-purple-700 my-3"
          >
            <div class="text-lg">
              创建于:
              {{ oneData.createdTime ? oneData.createdTime.split("T")[0] : "" }}
            </div>
            <div class="text-lg hover:( text-blue-400)">
              {{ oneData.kind }}
            </div>
          </div>

          <!-- 更新时间和访问次数 -->
          <div
            class="flex items-center justify-between font-mono text-purple-700"
          >
            <div class="text-lg">
              更新于:
              {{ oneData.updatedTime ? oneData.updatedTime.split("T")[0] : "" }}
            </div>
            <div class="text-lg">{{ oneData.visitedTimes }}次</div>
          </div>

          <!-- 简介 -->
          <div class="my-3 text-pink-500 px-2">
            简介:{{ oneData.introduction }}
          </div>

          <!-- 文章内容 -->
          <div>
            <essayEdit
              v-if="oneData.content"
              ref="essayEditRef"
              v-model:editContent="oneData.content"
              v-model:previewRef="previewRef"
            ></essayEdit>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
      <NavAnchor
        v-if="facility == 'computer' && previewRef != null"
        :previewRef="previewRef"
        :anchors="anchorData.anchors"
        :anchorElement="anchorData.anchorElement"
        :facility="facility"
      >
      </NavAnchor>
    </el-col>
  </el-row>

  <el-icon
    v-show="anchorShow"
    @click="oppositedAnchor"
    class="anchorIcon hidden-sm-and-up text-blue-500"
    style="font-size: 40px !important"
  >
    <Memo style="font-size: 40px !important" />
  </el-icon>

  <NavAnchor
    v-if="facility == 'mobile' && previewRef != null"
    v-show="anchorContentShow"
    :previewRef="previewRef"
    :anchors="anchorData.anchors"
    :anchorElement="anchorData.anchorElement"
    :facility="facility"
  >
  </NavAnchor>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted, onUnmounted, defineAsyncComponent } from "vue";
import { getEssayMsg } from "~/api/user.js";
import { listenScreen } from "~/composables/util.js";
import { useCommonGetData, useCommonData } from "~/composables/useCommon.js";
import { diposeHAndGetAnchors } from "~/helper/dataForAnchor.js";
import { initEssayCommonUse } from "~/composables/essayCommonUse.js";
import essayEdit from "~/components/essayEdit.vue";
const NavAnchor = defineAsyncComponent(() =>
  import("./components/NavAnchor.vue")
);
const route = useRoute();
const router = useRouter();

const { essayList } = useCommonData();

const essayEditRef = ref(null);

const {
  previewRef,
  anchorData,
  anchorShow,
  anchorContentShow,
  oppositedAnchor,
  closeAnchor,
  hideAnchor,
  showAnchor,
  handelScoll,
} = initEssayCommonUse(essayEditRef);

const { facility, handleResize } = listenScreen({
  resize: {
    facilityStandard: {
      computer: {
        dynamicStyle: "computer-text-size",
      },
      mobile: {
        dynamicStyle: "mobile-text-size",
      },
    },
  },
});

function getCurrentEssayId() {
  const currentRouter = route.path;
  for (let i = 0; i < essayList.value.length; i++) {
    if (essayList.value[i].complexRouter === currentRouter) {
      return essayList.value[i].id;
    }
  }
}

const { id, oneData, loading, getOneData } = useCommonGetData({
  id: getCurrentEssayId(),
  getOneData: getEssayMsg,
  loadingText: "文章列表渲染中",
});

const initEssayData = async () => {
  oneData.value = {};
  id.value = getCurrentEssayId();
  if (!id.value) {
    router.push("/404");
    return;
  }
  await getOneData();
  handleResize();
  handelScoll();
  const result = diposeHAndGetAnchors(previewRef, { route, router });
  anchorData.anchors = result.anchors.value;
  anchorData.scrollThrottleFn = result.scrollThrottleFn;
  anchorData.anchorElement = result.anchorElement;
};

watch(
  () => route.path,
  () => {
    initEssayData();
  }
);
onMounted(() => {
  initEssayData();
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handelScoll);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.addEventListener("scroll", handelScoll);
});

defineExpose({
  hideAnchor,
  showAnchor,
  handelScoll,
});
</script>

<style scoped>
:deep(.v-md-editor__main) {
  overflow: unset !important;
}

.anchorIcon {
  @apply fixed hover:cursor-pointer;
  z-index: 9999;
  top: 200px;
  right: 40px;
}

:deep(.vuepress-markdown-body) {
  font-size: var(--markdown-font-size);
  @apply px-[5px] py-[8px];
}
</style>
