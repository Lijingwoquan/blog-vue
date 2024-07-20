<template>
  <el-row :gutter="20" class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>欢迎开始学习</div>
      <span>请先注册登录</span>
    </el-col>

    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username">
            <template #prefix>
              <el-icon class="el-input__icon">
                <user />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" show-password v-model="form.password">
            <template #prefix>
              <el-icon class="el-input__icon">
                <lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            round
            type="primary"
            class="w-[250px]"
            :loading="loading"
            @click="onSubmit"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { toast } from "~/composables/util";
import { config } from "/config.js";
import { login } from "~/api/manager.js";
import { setToken } from "~/composables/auth.js";

const router = useRouter();

const form = reactive({
  username: "",
  password: "",
});
const rules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const formRef = ref(null);
const loading = ref(false);

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    loading.value = true;

    login(form)
      .then((res) => {
        setToken(res.token);
        toast("登陆成功");
        router.push(`${config.MANAGER_URL}`);
      })
      .catch((err) => {
        toast("登陆失败", "error");
      })
      .finally(() => {
        loading.value = false;
      });
  });
};

//监听回车事件
function onKeyUp(e) {
  if (e.key == "Enter") onSubmit();
}

//添加键盘的监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});
//移除键盘的监听
onBeforeMount(() => {
  document.removeEventListener("keyup", onKeyUp);
});
</script>

<style scoped>
.login-container {
  @apply min-h-screen;
}

.login-container .left {
  @apply flex flex-col justify-center items-center bg-blue-500;
}

.left > div:first-child {
  @apply font-bold text-4xl text-light-50 mb-4;
}

.left > span {
  @apply font-bold text-2xl text-red-200 mt-4;
}

.login-container .right {
  @apply flex flex-col justify-center items-center bg-green-100;
}

.right > div {
  @apply flex justify-center items-center my-5;
}

.right .title {
  @apply font-bold text-3xl text-gray-800;
}

.right .line {
  @apply h-[1px] w-16 bg-red-500 mx-1;
}
</style>
