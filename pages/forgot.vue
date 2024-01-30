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
    <div class="w-10/12 bg-neutral-200 p-6">
      <h2 class="mb-8 bg-primary py-10 text-center text-3xl font-bold leading-loose">忘記密碼</h2>
      <div class="mx-auto w-5/6 max-w-lg">
        <form @submit.prevent="forgotPsd(email)">
          <p class="mb-4">
            <input
              :disabled="loading"
              v-model="email"
              required
              class="block w-full rounded-full px-6 py-3 text-xl text-stone-700 ring-secondary focus:ring-1 disabled:text-stone-400"
              placeholder="請輸入電子信箱"
              type="email"
            />
          </p>
          <div class="flex items-center justify-center space-x-6">
            <button
              :disabled="loading"
              class="text-md rounded-full bg-primary px-8 py-4 font-bold hover:opacity-80"
              type="submit"
            >
              <span>送出email</span>
              <span><i class="bx bx-loader-alt bx-spin"></i></span>
            </button>
          </div>
          <div v-if="success" class="flex items-center justify-center p-5">
            Email已送出 請前往信箱重置密碼
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
