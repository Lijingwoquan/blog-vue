<template>
    <div class=" flex  items-center gap-2 mt-2">
        <el-tag v-for="tag in tags" size="large" class="mx-1" :key="tag" closable :disable-transitions="false"
            @close="handleClose(tag)">
            {{ tag }}
        </el-tag>
        <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="w-20" size="small"
            @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
        <el-button v-else class="button-new-tag"  @click="showInput">
            {{ props.addText }}
        </el-button>
    </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'

const tags = defineModel("tags", {
    type: Array,
    required: true,
})
const props = defineProps({
    addText: {
        type: String,
        default: "+ 添加"
    }
})

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()

const handleClose = (tag) => {
    tags.value.splice(tags.value.indexOf(tag), 1)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value.input.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        tags.value.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}
</script>