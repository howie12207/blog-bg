import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/login/Login.vue';

export const router = createRouter({
    history: createWebHistory('/blog-bg/'),
    routes: [
        {
            path: '/',
            component: import('@/views/home/Home.vue'),
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
