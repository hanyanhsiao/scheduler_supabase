<script setup>
import { supabase } from '../composable/supabaseClinet'
const router = useRouter()

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
    error.value = true
    alert('登入失敗')
  } else {
    result.value = data.user
    router.push('/profile')
    // alert('登入成功')
  }
}
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <div class="flex h-screen w-full justify-center overflow-y-auto bg-bgGray p-6 sm:absolute">
      <div class="w-full max-w-[500px] sm:mt-10">
        <FormLogin />
        <router-link
          to="/forgot"
          class="mt-2 flex justify-center text-stone-600 hover:underline"
          type="button"
          >忘記密碼</router-link
        >
        <hr class="mb-5 mt-4 h-0.5 w-full bg-stone-300" />
        <div class="flex justify-center">
          <button
            @click="loginGoogle"
            class="mb-5 flex w-full items-center justify-center gap-4 rounded-md border border-stone-500 py-2 font-bold hover:bg-stone-300"
          >
            <ClientOnly>
              <Icon name="logos:google-icon" />
            </ClientOnly>
            <p>Google登入</p>
          </button>
        </div>
        <div class="text-center">
          <p class="mb-4 text-stone-600">
            還沒有帳號？
            <router-link replace to="/signup" class="underline hover:font-bold"
              >立刻註冊</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
