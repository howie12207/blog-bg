<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const navList = computed(() => {
    return store.getters.menu;
});

const imgSrc = src => {
    const path = `./img/${src}`;
    const modules = import.meta.globEager('./img/*');
    return modules[path].default;
};
</script>

<template>
    <div class="w-52">
        <aside class="fixed left-0 top-14 bottom-0 w-52 overflow-y-auto shadow-xl">
            <nav>
                <ul>
                    <li
                        :class="[
                            'relative transition-all',
                            $route.path === item.url &&
                                'text-blue-500 bg-blue-50 before:absolute before:top-0 before:bottom-0 before:left:0 before:w-1 before:bg-blue-600'
                        ]"
                        v-for="item of navList"
                        :key="item.id"
                    >
                        <router-link class="flex items-center px-6 py-3 font-black" :to="item.url">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <use
                                    :xlink:href="imgSrc(`${item.icon}.svg`) + `#${item.icon}`"
                                ></use>
                            </svg>
                            <span class="ml-4">{{ item.label }}</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </aside>
    </div>
</template>

<style>
.icon path {
    fill: '#409eff';
}
</style>
