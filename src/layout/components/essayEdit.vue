<template>
    <div class="tool">
        <el-button type="primary" size="default" @click="addTitle">添加标题</el-button>
        <el-button type="primary" size="default" @click="addTextSimple">添加文字</el-button>
        <el-button type="primary" size="default" @click="addParagraphPre">添加段落</el-button>
        <el-button type="primary" size="default" @click="addCode">添加代码块</el-button>
        <el-button type="primary" size="default" @click="addPicturePre">添加图片</el-button>
        <el-dialog v-model="dialogAddPicture" title="添加图片" direction="ttb" append-to-body>
            <div>
                <el-input v-model="pictureLink" placeholder="添加图片链接" style="width: 48%;" />
                <el-button type="primary" size="defult" @click="addPicture" class="ml-2 my-5"
                    style="width: 48%;">添加图片</el-button>
            </div>

        </el-dialog>
    </div>
    <el-drawer v-model="dialogParagraph" title="添加段落" direction="ttb" append-to-body size="700px">
        <div>
            <el-button type="primary" size="default" @click="recallParagraph" class="frist">撤回</el-button>
        </div>

        <el-input v-model="paragraphInput" :autosize="{ minRows: 5, maxRows: 24 }" type="textarea" placeholder="添加段落" />
        <div class="second">
            <el-button type="primary" size="default" @click="addText" class="btn">添加文字</el-button>
            <el-button type="primary" size="default" @click="addStress" class="btn">添加强调</el-button>
        </div>

        <div class="thrid">
            <el-input v-model="link" placeholder="添加链接" />
            <el-button type="primary" size="default" class="btn" @click="addLink">添加链接</el-button>
        </div>

        <el-button type="primary" size="large" @click="addParagraph" class="fourth">添加段落</el-button>
        <div v-html="paragraph"></div>
    </el-drawer>

    <el-row>
        <el-col :span="6">
            <div>
                <el-input v-model="input" :autosize="{ minRows: 5, maxRows: 24 }" type="textarea" placeholder="编辑" />
                <div class="aside">
                    <el-button type="primary" size="default" @click="recall" class="btn">撤回</el-button>
                </div>
            </div>

            <div class="bottom-3 fixed">
                <el-button type="primary" size="large" @click="addEssayPre" class="mx-5">添加文章</el-button>
                <el-button type="primary" size="large" @click="fixContentPre" class="mx-5">修改内容</el-button>
            </div>
            <el-drawer v-model="dialogForFixContent" title="修改文章内容" direction="ttb" append-to-body size="700px">
                <el-input v-model="EssayContent" :autosize="{ minRows: 5, maxRows: 30 }" type="textarea" placeholder="编辑" />
                <el-button type="primary" size="large" @click="fixContent" class="my-3"
                    style="width: 100%;">修改内容</el-button>

            </el-drawer>


            <el-drawer v-model="dialogForAddEssay" title="添加文章" direction="ttb" append-to-body size="700px">
                分类
                <el-select v-model="addEssayParms.kind" class="input" placeholder="选择分类">
                    <el-option v-for="item in classifyArr" :key="item.name" :label="item.name" :value="item.name" />
                    <el-option label="自定义" value="" @click="customInputPre" />
                </el-select>
                <el-input v-if="customInput == true" v-model="addEssayParms.kind" placeholder="输入分类"
                    class="input"></el-input>
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


        </el-col>
        <el-col :span="1">
        </el-col>

        <el-col class="content" :span="17">
            <div v-html="edit"></div>
        </el-col>
    </el-row>
</template>


<script setup>
import { ref, reactive } from "vue"
import { useStore } from "vuex"
import { addEssay } from "~/api/manager.js"

const store = useStore()
const classifyArr = store.state.classifyData

const dialogParagraph = ref(false)
const dialogForAddEssay = ref(false)
const dialogForFixContent = ref(false)
const customInput = ref(false)
const dialogAddPicture = ref(false)

const input = ref("")
const paragraphInput = ref("")
const link = ref("")
const edit = ref("")
const paragraph = ref("")
const pictureLink = ref("")

