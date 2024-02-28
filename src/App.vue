<template >
  <router-view></router-view>
  <footer class="register">
    <a class="text-sm" target="_blank" href="https://github.com/liuzihao520">© 2024 罹景偓佺的博客 By 罹景.本站博客未经授权禁止转载. </a>
    <a class="text-sm" target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">备案信息:湘ICP备2024043210号.</a>
  </footer>
</template>

<style>
.register {
  @apply flex flex-col justify-center items-center italic mt-10 mb-5;
}

/* Webkit浏览器样式 */
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  /* 设置滚动条高度，以模拟底部滚动条 */
}

::-webkit-scrollbar-thumb {
  background-color: #888888;
  /* 滚动条拖动块的颜色 */
}

/* IE浏览器样式 */
::-ms-scrollbar {
  width: 2px;
  height: 2px;
  /* 设置滚动条高度，以模拟底部滚动条 */

}

::-ms-scrollbar-thumb {
  background-color: #888888;
  /* 滚动条拖动块的颜色 */
}
</style>
