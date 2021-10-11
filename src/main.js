import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { store } from './store';
import './assets/global.css';
import 'element-plus/dist/index.css';
import { getToken } from '@/utils/auth';
import { FetchUserData } from '@/api/user';

createApp(App).use(router).use(store).mount('#app');

if (getToken()) {
    const res = (await FetchUserData()) || {};
    store.commit('SET_USER_DATA', res);
}
