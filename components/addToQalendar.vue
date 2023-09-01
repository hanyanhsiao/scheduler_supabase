<script setup>
import dayjs from 'dayjs'

// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { useQalendarData } from '../stores/qalendarData'
import { storeToRefs } from 'pinia'

const classStore = useStoreData()
const { classData } = storeToRefs(classStore)

const EventStore = useQalendarData()
const { eventData } = storeToRefs(EventStore)

// ---------定義子元件事件及屬性---------
const emits = defineEmits(['closePopup'])
// 定義屬性
const props = defineProps({
  NewClass: {
    date: String
  }
})

// 關閉彈窗
const close = () => {
  emits('closePopup')
}

// ---------修改內容存檔---------
const saveNewClass = () => {
  // const saveClass = { ...props.NewClass.course }
  const saveClass = {}
  saveClass.course = props.NewClass.course //透過v-model帶進來的整個課程資料
  saveClass.startTime = dayjs(range.value.start).format('YYYY-MM-DD HH:mm')
  saveClass.endTime = dayjs(range.value.end).format('YYYY-MM-DD HH:mm')
  // saveClass.id = new Date() //用新增日期給新id
  console.log('我是要新增的課程', saveClass)

  EventStore.addNewClass(saveClass)
  props.NewClass.course = ''
  emits('closePopup')
}

// ---------清除表單---------
const clearForm = () => {
  props.NewClass.course = ''
}

// ---------VDatePicker設定檔---------
const timezone = ref('Asia/Taipei')
const range = ref({
  start: props.NewClass.date + ' 00:00:00', //new Date(props.NewClass.date)
  end: props.NewClass.date + ' 00:00:00' //new Date(props.NewClass.date)
})
// console.log(range)
// console.log(props.NewClass)

// console.log('點擊的回傳', props.NewClass.date)
// console.log('轉換後', new Date(props.NewClass.date))

// ---------可以新增的課程選單---------
const optionCourse = classData.value

// 如果在eventData中找不到相同id的課程物件，
// 則這個判斷式會返回true，代表這個課程物件需要保留。
// const optionCourse = classData.value.filter((course) => {
//   // 找不到符合的課程物件，find會返回undefined，!undefined =true
//   return !eventData.value.find((eventCourse) => eventCourse.id === course.id)
// })
// console.log('可以加的課程選項', optionCourse)
</script>

<template>
  <div class="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
    <!-- 標題及關閉 -->
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

    <form @submit.prevent="saveNewClass" class="">
      <!-- 選擇課程 -->
      <div class="mb-6" v-if="optionCourse">
        <label for="course" class="mb-2 block">選擇課程</label>
        <select
          id="course"
          class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
          required
          v-model="props.NewClass.course"
        >
          <option v-for="(course, index) in optionCourse" :key="index" :value="course">
            {{ course.className }}
          </option>
        </select>
      </div>

      <!-- 時間設定 -->
      <div class="mb-6 flex w-full flex-col justify-center py-3">
        <div class="mb-2 flex justify-start gap-14">
          <label for="appt" class="ml-6">選擇起始時間：</label>
          <label for="appt" class="">選擇結束時間：</label>
        </div>
        <VDatePicker v-model.range="range" mode="time" :timezone="timezone" />
        <!-- :is24hr="true" -->
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

<style scoped>
.vc-bordered {
  border: 0px solid grey;
  /* background-color: #fffbeb; */
  gap: 2rem;
  justify-content: center;
  width: 100%;
}
</style>
