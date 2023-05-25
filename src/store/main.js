import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      userId: null,
      permission: null,
      name: null,
      no: null,
      email: null
    }
  },
  getters: {
    getId() {
      return this.userId
    },
    getPermission() {
      return this.permission
    },
    getName() {
      return this.name
    }
  },
  actions: {
    // 设置用户id
    // @param: {Int} id
    setId(id) {
      this.userId = id
    },
    setUser(user) {
      this.userId = user.userId
      this.permission = user.permission
      this.name = user.name
      this.no = user.no
      this.email = user.email
    }
  },
  // 开启数据缓存
  persist: {
    key: 'main',
    enabled: true,
    storage: sessionStorage,
    paths: ['userId', 'permission', 'name', 'no', 'email']
  }
})
