<script setup>
import Layout from '@c/layouts/Layout.vue';
</script>

<template>
    <router-view v-slot="{ Component }">
        <component v-if="$route.meta.blank" :is="Component"></component>
        <Layout v-else>
            <transition name="fade" mode="out-in">
                <component :is="Component"></component>
            </transition>
        </Layout>
    </router-view>
</template>
