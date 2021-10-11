<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { removeToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();

const logout = () => {
    removeToken();
    router.push('/login');
    ElMessage({
        type: 'success',
        message: '登出成功',
        showClose: true
    });
};

const name = computed(() => {
    return store.state.userData.name;
});

const imgSrc = src => {
    const path = `./img/${src}`;
    const modules = import.meta.globEager('./img/*');
    return modules[path].default;
};
</script>

<template>
    <div class="h-14">
        <header
            class="fixed top-0 left-0 right-0 h-14 flex items-center px-4 shadow-xl bg-indigo-100"
        >
            <router-link to="/">
                <img class="w-8" :src="imgSrc('logo.png')" alt="logo" />
            </router-link>
            <span class="ml-auto mr-4">{{ name }}</span>
            <svg
                class="cursor-pointer transition-all hover:text-blue-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                @click="logout"
            >
                <use :xlink:href="imgSrc('logout.svg') + `#logout`"></use>
            </svg>
        </header>
    </div>
</template>
>
