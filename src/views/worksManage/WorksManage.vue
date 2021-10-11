<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import MainSection from '@c/layouts/mainSection/MainSection.vue';
import BaseButton from '@c/baseButton/BaseButton.vue';
import BaseTable from '@c/baseTable/BaseTable.vue';
import PopupEdit from './PopupEdit.vue';
import PopupConfirm from './PopupConfirm.vue';
import { FetchWorks } from '@/api/works';
const store = useStore();
const route = useRoute();
const router = useRouter();

const isLoading = ref(false);

const auth = computed(() => {
    return store.getters.auth?.article || [];
});

const pageOptions = ref({ page: route.query.page || 0, size: 10 });
const currentPage = ref(Number(route.query.page) + 1 || 1);
const currentChange = page => {
    const query = { page: page - 1, size: 10 };
    router.push({ query });
    fetchWorks(query);
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

const operationBtns = ({ status }) => {
    const btns = [
        { id: 1, icon: 'edit', show: auth.value.includes(4) },
        { id: 2, icon: 'enable', show: auth.value.includes(4) && status === 0 },
        { id: 3, icon: 'disable', show: auth.value.includes(4) && status === 1 },
        { id: 4, icon: 'delete', show: auth.value.includes(8) && status === 0 }
    ];
    return btns.filter(item => item.show);
};

const listTitles = [
    { label: '建立日期', key: 'createTime', type: 'date' },
    { label: '標題', key: 'name' },
    { label: '排序', key: 'order' },
    { label: '狀態', key: 'status', type: 'slot' },
    { label: '操作', key: 'operation', type: 'slot' }
];
const listData = ref([]);
const total = ref(0);
const fetchWorks = async query => {
    isLoading.value = true;
    const res = (await FetchWorks(query)) || {};
    isLoading.value = false;
    listData.value = res.content || [];
    total.value = res.totalElements || 0;
};
onMounted(() => {
    fetchWorks(pageOptions.value);
});

const newOrder = computed(() => {
    return listData.value?.[0]?.order + 1 || 1;
});
const detailData = ref({});
const popupOpen = ref(undefined);
const popup = (target, data) => {
    detailData.value = data || {};
    popupOpen.value = target;
};

const imgSrc = src => {
    const path = `./img/${src}`;
    const modules = import.meta.globEager('./img/*');
    return modules[path].default;
};
</script>

<template>
    <MainSection
        title="作品管理"
        desc="此區域可新增、查看、編輯、刪除、上架、下架作品，若您沒有對應選項按鈕，代表您沒有權限。"
    >
        <div class="text-right mb-4">
            <BaseButton v-if="auth.includes(2)" mainColor="#3B82F6" @click="popup('create')"
                >新增作品</BaseButton
            >
        </div>
        <BaseTable :loading="isLoading" :listTitles="listTitles" :listData="listData">
            <template #status="{ thisData }">
                <span :class="statusFilter(thisData.status).color">{{
                    statusFilter(thisData.status).text
                }}</span>
            </template>
            <template #operation="{ thisData }">
                <div class="flex justify-center gap-x-2">
                    <svg
                        v-for="btn of operationBtns(thisData)"
                        :key="btn.id"
                        class="cursor-pointer"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        @click="popup(btn.icon, thisData)"
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
        <PopupEdit
            v-if="popupOpen === 'create' || popupOpen === 'edit'"
            :type="popupOpen"
            :detailData="detailData"
            :newOrder="newOrder"
            @close="popup"
            @fetchWorks="fetchWorks($route.query)"
        />
        <PopupConfirm
            v-else-if="popupOpen === 'enable' || popupOpen === 'disable' || popupOpen === 'delete'"
            :type="popupOpen"
            :detailData="detailData"
            @close="popup"
            @fetchWorks="fetchWorks($route.query)"
        />
    </MainSection>
</template>
