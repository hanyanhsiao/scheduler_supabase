import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { supabase } from '../composable/supabaseClinet'

// ------------------------------------------------

export const useQalendarData = defineStore('qalendarData', {
  // 初始狀態，使用箭頭函式
  state: () => {
    // const config = useRuntimeConfig()
    // const apiURL = config.public.apiBase
    const apiBase = 'https://jjbirjsxkllscyhxlogk.supabase.co/rest/v1'
    const apiKey = process.env.APIKEY
    const eventData = []
    return {
      eventData,
      // config,
      apiBase,
      apiKey
    }
  },

  // 定義使用到的函式，可以為同步和非同步，如同 method
  actions: {
    // ---------APIURL 方法---------
    // GET
    async getData(endpoint, method = 'GET') {
      const response = await fetch(`${this.apiBase}/${endpoint}`, {
        method,
        headers: {
          apikey: this.apiKey
        }
      })
      return await response.json()
    },
    // POST, PATCH, DELETE
    async fetchData(endpoint, data, method = 'POST') {
      const response = await fetch(`${this.apiBase}/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          apikey: this.apiKey
        },
        body: JSON.stringify(data)
      })
      return await response
    },

    // ---------1 撈取所有已安排的課表---------
    async getEventData() {
      const res = await this.getData('calendar', 'GET')
      // 遍歷res，找出startTime跟endTime不為null的資料
      const setCourse = res.filter((item) => item.startTime !== null && item.endTime !== null)
      // console.log('已安排的課表: ', setCourse)
      this.eventData = setCourse
      // console.log('this.eventData: ', this.eventData)

      // const response = await fetch(`${this.apiURL}/calendar`)
      // const jsonResponse = await response.json()
      // this.eventData = jsonResponse
      // // if (this.eventData.length === 0) {
      // //   const response = await fetch('/data/Qalendar.json')
      // //   const jsonResponse = await response.json()
      // //   this.eventData = jsonResponse.event
      // //   console.log(this.eventData)
      // // }
    },

    // ---------2 拖曳更新日期---------
    async dragEvent($event) {
      // console.log('拖曳回傳', $event)
      // console.log($event.id) // 檢查 id 屬性

      // const newTimeObject = {}
      // newTimeObject.startTime = $event.time.start
      // newTimeObject.endTime = $event.time.end
      const newTimeObject = {
        startTime: $event.time.start,
        endTime: $event.time.end
      }
      // console.log('要存入的時間格式', newTimeObject)

      // const { error } = await supabase.from('calendar').update(newTimeObject).eq('id', $event.id)
      await this.fetchData(`calendar?id=eq.${$event.id}`, newTimeObject, 'PATCH')
      this.getEventData()

      // // -----------API-------------
      // const newTimeObject = {}
      // newTimeObject.startTime = $event.time.start
      // newTimeObject.endTime = $event.time.end
      // // console.log('要存入的時間格式', newTimeObject)
      // await fetch(`${this.apiURL}/calendar/${$event.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newTimeObject)
      // }).then((res) => {
      //   return res.json()
      // })
      // // -----------local-------------
      // const index = this.eventData.findIndex((event) => event.id === $event.id)
      // if (index !== -1) {
      //   this.eventData[index].startTime = $event.time.start
      //   this.eventData[index].endTime = $event.time.end
      // }
    },

    // ---------3 刪除該時段的課程---------
    async deleteTimeClass(id) {
      // console.log('刪除的id', id)
      const yes = confirm('確定刪除嗎?')
      if (yes) {
        // const { error } = await supabase.from('calendar').delete().eq('id', id)
        await this.fetchData(`calendar?id=eq.${id}`, '', 'DELETE')
        this.getEventData()

        //   // -----------API-------------
        //   await fetch(`${this.apiURL}/calendar/${id}`, {
        //     method: 'DELETE'
        //   }).then((res) => {
        //     return res.json()
        //   })
        //   // -----------local-------------
        //   this.eventData = this.eventData.filter((event) => event.id !== id)
      }
    },

    //---------4 課程改時間---------
    async motifyTime(timeObject) {
      // console.log('改後時間', timeObject)

      // 使用dayjs更改日期格式
      const changeStartTimeFormat = dayjs(timeObject.startTime).format('YYYY-MM-DD HH:mm')
      const changeEndTimeFormat = dayjs(timeObject.endTime).format('YYYY-MM-DD HH:mm')

      const newTimeObject = {
        startTime: changeStartTimeFormat,
        endTime: changeEndTimeFormat
      }

      // const { error } = await supabase
      //   .from('calendar')
      //   .update(newTimeObject)
      //   .eq('id', timeObject.id)
      await this.fetchData(`calendar?id=eq.${timeObject.id}`, newTimeObject, 'PATCH')
      this.getEventData()

      // // -----------API-------------
      // const newTimeObject = {}
      // newTimeObject.startTime = changeStartTimeFormat
      // newTimeObject.endTime = changeEndTimeFormat
      // // console.log('要存入的時間格式', newTimeObject)
      // await fetch(`${this.apiURL}/calendar/${timeObject.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newTimeObject)
      // }).then((res) => {
      //   return res.json()
      // })
      // // -----------local-------------
      // const index = this.eventData.findIndex((event) => event.id === timeObject.id)
      // if (index !== -1) {
      //   this.eventData[index].startTime = changeStartTimeFormat
      //   this.eventData[index].endTime = changeEndTimeFormat
      // }
    },

    // ---------5 點擊日期新增課程---------
    async addNewClass(saveClass) {
      const response = await this.fetchData('calendar', saveClass, 'POST')
      // console.log('新增課程回傳', response.id)
      this.getEventData()

      // // -----------API-------------
      // // 要新增的資料
      // const apiData = {
      //   course_id: saveClass.course.id,
      //   startTime: saveClass.startTime,
      //   endTime: saveClass.endTime
      // }
      // // console.log('要存入的時刻', apiData)
      // await fetch(`${this.apiURL}/calendar`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(apiData)
      // }).then((res) => {
      //   return res.json()
      // })
      // // 取得後端傳來的id
      // const response = await fetch(`${this.apiURL}/calendar`)
      // const jsonResponse = await response.json()
      // this.eventData = jsonResponse
      // // -----------local-------------
      // // this.eventData.push(saveClass)
    }
  },

  // 對狀態加工的 getters，如同 computed
  getters: {}

  // 持久化配置，將狀態儲存在瀏覽器的 localStorage
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: 'counter',
  //       storage: process.client ? localStorage : null
  //     }
  //   ]
  // }
})
