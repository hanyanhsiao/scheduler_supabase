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
    <div class="flex h-screen w-full justify-center overflow-y-auto bg-bgGray p-6 sm:absolute">
      <div class="h-screen w-full max-w-[500px] sm:mt-10">
        <FormRegister />
        <p class="mt-6 text-center text-stone-600">
          有帳號了？
          <router-link to="/login" replace class="underline hover:font-bold">前往登入</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
