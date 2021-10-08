import request from '@/utils/request';
import { setToken } from '@/utils/auth';

export async function login(data) {
    const res = await request({
        url: '/login',
        method: 'post',
        data
    });
    if (res) setToken(res.token);
    return res;
}
