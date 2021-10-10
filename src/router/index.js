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
            path: '/articleManage',
            component: () => import('@/views/articleManage/ArticleManage.vue'),
            meta: {
                name: 'Article'
            }
        },
        {
            path: '/commentManage',
            component: () => import('@/views/commentManage/CommentManage.vue'),
            meta: {
                name: 'Comment'
            }
        },
        {
            path: '/sortManage',
            component: () => import('@/views/sortManage/SortManage.vue'),
            meta: {
                name: 'Sort'
            }
        },
        {
            path: '/worksManage',
            component: () => import('@/views/worksManage/WorksManage.vue'),
            meta: {
                name: 'Works'
            }
        },
        {
            path: '/memberManage',
            component: () => import('@/views/memberManage/MemberManage.vue'),
            meta: {
                name: 'Member'
            }
        },
        {
            path: '/adminManage',
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
