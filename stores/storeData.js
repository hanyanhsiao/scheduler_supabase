import { defineStore } from 'pinia'
// -----------------supabase-------------------
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://jjbirjsxkllscyhxlogk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYmlyanN4a2xsc2N5aHhsb2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwMjEzMjQsImV4cCI6MjAxMDU5NzMyNH0.j-uusDVc-NbySoKe92ZeSKpMMrCTMKx_gjJvp8Ys370'
)

export const useStoreData = defineStore('storeData', {
  // 初始狀態，使用箭頭函式
  state: () => {
    const config = useRuntimeConfig()
    const apiURL = config.public.apiBase
    const classData = []
    const subjectOptions = []
    return {
      classData,
      subjectOptions,
      apiURL
    }
  },

  // 定義使用到的函式，可以為同步和非同步，如同 method
  actions: {
    // API
    // 1 獲取所有課程
    async getClassData() {
      const { data: todos, error } = await supabase.from('course').select('*')
      console.log(todos)
      this.classData = todos

      // ----------supabase APIURL 方法-------------------
      // const response = await fetch('https://jjbirjsxkllscyhxlogk.supabase.co/rest/v1/course', {
      //   method: 'GET',
      //   headers: {
      //     apikey:
      //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYmlyanN4a2xsc2N5aHhsb2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwMjEzMjQsImV4cCI6MjAxMDU5NzMyNH0.j-uusDVc-NbySoKe92ZeSKpMMrCTMKx_gjJvp8Ys370'
      //   }
      // })
      // const jsonResponse = await response.json()
      // this.classData = jsonResponse
      // console.log(jsonResponse)
    },
    // 2 獲取領域
    async getSubject() {
      // if (this.subjectOptions.length === 0) {
      //   const subjectResponse = await fetch(`${this.apiURL}/subject`)
      //   const subjectjson = await subjectResponse.json()
      //   this.subjectOptions = subjectjson
      //   // console.log('pinia', this.subjectOptions)
      // }
    },
    // 3 修改課程
    async modifyClass(input) {
      // console.log(input)
      const apiData = {
        className: input.className,
        teacher: input.teacher,
        // subject_id: input.subject.id,
        grade: input.grade,
        address: input.address,
        content: input.content
      }
      const { data, error } = await supabase.from('course').update(apiData).eq('id', input.id)
    },
    // 4 新增課程
    async addClass(input) {
      const apiData = {
        className: input.className,
        teacher: input.teacher,
        // subject_id: input.subject.id,
        grade: input.grade,
        address: input.address,
        content: input.content
      }
      // console.log(apiData)

      const { error } = await supabase.from('course').insert(apiData)
    },
    // 5 刪除課程
    async deleteClass(input, index) {
      const yes = confirm('確定刪除嗎?')
      if (yes) {
        const { error } = await supabase.from('course').delete().eq('id', input.id)
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
