<script setup>
import { useSignUp } from '../composable/useAuth'
// import { useSignUp } from useAuth()

import { supabase } from '../composable/supabaseClinet'
import { useUserStore } from '../stores/user'
// ------------------------------------------------
const store = useUserStore()

// const router = useRouter()

const { loading, signup, error, success } = useSignUp()
const signupData = reactive({
  email: '',
  password: ''
})

const handlerSignup = () => {
  signup({
    email: signupData.email,
    password: signupData.password
  })
}
watch(success, (user) => {
  store.id = user.id
  // router.push('/profile')
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
