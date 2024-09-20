<template>
  <div v-if="!commonUse.loading" class="p-4">
    <div v-for="essay in essayList" :key="essay.id">
      <div class="list-container">
        <!-- 左侧信息 -->
        <div class="flex flex-col justify-around w-[70%]">
          <h2
            class="text-blue-500 hover:(cursor-pointer) float-left text-2xl leading-[2]"
            style="font-family: Arial, Helvetica, sans-serif"
            @click="commonUse?.toEssay(essay)"
          >
            {{ essay.name }}
          </h2>

          <small class="font-mono text-xs text-gray-600 leading-[2]">
            {{ essay.createdTime.split("T")[0] }} 初稿
          </small>

          <el-text
            class="mr-auto leading-loose"
            line-clamp="3"
            size="small"
            type="info"
          >
            {{ essay.introduction }}
          </el-text>

          <span class="font-mono text-sm mr-auto text-pink-600 mt-3">
            隶属
            <span
              @click.stop="
                navType === 'index' ? commonUse?.toKind(essay) : () => {}
              "
              class="hover:cursor-pointer"
            >
              {{ essay.kind }}
            </span>
            <span> | 100阅读量</span>
          </span>
        </div>
        <!-- 图片 -->
        <div class="w-[30%] h-auto p-5">
          <el-image
            src="https://liuzihao.online:8080/api/img/12.png"
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
.right-img {
  box-shadow: 2px 2px 5px black;
  border-radius: 5px;
}
</style>
