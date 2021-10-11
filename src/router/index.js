import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/login/Login.vue';

export const router = createRouter({
    history: createWebHistory('/blog-bg/'),
    routes: [
        {
            path: '/',
            component: () => import('@/views/home/Home.vue'),
            meta: {
                name: 'Dashboard'
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                name: 'Login',
                blank: true
            }
        },
        {
            path: '/article',
            component: () => import('@/views/articleManage/ArticleManage.vue'),
            meta: {
                name: 'Article'
            }
        },
        {
            path: '/comment',
            component: () => import('@/views/commentManage/CommentManage.vue'),
            meta: {
                name: 'Comment'
            }
        },
        {
            path: '/sort',
            component: () => import('@/views/sortManage/SortManage.vue'),
            meta: {
                name: 'Sort'
            }
        },
        {
            path: '/works',
            component: () => import('@/views/worksManage/WorksManage.vue'),
            meta: {
                name: 'Works'
            }
        },
        {
            path: '/member',
            component: () => import('@/views/memberManage/MemberManage.vue'),
            meta: {
                name: 'Member'
            }
        },
        {
            path: '/admin',
            component: () => import('@/views/adminManage/AdminManage.vue'),
            meta: {
                name: 'Admin'
            }
        }
        // {
        //   path: "/:pathMatch(.*)*",
        //   component: () => import("@/views/notFound/NotFound.vue"),
        //   meta: {
        //     name: "Page not found",
        //     blank: true,
        //   },
        // },
    ]
});

router.beforeEach((to, from, next) => {
    const name = to.meta.name || '';
    document.title = `${name} | Howie's blog backstage`;
    next();
});
