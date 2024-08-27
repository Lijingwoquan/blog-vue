<template>
  <div v-loading="tableLoading" class="flex flex-col items-center">
    <span>修改kind类型</span>
    <div
      v-for="kind in kindList"
      class="flex flex-col justify-between items-center my-2"
    >
      <div class="flex justify-center items-center">
        <el-input
          style="width: 35%"
          v-model="kind.name"
          placeholder="分类名"
          class="my-2"
        ></el-input>
        <el-icon class="mx-4" size="18px">
          <component :is="kind.icon"></component>
        </el-icon>
        <el-button
          style="width: 30%"
          type="primary"
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
        <el-input v-model="form.name"></el-input>
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
import { reactive } from "vue";
import { updateKind } from "~/api/manager.js";
import iconChoose from "./iconChoose.vue";
import { useCommonForm, useCommonData } from "~/composables/useCommon.js";

const { kindList } = useCommonData();

const { form, btnLoading, tableLoading, drawerVisiableRef, handelUpdate } =
  useCommonForm({
    form: reactive({
      name: "",
      icon: "",
      id: null,
    }),
    update: updateKind,
    reload: true,
  });

const updateKindHandelPre = (item) => {
  for (let k in item) {
    form[k] = item[k];
  }
  drawerVisiableRef.value = true;
};
</script>
