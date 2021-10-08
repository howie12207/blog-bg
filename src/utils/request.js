import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getToken, removeToken } from '@/utils/auth';

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        const access = getToken();
        if (access) {
            config.headers['X-Token'] = access;
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.resolve(false);
    }
);

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code === 200) return res?.data;
        if (res.code === 401) {
            removeToken();
        }
        ElMessage({
            type: 'error',
            message: res.message,
            showClose: true
        });
        return Promise.resolve(false);
    },
    error => {
        ElMessage({
            type: 'error',
            message: '系統錯誤，請稍後再試',
            showClose: true
        });
        console.log('err' + error);
        return Promise.resolve(false);
    }
);

export default service;
