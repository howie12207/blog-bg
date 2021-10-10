import request from '@/utils/request';
import { setToken } from '@/utils/auth';

export async function Login(data) {
    const res = await request({
        url: '/login',
        method: 'post',
        data
    });
    if (res) setToken(res.token);
    return res;
}

export function CreateMember(data) {
    return request({
        url: '/register',
        method: 'post',
        data
    });
}

export function FetchMembers(params) {
    return request({
        url: '/user/member',
        method: 'get',
        params
    });
}

export function UpdateMember(data) {
    return request({
        url: `/user/member/${data._id}`,
        method: 'put',
        data
    });
}

export function DeleteMember(id) {
    return request({
        url: `/user/member/${id}`,
        method: 'delete'
    });
}

export function CreateAdmin(data) {
    return request({
        url: '/user/admin',
        method: 'post',
        data
    });
}

export function FetchAdmins(params) {
    return request({
        url: '/user/admin',
        method: 'get',
        params
    });
}

export function UpdateAdmin(data) {
    return request({
        url: `/user/admin/${data._id}`,
        method: 'put',
        data
    });
}

export function DeleteAdmin(id) {
    return request({
        url: `/user/admin/${id}`,
        method: 'delete'
    });
}
