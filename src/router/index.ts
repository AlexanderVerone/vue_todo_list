import { createRouter, createWebHistory } from 'vue-router'
import AuthorizationPage from '@/pages/AuthorizationPage/components/AuthorizationPage.vue';
import NotFoundPage
  from '@/pages/NotFoundPage/components/NotFoundPage.vue';
import UserCabinetPage
  from '@/pages/UserCabinet/components/UserCabinetPage.vue';

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
      path: '/user/:id',
      name: 'user-cabinet',
      component: UserCabinetPage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage
    }
  ]
})

router.beforeEach((to) => {
  const jwtToken = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  if (to.meta.requireAuth && !jwtToken) {
    return {
      path: '/authorization',
    }
  }

  if (
    to.meta.requireAuth && 
    to.params.id &&
    userId &&
    to.params.id !== userId
  ) {
    return {
      path: `/user/${userId}`
    }
  }
})

export default router
