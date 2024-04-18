<template>
    <el-backtop :right="30" :bottom="30" />
    <el-container>
        <el-header>
            <nav-header></nav-header>
        </el-header>
        <el-row>
            <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
                <el-aside>
                    <nav-aside class="hidden-xs-only"></nav-aside>
                </el-aside>
            </el-col>
            <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
                <el-main>
                    <router-view v-slot="{ Component }">
                        <keep-alive :max="10" :exclude="/^essay/">
                            <component :is="Component"></component>
                        </keep-alive>
                        

                        <footer class="register">
                            <a class="text-sm" target="_blank" href="https://github.com/Lijingwoquan">© 2024 罹景偓佺的博客 By
                                罹景.本站博客未经授权禁止转载. </a>
                            <a class="text-sm" target="_blank"
                                href="https://beian.miit.gov.cn/#/Integrated/index">备案信息:湘ICP备2024043210号.</a>
                        </footer>
                    </router-view>
                </el-main>
            </el-col>
            <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
            </el-col>
        </el-row>
    </el-container>
</template>

<script setup>
import NavHeader from '~/layout/components/NavHeader.vue';
import NavAside from '~/layout/components/NavAside.vue';
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