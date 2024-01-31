import { useUserStore } from '../stores/user'
import { supabase } from '../composable/supabaseClinet'

// ------------登入------------
const useLogin = () => {
  const successLogin = ref(false)
  const loading = ref(false)

  const doLogin = async ({ email, password }) => {
    loading.value = true
    // const photo = async () => {
    //   const { data: todos, error } = await supabase
    //     .from('profiles')
    //     .select('avatar_url')
    //     .eq('id', store.id)
    //   console.log(todos)
    // }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
      // photo: photo()
    })
    if (error) {
      successLogin.value = false
      alert('登入失敗')
    } else {
      alert('登入成功')
      console.log('data.user', data.user)
      successLogin.value = true
      // 登入資訊寫入store
      const store = useUserStore()
      store.id = data.user.id
      store.email = data.user.email
      store.name = data.user.user_metadata?.name
      // console.log('store', store)
    }
    loading.value = false
  }
  return {
    loading,
    successLogin,
    doLogin
  }
}

// ------------註冊------------
const useSignUp = () => {
  const successSignUp = ref(false)
  const loading = ref(false)

  const doSignUp = async ({ name, email, password }) => {
    loading.value = true

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { name: name }
      }
    })
    if (data.user) {
      alert('註冊成功')
      // console.log('data.user', data.user)
      successSignUp.value = true
      // 註冊成功後導向會員專區頁
    } else {
      alert('註冊失敗')
      successSignUp.value = false
    }
    loading.value = false
  }

  return {
    loading,
    doSignUp,
    successSignUp
  }
}

// ------------忘記密碼------------
const useForgotPsd = () => {
  const loading = ref(false)
  const success = ref(false)
  const err = ref(null)
  // const path = location.origin + '/reset/'
  const doFetch = async (email) => {
    loading.value = true
    success.value = false
    console.log('email????', email)
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: location.origin + '/login/'
    })
    loading.value = false
    success.value = true
    err.value = error
  }

  return {
    forgotPsd: doFetch,
    loading,
    success,
    err
  }
}

// ------------更新密碼------------
const useUpdateUser = () => {
  const loading = ref(false)
  const success = ref(false)
  const doFetch = async ({ password, email }) => {
    loading.value = true
    success.value = false
    const { data, error } = await supabase.auth.updateUser({
      email,
      password
    })
    // success.value = res.error ? false : true
    success.value = true

    loading.value = false
  }
  return {
    updateUser: doFetch,
    loading,
    success
  }
}

// ------------取得使用者------------
const useGetUser = () => {
  const user = ref({})
  const loading = ref(false)
  const store = useUserStore()

  const doFetch = async () => {
    loading.value = true
    const { data, error } = await supabase.auth.getUser()
    user.value = data.user
    store.id = data.user?.id
    store.email = data.user?.email
    loading.value = false
  }

  onBeforeMount(doFetch)
  return {
    user,
    reload: doFetch,
    loading
  }
}

// ------------登出------------
const useLogout = () => {
  const loading = ref(false)
  const logout = async () => {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert('登出失敗')
    } else {
      alert('登出成功')

      // 登出後清空store
      const store = useUserStore()
      store.id = ''
      store.email = ''
      store.name = ''
      store.photo = ''
      // 回到首頁
      location.href = '/'
    }
    loading.value = false
  }

  return {
    logout
  }
}

export { useLogin, useSignUp, useForgotPsd, useUpdateUser, useGetUser, useLogout }
