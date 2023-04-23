import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useStore } from '../store/main'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  const id = store.getId
  if (!(to.name === 'login' || to.name === 'register') && id === 0) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
