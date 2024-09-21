<template>
  <!-- 添加文章的抽屉 -->
  <el-drawer
    v-model="drawerVisiableRef"
    title="添加文章"
    append-to-body
    size="45%"
  >
    <el-form :model="form" label-width="80px" :inline="false">
      <el-form-item label="分类">
        <el-select v-model="form.kind" class="input" placeholder="选择分类">
          <el-option
            v-for="item in classifyList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="文章名">
        <el-input v-model="form.name" placeholder="文章名" />
      </el-form-item>

      <el-form-item label="路由">
        <el-input v-model="form.router" placeholder="路由" />
      </el-form-item>

      <el-form-item label="介绍">
        <el-input
          v-model="form.introduction"
          placeholder="介绍"
          class="input"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          size="large"
          style="width: 100%"
          @click="handelCreate"
          class="mt-5"
          :loading="btnLoading"
        >
          添加</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>

  <div class="mx-3 my-3">
    <essayEdit
      mode="edit"
      height="690px"
      v-model:previewRef="previewRef"
      v-model:editContent="form.content"
    />
  </div>

  <!-- 底部按钮 -->
  <div class="bottom-3 fixed" style="z-index: 999">
    <el-button
      type="primary"
      size="large"
      @click="drawerVisiableRef = true"
      class="ml-3"
      >添加文章</el-button
    >
  </div>
</template>

<script setup>
import { ref, reactive, defineAsyncComponent } from "vue";
import { createEssay } from "~/api/manager.js";
import { useCommonForm, useCommonData } from "~/composables/useCommon.js";
const essayEdit = defineAsyncComponent(() =>
  import("~/components/essayEdit.vue")
);

const { classifyList } = useCommonData();

const previewRef = ref({});

const { form, btnLoading, drawerVisiableRef, handelCreate } = useCommonForm({
  form: reactive({
    name: "",
    kind: "",
    introduction: "",
    content: "",
    router: "",
  }),
  create: createEssay,
  reload: true,
});
</script>
