<template>
    <div class="mt-2 flex gap-2">
        <el-tag v-for="tag in tags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
            {{ tag }}
        </el-tag>
        <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="w-20" size="small"
            @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
        <el-button v-else class="button-new-tag" size="large" @click="showInput">
            + 关键字
        </el-button>
    </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'

const tags = defineModel("tags", {
    type: Array,
    required: true,
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