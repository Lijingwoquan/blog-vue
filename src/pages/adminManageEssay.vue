<template>
  <div class="flex flex-col mx-3 mt-3">
    <div class="search">
      <el-button  circle @click="openSearch">
        <el-icon size="25px">
          <Search />
        </el-icon>
      </el-button>
    </div>
    <essayEdit v-model:editContent="updateEssayMsgObj.content"></essayEdit>
  </div>


  <!-- 修改文章的窗口 -->
  <template>
    <el-dialog v-model="dialogVisible" :v-close-on-click-modal="true" :show-close="false" append-to-body
      :draggable="true" width="80%">
      <el-input v-model="input" placeholder="搜索文档" class="searchInput">
        <template #prefix>
          <el-icon class="mx-2">
            <search />
          </el-icon>
        </template>
        <template #suffix>
          <el-button type="primary" @click="searchMsg">搜索</el-button>
        </template>
      </el-input>

      <!-- 禁用项 -->
      <ul>
        <li class="dateList">
          <el-input placeholder="文章名" disabled class="updateInput"></el-input>
          <el-input placeholder="分类名" disabled class="updateInput"></el-input>
          <el-input placeholder="文章介绍" disabled class="updateInput"></el-input>
          <el-input placeholder="文章路由" disabled class="updateInput"></el-input>
          <el-button style="width: 80%;" type="primary" size="large" disabled>选择文章</el-button>
          <el-button style="width: 80%;" type="primary" size="large" disabled>删除文章</el-button>
        </li>
      </ul>

      <!-- 数据列表 -->
      <ul v-if="getData">
        <li v-for="essay in satisfyDate" class="dateList">
          <el-input v-model="essay.name" disabled placeholder="文章名" class="updateInput"></el-input>
          <el-input v-model="essay.kind" disabled placeholder="分类名" class="updateInput"></el-input>
          <el-input v-model="essay.introduction" disabled placeholder="文章介绍" class="updateInput"></el-input>
          <el-input v-model="essay.router" disabled placeholder="文章路由" class="updateInput"></el-input>
          <el-button style="width: 80%;" type="primary" size="large" @click="chooseEssay(essay)">选择文章</el-button>
          <el-button style="width: 80%;" type="primary" size="large" @click="deleted(essay.id)">删除文章</el-button>
          <!-- <el-button type="primary" size="large" @click="updateEssayMsg(essay)">修改信息</el-button>
          <el-button type="primary" size="large" @click="updateEssayContentPre(essay.id)">修改内容</el-button> -->
        </li>
      </ul>
    </el-dialog>
  </template>


  <!-- 底部 -->
  <div class="bottom">
    <el-button type="primary" size="large" @click="updateEssayPre" class="btn">修改文章</el-button>
  </div>

  <!-- 修改文章的抽屉 -->
  <el-drawer v-model="dialogForUpdateEssay" title="修改文章" direction="ttb" append-to-body size="700px">
    分类
    <el-select v-model="updateEssayMsgObj.kind" class="dialogInput" placeholder="选择分类">
      <el-option v-for="item in classifyArr" :key="item.name" :label="item.name" :value="item.name" />
      <el-option label="自定义" value="" @click="customInputPre" />
    </el-select>
    <el-input v-if="customInput == true" v-model="updateEssayMsgObj.kind" placeholder="输入分类"
      class="dialogInput"></el-input>

    文章名
    <el-input v-model="updateEssayMsgObj.name" placeholder="文章名" class="dialogInput" />

    路由
    <el-input v-model="updateEssayMsgObj.router" placeholder="路由" class="dialogInput" />

    介绍
    <el-input v-model="updateEssayMsgObj.introduction" placeholder="介绍" class="dialogInput" />

    关键词
    <dynamicAddTag v-model:tags="updateEssayMsgObj.keywords" :addText="添加关键字">
    </dynamicAddTag>

    <el-button type="primary" size="large" style="width: 100%;" @click="updateEssay" class="mt-5">修改</el-button>
  </el-drawer>

</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed } from "vue"
import { useStore } from 'vuex';
import { toast } from '~/composables/util'
import { ElMessageBox } from 'element-plus'
import essayEdit from '~/components/admin/essayEdit.vue';
import { updateEssayMsg, deleteEssay } from "~/api/manager.js"
import { getEssayMsg } from "~/api/user.js"
import dynamicAddTag from "~/components/admin/dynamicAddTag.vue";

const store = useStore()
const essayData = computed(() => store.state.essayData)
const classifyArr = store.state.classifyData

const dialogVisible = ref(false)
const dialogForUpdateEssay = ref(false)
const updatePermission = ref(false)
const updateEssayMsgObj = ref({})

//搜索数据
const input = ref('')
function openSearch() {
  dialogVisible.value = true
}
let getData = ref(false)
let satisfyDate = ref([])

// 搜素
function searchMsg() {
  satisfyDate.value = []
  essayData.value.forEach(essay => {
    if (essay.name.includes(input.value)) {
      let name = essay.name
      let kind = essay.kind
      let introduction = essay.introduction
      let router = "/" + essay.router.split("/")[2]
      let id = essay.id
      satisfyDate.value.push({ name, introduction, kind, router, id })
    }
  })
  if (!(satisfyDate.value.length > 0)) {
    toast("没用查找到相关文章", "warning")
  }
  getData.value = true
}

// 选择文章 加载数据
const chooseEssay = (essay) => {
  updatePermission.value = true
  getEssayMsg(essay.id).then(res => {
    updateEssayMsgObj.value = { ...res, router: essay.router };
  })
  dialogVisible.value = false
}

// 删除文章
const deleted = async (id) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除文章?',
      '删除文章',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    deleteEssay(id)
      .then(async res => {
        dialogVisible.value = false
        await store.dispatch("getIndexInfo")
        searchMsg()
        toast("删除文章成功", "success");
      })
      .catch((err) => {
        toast(err, "warning");
      })
  } catch (error) {
    toast("删除文章失败", "warning");
  }
};

// 打开更新文章抽屉
function updateEssayPre() {
  if (updatePermission.value) {
    dialogForUpdateEssay.value = true
    return
  }
  toast("请先选择文章", "warning")
}

// 更新文章
const updateEssay = () => {
  updateEssayMsg(updateEssayMsgObj.value)
    .then(async res => {
      await store.dispatch("getIndexInfo")
      dialogForUpdateEssay.value = false
      toast("修改文章成功", "success")
    }).catch(err => {
      toast("添加文章失败", "error")
    })
}

function onKeyUp(e) {
  if (e.key == "Enter" && dialogVisible.value == true) {
    searchMsg()
  }
}
//添加键盘的监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp)
})
//移除键盘监听
onBeforeMount(() => {
  document.removeEventListener("keyup", onKeyUp)
})
</script>

<style scoped>
  .search {
    @apply mb-2;
    z-index: 999;
  }

  .searchInput {
    height: 50px;
  }

  .updateInput {
    @apply ml-2 mr-5;
    height: 40px;
  }

  .dateList {
    @apply flex justify-center items-center my-6;
    width: 100%;
    height: 60px;
  }

  .dateList .el-input .el-button {
    height: 50px;
  }

  .bottom {
    @apply bottom-3 fixed;
    z-index: 999;
  }

  .bottom .btn {
    @apply mx-3;
  }

  .dialogInput {
    @apply my-3;
    height: 35px;
  }
</style>