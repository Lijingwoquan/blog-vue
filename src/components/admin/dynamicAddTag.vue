<template>
    <div class="flex  items-center gap-2 mt-2 flex-wrap">
        <el-tag v-for="(tag, index) in tags" size="large" class="mx-1" :class="{ 'p-0': showEdit[index] }" :key="index"
            closable :disable-transitions="false" @close="handleClose(tag)" @click="handleEdit(index)">
            <el-input v-if="showEdit[index]" v-model="tags[index]" style="width: auto;"
                @keyup.enter="handleEditConfirm(tag, index)" @blur="handleEditConfirm(tag,index)">
            </el-input>
            <span v-else>
                {{ tag }}
            </span>
        </el-tag>

        <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="w-20" size="small"
            @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
        <el-button v-else class="button-new-tag" @click="showInput">
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
const showEdit = ref(Array(tags.value.length))

const handleClose = (tag) => {
    tags.value.splice(tags.value.indexOf(tag), 1)
}

const handleEdit = (index) => {
    showEdit.value[index] = true
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value.input.focus()
    })
}

const handleInputConfirm = () => {
    let tag = inputValue.value.split(" ").join("").toLowerCase()
    if (tag) {
        tags.value.push(tag)
    }
    inputVisible.value = false
    inputValue.value = ''
    showEdit.value.push(false)
}


const handleEditConfirm = (oldTag, index) => {
    let tag = oldTag.split(" ").join("").toLowerCase()
    tags.value[index] = tag
    showEdit.value[index] = false
}
</script>