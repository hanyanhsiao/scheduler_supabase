<script setup>
import { supabase } from '../composable/supabaseClinet'
import { useUserStore } from '../stores/user'

const store = useUserStore()
// console.log('store', store)
// console.log('store', store.photo)

const avatarUrl = ref(store.photo)
const uniqueFilename = `avatar_${Date.now()}.png`
// 取得儲存桶
const bucket = supabase.storage.from('avatars')
//大頭貼
const Upload = async ($event) => {
  const avatarFile = $event.target.files[0]

  // 上傳檔案
  const { data, error } = await bucket.upload(`public/${uniqueFilename}`, avatarFile)
  if (error) {
    console.error('上傳失敗：', error)
  } else {
    // createSignedUrl就能夠把檔案完成上傳至儲存空間，並且產生一個限時可瀏覽的連結
    const { data, error } = await bucket.createSignedUrl(`public/${uniqueFilename}`, 60)

    // console.log('可顯示的url', data.signedUrl)
    // alert('上傳成功')

    // 顯示圖片
    avatarUrl.value = data.signedUrl
    // 存入pinia
    store.photo = data.signedUrl
    console.log('id', store.id)
    console.log('圖片', avatarUrl.value)

    // 連結存入資料庫
    await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl.value }) // 更新操作，將 avatar_url 更新為新的圖片 URL
      .eq('id', store.id) // 指定要更新的特定行，假設您有一個 id 來識別用戶
  }
}

// const download = async () => {
//   const { data, error } = await bucket.getPublicUrl('avatar_1695344796416.png', {
//     transform: {
//       width: 500,
//       height: 600
//     }
//   })
//   if (data) {
//     console.log(data.publicUrl)
//   } else {
//     // 處理錯誤
//     console.error(error)
//   }
// }

onMounted(async () => {
  // 用戶狀態變更事件
  // 第一個參數是事件名稱，第二個參數則是重要的登入狀態session
  supabase.auth.onAuthStateChange((_, session) => {
    if (session === null) return
    const userData = session.user.user_metadata
    // console.log('user資料:', session.user)
    // console.log('photo:', userData.avatar_url)

    store.id = session.user.id
    store.email = session.user.email
    store.name = userData.name
    store.photo = userData.avatar_url
  })
})
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <div
      class="it flex h-screen w-full flex-col justify-start overflow-y-auto bg-bgGray p-6 sm:absolute"
    >
      <!-- 大頭貼 -->
      <div class="flex items-center justify-center">
        <div v-if="avatarUrl">
          <img :src="avatarUrl" class="mb-4 h-24 w-24 rounded-full" />
        </div>
        <div v-else class="relative mb-4 h-24 w-24 rounded-full bg-slate-300">
          <p class="absolute left-0 top-0 flex h-full w-full items-center justify-center">
            尚無大頭貼
          </p>
        </div>
        <!-- 通常應該使用 @change 事件，因為文件選擇應該在文件選擇時觸發，而不是單擊時。 -->
        <!-- <input type="file" @change="Upload($event)" /> -->
        <!-- <button @click="download">按我</button> -->
      </div>
      <div class="mt-5 flex flex-col items-center justify-center gap-5">
        <div class="flex w-full max-w-[300px] items-center justify-start">
          <p class="flex">Name:</p>
          <span class="flex font-bold text-third">&nbsp; {{ store.name }}</span>
        </div>
        <div class="flex w-full max-w-[300px] items-center justify-start">
          <p class="flex">Email:&nbsp;</p>
          <span class="font-bold text-third">&nbsp; {{ store.email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
