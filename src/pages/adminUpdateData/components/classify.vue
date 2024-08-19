<template>
  <div class="containerClassify">
    <div class="flex justify-center">
      <span>修改classify分类</span>
      <el-button
        type="success"
        size="default"
        @click="drawerVisiableRef = true"
        class="btn"
      >
        添加分类
        <el-icon>
          <Plus />
        </el-icon>
      </el-button>
    </div>
    <div class="list">
      <div v-for="(kind, index) in kindList" :key="index">
        <el-button
          type="primary"
          size="default"
          @click="updateClassifyPre(kind)"
          class="btn"
        >
          {{ kind.name }}
        </el-button>
      </div>
    </div>
  </div>

  <!-- 添加分类抽屉 -->
  <el-drawer
    v-model="drawerVisiableRef"
    title="添加classify"
    append-to-body
    size="45%"
  >
    <el-form :model="form" label-width="80px" :inline="false">
      <el-form-item label="类型">
        <el-select size="small" v-model="form.kind" placeholder="选择分类">
          <el-option
            v-for="item in kindList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
          <el-option label="自定义" value="" @click="customInput = true" />
        </el-select>
        <el-input
          v-if="customInput == true"
          v-model="form.kind"
          placeholder="输入分类"
          class="mt-4"
        />
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="路由">
        <el-input v-model="form.router" />
      </el-form-item>
      <el-form-item label="图标">
        <iconChoose
          :modelValue="form.icon"
          @update:modelValue="(icon) => (form.icon = icon)"
        ></iconChoose>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          @click="handelCreate"
          :loading="btnLoading"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>

  <!-- 修改分类窗口 -->
  <el-dialog
    v-model="dialogVisibleRef"
    :v-close-on-click-modal="true"
    :show-close="true"
    append-to-body
    :draggable="false"
    width="80%"
  >
    <el-card shadow="always">
      <el-table :data="list" border stripe v-loading="tableLoading">
        <el-table-column type="index" width="50" />
        <el-table-column label="分类名称" align="center">
          <template #default="{ row }">
            <el-input v-model="row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="分类路由" align="center">
          <template #default="{ row }">
            <el-input v-model="row.router"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button type="primary" text @click="updateClassifyHandel(row)"
              >修改分类</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { updateClassify, createClassify } from "~/api/manager.js";
import { useCommonForm, useCommonData } from "~/composables/useCommon.js";
import { toast } from "~/composables/util.js";
import iconChoose from "./iconChoose.vue";
import store from "~/store/index.js";

const { kindList, classifyList } = useCommonData();

const { form, btnLoading, tableLoading, drawerVisiableRef, handelCreate } =
  useCommonForm({
    form: reactive({
      kind: "",
      name: "",
      router: "",
      icon: "",
    }),
    create: createClassify,
    reload: true,
  });

const list = ref([]);
const customInput = ref(false);
const dialogVisibleRef = ref(false);

// 更新
const updateClassifyPre = (kind) => {
  list.value = [];
  dialogVisibleRef.value = true;
  classifyList.value.forEach((classify) => {
    if (classify.kind == kind.name) {
      list.value.push(classify);
    }
  });
};

const updateClassifyHandel = (row) => {
  tableLoading.value = true;
  updateClassify(row)
    .then(async () => {
      await store.dispatch("getIndexInfo");
      tableLoading.value = false;
      toast("修改分类成功");
    })
    .catch(() => {
      toast("修改分类失败", "error");
    });
};
</script>

<style scoped>
.containerClassify {
  @apply flex flex-col justify-center items-center mt-5;
}

.containerClassify > div {
  @apply mb-3;
}

.containerClassify .btn {
  @apply ml-5;
}

.containerClassify .list {
  @apply flex justify-center items-center flex-wrap;
}

.containerClassify .list .btn {
  @apply mx-2 my-2;
  width: 150px;
}

:deep(.el-select__selection) {
  height: 40px;
}
</style>
