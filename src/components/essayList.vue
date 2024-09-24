<template>
  <div v-if="!listUse.loading" class="p-4">
    <div v-for="essay in essayList" :key="essay.id">
      <div class="list-container">
        <!-- 左侧信息 -->
        <div class="flex flex-col pr-3" :style="{ width: leftWidth }">
          <h2 class="title">
            <router-link :to="getEssayHref(essay)">
              {{ essay.name }}
            </router-link>
          </h2>

          <small class="font-mono text-xs text-gray-600 leading-[2]">
            {{ essay.createdTime.split("T")[0] }} 初稿
          </small>

          <el-text
            class="mr-auto leading-loose overflow-hidden"
            line-clamp="3"
            size="small"
            type="info"
            style="word-break: break-all"
          >
            {{ essay.introduction }}
          </el-text>

          <span class="font-mono text-sm mr-auto text-pink-600 mt-3">
            隶属
            <router-link :to="getKindHref(essay)">
              {{ essay.kind }}
            </router-link>

            <span> | {{ essay.visitedTimes }}阅读量</span>
          </span>
          <div class="keywordsc-container">
            <span v-if="essay.keywords.length > 0">标签:</span>
            <span v-for="(keyword, index) in essay.keywords" :key="index">
              <span v-if="index < 4">{{ keyword }}&nbsp;</span>
              <span v-if="index == 4" class="hidden-md-and-up">...</span>
              <span v-if="index >= 5" class="hidden-sm-and-down">
                {{ keyword }}&nbsp;
              </span>
            </span>
          </div>
        </div>
        <!-- 图片 -->
        <div :style="{ maxWidth: maxWidth }">
          <el-image
            :src="config.serviveUrl + 'img/' + essay.imgUrl"
            lazy
            loading="lazy"
            class="right-img max-h-[200px]"
            fit="contain"
          ></el-image>
        </div>
      </div>

      <el-divider border-style="dotted" />
    </div>

    <paging
      :currentPage="listUse.currentPage"
      :totalPages="listUse.totalPages"
    ></paging>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, defineAsyncComponent } from "vue";
import { config } from "/config.js";
import { useCommonNav } from "~/composables/useCommon";
import { listenScreen } from "~/composables/util";
const paging = defineAsyncComponent(() => import("./paging.vue"));

const { getEssayHref, getKindHref } = useCommonNav();
const { facility, handleResize } = listenScreen({
  resize: {},
});

const props = defineProps({
  essayList: {
    type: Array,
    default: [],
  },
  listUse: {
    type: Object,
    required: true,
  },
});

const leftWidth = computed(() => {
  return facility.value != "mobile" ? "65%" : "70%";
});

const maxWidth = computed(() => {
  return facility.value != "mobile" ? "35%" : "30%";
});

onMounted(() => {
  document.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  document.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.list-container {
  @apply flex justify-between my-5 items-center;
}
.title {
  @apply text-blue-500 hover:(cursor-pointer)  text-xl leading-[2];
  background: radial-gradient(
    rgb(219, 121, 42),
    rgb(98, 71, 221),
    rgb(49, 31, 4)
  );
  width: fit-content;
  color: transparent;
  background-clip: text;
}
.keywordsc-container {
  @apply font-mono text-sm mr-auto text-pink-600 mt-2;
}
.keywordsc-container span {
  @apply leading-loose;
}

.right-img {
  box-shadow: 2px 2px 5px gray;
  border-radius: 5px;
}
</style>
