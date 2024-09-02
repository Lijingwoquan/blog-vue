<template>
  <el-row>
    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
      <div v-if="!loading" @click="showAnchor">
        <div class="flex flex-col p-3">
          <!-- 文章名 -->
          <div class="mx-auto">
            <span
              class="text-2xl m-auto font-serif font-medium"
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
              ref="essayEditRef"
              id="editContainer"
              v-model:editContent="oneData.content"
            />
          </div>
        </div>
      </div>
    </el-col>

    <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
      <NavAnchor
        v-if="facility == 'computer'"
        :anchors="anchorData.anchors"
        :facility="facility"
      >
      </NavAnchor>
    </el-col>
  </el-row>

  <el-icon
    v-show="anchorShow"
    @click="hideAnchor"
    class="anchorIcon hidden-sm-and-up"
    style="font-size: 40px !important"
  >
    <Memo style="font-size: 40px !important" />
  </el-icon>

  <NavAnchor
    v-if="facility == 'mobile'"
    v-show="!anchorShow"
    :anchors="anchorData.anchors"
    :facility="facility"
  >
  </NavAnchor>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {
  ref,
  watch,
  onMounted,
  onUnmounted,
  defineAsyncComponent,
  nextTick,
} from "vue";
import { getEssayMsg } from "~/api/user.js";
import { listenScreen } from "~/composables/util.js";
import { useCommonGetData, useCommonData } from "~/composables/useCommon.js";
import { diposeHAndGetAnchors } from "~/helper/dataForAnchor.js";
import { initEssayCommonUse } from "~/composables/essayCommonUse.js";
const essayEdit = defineAsyncComponent(() =>
  import("~/components/essayEdit.vue")
);
const NavAnchor = defineAsyncComponent(() =>
  import("./components/NavAnchor.vue")
);
const route = useRoute();
const router = useRouter();

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

const { essayList } = useCommonData();

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
  loadingText: "文章渲染中",
});

const essayEditRef = ref(null);

const { anchorData, anchorShow, hideAnchor, showAnchor } = initEssayCommonUse();

const initEssayData = async () => {
  oneData.value = {};
  id.value = getCurrentEssayId();
  if (!id.value) {
    router.push("/404");
    return;
  }
  await getOneData();

  await nextTick();

  const result = diposeHAndGetAnchors(essayEditRef.value.anchorElement, {
    route,
    router,
  });
  anchorData.anchors = result.anchors.value;

  const initAnchorPosition = () => {
    for (let index = 0; index < anchorData.anchors.length; index++) {
      const anchor = anchorData.anchors[index];
      if (anchor.href === route.hash) {
        console.log(route.hash)
        var aEle = document.createElement("a");
        aEle.href = route.hash;
        aEle.click();
      }
    }
  };
  initAnchorPosition();
};

watch(
  () => route.path,
  async () => {
    await initEssayData();
  }
);

onMounted(async () => {
  window.addEventListener("resize", handleResize);
  await initEssayData();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

defineExpose({
  hideAnchor,
  showAnchor,
});
</script>

<style scoped>
:deep(.v-md-editor__main) {
  overflow: unset !important;
}

.anchorIcon {
  @apply fixed hover:cursor-pointer text-pink-500 text-opacity-80;
  z-index: 2;
  top: 60px;
  right: 0;
}

:deep(.vuepress-markdown-body) {
  font-size: var(--markdown-font-size);
  @apply px-[5px] py-[8px];
}
</style>
