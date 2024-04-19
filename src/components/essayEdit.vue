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
        内容
        <el-input placeholder="内容" disabled class="input" />
        <el-button type="primary" size="large" style="width: 100%;" @click="add" class="btn">添加</el-button>
    </el-drawer>

    <!-- 富文本编辑器 -->
    <v-md-editor :include-level="[1, 2]" v-model="edit" height="720px" 
        @upload-image="handleUploadImage"
        :disabled-menus="[]" />
  <!-- <v-md-editor v-model="text" height="400px"></v-md-editor> -->

</template>


<script setup>
import { ref, reactive } from "vue"
import { useStore } from "vuex"
import { addEssay, uploadImg } from "~/api/manager.js"
import { toast } from "~/composables/util";

//富文本插件
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';



VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
});



const store = useStore()
const classifyArr = store.state.classifyData
const dialogForAddEssay = ref(false)
const customInput = ref(false)
const edit = ref("")

const addEssayParms = reactive({
    name: "",
    kind: "",
    introduction: "",
    content: "",
    router: "",
})

async function handleUploadImage(event, insertImage, files) {
    try {
        // 获取上传的图片文件
        const file = files[0]; // 假设只上传了一张图片
        // 创建一个 FormData 对象，并将图片文件添加到其中
        const formData = new FormData();
        formData.append('img', file);
        await uploadImg(formData)
        const apiBase = import.meta.env.VITE_APP_BASE_API;

        edit.value += `![Description](${apiBase}/img/${file.name})`
    
    }
    catch (error) {
        toast("上传图片失败", "error")
    }
}


function customInputPre() {
    customInput.value = true
}

function addEssayPre() {
    dialogForAddEssay.value = true
}

function add() {
    addEssayParms.content = edit.value
    addEssay(addEssayParms)
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
