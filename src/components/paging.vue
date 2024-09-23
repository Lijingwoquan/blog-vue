<template>
  <div
    class="mt-2 flex justify-center items-center absolute left-[50%]"
    style="transform: translateX(-50%)"
  >
    <div class="flex items-center">
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div>
      <!-- 第一页 -->
      <router-link
        :to="currentRoute + '?page=1'"
        v-if="totalPages > 1 && currentPage != 1"
        class="mx-2 inline-block"
        >1
      </router-link>

      <!-- 如果第一页和当前页码之间有较大间隔，显示省略号 -->
      <span v-if="currentPage > offset + 2" class="mx-2 inline-block">
        <router-link
          :to="currentRoute + '?page=' + leftPages[0] - 1"
          class="mx-2 inline-block"
          >...
        </router-link>
      </span>

      <!-- 左侧相邻页码 -->
      <router-link
        :to="currentRoute + '?page=' + page"
        class="mx-2 inline-block"
        v-for="page in leftPages"
        :key="'left' + page"
        >{{ page }}
      </router-link>

      <!-- 当前页 -->
      <router-link class="mx-2 inline-block font-bold text-blue-400"
        >{{ currentPage }}
      </router-link>
      <!-- 右侧相邻页码 -->

      <router-link
        class="mx-2 inline-block"
        v-for="page in rightPages"
        :key="'right' + page"
        :to="currentRoute + '?page=' + page"
        >{{ page }}
      </router-link>
      <!-- 如果当前页和最后一页之间有较大间隔，显示省略号 -->
      <span
        v-if="currentPage < totalPages - offset - 1"
        class="mx-2 inline-block"
      >
        <router-link
          :to="
            currentRoute + '?page=' + (rightPages[rightPages.length - 1] + 1)
          "
          >...
        </router-link>
      </span>

      <!-- 始终显示最后一页 -->
      <a> </a>

      <router-link
        v-if="totalPages > 1 && currentPage != totalPages"
        :to="currentRoute + '?page=' + totalPages"
        class="mx-2 inline-block"
      >
        {{ totalPages }}
      </router-link>
    </div>
    <div class="flex items-center">
      <el-icon><ArrowRight /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  totalPages: {
    type: Number,
    require: true,
  },
  currentPage: {
    type: Number,
    require: true,
  },
});

const offset = 2; // 左右相邻显示的页码数

// 动态计算左侧页码，确保显示合理的页码范围
const leftPages = computed(() => {
  const start = Math.max(2, props.currentPage - offset); // 从2开始，避免第一页重复
  const end = props.currentPage - 1; // 左侧页码的最大值为当前页的前一页
  const leftCount = end - start + 1; // 计算左侧实际要显示的页码数

  // 如果左侧页码不足offset页，尝试从右侧补充页码
  if (leftCount < offset) {
    // 计算补充页数
    const supplement = offset - leftCount;
    const newStart = Math.max(2, start - supplement); // 调整起始页码以补充左侧不足的页码
    return Array.from(
      { length: Math.max(0, end - newStart + 1) },
      (_, i) => newStart + i
    );
  }

  return Array.from({ length: leftCount }, (_, i) => start + i);
});

// 动态计算右侧页码，确保显示合理的页码范围
const rightPages = computed(() => {
  const start = props.currentPage + 1; // 从当前页的后一页开始
  const end = Math.min(props.totalPages - 1, props.currentPage + offset); // 确保右侧页码不会超过倒数第二页
  const rightCount = end - start + 1; // 计算右侧页码的实际数量

  // 如果右侧页码不足offset页，尝试从左侧补充
  if (rightCount < offset) {
    // 计算需要补充的页数
    const supplement = offset - rightCount;
    const newEnd = Math.min(props.totalPages - 1, end + supplement); // 向后扩展页码，确保不过超范围
    return Array.from(
      { length: Math.max(0, newEnd - start + 1) },
      (_, i) => start + i
    );
  }

  return Array.from({ length: rightCount }, (_, i) => start + i);
});

const currentRoute = computed(() => {
  return route.path;
});
</script>
