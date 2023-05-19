<template>
  <div class='side-bar'>
    <span class='title'>在线考试平台</span>
    <nav class='nav'>
      <template v-for='item in sideBarContent'>
        <router-link
          class='nav-item'
          v-if='item.permission.includes(userPermission)'
          :to='`${item.pathName}`'
        >
          {{ item.name }}
        </router-link>
      </template>

      <p class='nav-item'>{{ userPermission }}</p>
    </nav>
  </div>
</template>

<script setup>
import { useStore } from '../store/main.js'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const userPermission = store.getPermission

const sideBarContent = [
  {
    name: '我的考试',
    pathName: 'myExam',
    permission: [1, 2]
  },
  {
    name: '成绩管理',
    pathName: 'grade',
    permission: [1, 2]
  },
  {
    name: '个人设置',
    pathName: 'userSetting',
    permission: [0, 1, 2]
  },
  {
    name: '考试管理',
    pathName: 'examSetting',
    permission: [0, 1]
  },

  {
    name: '题库管理',
    pathName: 'questionBank',
    permission: [0, 1]
  },

  {
    name: '系统管理',
    pathName: 'systemSetting',
    permission: [0]
  }
]


// 设置.router-link-active类的样式
const setRouterLinkActive = () => {
  const routerLinkActive = document.querySelector('.router-link-active')
  if (routerLinkActive) {
    routerLinkActive.style.backgroundColor = 'rgba(127, 198, 216, 0.5)'
    routerLinkActive.style.color = '#fff'
  }
}

</script>

<style lang='scss' scoped>
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
    margin-bottom: 20px;
    font-size: 18px;
    cursor: pointer;
    padding: 10px 16%;
    border-radius: 10px;

    color: #000;
    text-decoration: none;
    transition: all 0.3s;

    &.router-link-active {
      background-color: rgba(32, 128, 240, 0.3);
      color: #2080F0;
    }

    &:hover {
      color: #fff;
      background-color: rgba(32, 128, 240, 0.5);
    }
  }
}
</style>
