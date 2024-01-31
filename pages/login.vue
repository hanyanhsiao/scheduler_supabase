<script setup>
import { supabase } from '../composable/supabaseClinet'

// import { useUserStore } from '../stores/user'
// const store = useUserStore()
// const router = useRouter()
// ------------------------------------------------
// 登入移去元件寫
// import { useLogin } from '../composable/useAuth'

// const loginData = reactive({
//   email: '',
//   password: ''
// })

// const { loading, login, err, result } = useLogin()
// const handlerLogin = async () => {
//   await login({
//     email: loginData.email,
//     password: loginData.password
//   })
// }

// -----------Google登入-----------
const loginGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  })
  // router.push('/login')

  // const oAuthToken = data.session.provider_token // use to access provider API
  if (error) {
    err.value = true
    alert('登入失敗')
  } else {
    result.value = data.user
    // alert('登入成功')
  }
}
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <div class="flex w-10/12 flex-col items-center justify-start bg-neutral-200 p-6">
      <div class="w-[500px]">
        <FormLogin />
        <router-link
          to="/forgot"
          class="mt-2 flex justify-center text-stone-600 hover:underline"
          type="button"
          >忘記密碼</router-link
        >
        <hr class="mb-5 mt-4 h-0.5 w-full bg-stone-500" />
        <div class="flex justify-center">
          <button
            @click="loginGoogle"
            class="mb-5 ml-2 w-full rounded-lg border border-stone-500 py-2 font-bold hover:bg-stone-500 hover:text-white"
          >
            google登入
          </button>
        </div>
      </div>
      <!-- <h2 class="mb-6 text-center text-2xl font-bold leading-loose">登 入</h2> -->
      <!-- <div class="mx-auto max-w-[400px]"> -->
      <!-- <form class="flex flex-col gap-6" @submit.prevent="handlerLogin">
          <input
            v-model.trim="loginData.email"
            required
            class="block w-full rounded-lg px-4 py-3 text-stone-700 ring-secondary focus:outline-none focus:ring-1 focus:ring-third"
            placeholder="信箱"
            type="email"
          />
          <input
            v-model.trim="loginData.password"
            required
            class="block w-full rounded-lg px-4 py-3 text-stone-700 ring-secondary focus:outline-none focus:ring-1 focus:ring-third"
            placeholder="密碼"
            type="password"
          />
          <div class="flex flex-col items-center justify-center gap-4">
            <button
              class="text-md w-24 rounded-lg bg-secondary py-2 font-bold hover:bg-primary"
              type="submit"
            >
              <span>登入</span>
            </button>
            <span class="text-red-500" v-if="err">登入失敗</span>
          </div>
          <router-link
            to="/forgot"
            class="flex justify-center text-stone-600 hover:underline"
            type="button"
            >忘記密碼</router-link
          >
        </form> -->

      <div class="text-center">
        <p class="mb-4 text-stone-600">
          還沒有帳號？
          <router-link replace to="/signup" class="underline hover:font-bold">立刻註冊</router-link>
        </p>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
