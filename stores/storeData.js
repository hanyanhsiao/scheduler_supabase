import { defineStore } from 'pinia'

export const storeData = defineStore('storeData', {
  // 初始狀態，使用箭頭函式

  state: () => ({
    classData:[]
  }),
  // 修改狀態用的 function
  actions: {
      async getClassData(){
        if(this.classData.length===0){
            const response= await fetch('/data/class.json')
            const jsonResponse = await response.json()
            this.classData=jsonResponse.class
        }
        
      },
      set(input){
        this.classData[input.indexx] = input
      }
  },
  // 可以先將資料處理好用傳出
  getters: {},
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