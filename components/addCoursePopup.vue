<script setup>
// const router = useRouter()
// router.go(0)
// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { storeToRefs } from 'pinia'
const classStore = useStoreData()
// API
const { subjectOptions } = storeToRefs(classStore)

// ---------撈領域資料---------
onMounted(() => {
  classStore.getSubject()
  // console.log('我是新增的彈窗')
})

// 定義父元件事件(關閉及儲存)
const emits = defineEmits(['closePopup', 'save'])
const close = () => {
  // Object.values() 取得所有 property value
  // some方法測試是否至少有一個元素通過測試，返回true
  const inputValue = Object.values(inputClass.value)
  // console.log(inputValue)
  const isNotEmpty = inputValue.some((value) => value.trim() !== '')
  if (isNotEmpty) {
    const yes = confirm('內容尚未儲存，確定要離開嗎?')
    if (!yes) {
      return
    }
  }
  clearForm()
  emits('closePopup')
}

// 定義inputClass
const inputClass = ref({})

// ---------新增課程存檔---------
const save = async () => {
  emits('save')

  // 用subject.name找正確的subject
  const subjectName = inputClass.value.subject
  const updatedSubject = subjectOptions.value.find((each) => each.name === subjectName)
  // console.log('我是正確的領域嗎?拜託是', updatedSubject)
  inputClass.value.subject = updatedSubject
  console.log('輸入的內容', inputClass.value)

  // 打API新增
  await classStore.addClass(inputClass.value)

  // 新增完撈出全部課程顯示
  classStore.getClassData()
  // 清除上一個彈窗內容
  clearForm()
  // console.log('新增後清除inputClass', inputClass.value)
}

// 清除表單
const clearForm = () => {
  inputClass.value = {}
}

// 年級
const gradeOptions = ['小一', '小二', '小三', '小四', '小五', '小六']
// API
// const subjectOptions = [
//   {
//     id: 2,
//     name: '科技',
//     delete_time: null
//   },
//   {
//     id: 3,
//     name: '語言',
//     delete_time: null
//   },
//   {
//     id: 4,
//     name: '才藝',
//     delete_time: null
//   }
// ]
</script>

<template>
  <div class="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg sm:max-w-sm vsm:max-w-min">
    <div class="flex items-center justify-between">
      <h1 class="mb-6 text-2xl font-semibold text-third">新增課程</h1>
      <!-- 關閉 -->
      <div
        class="mb-4 flex h-7 w-7 cursor-pointer self-start rounded-md p-1 text-xl transition-all hover:bg-secondary active:scale-90"
        @click="close"
      >
        <ClientOnly>
          <Icon name="material-symbols:close" />
        </ClientOnly>
      </div>
    </div>

    <form @submit.prevent="save">
      <!-- 課程名稱 -->
      <div class="mb-6">
        <label for="className" class="mb-2 block">課程名稱</label>
        <input
          type="text"
          id="className"
          name="className"
          class="w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
          required
          v-model="inputClass.className"
        />
      </div>
      <!-- 老師名稱 -->
      <div class="mb-6">
        <label for="teacher" class="mb-2 block">老師名稱</label>
        <input
          type="text"
          id="teacher"
          name="teacher"
          class="w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
          required
          v-model="inputClass.teacher"
        />
      </div>
      <!-- 領域&年級 -->
      <div class="mb-6 flex justify-between gap-6 vsm:flex-wrap">
        <!-- 領域 -->
        <div class="w-full">
          <label for="subject" class="mb-2 block">領域</label>
          <select
            id="subject"
            class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
            v-model="inputClass.subject"
          >
            <option v-for="subject in subjectOptions" :key="subject.id" :value="subject.name">
              {{ subject.name }}
            </option>
            <!-- :selected="props.currentClass.subject.name == subject.name" -->
          </select>
        </div>

        <!-- 年級 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block">年級</label>
          <select
            id="grade"
            class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
            v-model="inputClass.grade"
            required
          >
            <option v-for="(gradeValue, index) in gradeOptions" :key="index" :value="gradeValue">
              {{ gradeValue }}
            </option>
            <!-- :selected="props.currentClass.grade == gradeValue" -->
          </select>
        </div>
      </div>
      <!-- 上課地點 -->
      <div class="mb-6">
        <label for="content" class="mb-2 block">上課地點</label>
        <input
          type="text"
          id="address"
          name="address"
          class="w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
          required
          v-model="inputClass.address"
        />
      </div>
      <!-- 課程內容 -->
      <div class="mb-6">
        <label for="content" class="mb-2 block">課程內容</label>
        <textarea
          id="content"
          rows="3"
          class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
          required
          v-model="inputClass.content"
        ></textarea>
      </div>

      <!-- 儲存/取消 -->
      <div class="flex">
        <button
          type="submit"
          class="mx-auto block w-32 rounded-lg bg-secondary py-2 transition-all hover:bg-third active:scale-90"
        >
          儲存
        </button>
        <button
          type="button"
          class="mx-auto block w-32 rounded-lg border-2 border-secondary py-2 transition-all hover:bg-third active:scale-90"
          @click="clearForm"
        >
          清除
        </button>
      </div>
    </form>
  </div>
</template>
