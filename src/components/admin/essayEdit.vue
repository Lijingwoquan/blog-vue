<template>
    <!-- 富文本编辑器 -->
    <v-md-editor class="ml-2" :include-level="[1, 2, 3, 4, 5, 6]" v-model="editContent" height="720px"
        @upload-image="handleUploadImage" right-toolbar="| toc | tip| todo-list | sync-scroll | preview | fullscreen "
        :disabled-menus="[]" @copy-code-success="handleCopyCodeSuccess" />
</template>

<script setup>
import { uploadImg } from "~/api/manager.js"
import { toast } from "~/composables/util";

//富文本插件
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// vuepressTheme主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 代码高亮
import Prism from 'prismjs';
// 代码行数
// import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
//代码快捷复制
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
//todolist
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
//mermaid(流程图等)
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
    extend(md) {
        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
        // md.set(option).use(plugin);
    },
})
VueMarkdownEditor.use(createCopyCodePlugin());
VueMarkdownEditor.use(createTodoListPlugin());
VueMarkdownEditor.use(createMermaidPlugin());


const editContent = defineModel("editContent", {
    type: String,
    required: true
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

        editContent.value += `![Description](${apiBase}/img/${file.name})`

    }
    catch (error) {
        toast("上传图片失败", "error")
    }
}

// window.onbeforeunload = function (e) {
//     e = e || window.event;

//     // 兼容 IE8 及更早版本
//     var confirmationMessage = '你真的要离开这个页面吗?';

//     // 在 IE8 及更早版本中 e.returnValue 设置显示文本内容
//     // 在较新的浏览器中 (e.returnValue) 属性不起作用,
//     // 必须使用 e.preventDefault() 和设置 e.returnValue 来防止浏览器的默认行为
//     e.returnValue = confirmationMessage; r
//     return confirmationMessage;
// }

//复制代码成功
const handleCopyCodeSuccess = () => {
    toast("复制成功", "success");
}
</script>