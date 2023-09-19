<script setup>
const router = useRouter()

import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://jjbirjsxkllscyhxlogk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYmlyanN4a2xsc2N5aHhsb2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwMjEzMjQsImV4cCI6MjAxMDU5NzMyNH0.j-uusDVc-NbySoKe92ZeSKpMMrCTMKx_gjJvp8Ys370'
)
// ------------------------------------------------
// 註冊
const signupData = reactive({
  email: '',
  password: ''
})
const err = ref(false)
const result = ref(null)
const handlerSignup = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: signupData.email,
    password: signupData.password
  })
  if (error) {
    err.value = true
    alert('註冊失敗')
  } else {
    alert('註冊成功')
    result.value = data.user

    router.push('/')
  }
}
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
      <h2 class="mb-8 bg-secondary text-center text-2xl font-bold leading-loose">註冊</h2>
      <div class="mx-auto w-5/6 max-w-lg">
        <!-- <div class=" text-center mb-4">
      <button :disabled="loading" type="button" @click="loginFB()">
        <div class="bg-[#4267B2] inline-block align-middle rounded text-center text-white text-4xl">
          <IconFacebook />
        </div>
        <span class="ml-2 inline-block align-middle">用FB登入</span>
      </button>
    </div> -->
        <form class="mb-4" @submit.prevent="handlerSignup">
          <p class="mb-4">
            <input
              :disabled="loading"
              v-model="signupData.email"
              required
              class="block w-full rounded-full px-6 py-3 text-xl text-stone-700 ring-secondary focus:ring-2 disabled:text-stone-400"
              placeholder="信箱"
              type="email"
            />
          </p>
          <p class="mb-4">
            <input
              :disabled="loading"
              v-model="signupData.password"
              required
              class="block w-full rounded-full px-6 py-3 text-xl text-stone-700 ring-secondary focus:ring-2 disabled:text-stone-400"
              placeholder="密碼"
              type="password"
            />
          </p>
          <div class="flex items-center justify-center space-x-6">
            <span class="text-xl font-bold text-red-500" v-if="error">錯誤</span>
            <button
              :disabled="loading"
              class="text-md w-24 rounded-full bg-secondary py-4 font-bold text-white hover:opacity-70"
              type="submit"
            >
              <span v-if="!loading" class="text-stone-700">註冊</span>
              <span v-else><i class="bx bx-loader-alt bx-spin"></i></span>
            </button>
          </div>
        </form>
        <div class="text-center">
          <p class="mb-4 text-stone-600">
            有帳號了？
            <router-link to="/login" replace class="underline">前往登入</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
