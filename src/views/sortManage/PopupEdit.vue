<script setup>
import { ref, computed } from 'vue';
import Mask from '@c/mask/Mask.vue';
import BaseInput from '@c/baseInput/BaseInput.vue';
import BaseButton from '@c/baseButton/BaseButton.vue';
import { ElMessage } from 'element-plus';
import { CreateSort, UpdateSort } from '@/api/sort';
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    detailData: {
        type: Object,
        default: () => ({})
    }
});
const emit = defineEmits(['close', 'fetchSorts']);

const title = ref({
    inputValue: props.detailData.name || '',
    isValid: props.type === 'edit',
    label: '標題',
    id: 'title',
    rules: {
        isRequired: true
    }
});
const color = ref(props.detailData.color || '');

const closeEmit = () => {
    emit('close');
};
const submit = async close => {
    if (!verify.value) return;
    const now = Date.now();
    const params = {
        ...props.detailData,
        name: title.value.inputValue,
        color: color.value,
        createTime: props.type === 'edit' ? props.detailData.createTime : now
    };
    const res = props.type === 'edit' ? await UpdateSort(params) : await CreateSort(params);
    if (res) {
        close();
        ElMessage({
            type: 'success',
            message: props.type === 'edit' ? '更新文章成功' : '新增文章成功',
            showClose: true
        });
        emit('fetchSorts');
    }
};
const verify = computed(() => {
    return title.value.isValid && color.value;
});
</script>

<template>
    <Mask @close="closeEmit" :close-out="false">
        <template #default="{ close }">
            <div class="p-8 bg-white overflow-x-hidden overflow-y-hidden h-full rounded">
                <h1 class="text-2xl text-center font-black mb-4">
                    {{ type === 'create' ? '新增分類' : '編輯分類' }}
                </h1>
                <section class="overflow-y-auto max-h-[80vh]">
                    <BaseInput
                        v-bind="title"
                        v-model:inputValue="title.inputValue"
                        v-model:isValid="title.isValid"
                        class="my-2"
                    />
                    <div class="flex items-center">
                        <label class="mr-4">顏色</label>
                        <el-color-picker v-model="color" />
                    </div>
                </section>
                <div class="flex justify-center mt-4 gap-x-8">
                    <BaseButton @click="submit(close)" :disabled="!verify">確認</BaseButton>
                    <BaseButton mainColor="rgb(107, 114, 128)" @click="close">取消</BaseButton>
                </div>
            </div>
        </template>
    </Mask>
</template>
