<script setup>
import { useUpdateUser } from '../composable/useAuth'
import { useUserStore } from '../stores/user'
// import { definePage } from 'vue-router/auto'
// definePage({
//   meta: {
//     requiresAuth: true
//   }
// })

const password = ref('')
const confirmPassword = ref('')

const isTheSame = computed(() => {
  return password.value === confirmPassword.value
})

const { updateUser, loading, success } = useUpdateUser()
const store = useUserStore()

const resetPsd = async () => {
  if (!isTheSame.value) return
  await updateUser({
    email: store.email,
    password: confirmPassword.value
  })
}
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <div class="w-10/12 bg-bgGray p-6">
      <h2 class="mb-8 bg-primary py-10 text-center text-3xl font-bold leading-loose">重設密碼</h2>

      <div class="mx-auto w-5/6 max-w-lg">
        <form @submit.prevent="resetPsd">
          <p class="mb-4">
            <input
              v-model="password"
              required
              class="block w-full rounded-full px-6 py-3 text-xl text-stone-700 ring-secondary focus:ring-1 disabled:text-stone-400"
              placeholder="新密碼"
              type="password"
            />
          </p>
          <p class="mb-4">
            <input
              v-model="confirmPassword"
              required
              class="block w-full rounded-full px-6 py-3 text-xl text-stone-700 ring-secondary focus:ring-1 disabled:text-stone-400"
              placeholder="新密碼確認"
              type="password"
            />
          </p>
          <p class="mb-4 px-8 text-amber-500" v-if="!isTheSame">密碼不相同</p>
          <div class="flex items-center justify-center space-x-6">
            <span v-if="success">重設成功！！</span>
            <router-link v-if="success" class="underline" to="/">回首頁</router-link>
            <button
              v-if="!success"
              class="text-md rounded-full bg-primary px-8 py-4 font-bold hover:opacity-80"
              type="submit"
            >
              <span>重設密碼</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
