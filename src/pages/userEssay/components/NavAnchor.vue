<template>
  <div
    :class="props.facility == 'mobile' ? 'anchorForMobil' : 'anchorForComputer'"
    class="scroll-bar"
  >
    <el-anchor
      :offset="0"
      :bound="0"
      type="underline"
      target="#editContainer"
      @change="handelChange"
      :class="props.facility == 'mobile' ? 'anchorForMobil-background' : ''"
    >
      <el-anchor-link
        v-for="(anchor, index) in props.anchors"
        class="ml-2"
        :key="index"
        :href="`${anchor.href}`"
        style="padding: 0px !important"
        :style="{
          marginLeft: `${(anchor.level - 1) * anchorLeftMargin}px`,
        }"
      >
        <span class="anchor-font">
          {{ anchor.title.split("🔗")[1] }}
        </span>
      </el-anchor-link>
    </el-anchor>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { diffrentFacilifyMap } from "~/composables/util";

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
  let currentState = history.state;

  history.replaceState(currentState, null, anchorValue);
};

const anchorLeftMargin = computed(() => {
  return diffrentFacilifyMap(props.facility, {
    computer: 10,
    ipad: 8,
    mobile: 5,
  });
});
</script>

<style scoped>
.anchorForComputer {
  @apply fixed overflow-x-visible overflow-y-scroll mt-5 mr-2;
  width: auto;
  overflow-y: scroll;
}

.anchorForMobil {
  @apply fixed overflow-x-visible overflow-y-scroll mt-5 rounded max-w-[200px];
  width: auto;
  max-height: 60vh;
  top: 40px;
  right: 0;
  z-index: 2;
}
.anchorForMobil-background {
  background: antiquewhite;
}

.anchor-font {
  color: #28db70;
  font-weight: 600;
  text-wrap: wrap;
}

@media (min-width: 1200px) {
  .anchor-font {
    @apply text-sm;
  }
}

@media (max-width: 1200px) {
  .anchor-font {
    @apply text-sm;
  }
}

@media (max-width: 992px) {
  .anchor-font {
    @apply text-sm;
  }
}

@media (max-width: 768px) {
  .anchor-font {
    @apply text-sm;
  }
}

.scroll-bar::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background-color: #eee9e9;
}

.scroll-bar::-ms-scrollbar {
  width: 2px;
  height: 2px;
}

.scroll-bar::-ms-scrollbar-thumb {
  background-color: #eee9e9;
}
</style>
