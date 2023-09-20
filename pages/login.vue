<script setup>
import { supabase } from '../composable/supabaseClinet'

import { useUserStore } from '../stores/user'
const store = useUserStore()
const router = useRouter()
// ------------------------------------------------

const loginData = reactive({
  email: '',
  password: ''
})
const err = ref(false)
const result = ref(null)

// 一般登入
const handlerLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password
  })
  if (error) {
    err.value = true
    alert('登入失敗')
  } else {
    result.value = data.user
    // alert('登入成功')
  }
}

// Google登入
const loginGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  })
  // router.push('/login')

  // const oAuthToken = data.session.provider_token // use to access provider API
  if (error) {
    err.value = true
    alert('登入失敗')
  } else {
    result.value = data.user
    // alert('登入成功')
  }
}

// 記住使用者
// watchEffect(() => {
//   if (result.value === null) return
//   store.id = result.value.id
//   store.email = result.value.email
//   router.push('/')
// })

onMounted(async () => {
  supabase.auth.onAuthStateChange((_, session) => {
    if (session === null) return
    store.id = session.user.id
    store.email = session.user.email
  })
})
</script>
<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <div class="w-10/12 bg-neutral-200 p-6">
      <h2 class="mb-8 bg-primary text-center text-2xl font-bold leading-loose">登入</h2>
      <div class="mx-auto w-5/6 max-w-lg">
        <form class="mb-4" @submit.prevent="handlerLogin">
          <p class="mb-4">
            <input
              v-model.trim="loginData.email"
              required
              class="block w-full rounded-full px-6 py-3 text-xl text-stone-700 ring-secondary focus:ring-2 disabled:text-stone-400"
              placeholder="信箱"
              type="email"
            />
          </p>
          <p class="mb-4">
            <input
              v-model.trim="loginData.password"
              required
              class="block w-full rounded-full px-6 py-3 text-xl text-stone-700 ring-secondary focus:ring-2 disabled:text-stone-400"
              placeholder="密碼"
              type="password"
            />
          </p>
          <div class="flex items-center justify-center space-x-6">
            <span class="text-amber-600" v-if="err">崩入失敗</span>
            <router-link to="/forgot" class="text-stone-600 hover:underline" type="button"
              >忘記密碼?</router-link
            >
            <button
              class="text-md w-24 rounded-full bg-primary py-4 font-bold hover:opacity-80"
              type="submit"
            >
              <span>登入</span>
              <!-- <span><i class="bx bx-loader-alt bx-spin"></i></span> -->
            </button>
            <button @click="loginGoogle">
              <span
                class="text-md ml-2 w-24 rounded-full bg-secondary p-4 font-bold hover:opacity-80"
                >google登入</span
              >
            </button>
          </div>
        </form>

        <div class="text-center">
          <p class="mb-4 text-stone-600">
            還沒有帳號？ <router-link replace to="/signup" class="underline">立刻註冊</router-link>
          </p>
          <!-- <p>
            <router-link class="underline" to="/">回首頁</router-link>
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>
