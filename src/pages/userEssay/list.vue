<template>
  <el-row style="position: relative">
    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
      <div v-if="!loading" @click="showAnchorIcon">
        <div class="flex flex-col p-3">
          <!-- 文章名 -->
          <div class="essay-name">
            <h2 class="text-2xl m-auto font-serif">
              {{ oneData.name }}
            </h2>
          </div>

          <!-- 创建时间和分类 -->
          <div
            class="flex items-center justify-between font-mono text-purple-700 my-3"
          >
            <div>
              {{ oneData.createdTime ? oneData.createdTime.split("T")[0] : "" }}
              初稿
            </div>
            <div class="hover:cursor-pointer">
              <router-link :to="getKindHref(oneData)">
                {{ oneData.kind }}
              </router-link>
            </div>
          </div>

          <!-- 更新时间和访问次数 -->
          <div
            class="flex items-center justify-between font-mono text-purple-700"
          >
            <div>
              {{ oneData.updatedTime ? oneData.updatedTime.split("T")[0] : "" }}
              更新
            </div>
            <div>{{ oneData.visitedTimes }}次</div>
          </div>

          <!-- 简介 -->

          <el-text
            class="mr-auto leading-loose my-2"
            size="default"
            type="info"
          >
            {{ oneData.introduction }}
          </el-text>

          <!-- 文章内容 -->
          <div>
            <essayEdit
              ref="essayEditRef"
              id="editContainer"
              v-model:editContent="oneData.content"
            />
          </div>

          <div v-if="oneData.last?.id > 0 && oneData.next?.id > 0">
            <el-divider></el-divider>
            <!-- 导航 -->
            <div class="flex justify-between">
              <router-link
                v-if="oneData.last?.id > 0"
                class="block mr-auto text-sm text-blue-600"
                :to="route.path + '?id=' + oneData.last.id"
              >
                &lt;&lt;&nbsp;&nbsp;上一篇
                <span class="essay-name inline-block">
                  &nbsp;{{ oneData.last.name }}
                </span>
              </router-link>

              <router-link
                v-if="oneData.next?.id > 0"
                class="block ml-auto text-sm text-blue-600"
                :to="route.path + '?id=' + oneData.next.id"
              >
                <span class="essay-name">{{ oneData.next.name }}&nbsp; </span>
                下一篇&nbsp;&nbsp;&gt;&gt;
              </router-link>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </div>
    </el-col>

    <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
      <NavAnchor
        id="navAnchor"
        v-if="facility != 'mobile'"
        :anchors="anchorData.anchors"
        :facility="facility"
        style="transform: translateY('-60px')"
      >
      </NavAnchor>
    </el-col>
  </el-row>

  <el-icon
    v-show="anchorIconShowRef"
    @click="hideAnchorIcon"
    class="anchorIcon hidden-sm-and-up"
    style="font-size: 40px !important"
  >
    <Memo style="font-size: 30px !important" />
  </el-icon>

  <NavAnchor
    v-if="facility === 'mobile'"
    v-show="!anchorIconShowRef"
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
import { useCommonGetData, useCommonNav } from "~/composables/useCommon.js";
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

const { getKindHref } = useCommonNav();

function getCurrentEssayId() {
  return route.query.id;
}

const { id, oneData, loading, getOneData } = useCommonGetData({
  id: getCurrentEssayId(),
  getOneData: getEssayMsg,
  loadingText: "文章渲染中",
});

const essayEditRef = ref(null);

const { anchorData, anchorIconShowRef, hideAnchorIcon, showAnchorIcon } =
  initEssayCommonUse();

const initEssayData = async () => {
  oneData.value = {};
  id.value = getCurrentEssayId();
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
        var aEle = document.createElement("a");
        aEle.href = route.hash;
        aEle.click();
      }
    }
  };
  initAnchorPosition();
};

watch(
  () => route.fullPath,
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
  hideAnchorIcon,
  showAnchorIcon,
  oneData,
});
</script>

<style scoped>
:deep(.v-md-editor__main) {
  overflow: unset !important;
}
:deep(.vuepress-markdown-body) {
  font-size: var(--markdown-font-size);
  @apply !px-[5px] !py-[8px];
}
.anchorIcon {
  @apply fixed hover:cursor-pointer text-pink-500 text-opacity-80;
  z-index: 2;
  top: 60px;
  right: 0;
}

.essay-name {
  margin: 0 auto;
  width: fit-content;
  background: linear-gradient(
    to right,
    rgb(231, 56, 117),
    rgb(66, 115, 219),
    rgb(148, 239, 62)
  );
  color: transparent;
  background-clip: text;
}

.nav-anchor-up-action {
  animation: 0.5s nav-anchor-action forwards;
}
.nav-anchor-down-action {
  animation: 0.5s nav-anchor-action-reverse linear forwards;
}

@keyframes nav-anchor-action {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-60px);
  }
}
@keyframes nav-anchor-action-reverse {
  from {
    transform: translateY(-60px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
