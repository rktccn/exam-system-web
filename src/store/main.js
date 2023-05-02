import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      id: 0,
      permission: 0,
      name: ''
    }
  },
  getters: {
    getId() {
      return this.id
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
      this.id = id
    }
  }
})
