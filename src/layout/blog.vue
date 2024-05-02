<template>
    <el-backtop class="hidden-sm-and-down" :right="40" :bottom="30" :visibility-height="400" />
    <el-container>
        <el-header>
            <nav-header></nav-header>
        </el-header>
        <el-row>
            <el-col ref="navAsideColRef" v-resize="handleResize" :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
                <nav-aside class="hidden-xs-only" :width="navWidthRef"></nav-aside>
            </el-col>

            <el-col v-show="ifToEssay != true" :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                <el-main>
                    <router-view v-slot="{ Component }">
                        <keep-alive :max="10" :exclude="/^essay/">
                            <component :is="Component"></component>
                        </keep-alive>
                    </router-view>
                </el-main>
            </el-col>

            <el-col v-show="ifToEssay === true" :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
                <el-main>
                    <router-view>
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
import { ref, onMounted, watch } from "vue"
import { useRoute } from 'vue-router';

const ifToEssay = ref(false)
const route = useRoute()
const navAsideColRef = ref(null)
const navWidthRef = ref(0)

const handleResize = () => {
    navWidthRef.value = navAsideColRef.value.$el.clientWidth 
}

onMounted(() => {
    if (route.fullPath.split("/")[1] === "essay") {
        ifToEssay.value = true
    }
})

watch(() => route.fullPath, () => {
    if (route.fullPath.split("/")[1] !== "essay") {
        ifToEssay.value = false
    }
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
</style>