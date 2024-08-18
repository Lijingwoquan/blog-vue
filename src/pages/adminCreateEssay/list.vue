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
            v-for="item in classifyArr"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
          <el-option label="自定义" value="" @click="ifCustomInput = true" />
        </el-select>
        <el-input
          v-if="ifCustomInput == true"
          class="mt-3"
          v-model="form.kind"
          placeholder="输入分类"
        ></el-input>
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
  <div class="bottom">
    <el-button
      type="primary"
      size="large"
      @click="drawerVisiableRef = true"
      class="btn"
      >添加文章</el-button
    >
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import essayEdit from "~/components/essayEdit.vue";
import { createEssay } from "~/api/manager.js";
import { useCommonForm } from "~/composables/useCommon.js";

const store = useStore();
const classifyArr = store.state.classifyData;

const ifCustomInput = ref(false);
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
  reloadData: true,
});
</script>

<style scoped>
.bottom {
  @apply bottom-3 fixed;
  z-index: 999;
}

.bottom .btn {
  @apply ml-3;
}
</style>
