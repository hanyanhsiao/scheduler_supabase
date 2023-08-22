import dayjs from 'dayjs'
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
    // 拖曳更新日期
    dragEvent($event) {
      // console.log($event)
      const index = this.eventData.findIndex((event) => event.uuid === $event.id)
      if (index !== -1) {
        this.eventData[index].startTime = $event.time.start
        this.eventData[index].endTime = $event.time.end
      }
    },
    // 刪除該時段的課程
    deleteTimeClass(uuid) {
      const yes = confirm('確定刪除嗎?')
      if (yes) {
        // console.log('刪前', this.eventData)
        this.eventData = this.eventData.filter((event) => event.uuid !== uuid)
        console.log('刪後', this.eventData)
      }
    },
    // 課程改時間
    motifyTime(timeObject) {
      // 使用dayjs更改日期格式
      const changeStartTimeFormat = dayjs(timeObject.startTime).format('YYYY-MM-DD HH:mm')
      const changeEndTimeFormat = dayjs(timeObject.endTime).format('YYYY-MM-DD HH:mm')

      const index = this.eventData.findIndex((event) => event.uuid === timeObject.uuid)
      if (index !== -1) {
        // console.log('改前時間', this.eventData[index].startTime, this.eventData[index].endTime)
        this.eventData[index].startTime = changeStartTimeFormat
        this.eventData[index].endTime = changeEndTimeFormat
        console.log('改後時間', this.eventData[index].startTime, this.eventData[index].endTime)
      }
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