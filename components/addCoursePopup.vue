<script setup>
// const router = useRouter()
// router.go(0)
// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { storeToRefs } from 'pinia'
const classStore = useStoreData()
const { subjectOptions } = storeToRefs(classStore)

const inputClass = ref({})
// 年級
const gradeOptions = [
  { id: 1, name: '小一' },
  { id: 2, name: '小二' },
  { id: 3, name: '小三' },
  { id: 4, name: '小四' },
  { id: 5, name: '小五' },
  { id: 6, name: '小六' }
]

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

// ---------function---------
onMounted(() => {
  classStore.getSubject()
})

const save = async () => {
  emits('save')

  // -----------------supabase-------------------
  console.log('輸入的內容', inputClass.value)

  // 打API新增
  await classStore.addClass(inputClass.value)

  // 新增完撈出全部課程顯示
  classStore.getClassData()
  // 清除上一個彈窗內容
  clearForm()
  // console.log('新增後清除inputClass', inputClass.value)
}

const clearForm = () => {
  console.log('inputClass.value', inputClass.value)

  inputClass.value = {}
  console.log('inputClass.value', inputClass.value)
}
</script>

<template>
  <div class="w-full p-6 sm:p-4 vsm:p-4">
    <div class="flex items-center justify-between">
      <h1 class="mb-6 text-2xl font-semibold text-third sm:mb-4 vsm:mb-4">新增課程</h1>
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
      <div class="mb-6 sm:mb-4 vsm:mb-2">
        <label for="name" class="mb-1 block">課程名稱</label>
        <input
          type="text"
          id="name"
          name="name"
          class="w-full rounded-md border bg-gray-50 p-2 text-sm focus:border-third focus:outline-none"
          required
          v-model="inputClass.name"
        />
      </div>
      <!-- 老師名稱 -->
      <div class="mb-6 sm:mb-4 vsm:mb-2">
        <label for="teacher" class="mb-1 block">老師名稱</label>
        <input
          type="text"
          id="teacher"
          name="teacher"
          class="w-full rounded-md border bg-gray-50 p-2 text-sm focus:border-third focus:outline-none"
          required
          v-model="inputClass.teacher"
        />
      </div>
      <!-- 領域&年級 -->
      <div class="mb-6 flex justify-between gap-6 sm:mb-4 sm:gap-4 vsm:mb-2 vsm:flex-wrap">
        <!-- 領域 -->
        <div class="w-full">
          <label for="subject" class="mb-1 block">領域</label>
          <SelectDropdown
            :identity-list="subjectOptions"
            @send="
              async (res) => {
                inputClass.subject = res?.name
              }
            "
          />
          <!-- <select
            id="subject"
            class="block w-full rounded-md border bg-gray-50 p-2 focus:outline-none focus:ring-1 focus:ring-third"
            v-model="inputClass.subject"
            required
          >
            <option v-for="subject in subjectOptions" :key="subject.id" :value="subject.name">
              {{ subject.name }}
            </option>
          </select> -->
        </div>

        <!-- 年級 -->
        <div class="w-full">
          <label for="grade" class="mb-1 block">年級</label>
          <SelectDropdown
            :identity-list="gradeOptions"
            @send="
              async (res) => {
                inputClass.grade = res?.name
              }
            "
          />
          <!-- <select
            id="grade"
            class="block w-full rounded-md border bg-gray-50 p-2 focus:outline-none focus:ring-1 focus:ring-third"
            v-model="inputClass.grade"
            @change="validateGrade"
            required
          >
            <option v-for="(gradeValue, index) in gradeOptions" :key="index" :value="gradeValue">
              {{ gradeValue }}
            </option>
          </select> -->
        </div>
      </div>
      <!-- 上課地點 -->
      <div class="mb-6 sm:mb-4 vsm:mb-2">
        <label for="content" class="mb-1 block">上課地點</label>
        <input
          type="text"
          id="address"
          name="address"
          class="w-full rounded-md border bg-gray-50 p-2 text-sm focus:border-third focus:outline-none"
          required
          v-model="inputClass.address"
        />
      </div>
      <!-- 課程內容 -->
      <div class="mb-6 sm:mb-4">
        <label for="content" class="mb-1 block">課程內容</label>
        <textarea
          id="content"
          rows="3"
          class="block w-full resize-none rounded-md border bg-gray-50 p-2 text-sm focus:border-third focus:outline-none"
          required
          v-model="inputClass.content"
        ></textarea>
      </div>

      <!-- 儲存/取消 -->
      <div class="flex">
        <button
          type="submit"
          class="mx-auto block w-32 rounded-md bg-secondary py-2 transition-all hover:bg-third hover:text-white active:scale-90"
        >
          儲存
        </button>
        <button
          type="button"
          class="mx-auto block w-32 rounded-md border border-third py-2 transition-all hover:bg-third hover:text-white active:scale-90"
          @click="clearForm"
        >
          清除
        </button>
      </div>
    </form>
  </div>
</template>
