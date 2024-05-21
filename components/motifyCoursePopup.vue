<script setup>
// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { storeToRefs } from 'pinia'
const classStore = useStoreData()
const { subjectOptions } = storeToRefs(classStore)

// ---------------------

// 年級
const gradeOptions = [
  { id: 1, name: '小一' },
  { id: 2, name: '小二' },
  { id: 3, name: '小三' },
  { id: 4, name: '小四' },
  { id: 5, name: '小五' },
  { id: 6, name: '小六' }
]

const subject = ref('')
const grade = ref('')

const emits = defineEmits(['closePopup', 'save'])
const close = () => {
  // clearForm()
  emits('closePopup')
}

const props = defineProps({
  currentClass: {
    id: String,
    className: String,
    teacher: String,
    grade: String,
    address: String,
    content: String,
    create_time: String,
    subject: String
    // subject: {
    //   id: String,
    //   name: String
    // }
  }
})

// ---------API---------
onMounted(() => {
  classStore.getSubject()
  // console.log('修改前原課程', props.currentClass)
})

// 修改內容存檔
const save = async () => {
  emits('save')
  props.currentClass.subject = subject.value
  props.currentClass.grade = grade.value
  // console.log('修改後課程內容', props.currentClass)

  // 打API修改
  await classStore.modifyClass(props.currentClass)

  // 修改完撈出全部課程
  classStore.getClassData()
}

// 清除表單
const clearForm = () => {
  props.currentClass.className = ''
  props.currentClass.teacher = ''
  props.currentClass.subject = {}
  props.currentClass.grade = {}
  props.currentClass.address = ''
  props.currentClass.content = ''
}
</script>

<template>
  <div class="w-full p-6 sm:p-4">
    <div class="flex items-center justify-between">
      <h1 class="mb-6 text-2xl font-semibold text-third sm:mb-4">修改課程</h1>
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
        <label for="className" class="mb-1 block">課程名稱</label>
        <input
          type="text"
          id="className"
          name="className"
          class="w-full rounded-md border bg-gray-50 p-2 text-sm focus:border-third focus:outline-none"
          required
          v-model="props.currentClass.className"
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
          v-model="props.currentClass.teacher"
        />
      </div>
      <!-- 領域&年級 -->
      <!-- {{ props.currentClass.subject }} -->
      <div class="sm:gap-4b mb-6 flex justify-between gap-6 sm:mb-4 vsm:mb-2 vsm:flex-wrap">
        <!-- 領域 -->
        <!-- v-model="props.currentClass.subject.name" -->

        <div class="w-full">
          <label for="subject" class="mb-1 block">領域</label>
          <SelectDropdown
            :identity-list="subjectOptions"
            :origin-list="props.currentClass.subject"
            @send="
              async (res) => {
                subject = res?.name
              }
            "
          />
          <!-- <select
            id="subject"
            class="block w-full rounded-md border bg-gray-50 p-2 focus:border-third focus:outline-none"
            v-model="props.currentClass.subject"
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
            :origin-list="props.currentClass.grade"
            @send="
              async (res) => {
                grade = res?.name
              }
            "
          />
          <!-- <select
            id="grade"
            class="block w-full rounded-md border bg-gray-50 p-2 focus:border-third focus:outline-none"
            v-model="props.currentClass.grade"
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
          v-model="props.currentClass.address"
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
          v-model="props.currentClass.content"
        ></textarea>
      </div>

      <!-- 儲存/取消 -->
      <div class="flex">
        <button
          type="submit"
          class="mx-auto block w-32 rounded-md bg-secondary py-2 transition-all hover:bg-third active:scale-90"
        >
          儲存
        </button>
        <button
          type="button"
          class="mx-auto block w-32 rounded-md border-2 border-secondary py-2 transition-all hover:bg-third active:scale-90"
          @click="clearForm"
        >
          清除
        </button>
      </div>
    </form>
  </div>
</template>
