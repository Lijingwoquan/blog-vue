<template>
    <div :class="navAsideClass" :style="navAsideStyle" class="pl-4 pr-5">
        <div v-for="(item, index) in menu" :key="index" class="mt-2">
            <h2 class="kind"> {{ item.classifyKind }}</h2>
            <section class="section">
                <div class="flex justify-center flex-col"
                    v-if="Array.isArray(item.classifyDetails) && item.classifyDetails.length > 0" :index="item.icon">
                    <span class="anchor" v-for="(item2, index2) in item.classifyDetails" :key="index2"
                        @click="chooseKind(item2)" :class="{ active: activeClassify === '/classify' + item2.router }">
                        {{ item2.checked }}
                        {{ item2.name }}
                    </span>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
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

const chooseKind = (item) => {
    activeClassify.value = "/classify" + item.router
    router.push("/classify" + item.router)
}

watch(() => route.fullPath, () => {
    activeClassify.value = '/classify/' + route.path.split('/')[2]
})

const navAsideStyle = computed(() => {
    if (props.width && props.width > 10) {
        return props.width ? { width: props.width + 'px' } : {}
    }
})

const navAsideClass = computed(() => {
    if (props.width && props.width > 10) {
        return props.width ? "nav-aside" : ""
    }
})

const props = defineProps({
    width: {
        type: Number,
        required: true,
    }
})
</script>


<style scoped>
.nav-aside {
    @apply overflow-x-hidden overflow-y-auto  fixed;
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