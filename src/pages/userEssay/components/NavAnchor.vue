<template>
  <div
    :class="
      props.facility === 'computer' ? 'anchorForComputer' : 'anchorForMobil'
    "
  >
    <el-anchor
      :offset="70"
      type="underline"
      target="#editContainer"
      @change="handelChange"
      :class="props.facility != 'computer' ? 'anchorForMobil-background' : ''"
    >
      <el-anchor-link
        v-for="(anchor, index) in props.anchors"
        class="ml-2"
        :key="index"
        :href="`${anchor.href}`"
      >
        <span class="anchor-font">
          {{ anchor.title.split("🔗")[1] }}
        </span>
      </el-anchor-link>
    </el-anchor>
  </div>
</template>

<script setup>
const props = defineProps({
  anchors: {
    type: Array,
    required: true,
  },
  facility: {
    required: true,
  },
});

const handelChange = (anchorValue) => {
  // 获取当前的状态
  let currentState = history.state;

  // 更新状态并替换当前的历史记录条目
  history.replaceState(currentState, null, anchorValue);
};
</script>

<style scoped>
.anchorForComputer {
  @apply fixed overflow-x-visible overflow-y-scroll mt-5 mr-2;
  width: auto;
  top: 60px;
  height: 80vh;
}

.anchorForMobil {
  @apply fixed overflow-x-visible overflow-y-scroll mt-5 rounded;
  width: auto;
  max-height: 50vh;
  top: 40px;
  right: 0;
  z-index: 2;
  padding: 3px;
}
.anchorForMobil-background {
  background: linear-gradient(
    to left bottom,
    rgba(8, 219, 242, 0.386),
    rgba(54, 186, 186, 0.189)
  );
}

.anchor-font {
  color: #288ddb;
  font-weight: 700;
}

@media (min-width: 1200px) {
  .anchor-font {
    @apply text-sm;
  }
}

@media (max-width: 1200px) {
  .anchor-font {
    @apply text-sm; /* 大屏幕设备字体大小 */
  }
}

@media (max-width: 992px) {
  .anchor-font {
    @apply text-sm;
  }
}

@media (max-width: 768px) {
  .anchor-font {
    @apply text-xs;
  }
}

@media (max-width: 576px) {
  .anchor-font {
    @apply text-xs;
  }
}
</style>
