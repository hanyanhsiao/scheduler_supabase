<script setup>
import { object, string, ref as yupRef } from 'yup'
import { configure } from 'vee-validate'
import forEach from 'property-expr'
import toposort from 'toposort'
import { camelCase } from 'tiny-case'

import { useSignUp } from '../../composable/useAuth'
const router = useRouter()

const submitPending = ref(false)
const { loading, doSignUp, successSignUp } = useSignUp()
// const signupData = reactive({
//   name: '',
//   email: '',
//   password: '',
//   phone: ''
// })

// 送出表單打API
const handleSubmit = async (values, actions) => {
  // console.log('要註冊的資料', values)
  await doSignUp({
    name: values.name,
    email: values.email,
    password: values.password
  })
  router.push('/profile')
}

// vee-validate 的各種驗證選項
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true
})

// 輸入時確認email是否已註冊過
const checkMail = async (email) => {
  return true
  // const { data, error } = await useAuthFetch('/student/repeat', {
  //   params: {
  //     account: email
  //   }
  // })
  // return !data.value?.count
}

// yup驗證
const schema = object({
  name: string().required('請輸入姓名'),
  // mail is already taken
  email: string()
    .required('請輸入信箱')
    .email('請輸入正確信箱')
    .test(
      'email-is-taken',
      '此信箱無法註冊，請輸入其他信箱',
      async (email) => await checkMail(email)
    ),
  phone: string()
    .required('請輸入手機')
    .trim()
    .matches(/^09[0-9]{8}$/g, '手機格式錯誤'),
  password: string()
    .required('請輸入密碼')
    .min(8, '密碼不得小於8位')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      '至少包含1個大寫英文字母、1個小寫英文字母、1個數字'
    ),
  confirmed: string()
    .required('請再次輸入密碼')
    .oneOf([yupRef('password')], '兩次密碼不一致，請重新輸入') // Cross-Field Validation
})

// 眼睛開關
const passwordType = ref('password')
const confirmpasswordType = ref('password')
const handlePassword = (name) => {
  if (name == 'password') {
    passwordType.value = passwordType.value == 'password' ? 'text' : 'password'
  }
  if (name == 'confirmed') {
    confirmpasswordType.value = confirmpasswordType.value == 'password' ? 'text' : 'password'
  }
}

// definePageMeta({
//   // layout: false,
// })
</script>

<template>
  <div class="w-full text-center">
    <h2 class="text-balck text-2xl font-bold">註 冊</h2>
    <!-- 輸入欄位 -->
    <VForm
      class="card mt-8"
      :validation-schema="schema"
      v-slot="{ meta: formMeta, errors: formErrors }"
      @submit="handleSubmit"
    >
      <div class="space-y-5">
        <FormVTextInput type="text" name="name" label="姓名" :required="true" />
        <FormVTextInput type="email" name="email" label="信箱" :required="true" />
        <FormVTextInput type="email" name="phone" label="手機" :required="true" key="" />
        <FormVTextInput
          :type="passwordType"
          name="password"
          label="密碼"
          :required="true"
          leftIcon="ri:eye-off-line"
          @handlePassword="handlePassword"
        />
        <FormVTextInput
          :type="confirmpasswordType"
          name="confirmed"
          label="確認密碼"
          :required="true"
          leftIcon="ri:eye-off-line"
          @handlePassword="handlePassword"
        />
      </div>
      <!-- 錯誤訊息顯示 -->
      <p class="mt-10 h-[21px] text-sm text-error">
        {{ Object.values(formErrors)[0] }}
      </p>
      <button
        class="text-md mt-4 w-32 rounded-md bg-secondary py-2 hover:cursor-pointer hover:bg-third hover:text-white"
        :disabled="!formMeta.valid || submitPending"
        type="submit"
      >
        註冊
      </button>
    </VForm>
  </div>
</template>

<style scoped></style>
