<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainSection from '@c/layouts/mainSection/MainSection.vue';
import BaseButton from '@c/baseButton/BaseButton.vue';
import BaseTable from '@c/baseTable/BaseTable.vue';
import PopupEdit from './PopupEdit.vue';
import PopupConfirm from './PopupConfirm.vue';
import { FetchSorts } from '@/api/sort';
import { Loading } from '../../components/baseTable/BaseTable.stories';
const route = useRoute();
const router = useRouter();

const isLoading = ref(false);

const operationBtns = () => {
    const btns = [
        { id: 1, icon: 'edit', show: true },
        { id: 4, icon: 'delete', show: true }
    ];
    return btns.filter(item => item.show);
};

const listTitles = [
    { label: '建立日期', key: 'createTime', type: 'date' },
    { label: '標題', key: 'name' },
    { label: '顏色', key: 'color', type: 'slot' },
    { label: '操作', key: 'operation', type: 'slot' }
];
const listData = ref([]);
const fetchSorts = async () => {
    isLoading.value = true;
    listData.value = (await FetchSorts()) || [];
    isLoading.value = false;
};
onMounted(() => {
    fetchSorts();
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
        title="分類管理"
        desc="此區域可新增、查看、編輯、刪除分類，若您沒有對應選項按鈕，代表您沒有權限。"
    >
        <div class="text-right mb-4">
            <BaseButton mainColor="#3B82F6" @click="popup('create')">新增分類</BaseButton>
        </div>
        <BaseTable :loading="isLoading" :listTitles="listTitles" :listData="listData">
            <template #color="{ thisData }">
                <span :style="{ color: thisData.color }">{{ thisData.color }}</span>
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
        <PopupEdit
            v-if="popupOpen === 'create' || popupOpen === 'edit'"
            :type="popupOpen"
            :detailData="detailData"
            @close="popup"
            @fetchSorts="fetchSorts"
        />
        <PopupConfirm
            v-else-if="popupOpen === 'delete'"
            :type="popupOpen"
            :detailData="detailData"
            @close="popup"
            @fetchSorts="fetchSorts"
        />
    </MainSection>
</template>
