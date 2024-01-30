import { useUserStore } from '../stores/user'
import { supabase } from '../composable/supabaseClinet'

// ------------登入------------
const useLogin = () => {
  const err = ref(false)
  const loading = ref(false)
  const result = ref(null)

  const doLogin = async ({ email, password }) => {
    loading.value = true
    err.value = false
    result.value = null
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
      err.value = true
    } else {
      alert('登入成功')
      console.log('data.user', data.user)

      // 登入資訊寫入store
      const store = useUserStore()
      store.id = data.user.id
      store.email = data.user.email
      store.name = data.user.user_metadata?.name
      // console.log('store', store)

      //登入成功後導向會員專區頁
      location.href = '/profile'
    }
    loading.value = false
  }
  return {
    loading,
    err,
    login: doLogin,
    result
  }
}

// ------------註冊------------
const useSignUp = () => {
  const error = ref(false)
  const loading = ref(false)
  const success = ref(null)

  const doSignUp = async ({ name, email, password }) => {
    loading.value = true
    // error.value = false
    success.value = null
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { name: name }
      }
    })
    if (data.user) {
      // success.value = data.user
      alert('註冊成功')
      // console.log('data.user', data.user)
      // 註冊成功後導向會員專區頁
      location.href = '/profile'
    } else {
      alert('註冊失敗')
      error.value = true
    }
    loading.value = false
  }

  return {
    loading,
    error,
    signup: doSignUp,
    success
  }
}

// ------------忘記密碼------------
const useForgotPsd = () => {
  const loading = ref(false)
  const success = ref(false)
  const err = ref(null)
  const path = location.origin + '/reset/'
  const doFetch = async (email) => {
    loading.value = true
    success.value = false
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: path
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
