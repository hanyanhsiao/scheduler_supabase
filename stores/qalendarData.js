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
    // 1 撈取所有已安排的課表
    async getEventData() {
      const response = await fetch('http://172.18.48.29:3000/calendar')
      const jsonResponse = await response.json()
      this.eventData = jsonResponse

      // if (this.eventData.length === 0) {
      //   const response = await fetch('/data/Qalendar.json')
      //   const jsonResponse = await response.json()
      //   this.eventData = jsonResponse.event
      //   console.log(this.eventData)
      // }
    },

    // 2 拖曳更新日期
    async dragEvent($event) {
      // console.log('拖曳回傳', $event)

      // -----------API-------------
      const newTimeObject = {}
      newTimeObject.startTime = $event.time.start
      newTimeObject.endTime = $event.time.end
      console.log('要存入的時間格式', newTimeObject)

      await fetch(`http://172.18.48.29:3000/calendar/${$event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTimeObject)
      }).then((res) => {
        return res.json()
      })

      // -----------local-------------
      const index = this.eventData.findIndex((event) => event.id === $event.id)
      if (index !== -1) {
        this.eventData[index].startTime = $event.time.start
        this.eventData[index].endTime = $event.time.end
      }
    },

    // 3 刪除該時段的課程
    async deleteTimeClass(id) {
      // console.log('刪除的id', id)

      const yes = confirm('確定刪除嗎?')
      if (yes) {
        // -----------API-------------
        await fetch(`http://172.18.48.29:3000/calendar/${id}`, {
          method: 'DELETE'
        }).then((res) => {
          return res.json()
        })

        // -----------local-------------
        this.eventData = this.eventData.filter((event) => event.id !== id)
      }
    },

    // 4 課程改時間
    async motifyTime(timeObject) {
      // console.log(timeObject)

      // 使用dayjs更改日期格式
      const changeStartTimeFormat = dayjs(timeObject.startTime).format('YYYY-MM-DD HH:mm')
      const changeEndTimeFormat = dayjs(timeObject.endTime).format('YYYY-MM-DD HH:mm')

      // -----------API-------------
      const newTimeObject = {}
      newTimeObject.startTime = changeStartTimeFormat
      newTimeObject.endTime = changeEndTimeFormat
      // console.log('要存入的時間格式', newTimeObject)

      await fetch(`http://172.18.48.29:3000/calendar/${timeObject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTimeObject)
      }).then((res) => {
        return res.json()
      })

      // -----------local-------------
      const index = this.eventData.findIndex((event) => event.id === timeObject.id)
      if (index !== -1) {
        this.eventData[index].startTime = changeStartTimeFormat
        this.eventData[index].endTime = changeEndTimeFormat
      }
    },

    // 5 點擊日期新增課程
    async addNewClass(saveClass) {
      // -----------API-------------
      // 要新增的資料
      const apiData = {
        course_id: saveClass.course.id,
        startTime: saveClass.startTime,
        endTime: saveClass.endTime
      }
      console.log('要存入的時刻', apiData)

      await fetch(`http://172.18.48.29:3000/calendar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      }).then((res) => {
        return res.json()
      })
      // 取得後端傳來的id
      const response = await fetch('http://172.18.48.29:3000/calendar')
      const jsonResponse = await response.json()
      this.eventData = jsonResponse

      // -----------local-------------
      this.eventData.push(saveClass)
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
