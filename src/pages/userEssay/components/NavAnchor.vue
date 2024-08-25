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
    >
      <el-anchor-link
        v-for="(anchor, index) in props.anchors"
        class="ml-2"
        :key="index"
        :href="`${anchor.href}`"
      >
        {{ anchor.title.split("🔗")[1] }}
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
  history.pushState(null, null, anchorValue);
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
  min-height: 60vh;
  top: 40px;
  right: 0;
  z-index: 2;
  padding: 3px;
}
</style>
