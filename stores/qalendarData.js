import { defineStore } from 'pinia'

export const useQalendarData = defineStore('qalendarData', {
  // 初始狀態，使用箭頭函式
  state: () => ({
    eventData: []
  }),

  // 定義使用到的函式，可以為同步和非同步，如同 method
  actions: {
    // API
    async getEventData() {
      if (this.eventData.length === 0) {
        const response = await fetch('/data/Qalendar.json')
        const jsonResponse = await response.json()
        // console.log(jsonResponse.event)
        this.eventData = jsonResponse.event
      }
    },
    // 更新時間
    updateTime($event) {
      // console.log($event)
      // findIndex() 方法將依據提供的測試函式，尋找陣列中符合的元素，
      // 並返回其 index（索引）。如果沒有符合的對象，將返回 -1 。
      const index = this.eventData.findIndex((event) => event.uuid === $event.id)
      if (index !== -1) {
        this.eventData[index].startTime = $event.time.start
        this.eventData[index].endTime = $event.time.end
      }
    },
    deleteTimeClass(uuid) {
      // console.log('刪前', this.eventData)
      this.eventData = this.eventData.filter((event) => event.uuid !== uuid)
      // console.log('刪後', this.eventData)
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
