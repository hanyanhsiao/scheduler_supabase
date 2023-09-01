import { defineStore } from 'pinia'

export const useStoreData = defineStore('storeData', {
  // 初始狀態，使用箭頭函式
  state: () => ({
    classData: [],
    subjectOptions: []
  }),

  // 定義使用到的函式，可以為同步和非同步，如同 method
  actions: {
    // API
    // 1 獲取所有課程
    async getClassData() {
      const response = await fetch('http://172.18.48.29:3000/course')
      const jsonResponse = await response.json()
      this.classData = jsonResponse

      // if (this.classData.length === 0) {
      //   const response = await fetch('/data/class.json')
      //   const jsonResponse = await response.json()
      //   this.classData = jsonResponse.class
      //   console.log(this.classData)
      // }
    },
    // 2 獲取領域
    async getSubject() {
      if (this.subjectOptions.length === 0) {
        const subjectResponse = await fetch('http://172.18.48.29:3000/subject')
        const subjectjson = await subjectResponse.json()
        this.subjectOptions = subjectjson
        // console.log('pinia', this.subjectOptions)
      }
    },
    // 3 修改課程
    async modifyClass(input) {
      // -----------API-------------
      const res = await fetch(`http://172.18.48.29:3000/course/${input.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      }).then((res) => {
        return res.json()
      })

      // -----------local-------------
      if (res) {
        this.classData[input.indexx] = input
      }
      // const response = await fetch('http://172.18.48.29:3000/course')
      // const jsonResponse = await response.json()
      // this.classData = jsonResponse
    },
    // 4 新增課程
    async addClass(input) {
      // -----------API-------------
      // 要新增的資料
      const apiData = {
        className: input.className,
        teacher: input.teacher,
        subject_id: input.subject.id,
        grade: input.grade,
        address: input.address,
        content: input.content,
        imageUrl: ''
      }

      await fetch(`http://172.18.48.29:3000/course`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      }).then((res) => {
        return res.json()
      })

      // -----------local-------------
      this.classData.push(input)
      // console.log('新增的課', input)
    },
    // 5 刪除課程
    async deleteClass(input, index) {
      const yes = confirm('確定刪除嗎?')
      if (yes) {
        // -----------API-------------
        await fetch(`http://172.18.48.29:3000/course/${input.id}`, {
          method: 'DELETE'
        }).then((res) => {
          return res.json()
        })

        // -----------local-------------
        this.classData.splice(index, 1)
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
