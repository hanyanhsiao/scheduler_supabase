import { defineStore } from 'pinia'

export const useUserStore = defineStore('userData', {
  id: 'user',
  state: () => ({
    id: '',
    email: '',
    photo: '',
    name: ''
  })
})
