import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
  path: '/register',
  name: 'register',
  component: () => import('@/views/Auth/Register.vue'),
  meta: { guestOnly: true },
},
{
  path: '/',
  name: 'login',
  component: () => import('@/views/Auth/Login.vue'),
  meta: { guestOnly: true },
},
{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/DashboardOverview.vue'),
  meta: { requiresAuth: true },
},

    
  ]
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return next({ name: 'login' })
  if (to.meta.guestOnly && auth.isAuthenticated) return next({ name: 'dashboard' })
  next()
})
export default router
