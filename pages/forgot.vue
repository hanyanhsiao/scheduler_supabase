<script setup>
import { useForgotPsd } from '../composable/useAuth'

const { forgotPsd, loading, success } = useForgotPsd()
const email = ref('')

watch(success, (value) => {
  if (value) {
    email.value = ''
  }
})

// })
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <div class="flex w-10/12 flex-col items-center justify-start bg-bgGray p-6">
      <h2 class="mb-4 text-2xl font-bold">忘記密碼</h2>
      <div class="mx-auto w-5/6 max-w-lg space-y-3">
        <form @submit.prevent="forgotPsd(email)">
          <input
            :disabled="loading"
            v-model="email"
            required
            class="form-input my-5 w-full rounded-lg px-4 py-2 text-stone-700 ring-secondary focus:outline-none focus:ring-1 focus:ring-third"
            placeholder="請輸入電子信箱"
            type="email"
          />

          <div class="my-4 flex items-center justify-center space-x-6">
            <button
              :disabled="loading"
              class="text-md my-2 w-28 rounded-lg bg-primary py-2 font-bold hover:cursor-pointer hover:bg-secondary"
              type="submit"
            >
              <span>送出email</span>
              <span><i class="bx bx-loader-alt bx-spin"></i></span>
            </button>
          </div>
          <div v-if="success" class="flex items-center justify-center">
            Email已送出，請前往信箱重置密碼
          </div>
          <router-link
            to="/login"
            class="mt-4 flex justify-center text-stone-600 underline hover:font-bold"
            type="button"
            >回到登入</router-link
          >
        </form>
      </div>
    </div>
  </div>
</template>
