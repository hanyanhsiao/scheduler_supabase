import { defineStore } from 'pinia'

export const useStoreData = defineStore('storeData', {
  // 初始狀態，使用箭頭函式
  state: () => ({
    classData: []
  }),

  // 定義使用到的函式，可以為同步和非同步，如同 method
  actions: {
    // API
    async getClassData() {
      if (this.classData.length === 0) {
        const response = await fetch('/data/class.json')
        const jsonResponse = await response.json()
        this.classData = jsonResponse.class
        // console.log('onGetClassData')
      }
    },
    modifyClass(input) {
      this.classData[input.indexx] = input
    },
    addClass(input) {
      this.classData.push(input)
    }
  },

  // 對狀態加工的 getters，如同 computed
  getters: {},

  // 持久化配置，將狀態儲存在瀏覽器的 localStorage
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'counter',
        storage: process.client ? localStorage : null
      }
    ]
  }
})
