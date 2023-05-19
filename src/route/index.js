import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { useStore } from '../store/main';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'index',
    component: () => import('../views/home.vue'),
    children: [
      {
        path: 'myExam',
        name: 'myExam',
        component: () => import('../views/home/myExam.vue'),
      },
      {
        path: 'grade',
        name: 'grade',
        component: () => import('../views/home/grade.vue'),
      },
      {
        path: 'userSetting',
        name: 'userSetting',
        component: () => import('../views/home/userSetting.vue'),
      },
      {
        path: 'examSetting',
        name: 'examSetting',
        component: () => import('../views/home/examSetting.vue'),
      },
      {
        path: 'questionBank',
        name: 'questionBank',
        component: () => import('../views/home/questionBank.vue'),
      },
      {
        path: 'systemSetting',
        name: 'systemSetting',
        component: () => import('../views/home/systemSetting.vue'),
      },
    ],
  },
  {
    path: '/exam/:studentPaperId',
    name: 'exam',
    component: () => import('../views/exam.vue'),
  },
  {
    path: '/exam/:studentPaperId/grade',
    name: 'examResult',
    component: () => import('../views/examGrade.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register.vue'),
  },
  // 错误页面
  {
    path: '/error/:message',
    name: 'error',
    component: () => import('../views/error.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// router.beforeEach((to, from, next) => {
//   const store = useStore()
//   const id = store.getId
//   if (!(to.name === 'login' || to.name === 'register') && id === 0) {
//     next({ name: 'login' })
//   } else {
//     next()
//   }
// })

export default router;
