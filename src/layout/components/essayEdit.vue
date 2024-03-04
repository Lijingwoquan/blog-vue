<template>
    <!-- 底部 -->
    <div class="bottom-3 fixed">
        <el-button type="primary" size="large" @click="addEssayPre" class="mx-5">添加文章</el-button>
        <el-button type="primary" size="large" @click="fixContentPre" class="mx-5">修改内容</el-button>
    </div>
    <el-drawer v-model="dialogForFixContent" title="修改文章内容" direction="ttb" append-to-body size="700px">
        <el-input v-model="EssayContent" :autosize="{ minRows: 5, maxRows: 30 }" type="textarea" placeholder="编辑" />
        <el-button type="primary" size="large" @click="fixContent" class="my-3" style="width: 100%;">修改内容</el-button>
    </el-drawer>
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
    <v-md-editor v-model="edit" height="850px" @upload-image="handleUploadImage" :disabled-menus="[]"
       />
</template>


<script setup>
import { ref, reactive } from "vue"
import { useStore } from "vuex"
import { addEssay, uploadImg } from "~/api/manager.js"
import { toast } from "~/composables/util";
import VueMarkdownEditor from '@kangc/v-md-editor';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// 引入所有语言包
import hljs from 'highlight.js';


VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs,
});
VueMarkdownEditor.use(createLineNumbertPlugin());


const store = useStore()
const classifyArr = store.state.classifyData
const dialogForAddEssay = ref(false)
const dialogForFixContent = ref(false)
const customInput = ref(false)
const edit = ref("")
const EssayContent = ref("")

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
        edit.value += "![Description](http://liuzihao.online:8080/img/" + file.name + ")"
    }
    catch (error) {
        toast("上传图片失败", "error")
    }
}


function customInputPre() {
    customInput.value = true
}

function fixContentPre() {
    dialogForFixContent.value = true
    EssayContent.value = edit.value
}
function fixContent() {
    edit.value = EssayContent.value
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
}
</style>
