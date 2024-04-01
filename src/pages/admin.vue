<template>
    <el-container>
        <el-header style="z-index: 1000;">
            <classify></classify>
        </el-header>
        <el-row>
            <el-col :span="1">
                <el-aside style="z-index: 1000;">
                    <kind></kind>
                </el-aside>
            </el-col>
            <el-col :span="23">
                <el-main>
                    <essay></essay>
                </el-main>
            </el-col>
            <el-col :xs="0" :sm="2" :md="3" :lg="3" :xl="3">
            </el-col>
        </el-row>
    </el-container>
</template>

<script setup>
import classify from "~/layout/admin/classify.vue"
import kind from "~/layout/admin/kind.vue"
import essay from "~/layout/admin/essay.vue";
</script>

<style scoped>
/* .el-header {
    --el-header-height: 40px;
    left: 40px;
    z-index: 100;
} */


.el-aside {
    @apply bottom-0 top-0 fixed;
    width: auto;
}
</style>
