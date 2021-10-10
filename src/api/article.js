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
        url: '/article/all',
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

export function UpdateArticle(data) {
    return request({
        url: `/article/${data._id}`,
        method: 'put',
        data
    });
}

export function DeleteArticle(id) {
    return request({
        url: `/article/${id}`,
        method: 'delete'
    });
}
