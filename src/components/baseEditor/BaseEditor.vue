<script setup>
import { computed } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const props = defineProps({
    content: {
        type: String,
        default: ''
    },
    contentType: {
        type: String,
        default: 'html'
    },
    placeholder: {
        type: String,
        default: '請輸入內容'
    }
});
const emit = defineEmits(['textChange', 'update:content']);

const contentComputed = computed({
    get: () => props.content,
    set: value => emit('update:content', value)
});
</script>

<template>
    <QuillEditor
        v-model:content="contentComputed"
        :contentType="contentType"
        :placeholder="placeholder"
        theme="snow"
        toolbar="full"
    />
</template>
