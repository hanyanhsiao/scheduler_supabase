<script setup>
import { object, string, ref as yupRef } from 'yup'
import { configure } from 'vee-validate'
import { useLogin } from '../../composable/useAuth'

// import { useUserStore } from '../stores/user'
// const store = useUserStore()
const router = useRouter()
// ------------------------------------------------

const { loading, doLogin, successLogin } = useLogin()

const handlerLogin = async (values) => {
  // console.log('登入的資料', values)
  await doLogin({
    email: values.email,
    password: values.password
  })
  // 登入成功後導向會員專區頁
  router.push('/profile')
}

// const handleSubmit = async (values, actions) => {
//   console.log(values)
//   // await store.login(values)
// }

// vee-validate 的各種驗證選項
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true
})

// yup驗證
const schema = object({
  email: string().required('請輸入信箱').email('請輸入有效信箱'),
  password: string()
    .required('請輸入密碼')
    .min(8, '密碼不得小於8位')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      '至少包含1個大寫英文字母、1個小寫英文字母、1個數字'
    )
})

// 眼睛開關
const passwordType = ref('password')
const handlePassword = (name) => {
  if (name == 'password') {
    passwordType.value = passwordType.value == 'password' ? 'text' : 'password'
  }
}

// definePageMeta({
//   // layout: false,
//   middleware: 'auth'
// })
</script>

<template>
  <div class="w-full text-center">
    <h2 class="text-2xl font-bold">登 入</h2>
    <!-- 輸入欄位 -->
    <VForm class="card mt-10" :validation-schema="schema" v-slot="{ meta }" @submit="handlerLogin">
      <div class="mb-10 space-y-10">
        <FormVTextInput type="email" name="email" placeholder="信箱" :error="true" />
        <FormVTextInput
          :type="passwordType"
          :error="true"
          name="password"
          placeholder="密碼"
          leftIcon="ri:eye-off-line"
          @handlePassword="handlePassword"
        />
      </div>
      <Button
        class="text-md my-2 w-24 rounded-lg bg-secondary py-2 font-bold hover:cursor-pointer hover:bg-third"
        :disabled="!meta.valid"
        type="submit"
        >登入</Button
      >
    </VForm>
    <!-- 註冊/忘記密碼 -->
    <!-- <div class="mx-auto flex w-fit pt-10 text-sm tracking-widest text-primary">
      <NuxtLink to="/register" class="hover:font-bold">註冊</NuxtLink>
      <div class="mx-4 my-1 h-3 w-px bg-primary"></div>
      <NuxtLink to="/forget" class="hover:font-bold">忘記密碼</NuxtLink>
    </div> -->
  </div>
</template>
