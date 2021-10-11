<script setup>
import { ref, computed } from 'vue';
import Mask from '@c/mask/Mask.vue';
import BaseInput from '@c/baseInput/BaseInput.vue';
import BaseButton from '@c/baseButton/BaseButton.vue';
import { ElMessage } from 'element-plus';
import { CreateAdmin, UpdateAdmin } from '@/api/user';
import { arraySum, authToArray } from '@/utils/auth';
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
const emit = defineEmits(['close', 'fetchAdmins']);

const account = ref({
    inputValue: props.detailData.account || '',
    isValid: props.type === 'edit',
    label: '帳號',
    id: 'account',
    rules: {
        limit: 'enAndNumber',
        min: 6,
        max: 16
    },
    disabled: props.type === 'edit'
});
const password = ref({
    inputValue: '',
    isValid: props.type === 'edit',
    label: '密碼',
    id: 'password',
    rules: {
        limit: 'enAndNumber',
        min: 6,
        max: 16
    },
    type: 'password'
});
const confirmPassword = ref({
    inputValue: '',
    isValid: props.type === 'edit',
    label: '確認密碼',
    id: 'confirmPassword',
    rules: {
        limit: 'enAndNumber',
        min: 6,
        max: 16
    },
    type: 'password',
    errMsg: ''
});
const name = ref({
    inputValue: props.detailData.name || '',
    isValid: props.type === 'edit',
    label: '用戶名稱',
    id: 'name',
    rules: {
        isRequired: true
    }
});
const email = ref({
    inputValue: props.detailData.email || '',
    isValid: props.type === 'edit',
    label: '信箱',
    id: 'email',
    rules: {
        isRequired: true,
        limit: 'email'
    }
});
const status = ref(props.detailData.status ?? 1);

const commonList = [
    { label: '查看', value: 1 },
    { label: '創建', value: 2 },
    { label: '編輯', value: 4 },
    { label: '刪除', value: 8 }
];
const menuList = ref([
    {
        name: '文章管理權限',
        value: authToArray(props.detailData?.auth?.article) || [],
        all: false,
        isIndeterminate: true,
        list: commonList
    },
    {
        name: '留言管理權限',
        value: authToArray(props.detailData?.auth?.comment) || [],
        all: false,
        isIndeterminate: true,
        list: commonList
    },
    {
        name: '分類管理權限',
        value: authToArray(props.detailData?.auth?.sort) || [],
        all: false,
        isIndeterminate: true,
        list: commonList
    },
    {
        name: '作品管理權限',
        value: authToArray(props.detailData?.auth?.works) || [],
        all: false,
        isIndeterminate: true,
        list: commonList
    },
    {
        name: '會員管理權限',
        value: authToArray(props.detailData?.auth?.member) || [],
        all: false,
        isIndeterminate: true,
        list: commonList
    },
    {
        name: '管理員管理權限',
        value: authToArray(props.detailData?.auth?.admin) || [],
        all: false,
        isIndeterminate: true,
        list: commonList
    }
]);
const checkAll = (index, status) => {
    const target = menuList.value[index];
    const list = target.list.map(item => item.value);
    target.value = status ? list : [];
    target.isIndeterminate = false;
};
const checkedChange = (index, status) => {
    const target = menuList.value[index];
    const list = target.list.map(item => item.value);
    const checkedCount = status.length;
    target.all = checkedCount === list.length;
    target.isIndeterminate = checkedCount > 0 && checkedCount < list.length;
};

const confirmPwd = target => {
    if (target === 'first' && confirmPassword.value.inputValue === '') return;
    if (password.value.inputValue !== confirmPassword.value.inputValue) {
        if (target === 'first') confirmPassword.value.isValid = false;
        confirmPassword.value.errMsg = '密碼不同';
    } else {
        if (target === 'first') confirmPassword.value.isValid = true;
        confirmPassword.value.errMsg = '';
    }
};
const passwordChange = (target, value) => {
    if (
        props.type === 'edit' &&
        password.value.inputValue === '' &&
        confirmPassword.value.inputValue === ''
    )
        target.isValid = true;
    else target.isValid = value;
};

