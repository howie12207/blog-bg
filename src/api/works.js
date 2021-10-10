import request from '@/utils/request';

export function CreateWorks(data) {
    return request({
        url: '/works',
        method: 'post',
        data
    });
}

export function FetchWorks(params) {
    return request({
        url: '/works/all',
        method: 'get',
        params
    });
}

export function UpdateWorks(data) {
    return request({
        url: `/works/${data._id}`,
        method: 'put',
        data
    });
}

export function DeleteWorks(id) {
    return request({
        url: `/works/${id}`,
        method: 'delete'
    });
}
