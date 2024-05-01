<template>
    <div class="nav-aside">
        <div v-for="(item, index) in menu" :key="index" class="mt-2">
            <h2 class="kind"> {{ item.classifyKind }}</h2>
            <section class="section">
                <div v-if="Array.isArray(item.classifyDetails) && item.classifyDetails.length > 0" :index="item.icon">
                    <p class="anchor" v-for="(item2, index2) in item.classifyDetails" :key="index2"
                        @click="chooseKind(item2)" :class="{ active: activeClassify === '/classify' + item2.router }">
                        {{ item2.checked }}
                        {{ item2.name }}
                    </p>
                </div>
            </section>
        </div>
    </div>
</template>


<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';


const router = useRouter()
const store = useStore()
const route = useRoute()
//保证刷新也能选中
const activeClassify = ref(route.path)
const menu = store.state.indexData



// 保证切换文章时也能选中
if (route.path.split("/").length > 3) {
    activeClassify.value = '/classify/' + route.path.split('/')[2]
}


watch(() => route.fullPath, () => {
    activeClassify.value = '/classify/' + route.path.split('/')[2]
})


const chooseKind = (item) => {
    activeClassify.value = "/classify" + item.router
    router.push("/classify" + item.router)
}

</script>


<style scoped>
.nav-aside {
    @apply overflow-x-hidden overflow-y-auto pl-5 pr-6 fixed;
    width: auto;
    top: 60px;
    bottom: 0px;
}

.kind {
    @apply text-lg text-red-400 mb-2;
    font-weight: 600;
}

.section {
    @apply mb-5 ml-4;
}

.anchor {
    @apply text-gray-400 leading-loose hover:(cursor-pointer underline text-stroke-sm text-shadow-sm);
}

.active {
    @apply text-yellow-400 underline text-stroke-sm text-shadow-sm;
}
</style>