<template>
  <v-md-editor
    ref="previewRef"
    :include-level="[1, 2, 3, 4, 5, 6]"
    v-model="editContent"
    :height="ifEdit ? props.height : ''"
    @upload-image="handleUploadImage"
    right-toolbar="ifEdit ?  '| toc | tip| todo-list | sync-scroll | preview | fullscreen'"
    :disabled-menus="[]"
    @copy-code-success="handleCopyCodeSuccess"
    :mode="ifEdit ? 'editable' : 'preview'"
    id="editPlus"
  />
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { uploadImg } from "~/api/manager.js";
import { toast } from "~/composables/util";

//富文本插件
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
// vuepressTheme主题
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
// 代码高亮
import Prism from "prismjs";
// 代码行数
// import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
//代码快捷复制
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
//todolist
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";
//mermaid(流程图等)
import createMermaidPlugin from "@kangc/v-md-editor/lib/plugins/mermaid/cdn";
import "@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css";

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
});
VueMarkdownEditor.use(createCopyCodePlugin());
VueMarkdownEditor.use(createTodoListPlugin());
VueMarkdownEditor.use(createMermaidPlugin());

const props = defineProps({
  height: {
    type: String,
    required: false,
    default: "650px",
  },
  mode: {
    type: String,
    required: false,
    default: "read",
  },
});

const editContent = defineModel("editContent", {
  type: String,
  required: true,
});

const previewRef = ref(null);

const ifEdit = computed(() => {
  return props.mode == "edit" ? true : false;
});

const handleCopyCodeSuccess = () => {
  toast("复制成功");
};

async function handleUploadImage(event, insertImage, files) {
  try {
    // 获取上传的图片文件
    const file = files[0]; // 假设只上传了一张图片
    // 创建一个 FormData 对象，并将图片文件添加到其中
    const formData = new FormData();
    formData.append("img", file);

    await uploadImg(formData);

    const apiBase = import.meta.env.VITE_APP_BASE_API;
    previewRef.value.insert(function (selected) {
      const placeholder = `![Description](${apiBase}/img/${file.name})`;
      const content = selected || placeholder;
      return {
        text: `${placeholder}`,
        selected: content,
      };
    });
  } catch (error) {
    toast("上传图片失败", "error");
  }
}

// 修改事件监听
function handleBeforeLeave(e) {
  if (ifEdit.value && editContent.value) {
    e = e || window.event;
    // 兼容 IE8 及更早版本
    var confirmationMessage = "确认离开页面?";
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }
}

const anchorElement = ref([]);
onMounted(() => {
  anchorElement.value =
    previewRef.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");

  window.addEventListener("beforeunload", handleBeforeLeave);
});
onUnmounted(() => {
  window.removeEventListener("beforeunload", handleBeforeLeave);
});

defineExpose({
  anchorElement,
});
</script>
