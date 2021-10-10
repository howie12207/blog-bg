import request from '@/utils/request';

export function CreateSort(data) {
    return request({
        url: '/sort',
        method: 'post',
        data
    });
}

export function FetchSorts() {
    return request({
        url: '/sort',
        method: 'get'
    });
}

export function UpdateSort(data) {
    return request({
        url: `/sort/${data._id}`,
        method: 'put',
        data
    });
}

export function DeleteSort(id) {
    return request({
        url: `/sort/${id}`,
        method: 'delete'
    });
}
