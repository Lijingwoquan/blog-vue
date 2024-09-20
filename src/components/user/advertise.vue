<template>
  <div class="advertising" ref="advertisingRef">
    <img src="https://liuzihao.online:8080/api/img/2.jpg" alt="广告图片信息" />
    <div class="msg">
      <p :class="textSize">{{ text }}</p>
      <a
        :class="textSize"
        href="mailto:2115883273@qq.com
        ?subject=博客广告位购买%0A
        全局广告位一月150/位%0A
        单篇文章永久广告位100/位
        &body=我的联系方式是:%0A
        我想租用的广告位类型(文章位请填写文章链接):%0A
        我想租用的时间(文章位请无视):%0A
        我的广告信息(附带图片和不超过二十五字的描述信息):
        "
        style="text-decoration: underline"
      >
        联系我</a
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
});

const textSize = computed(() => {
  return props.position === "left" ? "text-ms" : "text-xs";
});
</script>

<style scoped>
.advertising {
  @apply relative my-3 flex flex-col justify-between items-center;
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
