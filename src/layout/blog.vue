<template>
    <div class="background-color"></div>
    <el-backtop class="hidden-sm-and-down" :right="40" :bottom="30" :visibility-height="300" />
    <el-backtop class="hidden-sm-and-up" :right="40" :bottom="30" :visibility-height="300" />
    <el-container>
        <el-header>
            <NavHeader @openSearch="handleOpenSearch" @closeSearch="handleCloseSearch"></NavHeader>
        </el-header>

        <el-row>
            <el-col ref="navAsideColRef" v-resize="handleResize" :xs="0" :sm="3" :md="3" :lg="3" :xl="3">
                <NavAside class="hidden-xs-only" :width="navWidthRef"></NavAside>
            </el-col>
            <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="1">
            </el-col>
            <!-- essay布局 -->
            <el-col v-if="ifToEssay === true" :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
                <el-main>
                    <!-- <router-view ref="essayComponent" v-slot="{ Component }">
                        <component :is="Component" />
                    </router-view> -->
                    <Essay ref="essayComponent"></Essay>
                </el-main>
            </el-col>

            <!-- classify布局 -->
            <!-- 由于生命周期的问题 这里应该这么写 不能用essay -->
            <el-col v-if="route.path.split('/')[1] != 'essay'" :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                <el-main>
                    <router-view v-slot="{ Component }" ref="essay">
                        <keep-alive :max="10">
                            <component :is="Component">
                            </component>
                        </keep-alive>
                    </router-view>
                </el-main>
            </el-col>
        </el-row>
    </el-container>

    <div style="width: 100%;">
        <footer class="register">
            <a class="text-sm" target="_blank" href="https://github.com/Lijingwoquan">© 2024 罹景偓佺的博客 By 罹景.本站博客未经授权禁止转载.
            </a>
            <a class="text-sm" target="_blank"
                href="https://beian.miit.gov.cn/#/Integrated/index">备案信息:湘ICP备2024043210号.</a>
        </footer>
    </div>
</template>

<script setup>
import NavHeader from '~/layout/components/NavHeader.vue';
import NavAside from '~/layout/components/NavAside.vue';
import Essay from '~/components/essay.vue';

import { ref, onMounted, watch } from "vue"
import { useRoute } from 'vue-router';

const ifToEssay = ref(false)
const route = useRoute()
const navAsideColRef = ref(null)
const navWidthRef = ref(0)

const essayComponent = ref(null)

const handleResize = () => {
    navWidthRef.value = navAsideColRef.value.$el.clientWidth
}

const handleOpenSearch = () => {
    essayComponent.value.hideAnchor()
}

const handleCloseSearch = () => {
    essayComponent.value.showAnchor()
}

onMounted(() => {
    if (route.fullPath.split("/")[1] === "essay") {
        ifToEssay.value = true
    }
    handleResize()
})

watch(
    () => (route.path),
    () => {
        ifToEssay.value = false
        if (route.path.split("/")[1] === "essay") {
            ifToEssay.value = true
        }
        navWidthRef.value = navAsideColRef.value.$el.clientWidth
    })
</script>

<style scoped>
    .el-header {
        --el-header-height: 60px;
    }

    .el-main {
        padding: 0;
    }

    .el-aside {
        width: 110px;
        top: 60px;
    }

    .register {
        @apply flex flex-col justify-center items-center italic mt-10 mb-5;
    }

    .background-color {
        position: fixed;
        top: 60px;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to right bottom, rgba(180, 174, 206, 0.1), rgba(137, 155, 231, 0.15));
        z-index: 10;
    }
</style>