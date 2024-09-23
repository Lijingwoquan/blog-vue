<template>
  <el-upload
    ref="upload"
    name="img"
    :action="config.serviveUrl + '/manager/uploadImg'"
    :limit="1"
    :show-file-list="false"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :on-change="handelChange"
    list-type="picture-card"
    :headers="{
      Authorization: token,
    }"
  >
    <el-image v-if="img" :src="img" lazy loading="lazy"></el-image>
    <el-icon v-else>
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script setup>
import { ref } from "vue";
import { getToken } from "~/composables/auth";
import { config } from "/config.js";

const upload = ref(null);
const img = defineModel("imgUrl", {
  type: String,
  require: true,
});

const token = `Bearer ${getToken()}`;

const handleExceed = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  upload.value.handleStart(file);
};

const handelChange = (uploadFile, uploadFiles) => {
  img.value = `${config.serviveUrl}img/${uploadFile.name}`;
};

const submitUpload = () => {
  upload.value.submit();
};

defineExpose({
  submitUpload,
});
</script>
