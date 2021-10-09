<script setup>
import { ref, computed } from 'vue';
import BaseInput from '@c/baseInput/BaseInput.vue';
import BaseButton from '@c/baseButton/BaseButton.vue';
import { Login } from '@/api/user';
import { ElMessage } from 'element-plus';

const account = ref({
    inputValue: '',
    isValid: false,
    label: '帳號',
    id: 'account',
    rules: {
        limit: 'enAndNumber',
        min: 6,
        max: 16
    }
});
const password = ref({
    inputValue: '',
    isValid: false,
    label: '密碼',
    id: 'password',
    type: 'password',
    rules: {
        limit: 'enAndNumber',
        min: 6,
        max: 16
    }
});

const onKeyup = e => {
    if (e.keyCode === 13) login();
};

const isLoading = ref(false);
const disabledBtn = computed(() => {
    return !account.value.isValid || !password.value.isValid || isLoading.value;
});
const login = async () => {
    if (disabledBtn.value) return;
    isLoading.value = true;
    const params = { account: account.value.inputValue, password: password.value.inputValue };
    const res = await Login(params);
    if (res) {
        ElMessage({
            type: 'success',
            message: '登入成功',
            showClose: true
        });
    }

    isLoading.value = false;
};
</script>

<template>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <form class="p-8 border rounded-lg">
            <h1 class="text-2xl text-gray-900 text-center mb-6">Login</h1>
            <BaseInput
                v-bind="account"
                v-model:inputValue="account.inputValue"
                v-model:isValid="account.isValid"
                focus
                class="mb-2"
                @onKeyup="onKeyup"
            />
            <BaseInput
                v-bind="password"
                v-model:inputValue="password.inputValue"
                v-model:isValid="password.isValid"
                @onKeyup="onKeyup"
            />
            <div class="text-center mt-4">
                <BaseButton
                    mainColor="#2390fa"
                    :disabled="disabledBtn"
                    :loading="isLoading"
                    @click="login"
                    >Sign in</BaseButton
                >
            </div>
        </form>
    </div>
</template>
