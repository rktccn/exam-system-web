import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import { useStore } from '../store/main'

const routes = [
  {
    path: '/',
    redirect: '/home/userSetting'
  },
  {
    path: '/home',
    redirect: '/home/userSetting',
    name: 'index',
    component: () => import('../views/home.vue'),
    children: [
      {
        path: 'myExam',
        name: 'myExam',
        component: () => import('../views/home/myExam.vue'),
        meta: {
          rIndex: 1
        }
      },
      {
        path: 'grade',
        name: 'grade',
        component: () => import('../views/home/grade.vue'),
        meta: {
          rIndex: 2
        }
      },
      {
        path: 'userSetting',
        name: 'userSetting',
        component: () => import('../views/home/userSetting.vue'),
        meta: {
          rIndex: 3
        }
      },
      {
        path: 'examSetting',
        name: 'examSetting',
        component: () => import('../views/home/examSetting.vue'),
        meta: {
          rIndex: 4
        }
      },
      {
        path: 'questionBank',
        name: 'questionBank',
        component: () => import('../views/home/questionBank.vue'),
        meta: {
          rIndex: 5
        }
      },
      {
        path: 'systemSetting',
        name: 'systemSetting',
        component: () => import('../views/home/systemSetting.vue'),
        meta: {
          rIndex: 5
        }
      }
    ]
  },
  {
    path: '/exam/:studentPaperId',
    name: 'exam',
    component: () => import('../views/exam.vue')
  },
  {
    path: '/exam/:studentPaperId/grade',
    name: 'examResult',
    component: () => import('../views/examGrade.vue')
  },
  {
    path: '/exam/:paperId/analyze',
    name: 'examAnalyze',
    component: () => import('../views/examAnalyze.vue')
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
  },
  // 错误页面
  {
    path: '/error/:message',
    name: 'error',
    component: () => import('../views/error.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  const userId = store.getId
  if (!(to.name === 'login' || to.name === 'register') && !userId) {
    next({ name: 'login' })
  } else {
    next()
  }
})


export default router
