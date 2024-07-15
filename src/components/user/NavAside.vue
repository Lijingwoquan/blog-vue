<template>
    <div :class="navAsideClass" :style="navAsideStyle" class="pl-4 pr-3">
        <div v-for="(item, index) in menu" :key="index" class="mt-2">
            <h2 class="kind"> {{ item.classifyKind }}</h2>
            <section class="section">
                <div class="flex justify-center flex-col"
                    v-if="Array.isArray(item.classifyDetails) && item.classifyDetails.length > 0">
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
const route = useRoute()
const store = useStore()

//保证刷新也能选中
const activeClassify = ref(route.path)
const menu = store.state.indexData

// 保证切换文章时也能选中
if (route.path.split("/").length > 3) {
    activeClassify.value = '/classify/' + route.path.split('/')[2]
}

const chooseKind = (item) => {
    activeClassify.value = "/classify" + item.router
    router.push(activeClassify.value)
}

watch(() => route.path, () => {
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
        @apply overflow-x-hidden overflow-y-scroll fixed;
        top: 60px;
        bottom: 0px;
    }

    .kind {
        @apply text-2xl mb-2;
        color: rgb(16, 159, 241);
        font-weight: 600;
    }

    .section {
        @apply mb-5 ml-4;
    }

    .anchor {
        @apply leading-loose hover:(cursor-pointer underline text-shadow-sm);
        color: rgb(58, 132, 139);
        font-size: 130%;
    }

    .active {
        @apply underline text-stroke-sm text-shadow-sm;
        color: rgb(38, 5, 255);
        font-size: 130%;
    }
</style>