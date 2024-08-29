<template>
  <div v-if="!commonUse.loading">
    <div
      v-for="essay in essayList"
      class="flex flex-col justify-center mt-5"
      :key="essay.id"
    >
      <div @click="commonUse?.toEssay(essay)">
        <div class="flex justify-between items-center">
          <h2
            class="font-serif font-medium mx-auto hover:(cursor-pointer text-shadow-sm underline decoration-blue-500 underline-offset-4)"
            style="white-space: nowrap; color: black"
          >
            {{ essay.name }}
          </h2>
        </div>

        <div class="px-4">
          <div class="flex my-3">
            <h4
              class="font-mono mr-auto text-purple-700 hover:(cursor-pointer text-blue-400)"
              @click.stop="
                navType === 'index' ? commonUse?.toKind(essay) : () => {}
              "
            >
              {{ essay.kind }}
            </h4>
            <h4 class="font-mono ml-auto text-purple-700">
              {{ essay.createdTime.split("T")[0] }}
            </h4>
          </div>

          <div class="flex justify-start my-3 p-3">
            <el-text truncated class="font-sans text-pink-500">
              {{ essay.introduction }}
            </el-text>
          </div>
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
      class="mt-5 justify-center"
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
