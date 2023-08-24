<script setup>
import dayjs from 'dayjs'

// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { storeToRefs } from 'pinia'

const classStore = useStoreData()
const { classData } = storeToRefs(classStore)
// console.log(classData.value)

// ---------定義子元件事件及屬性---------
const emits = defineEmits(['closePopup', 'saveNewClass'])
// 定義屬性
const props = defineProps({
  NewClass: {
    startTime: String,
    endTime: String
  }
})

// console.log('取得點擊的日期', props.NewClass.date)

// 關閉彈窗
const close = () => {
  emits('closePopup')
}

// 修改內容存檔
const saveNewClass = () => {
  const saveClass = { ...props.NewClass.course }
  saveClass.startTime = dayjs(range.value.start).format('YYYY-MM-DD HH:mm')
  saveClass.endTime = dayjs(range.value.end).format('YYYY-MM-DD HH:mm')
  // console.log('完整的課程', saveClass)
  emits('saveNewClass', saveClass)
}

// 清除表單
const clearForm = () => {
  // props.NewClass.startTime = new Date()
  // props.NewClass.endTime = new Date()
  props.NewClass.course = ''
}

// VDatePicker設定檔
const timezone = ref('Asia/Hong_Kong')
const range = ref({
  start: props.NewClass.date,
  end: props.NewClass.date
})
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
      <div class="mb-6">
        <label for="course" class="mb-2 block">選擇課程</label>
        <select
          id="course"
          class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
          required
          v-model="props.NewClass.course"
        >
          <option v-for="(course, index) in classData" :key="index" :value="course">
            {{ course.className }}
          </option>
        </select>
      </div>

      <!-- 時間設定 -->
      <div class="mb-6 flex w-full flex-col justify-center py-3">
        <div class="mb-2 flex justify-start gap-16">
          <label for="appt" class="ml-6">選擇起始時間：</label>
          <label for="appt" class="">選擇結束時間：</label>
        </div>
        <VDatePicker v-model.range="range" mode="time" :timezone="timezone" />
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
