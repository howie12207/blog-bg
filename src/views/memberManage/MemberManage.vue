<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainSection from '@c/layouts/mainSection/MainSection.vue';
import BaseButton from '@c/baseButton/BaseButton.vue';
import BaseTable from '@c/baseTable/BaseTable.vue';
import PopupEdit from './PopupEdit.vue';
import PopupConfirm from './PopupConfirm.vue';
import { FetchMembers } from '@/api/user';
const route = useRoute();
const router = useRouter();

const isLoading = ref(false);

const pageOptions = ref({ page: route.query.page || 0, size: 10 });
const currentPage = ref(Number(route.query.page) + 1 || 1);
const currentChange = page => {
    const query = { page: page - 1, size: 10 };
    router.push({ query });
    fetchMembers(query);
    window.scrollTo(0, 0);
};

const statusFilter = status => {
    const type = {
        0: {
            text: '禁用',
            color: 'text-gray-400'
        },
        1: {
            text: '啟用',
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
        { id: 1, icon: 'edit', show: true },
        { id: 2, icon: 'enable', show: status === 0 },
        { id: 3, icon: 'disable', show: status === 1 },
        { id: 4, icon: 'delete', show: status === 0 }
    ];
    return btns.filter(item => item.show);
};

const sortList = ref([]);
const listTitles = [
    { label: '註冊日期', key: 'createTime', type: 'date' },
    { label: '帳號', key: 'account' },
    { label: '用戶名稱', key: 'name' },
    { label: '狀態', key: 'status', type: 'slot' },
    { label: '操作', key: 'operation', type: 'slot' }
];
const listData = ref([]);
const total = ref(0);
const fetchMembers = async query => {
    isLoading.value = true;
    const res = (await FetchMembers(query)) || {};
    isLoading.value = false;
    listData.value = res.content || [];
    total.value = res.totalElements || 0;
};
onMounted(() => {
    fetchMembers(pageOptions.value);
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
        title="會員管理"
        desc="此區域可新增、查看、編輯、刪除、啟用、禁用會員，若您沒有對應選項按鈕，代表您沒有權限。"
    >
        <div class="text-right mb-4">
            <BaseButton mainColor="#3B82F6" @click="popup('create')">新增會員</BaseButton>
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
            :sortList="sortList"
            :detailData="detailData"
            @close="popup"
            @fetchMembers="fetchMembers($route.query)"
        />
        <PopupConfirm
            v-else-if="popupOpen === 'enable' || popupOpen === 'disable' || popupOpen === 'delete'"
            :type="popupOpen"
            :detailData="detailData"
            @close="popup"
            @fetchMembers="fetchMembers($route.query)"
        />
    </MainSection>
</template>
