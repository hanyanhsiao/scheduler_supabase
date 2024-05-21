import { defineStore } from 'pinia'
// -----------------supabase-------------------
import { supabase } from '../composable/supabaseClinet'

export const useStoreData = defineStore('storeData', {
  // 初始狀態，使用箭頭函式
  state: () => {
    // const config = useRuntimeConfig()
    // const apiURL = config.public.apiBase
    const apiBase = 'https://jjbirjsxkllscyhxlogk.supabase.co/rest/v1'
    const apiKey = process.env.APIKEY
    const classData = []
    const subjectOptions = []
    return {
      classData,
      subjectOptions,
      apiBase,
      apiKey
    }
  },

  // 定義使用到的函式，可以為同步和非同步，如同 method
  actions: {
    // APIURL 方法
    async fetchData(endpoint, method = 'GET') {
      const response = await fetch(`${this.apiBase}/${endpoint}`, {
        method,
        headers: {
          apikey: this.apiKey
        }
      })
      return await response.json()
    },
    // ----------1 獲取所有課程----------
    async getClassData() {
      const totalCourse = await this.fetchData('course', 'GET')
      //將獲取的資料用id排序由小到大
      const sortedCourse = totalCourse.sort((a, b) => a.id - b.id)
      // console.log('目前排序: ', sortedCourse)
      this.classData = sortedCourse
    },
    // supabase SQL 方法
    // const { data: todos, error } = await supabase.from('course').select('*')
    // // console.log(todos)
    // this.classData = todos

    // ----------2 獲取領域----------
    async getSubject() {
      this.subjectOptions = await this.fetchData('subject', 'GET')
      // console.log('subjectOptions', this.subjectOptions)
    },

    // ----------3 修改課程----------
    async modifyClass(input) {
      // console.log(input)
      const apiData = {
        name: input.name,
        teacher: input.teacher,
        subject: input.subject,
        grade: input.grade,
        address: input.address,
        content: input.content
      }
      const { data, error } = await supabase.from('course').update(apiData).eq('id', input.id)
      const { data2, error2 } = await supabase
        .from('calendar')
        .update(apiData)
        .eq('courseID', input.id)
    },
    // ----------4 新增課程----------
    async addClass(input) {
      const apiData = {
        name: input.name,
        teacher: input.teacher,
        subject: input.subject,
        grade: input.grade,
        address: input.address,
        content: input.content
      }
      // console.log(apiData)

      const { error } = await supabase.from('course').insert(apiData)
    },
    // ----------5 刪除課程----------
    async deleteClass(input, index) {
      const yes = confirm('確定刪除嗎?')
      if (yes) {
        const { error } = await supabase.from('course').delete().eq('id', input.id)
        const { error2 } = await supabase.from('calendar').delete().eq('courseID', input.id)
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
