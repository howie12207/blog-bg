<script setup>
import { ref, computed } from 'vue';
import Mask from '@c/mask/Mask.vue';
import BaseEditor from '@c/baseEditor/BaseEditor.vue';
import BaseInput from '@c/baseInput/BaseInput.vue';
import BaseButton from '@c/baseButton/BaseButton.vue';
import { ElMessage } from 'element-plus';
import { CreateArticle, UpdateArticle } from '@/api/article';
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    sortList: {
        type: Array,
        default: () => []
    },
    detailData: {
        type: Object,
        default: () => ({})
    }
});
const emit = defineEmits(['close', 'fetchArticles']);

const title = ref({
    inputValue: props.detailData.name || '',
    isValid: props.type === 'edit',
    label: '標題',
    id: 'title',
    rules: {
        isRequired: true
    }
});
const sortSelected = ref(props.detailData.sorts || []);
const status = ref(props.detailData.status ?? 1);
const editor = ref(true);
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
        content: content.value,
        createTime: props.type === 'edit' ? props.detailData.createTime : now,
        updateTime: now,
        sorts: sortSelected.value,
        status: status.value
    };
    const res = props.type === 'edit' ? await UpdateArticle(params) : await CreateArticle(params);
    if (res) {
        close();
        ElMessage({
            type: 'success',
            message: props.type === 'edit' ? '更新文章成功' : '新增文章成功',
            showClose: true
        });
        emit('fetchArticles');
    }
};
const verify = computed(() => {
    return title.value.isValid && sortSelected.value.length > 0 && content.value;
});
</script>

<template>
    <Mask @close="closeEmit" :close-out="false">
        <template #default="{ close }">
            <div class="p-8 bg-white overflow-x-hidden overflow-y-hidden h-full rounded">
                <h1 class="text-2xl text-center font-black mb-4">
                    {{ type === 'create' ? '新增文章' : '編輯文章' }}
                </h1>
                <section class="overflow-y-auto max-h-[80vh]">
                    <BaseInput
                        v-bind="title"
                        v-model:inputValue="title.inputValue"
                        v-model:isValid="title.isValid"
                        class="my-2"
                    />
                    <label class="block text-lg">分類</label>
                    <el-checkbox-group v-model="sortSelected">
                        <el-checkbox v-for="sort of sortList" :key="sort.name" :label="sort.name" />
                    </el-checkbox-group>
                    <label class="block mt-4 text-lg">狀態</label>
                    <el-radio v-model="status" :label="0">下架</el-radio>
                    <el-radio v-model="status" :label="1">上架</el-radio>
                    <label class="block mt-4 text-lg">內容</label>
                    <el-radio v-model="editor" :label="true">編輯器</el-radio>
                    <el-radio v-model="editor" :label="false">HTML</el-radio>
                    <BaseEditor v-if="editor" v-model:content="content" />
                    <el-input
                        v-else
                        :rows="10"
                        type="textarea"
                        v-model="content"
                        placeholder="請輸入內容"
                    ></el-input>
                </section>
                <div class="flex justify-center mt-4 gap-x-8">
                    <BaseButton @click="submit(close)" :disabled="!verify">確認</BaseButton>
                    <BaseButton mainColor="rgb(107, 114, 128)" @click="close">取消</BaseButton>
                </div>
            </div>
        </template>
    </Mask>
</template>
