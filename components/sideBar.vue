<script setup>
// -------------------supabase-----------------------------
import { supabase } from '../composable/supabaseClinet'
import { useUserStore } from '../stores/user'

const store = useUserStore()

onMounted(async () => {
  // 用戶狀態變更事件
  // 第一個參數是事件名稱，第二個參數則是重要的登入狀態session
  supabase.auth.onAuthStateChange((_, session) => {
    if (session === null) return
    const userData = session.user.user_metadata
    // console.log('session.user_metadata:', userData)
    // console.log('photo:', userData.avatar_url)

    store.id = session.user.id
    store.email = session.user.email
    store.name = userData.name
    store.photo = userData.avatar_url
  })
})

// 登出
import { useLogout } from '../composable/useAuth'
const { logout } = useLogout()

const signOut = async () => {
  await logout()
}
// const signOut = async () => {
//   const { error } = await supabase.auth.signOut()
//   if (error) {
//     alert('登出失敗')
//   } else {
//     // alert('登出成功')
//     store.id = ''
//     store.email = ''
//     store.name = ''
//     store.photo = ''
//   }
// }

// ---------pinia---------
import { useQalendarData } from '../stores/qalendarData'
import { storeToRefs } from 'pinia'

const EventStore = useQalendarData()
const { eventData } = storeToRefs(EventStore)

const getNewEventsData = () => {
  EventStore.getEventData()
  // console.log(eventData)
}
</script>

<template class="w-2/12">
  <aside
    class="text-m flex w-2/12 flex-col justify-between space-y-5 p-5 align-bottom sm:p-3"
    style="height: 100vh"
  >
    <section class="flex flex-col gap-4">
      <NuxtLink
        to="/"
        :class="{ 'active-link': $route.path === '/' }"
        class="flex transform rounded-md px-2 py-3 transition-all hover:bg-primary hover:text-third active:scale-90 sm:text-center"
        >課程清單</NuxtLink
      >
      <NuxtLink
        to="/Qalendar"
        :class="{ 'active-link': $route.path === '/Qalendar' }"
        class="flex transform rounded-md px-2 py-3 transition-all hover:bg-primary hover:text-third active:scale-90 sm:text-center"
        @click="getNewEventsData"
        >安排日期與時間</NuxtLink
      >
      <NuxtLink
        to="/table"
        :class="{ 'active-link': $route.path === '/table' }"
        class="flex transform rounded-md px-2 py-3 transition-all hover:bg-primary hover:text-third active:scale-90 sm:text-center"
        @click="getNewEventsData"
        >表格總覽</NuxtLink
      >
      <NuxtLink
        v-if="store.id"
        to="/profile"
        :class="{ 'active-link': $route.path === '/profile' }"
        class="flex transform rounded-md px-2 py-3 transition-all hover:bg-primary hover:text-third active:scale-90 sm:text-center"
        >會員專區</NuxtLink
      >
      <NuxtLink
        v-else
        to="/login"
        :class="{ 'active-link': $route.path === '/login' }"
        class="flex transform rounded-md px-2 py-3 transition-all hover:bg-primary hover:text-third active:scale-90 sm:text-center"
        >登入 / 註冊</NuxtLink
      >
    </section>

    <section class="flex flex-col gap-4">
      <div class="p=3 border-2 border-secondary p-3">
        登入資訊
        <p class="font-bold">Name:</p>
        <span>{{ store.name }}</span>
        <p class="font-bold">Email:</p>
        <p>{{ store.email }}</p>
      </div>
      <button
        v-if="store.id"
        class="w-full rounded-md bg-secondary p-2 hover:bg-third"
        @click="signOut"
      >
        登出
      </button>
    </section>
  </aside>
</template>
<style scoped>
.active-link {
  background-color: #fffbeb;
  font-weight: bold;
}
</style>
