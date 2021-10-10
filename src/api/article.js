import request from '@/utils/request';

export function CreateArticle(data) {
    return request({
        url: '/article',
        method: 'post',
        data
    });
}

export function FetchArticles(params) {
    return request({
        url: '/article',
        method: 'get',
        params
    });
}

export function FetchArticle(id) {
    return request({
        url: `/article/${id}`,
        method: 'get'
    });
}
