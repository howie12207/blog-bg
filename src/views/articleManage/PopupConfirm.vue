<script setup>
import PopupCommon from '@c/mask/PopupCommon.vue';
import { ElMessage } from 'element-plus';
import { UpdateArticle, DeleteArticle } from '@/api/article';
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
const emit = defineEmits(['close', 'fetchArticles']);

const content = {
    enable: {
        title: '上架文章'
    },
    disable: {
        title: '下架文章'
    },
    delete: {
        title: '刪除文章'
    }
};

const closeEmit = () => {
    emit('close');
};
const submit = async close => {
    const type = props.type;
    const method = {
        delete: {
            api: DeleteArticle,
            params: props.detailData._id,
            msg: '刪除成功'
        },
        enable: {
            api: UpdateArticle,
            params: { ...props.detailData, status: 1 },
            msg: '上架成功'
        },
        disable: {
            api: UpdateArticle,
            params: { ...props.detailData, status: 0 },
            msg: '下架成功'
        }
    };
    const res = await method[type]?.api(method[type]?.params);
    if (res) {
        emit('fetchArticles');
        ElMessage({
            type: 'success',
            message: method[type]?.msg,
            showClose: true
        });
    }
    close();
};
</script>

<template>
    <PopupCommon :title="content[type].title" @close="closeEmit" @submit="submit">
        <template #content>
            <h2 class="mb-4">
                確定是否{{ content[type].title }}
                <span class="text-red-400 font-black">{{ props.detailData.name }}</span>
            </h2>
        </template>
    </PopupCommon>
</template>
