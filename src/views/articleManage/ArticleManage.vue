<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainSection from '@c/layouts/mainSection/MainSection.vue';
import BaseButton from '@c/baseButton/BaseButton.vue';
import BaseTable from '@c/baseTable/BaseTable.vue';
import { FetchArticles } from '@/api/article';
const route = useRoute();
const router = useRouter();

const isLoading = ref(false);

const pageOptions = ref({ page: route.query.page || 0, size: 10 });
const currentPage = ref(Number(route.query.page) + 1 || 1);
const currentChange = page => {
    const query = { page: page - 1, size: 10 };
    router.push({ query });
    fetchArticles(query);
    window.scrollTo(0, 0);
};

const statusFilter = status => {
    const type = {
        0: {
            text: '待上架',
            color: 'text-gray-400'
        },
        1: {
            text: '上架中',
            color: 'text-green-500'
        },
        default: {
            text: '未知狀態',
            color: 'text-red-300'
        }
    };
    return type[status] || type['default'];
};

const operationBtns = [
    { id: 1, icon: 'edit' },
    { id: 2, icon: 'enable' },
    { id: 3, icon: 'disable' },
    { id: 4, icon: 'delete' }
];

const listTitles = [
    { label: '建立日期', key: 'createTime', type: 'date' },
    { label: '標題', key: 'name' },
    { label: '狀態', key: 'status', type: 'slot' },
    { label: '操作', key: 'operation', type: 'slot' }
];
const listData = ref([]);
const total = ref(0);
const fetchArticles = async query => {
    isLoading.value = true;
    const res = (await FetchArticles(query)) || {};
    isLoading.value = false;
    listData.value = res.content || [];
    total.value = res.totalElements || 0;
};
onMounted(() => {
    fetchArticles(pageOptions.value);
});

const imgSrc = src => {
    const path = `./img/${src}`;
    const modules = import.meta.globEager('./img/*');
    return modules[path].default;
};
</script>

<template>
    <MainSection
        title="文章管理"
        desc="此區域可新增、查看、編輯、刪除、上架、下架文章，若您沒有對應選項按鈕，代表您沒有權限。"
    >
        <div class="text-right mb-4"><BaseButton>新增文章</BaseButton></div>
        <BaseTable :loading="isLoading" :listTitles="listTitles" :listData="listData">
            <template #status="{ thisData }">
                <span :class="statusFilter(thisData.status).color">{{
                    statusFilter(thisData.status).text
                }}</span>
            </template>
            <template #operation="{ thisData }">
                <div class="flex justify-center gap-x-2">
                    <svg
                        v-for="btn of operationBtns"
                        :key="btn.id"
                        class="cursor-pointer"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <use :xlink:href="imgSrc(`${btn.icon}.svg`) + `#${btn.icon}`"></use>
                    </svg></div></template
        ></BaseTable>
        <el-pagination
            v-if="total"
            v-model:currentPage="currentPage"
            class="text-center mt-8 mb-4"
            background
            layout="prev, pager, next"
            :total="total"
            :pager-count="5"
            @currentChange="currentChange"
        >
        </el-pagination>
    </MainSection>
</template>
