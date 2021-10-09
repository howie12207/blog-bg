import request from '@/utils/request';

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
