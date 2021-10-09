<script setup>
import Header from './header/Header.vue';
import Sidebar from './sidebar/Sidebar.vue';
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <Header />
        <section class="flex-grow flex">
            <Sidebar class="flex-shrink-0" />
            <main class="flex-grow overflow-auto bg-gray-200">
                <slot></slot>
            </main>
        </section>
    </div>
</template>
