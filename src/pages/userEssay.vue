<template>
  <div v-if="loading">
    <el-row>
      <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
        <div @click="closeAnchor" :class="fontMode">
          <div class="essayBasic">
            <span class="name">
              {{ tableData.name }}
            </span>
            <div class="subTitle">
              <div>
                <div>
                  <div class="left mb-5">
                    创建于:
                    {{
                      tableData.createdTime
                        ? tableData.createdTime.split("T")[0]
                        : ""
                    }}
                  </div>

                  <div class="left">
                    更新于:
                    {{
                      tableData.updatedTime
                        ? tableData.updatedTime.split("T")[0]
                        : ""
                    }}
                  </div>
                </div>

                <div>
                  <div class="right mb-5 ml-auto hover:( text-blue-400)">
                    <span class="ml-auto">
                      {{ tableData.kind }}
                    </span>
                  </div>
                  <div class="right">
                    <span class="ml-auto">
                      {{ tableData.visitedTimes }}次
                    </span>
                  </div>
                </div>
              </div>

              <span class="introduction">
                简介:{{ tableData.introduction }}
              </span>
            </div>
          </div>
          <div>
            <v-md-editor
              :class="fontMode"
              @copy-code-success="handleCopyCodeSuccess"
              v-model="tableData.content"
              height="auto"
              mode="preview"
              ref="previewRef"
            />
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
import { getEssayMsg } from "~/api/user.js";
import { showLoading } from "~/composables/util.js";
import NavAnchor from "~/components/user/NavAnchor.vue";
import { diposeHAndGetAnchors } from "~/helper/dataForAnchor.js";
import { useStore } from "vuex";
import { initEssayCommonUse } from "~/composables/essayCommonUse";
//富文本插件
import VueMarkdownEditor, { id } from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
// vuepressTheme主题
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
// 代码高亮
import Prism from "prismjs";
//代码快捷复制
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
// 代码行数
// import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
// todolist
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";
//mermaid(流程图等)
import createMermaidPlugin from "@kangc/v-md-editor/lib/plugins/mermaid/cdn";
import "@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css";

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  extend(md) {},
});
// VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createCopyCodePlugin());
VueMarkdownEditor.use(createTodoListPlugin());
VueMarkdownEditor.use(createMermaidPlugin());

const store = useStore();
const route = useRoute();
const router = useRouter();

const {
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
} = initEssayCommonUse();

function getCurrentEssayId() {
  const currentRouter = route.path;
  for (let i = 0; i < store.state.essayList.length; i++) {
    if (store.state.essayList[i].complexRouter === currentRouter) {
      return store.state.essayList[i].id;
    }
  }
}

const essayID = ref(0);
const tableData = ref({});
const loading = ref(false);
const getData = async () => {
  loading.value = false;
  await showLoading("正在渲染文章页面...");
  await getEssayMsg(essayID.value)
    .then((res) => {
      tableData.value = res;
    })
    .finally(() => {
      loading.value = true;
    });
};

const initEssayData = async () => {
  tableData.value = {};
  essayID.value = getCurrentEssayId();
  await getData();
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

.computer-text-size {
  font-size: 130%;
}

.mobile-text-size {
  font-size: initial;
}
</style>
