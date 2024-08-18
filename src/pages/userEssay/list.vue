<template>
  <div v-if="loading">
    <el-row>
      <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
        <div @click="closeAnchor" :class="sizeObj.dynamicStyle">
          <div class="essayBasic">
            <span class="name">
              {{ oneData.name }}
            </span>
            <div class="subTitle">
              <div>
                <div>
                  <div class="left mb-5">
                    创建于:
                    {{
                      oneData.createdTime
                        ? oneData.createdTime.split("T")[0]
                        : ""
                    }}
                  </div>

                  <div class="left">
                    更新于:
                    {{
                      oneData.updatedTime
                        ? oneData.updatedTime.split("T")[0]
                        : ""
                    }}
                  </div>
                </div>

                <div>
                  <div class="right mb-5 ml-auto hover:( text-blue-400)">
                    <span class="ml-auto">
                      {{ oneData.kind }}
                    </span>
                  </div>
                  <div class="right">
                    <span class="ml-auto"> {{ oneData.visitedTimes }}次 </span>
                  </div>
                </div>
              </div>

              <span class="introduction">
                简介:{{ oneData.introduction }}
              </span>
            </div>
          </div>
          <div>
            <essayEdit
              v-if="oneData.content"
              ref="essayEditRef"
              v-model:editContent="oneData.content"
              v-model:previewRef="previewRef"
            ></essayEdit>
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
  </div>

  <el-icon
    v-show="anchorShow"
    @click="oppositedAnchor"
    class="anchorIcon hidden-sm-and-up"
    size="40px"
  >
    <Memo />
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
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { getEssayMsg } from "~/api/user.js";
import { listenScreen } from "~/composables/util.js";
import { useCommonGetData } from "~/composables/useCommon.js";
import { diposeHAndGetAnchors } from "~/helper/dataForAnchor.js";
import { initEssayCommonUse } from "~/composables/essayCommonUse";

import essayEdit from "~/components/essayEdit.vue";
import NavAnchor from "./components/NavAnchor.vue";

const essayEditRef = ref(null);
const store = useStore();
const route = useRoute();
const router = useRouter();

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

const { sizeObj, facility, handleResize } = listenScreen({
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
  for (let i = 0; i < store.state.essayList.length; i++) {
    if (store.state.essayList[i].complexRouter === currentRouter) {
      return store.state.essayList[i].id;
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
.essayBasic {
  @apply flex flex-col justify-center items-center overflow-hidden;
  padding: 16px 5px 10px 5px;
}

.essayBasic .name {
  @apply text-2xl m-auto font-serif font-bold;
  white-space: nowrap !important;
}

.essayBasic .subTitle {
  @apply flex flex-col justify-center items-center mb-10 font-mono;
  width: 100%;
}

.subTitle > div {
  @apply flex justify-between items-center text-purple-700 my-5 px-2;
  width: 100%;
}

.subTitle > div > div .right {
  @apply text-purple-700 mr-1 flex ml-auto;
  white-space: nowrap;
}

.subTitle > div > div .left {
  @apply text-purple-700;
}

.introduction {
  @apply mr-auto italic text-pink-500 font-sans px-2;
}

.content {
  @apply md:text-xl lg:text-2xl xl:text-2xl xl:text-xl mx-3;
}

:deep(.v-md-editor__main) {
  overflow: unset !important;
}

:deep(.github-markdown-body) {
  padding: 5px;
}

.anchorIcon {
  @apply fixed hover:cursor-pointer;
  z-index: 9999;
  top: 200px;
  right: 40px;
}

:deep(.vuepress-markdown-body) {
  font-size: var(--markdown-font-size);
}
</style>
