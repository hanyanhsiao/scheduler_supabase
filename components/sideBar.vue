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
    // console.log('user資料:', session.user)
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

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  console.log(isSidebarOpen.value)
}
</script>

<template>
  <button
    type=" button"
    class="absolute right-5 top-5 z-40 hidden items-center rounded-lg bg-primary p-2 text-sm text-third focus:outline-none focus:ring-2 focus:ring-third sm:inline-flex"
    @click="toggleSidebar"
  >
    <svg
      class="h-6 w-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>
  <div
    v-if="isSidebarOpen"
    class="absolute left-0 top-0 z-10 h-full w-full bg-black/30"
    @click="toggleSidebar"
  ></div>
  <aside
    class="z-20 flex h-screen min-w-[250px] translate-x-0 flex-col justify-between space-y-5 bg-white p-5 align-bottom transition-transform sm:-translate-x-full"
    :class="{ ' sm:translate-x-0': isSidebarOpen }"
  >
    <section class="flex flex-col gap-4">
      <p
        class="text-3xl font-bold tracking-widest text-third"
        style="text-shadow: 1px 1px 2px rgba(234, 110, 28, 0.3)"
      >
        課程安排系統
      </p>
      <hr class="h-px w-full" />
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
        >已排課程總覽</NuxtLink
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
        <span class="text-third">{{ store.name }}</span>
        <p class="font-bold">Email:</p>
        <span class="text-third">{{ store.email }}</span>
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
