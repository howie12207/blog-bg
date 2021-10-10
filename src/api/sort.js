import request from '@/utils/request';

export function FetchSorts() {
    return request({
        url: '/sort',
        method: 'get'
    });
}
