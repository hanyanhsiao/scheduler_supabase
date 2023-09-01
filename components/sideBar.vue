<script setup>
// ---------pinia---------
import { useQalendarData } from '../stores/qalendarData'
import { storeToRefs } from 'pinia'

const EventStore = useQalendarData()
const { eventData } = storeToRefs(EventStore)

const getNewEventsData = () => {
  EventStore.getEventData()
  // console.log(eventData)

  // try {
  //   const response = await fetch('http://172.18.48.29:3000/calendar')
  //   response
  //   if (response.ok) {
  //     const responseData = await response.json()
  //     console.log(responseData)
  //   } else {
  //     console.error('API 請求失敗')
  //   }
  // } catch (error) {
  //   console.error(error)
  // }
}
</script>

<template class="w-2/12">
  <aside class="text-m flex w-2/12 flex-col space-y-5 p-5" style="height: 100vh">
    <NuxtLink
      to="/"
      :class="{ 'active-link': $route.path === '/' }"
      class="flex transform rounded-md px-2 py-3 transition-all hover:bg-primary hover:text-third active:scale-90"
      >查看課程</NuxtLink
    >
    <NuxtLink
      to="/Qalendar"
      :class="{ 'active-link': $route.path === '/Qalendar' }"
      class="transform rounded-md px-2 py-3 transition-all hover:bg-primary hover:text-third active:scale-90"
      @click="getNewEventsData"
      >安排課程時間</NuxtLink
    >
    <NuxtLink
      to="/table"
      :class="{ 'active-link': $route.path === '/table' }"
      class="transform rounded-md px-2 py-3 transition-all hover:bg-primary hover:text-third active:scale-90"
      @click="getNewEventsData"
      >表格呈現</NuxtLink
    >
  </aside>
</template>
<style scoped>
.active-link {
  background-color: #fffbeb;
  font-weight: bold;
  /* 添加其他样式，如文本颜色等 */
}
</style>
