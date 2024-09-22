<template>
  <div v-if="!commonUse.loading" class="p-4">
    <div v-for="essay in essayList" :key="essay.id">
      <div class="list-container">
        <!-- 左侧信息 -->
        <div class="flex flex-col w-[65%] pr-3">
          <h2 class="title">
            <a :href="commonUse.getEssayHref(essay)"> {{ essay.name }}</a>
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
            <a :href="commonUse.getKindHref(essay)">
              {{ essay.kind }}
            </a>
            <span> | {{ essay.visitedTimes }}阅读量</span>
          </span>
        </div>
        <!-- 图片 -->
        <div class="w-[35%] h-auto">
          <el-image
            :src="essay.imgUrl"
            lazy
            loading="lazy"
            class="right-img"
          ></el-image>
        </div>
      </div>

      <el-divider border-style="dotted" />
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="commonUse?.totalPages"
      :current-page="commonUse?.currentPage"
      @update:current-page="commonUse?.changePage"
      class="mt-2 justify-center absolute left-[50%]"
      style="transform: translateX(-50%)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  essayList: {
    type: Array,
    default: [],
  },
  commonUse: {
    type: Object,
    required: true,
  },
  navType: {
    type: String,
    default: "index",
  },
});
</script>

<style>
.list-container {
  @apply flex justify-between my-5 items-center;
}
.title {
  @apply text-blue-500 hover:(cursor-pointer)  text-2xl leading-[2];
  background: radial-gradient(
    rgb(219, 121, 42),
    rgb(98, 71, 221),
    rgb(49, 31, 4)
  );
  width: fit-content;
  color: transparent;
  background-clip: text;
}

.right-img {
  box-shadow: 2px 2px 5px black;
  border-radius: 5px;
}
</style>
