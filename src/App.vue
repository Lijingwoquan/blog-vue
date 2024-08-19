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

/* 默认字体大小 */
* {
  font-size: 16px;
}

/* 大屏幕设备（桌面或大尺寸平板） */
@media (min-width: 1200px) {
  * {
    font-size: 18px; /* 大屏幕字体大小 */
  }
}

/* 中等屏幕设备（中等尺寸平板和小型桌面） */
@media (min-width: 768px) and (max-width: 1199px) {
  * {
    font-size: 16px; /* 中等屏幕字体大小 */
  }
}

/* 小屏幕设备（手机） */
@media (max-width: 767px) {
  * {
    font-size: 14px; /* 小屏幕字体大小 */
  }
}
/* 在 h 标签下的 a 标签字体稍大一些 */
h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a {
  font-size: 1em; /* 或根据需要调整大小 */
}
</style>
