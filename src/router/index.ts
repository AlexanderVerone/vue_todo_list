import { createRouter, createWebHistory } from 'vue-router'
import AuthorizationPage from '@/pages/AuthorizationPage/components/AuthorizationPage.vue';
import NotFoundPage
    from '@/pages/NotFoundPage/components/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/authorization'
        },
        {
            path: '/authorization',
            name: 'authorization',
            component: AuthorizationPage
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundPage
        }
    ]
})

router.beforeEach((to) => {
    const jwtToken = localStorage.getItem('jwtToken')
    if (to.meta.requireAuth && !jwtToken) {
        return {
            path: '/authorization',
            query: { redirect: to.fullPath }
        }
    }
})

export default router
