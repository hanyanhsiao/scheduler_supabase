<script setup>
import { defineStore } from 'pinia'

import { useUserStore } from '../stores/user'
import { useSignUp } from '../composable/useAuth'

// ------------------------------------------------
const store = useUserStore()
// const router = useRouter()
const { loading, signup, error, success } = useSignUp()
const signupData = reactive({
  name: '',
  email: '',
  password: ''
})
const ValidationText = ref('')

// 點擊註冊
// const handlerSignup = () => {
//   console.log('要註冊的資料', signupData)
//   if (ValidationText.value !== '') {
//     alert('請確認資料是否正確')
//   } else {
//     signup({
//       name: signupData.name,
//       email: signupData.email,
//       password: signupData.password
//     })
//   }
// }

watch(success, (user) => {
  store.id = user.id
  // router.push('/profile')
})

// 欄位驗證
// function validateEmail() {
//   if (signupData.email === '') {
//     ValidationText.value = 'Email 不能為空'
//   } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(signupData.email)) {
//     ValidationText.value = 'Email 格式不正確'
//   } else {
//     ValidationText.value = ''
//   }
// }
// function validateName() {
//   if (signupData.name === '') {
//     ValidationText.value = '姓名 不能為空'
//   } else {
//     ValidationText.value = ''
//   }
// }
</script>

<template>
  <div class="flex w-full" id="app">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <!-- border border-blue-500 -->
    <div class="justify-star flex w-10/12 flex-col items-center bg-bgGray p-6">
      <div class="w-[500px]">
        <FormRegister />
      </div>
      <!-- <h2 class="mb-6 text-center text-2xl font-bold leading-loose">註 冊</h2>
      <div class="mx-auto max-w-[400px]">
        <form class="mb-6 flex flex-col gap-6" @submit.prevent="handlerSignup">
          <input
            :disabled="loading"
            v-model="signupData.name"
            required
            class="block w-full rounded-lg px-4 py-3 text-stone-700 ring-secondary focus:outline-none focus:ring-1 focus:ring-third"
            placeholder="姓名"
            type="name"
            @blur="validateName"
          />
          <input
            :disabled="loading"
            v-model="signupData.email"
            required
            class="block w-full rounded-lg px-4 py-3 text-stone-700 ring-secondary focus:outline-none focus:ring-1 focus:ring-third"
            placeholder="信箱"
            type="email"
            @blur="validateEmail"
          />

          <input
            :disabled="loading"
            v-model="signupData.password"
            required
            class="block w-full rounded-lg px-4 py-3 text-stone-700 ring-secondary focus:outline-none focus:ring-1 focus:ring-third"
            placeholder="密碼"
            type="password"
          />
          <div class="flex flex-col items-center justify-center text-center">
            <span class="text-xl font-bold text-red-500" v-if="error">錯誤</span>
            <p v-if="ValidationText" class="mb-2 text-red-500">
              {{ ValidationText }}
            </p>
            <button
              :disabled="loading"
              class="text-md w-24 rounded-lg bg-secondary py-2 font-bold text-white hover:opacity-70"
              type="submit"
            >
              <span :disabled="loading" class="text-stone-700">註冊</span>
            </button>
          </div>
        </form>
        <div class="text-center">
          <p class="mb-4 text-stone-600">
            有帳號了？
            <router-link to="/login" replace class="underline">前往登入</router-link>
          </p>
        </div>
      </div> -->
      <div class="mt-4 text-center">
        <p class="text-stone-600">
          有帳號了？
          <router-link to="/login" replace class="underline hover:font-bold">前往登入</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
