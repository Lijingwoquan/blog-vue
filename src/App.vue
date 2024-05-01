<template>
  <router-view></router-view>
</template>

<style>
/* Webkit浏览器样式 */
::-webkit-scrollbar {
  /* 滚动条的宽度 */
  width: 2px;
  /* 设置滚动条高度，以模拟底部滚动条 */
  height: 2px;
}

::-webkit-scrollbar-thumb {
  background-color: #eee9e9;
  /* 滚动条拖动块的颜色 */
}

/* IE浏览器样式 */
::-ms-scrollbar {
  /* 滚动条的宽度 */
  width: 2px;
  /* 设置滚动条高度，以模拟底部滚动条 */
  height: 2px;
}

::-ms-scrollbar-thumb {
  background-color: #eee9e9;
  /* 滚动条拖动块的颜色 */
}
</style>
