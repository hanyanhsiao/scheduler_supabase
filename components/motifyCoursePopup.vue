<script setup>
// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { storeToRefs } from 'pinia'
const classStore = useStoreData()
// API
const { subjectOptions } = storeToRefs(classStore)

// ---------撈領域資料---------
onMounted(() => {
  classStore.getSubject()
  // console.log('修改，原課程', props.currentClass)
})

// 定義事件
const emits = defineEmits(['closePopup', 'save'])
const close = () => {
  // clearForm()
  emits('closePopup')
}

// 定義currentClass屬性
const props = defineProps({
  currentClass: {
    id: String,
    className: String,
    teacher: String,
    grade: String,
    address: String,
    content: String,
    // indexx: Number,
    create_time: String,
    subject: String
    // subject: {
    //   id: String,
    //   name: String
    // }
  }
})

// 修改內容存檔
const save = async () => {
  emits('save')

  // // 用subject.name找正確的subject
  // const updatedSubject = subjectOptions.value.find(
  //   (each) => each.name == props.currentClass.subject.name
  // )
  // console.log('我是正確的領域嗎?拜託是', updatedSubject)
  // props.currentClass.subject = updatedSubject

  // 打API修改
  await classStore.modifyClass(props.currentClass)
  console.log('修改完的課', props.currentClass)

  // 修改完撈出全部課程
  classStore.getClassData()
}

// 清除表單
const clearForm = () => {
  props.currentClass.className = ''
  props.currentClass.teacher = ''
  props.currentClass.subject = {}
  props.currentClass.grade = ''
  props.currentClass.address = ''
  props.currentClass.content = ''
}

// 年級
const gradeOptions = ['小一', '小二', '小三', '小四', '小五', '小六']
</script>

<template>
  <div class="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg sm:max-w-sm vsm:max-w-min">
    <div class="flex items-center justify-between">
      <h1 class="mb-6 text-2xl font-semibold text-third">修改課程</h1>
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
          class="w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-1 focus:ring-third"
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
          class="w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-1 focus:ring-third"
          required
          v-model="props.currentClass.teacher"
        />
      </div>
      <!-- 領域&年級 -->
      <div class="mb-6 flex justify-between gap-6 vsm:flex-wrap">
        <!-- 領域 -->
        <!-- v-model="props.currentClass.subject.name" -->

        <div class="w-full">
          <label for="subject" class="mb-2 block">領域</label>
          <select
            id="subject"
            class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-1 focus:ring-third"
            v-model="props.currentClass.subject"
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
            class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-1 focus:ring-third"
            v-model="props.currentClass.grade"
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
          class="w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-1 focus:ring-third"
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
          class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-1 focus:ring-third"
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
