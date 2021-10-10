<script setup>
import PopupCommon from '@c/mask/PopupCommon.vue';
import { ElMessage } from 'element-plus';
import { UpdateAdmin, DeleteAdmin } from '@/api/user';
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
const emit = defineEmits(['close', 'fetchAdmins']);

const content = {
    enable: {
        title: '啟用管理員'
    },
    disable: {
        title: '禁用管理員'
    },
    delete: {
        title: '刪除管理員'
    }
};

const closeEmit = () => {
    emit('close');
};
const submit = async close => {
    const type = props.type;
    const method = {
        delete: {
            api: DeleteAdmin,
            params: props.detailData._id,
            msg: '刪除成功'
        },
        enable: {
            api: UpdateAdmin,
            params: { ...props.detailData, status: 1 },
            msg: '啟用成功'
        },
        disable: {
            api: UpdateAdmin,
            params: { ...props.detailData, status: 0 },
            msg: '禁用成功'
        }
    };
    const res = await method[type]?.api(method[type]?.params);
    if (res) {
        emit('fetchAdmins');
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