const closeEmit = () => {
    emit('close');
};
const submit = async close => {
    if (!verify.value) return;
    const params = {
        ...props.detailData,
        account: account.value.inputValue,
        name: name.value.inputValue,
        email: email.value.inputValue,
        auth: {
            article: arraySum(menuList.value[0].value),
            comment: arraySum(menuList.value[1].value),
            sort: arraySum(menuList.value[2].value),
            works: arraySum(menuList.value[3].value),
            member: arraySum(menuList.value[4].value),
            admin: arraySum(menuList.value[5].value)
        },
        status: status.value
    };
    if (password.value.inputValue) params.password = password.value.inputValue;
    const res = props.type === 'edit' ? await UpdateAdmin(params) : await CreateAdmin(params);
    if (res) {
        close();
        ElMessage({
            type: 'success',
            message: props.type === 'edit' ? '更新管理員成功' : '新增管理員成功',
            showClose: true
        });
        emit('fetchAdmins');
    }
};
const verify = computed(() => {
    return (
        account.value.isValid &&
        password.value.isValid &&
        confirmPassword.value.isValid &&
        name.value.isValid &&
        email.value.isValid &&
        password.value.inputValue === confirmPassword.value.inputValue
    );
});
</script>

<template>
    <Mask @close="closeEmit" :close-out="false">
        <template #default="{ close }">
            <div class="w-96 p-8 bg-white overflow-x-hidden overflow-y-hidden h-full rounded">
                <h1 class="text-2xl text-center font-black mb-4">
                    {{ type === 'create' ? '新增管理員' : '編輯管理員' }}
                </h1>
                <section class="overflow-y-auto max-h-[80vh]">
                    <BaseInput
                        v-bind="account"
                        v-model:inputValue="account.inputValue"
                        v-model:isValid="account.isValid"
                        class="my-2"
                    />
                    <BaseInput
                        v-bind="password"
                        v-model:inputValue="password.inputValue"
                        class="my-2"
                        @update:isValid="passwordChange(password, $event)"
                        @onBlur="confirmPwd('first')"
                        @onKeyup="confirmPwd('first')"
                    />
                    <BaseInput
                        v-bind="confirmPassword"
                        v-model:inputValue="confirmPassword.inputValue"
                        class="my-2"
                        @update:isValid="passwordChange(confirmPassword, $event)"
                        @onBlur="confirmPwd"
                        @onKeyup="confirmPwd"
                    />
                    <BaseInput
                        v-bind="name"
                        v-model:inputValue="name.inputValue"
                        v-model:isValid="name.isValid"
                        class="my-2"
                    />
                    <BaseInput
                        v-bind="email"
                        v-model:inputValue="email.inputValue"
                        v-model:isValid="email.isValid"
                        class="my-2"
                    />
                    <div v-for="(menu, index) of menuList" :key="menu.name">
                        <label class="block">{{ menu.name }}</label>
                        <el-checkbox
                            v-model="menu.all"
                            :indeterminate="menu.isIndeterminate"
                            @change="checkAll(index, $event)"
                            >全選</el-checkbox
                        >
                        <el-checkbox-group
                            v-model="menu.value"
                            @change="checkedChange(index, $event)"
                        >
                            <el-checkbox
                                v-for="auth of menu.list"
                                :label="auth.value"
                                :key="auth.value"
                                >{{ auth.label }}</el-checkbox
                            >
                        </el-checkbox-group>
                    </div>
                    <label class="block mt-4 text-lg">狀態</label>
                    <el-radio v-model="status" :label="0">禁用</el-radio>
                    <el-radio v-model="status" :label="1">啟用</el-radio>
                </section>
                <div class="flex justify-center mt-4 gap-x-8">
                    <BaseButton @click="submit(close)" :disabled="!verify">確認</BaseButton>
                    <BaseButton mainColor="rgb(107, 114, 128)" @click="close">取消</BaseButton>
                </div>
            </div>
        </template>
    </Mask>
</template>
