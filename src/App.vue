<template>
  <router-view></router-view>
</template>
<style>
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
