import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/orcamentos',
      name: 'Orçamentos',
      component: () => import('../views/orcamentos/OrcamentoView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const { token } = useUserStore()

  if (!token && to.name !== 'Login') {
    return { name: 'Login' }
  }
})

export default router
