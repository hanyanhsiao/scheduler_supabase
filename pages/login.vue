<script setup>
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://jjbirjsxkllscyhxlogk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYmlyanN4a2xsc2N5aHhsb2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwMjEzMjQsImV4cCI6MjAxMDU5NzMyNH0.j-uusDVc-NbySoKe92ZeSKpMMrCTMKx_gjJvp8Ys370'
)
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
    alert('登入成功')
  }
}

// 第三方登入
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
  console.log(data)
  router.push('/login')

  // const oAuthToken = data.session.provider_token // use to access provider API
  if (error) {
    err.value = true
    alert('登入失敗')
  } else {
    result.value = data.user
    console.error(result.value) // 输出错误信息到控制台

    // alert('登入成功')
  }
}

// 登出
const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    alert('登出失敗')
  } else {
    alert('登出成功')
    result.value = null
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
        <div class="mb-4 text-center">
          <button :disabled="loading" type="button" @click="loginGoogle()">
            <div
              class="inline-block rounded bg-[#4267B2] text-center align-middle text-4xl text-white"
            >
              <IconFacebook />
            </div>
            <span class="ml-2 inline-block align-middle">用google登入</span>
          </button>
        </div>
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
          </div>
        </form>
        <div class="text-center">
          <p class="mb-4 text-stone-600">
            還沒有帳號？ <router-link replace to="/signup" class="underline">立刻註冊</router-link>
          </p>
          <p>
            <router-link class="underline" to="/">回首頁</router-link>
          </p>

          <div class="text-md py-4 font-bold hover:opacity-80" type="submit">
            <span @click="signOut">登出</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
