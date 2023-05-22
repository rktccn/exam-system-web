<template>
  <div class="side-bar">
    <span class="title">在线考试平台</span>
    <nav class="nav">
      <template v-for="item in sideBarContent">
        <router-link
          class="nav-item"
          v-if="item.permission.includes(userPermission)"
          :to="`${item.pathName}`"
        >
          {{ item.name }}
        </router-link>
      </template>

      <p class="nav-item">{{ userPermission }}</p>
    </nav>
  </div>
</template>

<script setup>
import { useStore } from '../store/main.js';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const userPermission = store.getPermission;

const sideBarContent = [
  {
    name: '我的考试',
    pathName: '/home/myExam',
    permission: [1, 2],
  },
  {
    name: '成绩管理',
    pathName: '/home/grade',
    permission: [1, 2],
  },
  {
    name: '个人设置',
    pathName: '/home/userSetting',
    permission: [0, 1, 2],
  },
  {
    name: '考试管理',
    pathName: '/home/examSetting',
    permission: [0, 1],
  },

  {
    name: '题库管理',
    pathName: '/home/questionBank',
    permission: [0, 1],
  },

  {
    name: '系统管理',
    pathName: '/home/systemSetting',
    permission: [0],
  },
];

// 设置.router-link-active类的样式
const setRouterLinkActive = () => {
  const routerLinkActive = document.querySelector('.router-link-active');
  if (routerLinkActive) {
    routerLinkActive.style.backgroundColor = 'rgba(127, 198, 216, 0.5)';
    routerLinkActive.style.color = '#fff';
  }
};
</script>

<style lang="scss" scoped>
.side-bar {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 75px;
  border-radius: 25px;
}

.title {
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 20px;
  font-weight: bolder;
  // 调整文字间距
  letter-spacing: 5px;
}

.nav {
  padding: 0 10px;

  .nav-item {
    display: block;
    position: relative;
    margin-bottom: 20px;
    padding: 10px 16%;
    border-radius: 10px;

    color: #000;
    font-size: 18px;
    text-decoration: none;

    cursor: pointer;

    transition: all 0.3s;

    &.router-link-active {
      background-color: rgba(32, 128, 240, 0.3);
      color: #2080f0;

      &:before {
        content: '';
        position: absolute;
        left: 25px;
        top: 50%;
        height: 70%;
        width: 2px;
        border-radius: 4px;
        background-color: #2080f0;
        opacity: 0.8;

        transform: translateY(-50%);
      }
    }

    &:hover {
      color: #fff;
      background-color: rgba(32, 128, 240, 0.5);
    }
  }
}
</style>
