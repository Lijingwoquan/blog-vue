<template>
  <div class="advertising" ref="advertisingRef" v-if="advertiseImg">
    <img :src="advertiseImg" alt="广告图片信息" />
    <div class="msg">
      <p :class="textSize">{{ text }}</p>
      <a
        :class="textSize"
        :href="advertiseHref"
        target="_blank"
        class="cursor-pointer"
        style="text-decoration: underline"
      >
        了解详细</a
      >
    </div>
    <div class="icon" @click="closeAdvertising">
      <el-icon><Close /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const advertisingRef = ref(null);
const closeAdvertising = () => {
  advertisingRef.value.style.visibility = "hidden";
};

const props = defineProps({
  text: {
    type: String,
    default: "广告位招商",
  },
  position: {
    type: String,
    required: true,
  },
  advertiseImg: {
    type: String,
  },
  advertiseHref: {
    type: String,
  },
});

const textSize = computed(() => {
  return props.position === "left" ? "text-ms" : "text-xs";
});
</script>

<style scoped>
.advertising {
  @apply relative ml-2 my-3 flex flex-col justify-between items-center;
  background-color: rgb(200, 236, 240);
  box-shadow: 0 0 5px pink, 0 0 10px pink;
}
.advertising img {
  @apply w-[85%] h-auto mt-4;
}
.advertising .msg {
  @apply w-[100%] font-mono font-bold text-xs  text-gray-400;
  text-align: center;
}
.msg p {
  @apply leading-[2.5];
}
.msg a {
  @apply leading-[1.5];
}
.advertising .icon {
  @apply absolute bottom-0 right-0 w-4 h-4 cursor-pointer;
  content: "";
  color: red;
}
</style>
