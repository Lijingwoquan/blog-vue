<template>
    <div v-for="anchor in titles" :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
        @click="handleAnchorClick(anchor)">
        <a style="cursor: pointer">{{ anchor.title }}</a>
    </div>
</template>