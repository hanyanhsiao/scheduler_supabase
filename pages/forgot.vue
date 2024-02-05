<script setup>
import { useForgotPsd } from '../composable/useAuth'

const { forgotPsd, loading, success } = useForgotPsd()
const email = ref('')
const emailValidation = ref('')

watch(success, (value) => {
  if (value) {
    email.value = ''
    emailValidation.value = ''
  }
})
watch(email, () => {
  validateEmail()
})

const validateEmail = () => {
  if (email.value !== '') {
    // email欄位驗證正則
    const checkEmail = !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/.test(email.value)
    if (checkEmail) {
      emailValidation.value = '請輸入正確的email格式'
    } else {
      emailValidation.value = ''
    }
  }
}
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <div class="flex h-screen w-full justify-center overflow-y-auto bg-bgGray p-6 sm:absolute">
      <div class="flex w-full max-w-[500px] flex-col items-center sm:mt-10">
        <h2 class="mb-4 text-2xl font-bold">忘記密碼</h2>

        <div v-if="loading" class="flex h-full items-center justify-center">
          <Loading />
        </div>

        <div v-else class="mx-auto w-full space-y-3">
          <form @submit.prevent="forgotPsd(email)">
            <input
              :disabled="loading"
              v-model="email"
              class="form-input mb-3 mt-5 w-full rounded-lg px-4 py-2 text-stone-700 ring-secondary focus:outline-none focus:ring-1 focus:ring-third"
              placeholder="請輸入電子信箱"
              type="email"
              @blur="validateEmail"
              required
            />
            <p v-if="emailValidation" class="text-error">
              {{ emailValidation }}
            </p>

            <div class="my-4 flex flex-col items-center justify-center gap-4">
              <button
                :disabled="loading || emailValidation !== ''"
                class="text-md my-2 w-28 rounded-lg bg-secondary py-2 font-bold hover:cursor-pointer hover:bg-third"
                type="submit"
              >
                <span>送出email</span>
              </button>
              <div v-if="success" class="flex items-center justify-center font-bold text-third">
                Email已送出，請前往信箱重置密碼
              </div>
              <router-link
                to="/login"
                class="flex justify-center text-stone-600 underline hover:font-bold"
                type="button"
                >回到登入</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
