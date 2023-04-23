import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      id: 0
    }
  },
  getters: {
    getId() {
      return this.id
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
