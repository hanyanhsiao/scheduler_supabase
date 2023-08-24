<script setup>
// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { storeToRefs } from 'pinia'

const classStore = useStoreData()
const { subjectOptions } = storeToRefs(classStore)
// console.log('pinia裡的全部領域', subjectOptions)

// ---------pinia---------

const emits = defineEmits(['closePopup', 'save'])
const close = () => {
  clearForm()
  emits('closePopup')
}

// 定義currentClass屬性
const props = defineProps({
  currentClass: {
    uuid: String,
    className: String,
    teacher: String,
    grade: String,
    address: String,
    content: String,
    indexx: Number,
    updateDate: String,
    subject: {
      id: String,
      name: String
    }
  },
  classTitle: String
})
// console.log('點擊的課程傳入popup', props.currentClass)
// console.log('點擊ㄉ', props.currentClass.subject)
// console.log('撈的', subjectOptions)

onMounted(() => {
  classStore.getSubject()
})

// 修改內容存檔
const save = () => {
  emits('save')
  // console.log(props.currentClass.indexx)
  // 修改
  if (classStore.classData[props.currentClass.indexx]) {
    // console.log('改前', classStore.classData[props.currentClass.indexx])
    classStore.modifyClass(props.currentClass)
    // console.log('改後', classStore.classData[props.currentClass.indexx])
  }
  // 新增
  else {
    console.log('新增')
    classStore.addClass(props.currentClass)
    console.log('新增', classStore.classData)
  }
}

// 清除表單
const clearForm = () => {
  props.currentClass.className = ''
  props.currentClass.teacher = ''
  props.currentClass.subject = ''
  props.currentClass.grade = ''
  props.currentClass.address = ''
  props.currentClass.content = ''
}

// 年級
const gradeOptions = ['小一', '小二', '小三', '小四', '小五', '小六']
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
  <div class="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
    <div class="flex items-center justify-between">
      <h1 class="mb-6 text-2xl font-semibold text-third">{{ classTitle }}</h1>
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
          v-model="props.currentClass.className"
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
          v-model="props.currentClass.teacher"
        />
      </div>
      <!-- 領域&年級 -->
      <div class="mb-6 flex justify-between gap-6">
        <!-- 領域 -->
        <div class="w-full">
          <label for="subject" class="mb-2 block">領域</label>
          <select
            id="subject"
            class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
            v-model="props.currentClass.subject"
            required
          >
            <option
              v-for="subject in subjectOptions"
              :key="subject.id"
              :value="subject"
              :selected="props.currentClass.subjec == subject"
            >
              {{ subject.name }}
            </option>
          </select>
        </div>

        <!-- 年級 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block">年級</label>
          <select
            id="grade"
            class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
            v-model="props.currentClass.grade"
            required
          >
            <option
              v-for="(gradeValue, index) in gradeOptions"
              :key="index"
              :value="gradeValue"
              :selected="props.currentClass.grade == gradeValue"
            >
              {{ gradeValue }}
            </option>
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
          v-model="props.currentClass.address"
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
          v-model="props.currentClass.content"
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
