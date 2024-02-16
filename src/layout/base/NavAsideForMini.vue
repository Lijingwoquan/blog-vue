<template>
    <div>
        <div class="nav">
            <el-icon class="icon" @click="openMenu">
                <Expand />
            </el-icon>
            <el-icon class="icon">
                <Top />
            </el-icon>
        </div>

        <el-drawer v-model="dialog" title="菜单" direction="ltr" append-to-body size="200px">
            <nav-aside></nav-aside>
        </el-drawer>
    </div>
</template>

<style scoped>
.nav {
    @apply bg-light-800 right-0 fixed flex justify-between items-center py-3;
    width: 100%;
    height: 30px;
    z-index: 100;
}

.nav .icon {
    @apply mx-3;
    height: 30px;
}
</style>

<script setup>
import { ref, watch } from "vue"
import { useRoute } from 'vue-router';
import NavAside from '~/layout/base/NavAside.vue';

const route = useRoute()
const dialog = ref(false);

function openMenu() {
    dialog.value = true
}
watch(() => route.fullPath, () => {
    dialog.value = false
})
</script>