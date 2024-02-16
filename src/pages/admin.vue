<template>
    <el-container>
        <el-header>
            <classify></classify>
        </el-header>
        <el-row>
            <el-col :span="6">
                <el-aside>
                    <kind></kind>
                </el-aside>
            </el-col>

            <el-col :span="18">
                <el-main>
                    <essay></essay>
                </el-main>
            </el-col>
        </el-row>
    </el-container>
</template>

<script setup>
import classify from "~/layout/admin/classify.vue"
import kind from "~/layout/admin/kind.vue"
import essay from "../layout/admin/essay.vue";
</script>

<style scoped>
.el-header {
    --el-header-height: auto;
}

.el-aside {}
</style>
