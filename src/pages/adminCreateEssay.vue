<template>
  <!-- 底部 -->
  <div class="bottom">
    <el-button type="primary" size="large" @click="addEssayPre" class="btn">添加文章</el-button>
  </div>

  <!-- 添加文章的抽屉 -->
  <el-drawer v-model="dialogForAddEssay" title="添加文章" direction="ttb" append-to-body size="700px">
    分类
    <el-select v-model="addEssayParms.kind" class="input" placeholder="选择分类">
      <el-option v-for="item in classifyArr" :key="item.name" :label="item.name" :value="item.name" />
      <el-option label="自定义" value="" @click="customInputPre" />
    </el-select>
    <el-input v-if="customInput == true" v-model="addEssayParms.kind" placeholder="输入分类" class="input"></el-input>

    文章名
    <el-input v-model="addEssayParms.name" placeholder="文章名" class="input" />

    路由
    <el-input v-model="addEssayParms.router" placeholder="路由" class="input" />

    介绍
    <el-input v-model="addEssayParms.introduction" placeholder="介绍" class="input" />


    <el-button type="primary" size="large" style="width: 100%;" @click="add" class="mt-5">添加</el-button>
  </el-drawer>
  <div class="mx-3 my-3">
    <essayEdit  v-model:editContent="addEssayParms.content"></essayEdit>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useStore } from "vuex"
import { addEssay, uploadImg } from "~/api/manager.js"
import { toast } from "~/composables/util";
import essayEdit from "~/components/admin/essayEdit.vue";

const store = useStore()
const classifyArr = store.state.classifyData
const dialogForAddEssay = ref(false)
const customInput = ref(false)

const addEssayParms = reactive({
  name: "",
  kind: "",
  introduction: "",
  content: ref(""),
  router: "",
})

function customInputPre() {
  customInput.value = true
}

function addEssayPre() {
  dialogForAddEssay.value = true
}

function add() {
  addEssay(addEssayParms).then(res => {
    toast("添加文章成功", "success")
  }).catch(err => {
    toast("添加文章失败", "error")
  })
}

</script>


<style scoped>
  .input {
    @apply my-3;
    height: 35px;
  }

  .bottom {
    @apply bottom-3 fixed;
    z-index: 999;
  }

  .bottom .btn {
    @apply mx-3;
  }

</style>
