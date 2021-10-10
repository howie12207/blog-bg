<script setup>
import { ref, computed } from 'vue';
import Mask from '@c/mask/Mask.vue';
import BaseEditor from '@c/baseEditor/BaseEditor.vue';
import BaseInput from '@c/baseInput/BaseInput.vue';
import BaseButton from '@c/baseButton/BaseButton.vue';
import { ElMessage } from 'element-plus';
import { CreateWorks, UpdateWorks } from '@/api/works';
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    detailData: {
        type: Object,
        default: () => ({})
    },
    newOrder: {
        type: Number,
        default: 1
    }
});
const emit = defineEmits(['close', 'fetchWorks']);

const title = ref({
    inputValue: props.detailData.name || '',
    isValid: props.type === 'edit',
    label: '標題',
    id: 'title',
    rules: {
        isRequired: true
    }
});
const img = ref({
    inputValue: props.detailData.img || '',
    isValid: props.type === 'edit',
    label: '圖片path',
    id: 'img',
    rules: {
        isRequired: true
    }
});
const pathCode = ref({
    inputValue: props.detailData.pathCode || '',
    isValid: props.type === 'edit',
    label: 'Code path',
    id: 'pathCode',
    rules: {
        isRequired: true
    }
});
const pathDemo = ref({
    inputValue: props.detailData.pathDemo || '',
    isValid: props.type === 'edit',
    label: 'Demo path',
    id: 'pathDemo',
    rules: {
        isRequired: true
    }
});
const url = ref({
    inputValue: props.detailData.url || '',
    isValid: true,
    label: '文章url',
    id: 'url'
});
const order = ref({
    inputValue: props.detailData.order || props.newOrder,
    isValid: true,
    label: '排序',
    id: 'order',
    type: 'number'
});
const status = ref(props.detailData.status ?? 1);
const recommend = ref(props.detailData.recommend ?? false);
const content = ref(props.detailData.content || '');

const closeEmit = () => {
    emit('close');
};
const submit = async close => {
    if (!verify.value) return;
    const now = Date.now();
    const params = {
        ...props.detailData,
        name: title.value.inputValue,
        img: img.value.inputValue,
        pathCode: pathCode.value.inputValue,
        pathDemo: pathDemo.value.inputValue,
        url: url.value.inputValue,
        order: order.value.inputValue,
        status: status.value,
        recommend: recommend.value,
        content: content.value,
        createTime: props.type === 'edit' ? props.detailData.createTime : now,
        updateTime: now
    };
    const res = props.type === 'edit' ? await UpdateWorks(params) : await CreateWorks(params);
    if (res) {
        close();
        ElMessage({
            type: 'success',
            message: props.type === 'edit' ? '更新作品成功' : '新增作品成功',
            showClose: true
        });
        emit('fetchWorks');
    }
};
const verify = computed(() => {
    return title.value.isValid && img.value.isValid && content.value;
});
</script>

<template>
    <Mask @close="closeEmit" :close-out="false">
        <template #default="{ close }">
            <div class="p-8 bg-white overflow-x-hidden overflow-y-hidden h-full rounded">
                <h1 class="text-2xl text-center font-black mb-4">
                    {{ type === 'create' ? '新增作品' : '編輯作品' }}
                </h1>
                <section class="overflow-y-auto max-h-[80vh]">
                    <BaseInput
                        v-bind="title"
                        v-model:inputValue="title.inputValue"
                        v-model:isValid="title.isValid"
                        class="my-2"
                    />
                    <BaseInput
                        v-bind="img"
                        v-model:inputValue="img.inputValue"
                        v-model:isValid="img.isValid"
                        class="my-2"
                    />
                    <BaseInput
                        v-bind="pathCode"
                        v-model:inputValue="pathCode.inputValue"
                        v-model:isValid="pathCode.isValid"
                        class="my-2"
                    />
                    <BaseInput
                        v-bind="pathDemo"
                        v-model:inputValue="pathDemo.inputValue"
                        v-model:isValid="pathDemo.isValid"
                        class="my-2"
                    />
                    <BaseInput
                        v-bind="url"
                        v-model:inputValue="url.inputValue"
                        v-model:isValid="url.isValid"
                        class="my-2"
                    />
                    <BaseInput
                        v-bind="order"
                        v-model:inputValue="order.inputValue"
                        v-model:isValid="order.isValid"
                        class="my-2"
                    />
                    <div class="flex items-center">
                        <label class="text-lg mr-4">狀態</label>
                        <el-radio v-model="status" :label="0">下架</el-radio>
                        <el-radio v-model="status" :label="1">上架</el-radio>
                        <label class="text-lg mr-4">推薦</label>
                        <el-radio v-model="recommend" :label="false">否</el-radio>
                        <el-radio v-model="recommend" :label="true">是</el-radio>
                    </div>
                    <label class="block mt-4 text-lg">內容</label>
                    <BaseEditor v-model:content="content" />
                </section>
                <div class="flex justify-center mt-4 gap-x-8">
                    <BaseButton @click="submit(close)" :disabled="!verify">確認</BaseButton>
                    <BaseButton mainColor="rgb(107, 114, 128)" @click="close">取消</BaseButton>
                </div>
            </div>
        </template>
    </Mask>
</template>
