<template>
  <div class="flex flex-col mx-3">
    <div class="search">
      <el-button :icon="Search" circle @click="openSearch">
        <el-icon size="25px">
          <Search />
        </el-icon>
      </el-button>
    </div>
    <essayEdit></essayEdit>
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
          <el-input placeholder="文章名" disabled class="updataInput"></el-input>
          <el-input placeholder="分类名" disabled class="updataInput"></el-input>
          <el-input placeholder="文章介绍" disabled class="updataInput"></el-input>
          <el-input placeholder="文章路由" disabled class="updataInput"></el-input>
          <el-button type="primary" size="large" disabled>选择该文章</el-button>
        </li>
      </ul>

      <!-- 暑假列表 -->
      <ul v-if="getData">
        <li v-for="essay in satisfyDate" class="dateList">
          <el-input v-model="essay.name" placeholder="文章名" class="updataInput"></el-input>
          <el-input v-model="essay.kind" placeholder="分类名" class="updataInput"></el-input>
          <el-input v-model="essay.introduction" placeholder="文章介绍" class="updataInput"></el-input>
          <el-input v-model="essay.router" placeholder="文章路由" class="updataInput"></el-input>
          <el-button type="primary" size="large" @click="chooseEssay(essay.id)">选择该文章</el-button>
          <!-- <el-button type="primary" size="large" @click="updateEssayMsg(essay)">修改信息</el-button>
          <el-button type="primary" size="large" @click="deleted(essay.id)">删除文章</el-button>
          <el-button type="primary" size="large" @click="updateEssayContentPre(essay.id)">修改内容</el-button> -->
        </li>
      </ul>
    </el-dialog>
  </template>

  <!-- 展示原有和新内容的窗口 -->
  <!-- <template>
    <el-dialog v-model="dialogForupdateEssayContent" :v-close-on-click-modal="true" :show-close="false" append-to-body
      :draggable="false" width="80%">
      <el-input v-model="essayContentOld" class="my-5" :autosize="{ minRows: 5, maxRows: 15 }" type="textarea"
        placeholder="原文章内容" />
      <el-input v-model="essayContent" class="my-5" :autosize="{ minRows: 5, maxRows: 15 }" type="textarea"
        placeholder="添加文章内容" />
      <el-button type="primary" style="width: 100%;" size="large"
        @click="updateEssayContent(ID, essayContent)">修改内容</el-button>
    </el-dialog>
  </template> -->
</template>
<script setup>
import { ref, onMounted, onBeforeMount, reactive } from "vue"
import { useStore } from 'vuex';
import { toast } from '~/composables/util'
import { ElMessageBox } from 'element-plus'
import essayEdit from '~/components/admin/essayEdit.vue';
import { updateEssayMsg, deleteEssay, updateEssayContent } from "~/api/manager.js"
import { getEssayMsg } from "~/api/user.js"

const store = useStore()
const essayData = store.state.essayData
const dialogVisible = ref(false)

const updateEssayMsgObj = ref({})

function openSearch() {
  dialogVisible.value = true
}
//输入框
const input = ref('')

//搜索数据
let getData = ref(false)
let satisfyDate = ref([])
function searchMsg() {
  satisfyDate.value = []
  essayData.forEach(essay => {
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

const chooseEssay = (id) => {
  getEssayMsg(id).then(res => {
    updateEssayMsgObj.value = res
  })
}


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
    await deleteEssay(id)
    toast("删除文章成功", "success");
    await new Promise(resolve => setTimeout(resolve, 2000));
    location.reload()
  } catch (error) {
    toast("删除文章失败", "warning");
  }
};


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
    @apply mb-5;
    z-index: 999;
  }

  .add {
    @apply flex justify-center items-center;
    height: 30px;
  }

  .searchInput {
    height: 50px;
  }

  .updataInput {
    @apply mx-2;
    height: 40px;
  }

  .dateList {
    @apply flex justify-center items-center my-5;
    width: 100%;
    height: 50px;
  }
</style>