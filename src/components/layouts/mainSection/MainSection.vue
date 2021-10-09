<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    }
});
</script>

<template>
    <div class="h-full flex flex-col">
        <div class="py-4 px-8 bg-white shadow-xl">
            <h1 class="font-black text-2xl mb-2">{{ title }}</h1>
            <p class="text-sm text-gray-400">{{ desc }}</p>
        </div>
        <div class="flex-grow m-4 p-4 bg-white rounded shadow-xl">
            <slot></slot>
        </div>
    </div>
</template>
