<template>
  <div v-loading="tableLoading" class="flex flex-col items-center">
    <span>修改kind类型</span>
    <div v-for="kind in classifiesKind" class="lists">
      <div class="list">
        <el-input
          style="width: 35%"
          v-model="kind.kind"
          placeholder="分类名"
          class="input"
        ></el-input>
        <el-icon class="mx-4" size="18px">
          <component :is="kind.icon"></component>
        </el-icon>
        <el-button
          style="width: 30%"
          type="primary"
          size="default"
          @click="updateKindHandelPre(kind)"
          >选择</el-button
        >
      </div>
    </div>
  </div>

  <el-drawer
    v-model="drawerVisiableRef"
    title="修改分类"
    append-to-body
    size="45%"
  >
    <el-form :model="form" label-width="80px" :inline="false">
      <el-form-item label="分类名">
        <el-input v-model="form.kind"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <iconChoose
          class="mt-1 mx-1"
          :modelValue="form.icon"
          @update:modelValue="(icon) => (form.icon = icon)"
        ></iconChoose>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="large"
          @click="handelUpdate"
          style="width: 100%"
          class="mt-5"
          :loading="btnLoading"
          >修改分类</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { updateKind } from "~/api/manager.js";
import iconChoose from "./iconChoose.vue";
import { useCommonForm } from "~/composables/useCommon.js";
const store = useStore();

const { form, btnLoading, tableLoading, drawerVisiableRef, handelUpdate } =
  useCommonForm({
    form: reactive({
      kind: "",
      icon: "",
      id: null,
    }),
    update: updateKind,
    reload: true,
  });

const classifiesKind = computed(() => store.state.classifyKind);

const updateKindHandelPre = (item) => {
  for (let k in item) {
    if (k === "kind") {
      form["name"] = item[k];
    } else {
    }
    form[k] = item[k];
  }
  drawerVisiableRef.value = true;
};
</script>

<style scoped>
.aside {
  @apply flex flex-col justify-center items-center;
  height: 100%;
  width: 40px;
  background-color: rgba(130, 120, 194, 0.297);
}

.lists {
  height: auto;
  width: auto;
  @apply flex flex-col justify-between items-center my-2;
}

.lists .list {
  height: auto;
  @apply flex justify-center items-center;
}

.lists .input {
  @apply text-red-700 my-2;
}
</style>