const editArr = ref([])
const EssayContent = ref("")
const paragraphArr = ref([])
const titleSumArry = ref(["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "XI", "XⅡ", "XⅢ", "XⅣ", "XⅤ", "XⅥ", "XⅦ", "XⅧ", "XⅨ", "XⅩ", "XⅩ", "XⅩI", "XⅩⅡ", "XⅩⅢ", "XⅩⅣ", "XⅩⅤ", "XⅩⅥ", "XⅩⅦ", "XⅩⅧ", "XⅩⅨ", "XⅩⅩ"])
const titleSum = ref(0)

const addEssayParms = reactive({
    name: "",
    kind: "",
    introduction: "",
    content: "",
    router: "",
})

function recall() {
    console.log(editArr.value)
    if (editArr.value[editArr.value.length - 1].includes("title")) {
        titleSum.value--
        editArr.value.pop()
    } else {
        editArr.value.pop()
    }
    edit.value = editArr.value.join("")
}
function recallParagraph() {
    paragraphArr.value.pop()
    paragraph.value = paragraphArr.value.join("")
}
function customInputPre() {
    customInput.value = true
}
function addParagraphPre() {
    dialogParagraph.value = true
}
function fixContentPre() {
    dialogForFixContent.value = true
    EssayContent.value = edit.value
}
function fixContent() {
    edit.value = EssayContent.value
    editArr.value = edit.value.split("")
}
function addPicturePre() {
    dialogAddPicture.value = true

}
function addTitle() {
    editArr.value.push("<div title class='font-bold  text-2xl text-red-600  my-2'>" + titleSumArry.value[titleSum.value] + " " + input.value + "</div> ")
    titleSum.value++
    edit.value = editArr.value.join("")
    input.value = ""
}
function addTextSimple() {
    editArr.value.push("<span class='mx-3'>" + input.value + "</span>")
    edit.value = editArr.value.join("")
    input.value = ""
}
function addText() {
    paragraphArr.value.push("<span>" + paragraphInput.value + "</span>")
    paragraph.value = paragraphArr.value.join("")
    paragraphInput.value = ""
}
function addStress() {
    paragraphArr.value.push("<span class='font-bold text-red-600'>" + paragraphInput.value + "</span>")
    paragraph.value = paragraphArr.value.join("")
    paragraphInput.value = ""
}
function addLink() {
    paragraphArr.value.push("<a href='" + link.value + "'target='_blank' class='underline'>" + paragraphInput.value + "</a>")
    paragraph.value = paragraphArr.value.join("")
    paragraphInput.value = ""
}
function addParagraph() {
    editArr.value.push("<div  class='ml-3 mt-2'>" + paragraph.value + "</div>")
    edit.value = editArr.value.join("")
    paragraph.value = ""
}

function addCode() {
    input.value = input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    editArr.value.push("<div class='my-3 px-3'><div class='bg-blue-50 text-green-500 py-3 px-3 '>代码示例</div> <pre class='bg-black  text-white  overflow-y-auto overflow-x-auto px-3 text-sm'>" + input.value + "</pre></div>")
    edit.value = editArr.value.join("")
    input.value = ""
}

function addPicture() {
    editArr.value.push("<div class='mx-auto'><img  src=' " + pictureLink.value + "'/> </div>")
    edit.value = editArr.value.join("")
    input.value = ""
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

.tool {
    @apply flex justify-center items-center;
}

.content {
    @apply my-3 overflow-y-auto;
    height: 630px;
}

.frist {
    @apply mb-5;
    width: 100%;
}

.second {
    @apply flex justify-center items-center;
}

.second .btn {
    @apply mt-5;
    width: 100%;
}

.thrid {
    @apply flex justify-center items-center mt-4;
}

.thrid .btn {
    @apply ml-4;
    width: 100%;
}

.fourth {
    @apply mt-5;
    width: 100%;
}

.aside {
    @apply flex justify-center;
    width: 100%;
}

.aside .btn {
    @apply mt-5;
    width: 100%;
}
</style>
