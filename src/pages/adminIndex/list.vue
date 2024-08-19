<template>
  <div class="flex flex-col justify-center items-center px-15">
    <div class="flex" style="width: 100%">
      <indexChart></indexChart>
    </div>

    <div class="flex mt-10" style="width: 100%">
      <el-card shadow="never" style="width: 100%; height: 350px">
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-sm">用户访问量</span>
            <el-tag type="danger" effect="plain"> 用户访问量 </el-tag>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col
            :span="8"
            v-for="(item, index) in userVisitedCountArr"
            :key="index"
          >
            <el-card
              shadow="never"
              class="border-0 bg-light-400 flex justify-center items-center"
            >
              <div
                class="flex flex-col justify-center items-center"
                style="height: 200px"
              >
                <span class="text-xl mb-2">{{ item.count }}</span>
                <span class="text-sm text-gray-500">{{ item.period }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>

  <div class="background" :style="{ left: $store.state.adminAsideWidth }"></div>
</template>

<script setup>
import { onMounted, ref, defineAsyncComponent } from "vue";
import { getUserVisitedCount } from "~/api/count.js";
const indexChart = defineAsyncComponent(() =>
  import("./components/indexChart.vue")
);
const userVisitedCountArr = ref([
  {
    period: "用户年访问量",
    count: 0,
  },
  {
    period: "用户月访问量",
    count: 0,
  },
  {
    period: "用户周访问量",
    count: 0,
  },
]);

onMounted(async () => {
  await getUserVisitedCount().then((res) => {
    userVisitedCountArr.value[0].count = res.year;
    userVisitedCountArr.value[1].count = res.month;
    userVisitedCountArr.value[2].count = res.week;
  });
});
</script>

<style scoped>
.cardData {
  @apply mx-2 rounded-3xl;
  height: 300px;
}

:deep(.el-card__body) {
  height: 100%;
}

.card-container {
  @apply flex flex-col justify-between items-center;
  height: 100%;
}

.card-container .top {
  @apply flex justify-start;
  width: 100%;
}

.card-container .body {
  @apply flex items-center justify-center text-4xl;
  height: 60%;
}

.card-container .bottom {
  height: 20%;
}

.background {
  @apply fixed;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  background: linear-gradient(
    to right top,
    rgba(97, 65, 104, 0.069),
    rgba(114, 92, 40, 0.081),
    rgba(23, 58, 185, 0.098)
  );
}
</style>
