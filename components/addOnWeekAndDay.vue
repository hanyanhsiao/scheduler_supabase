<script setup>
import dayjs from 'dayjs'

// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { useQalendarData } from '../stores/qalendarData'
import { storeToRefs } from 'pinia'

const classStore = useStoreData()
const { classData } = storeToRefs(classStore)

const EventStore = useQalendarData()
// const { eventData } = storeToRefs(EventStore)

// ---------定義子元件事件及屬性---------
const emits = defineEmits(['closePopup'])
// 定義屬性
const props = defineProps({
  NewWeekClass: {
    startTime: String,
    endTime: String
  }
})

// 關閉彈窗
const close = () => {
  emits('closePopup')
}

// ---------修改內容存檔---------
const saveWeekClass = () => {
  // console.log(props.NewWeekClass)

  const saveWeekClass = {}
  saveWeekClass.course = props.NewWeekClass.course //透過v-model帶進來的整個課程資料
  saveWeekClass.startTime = dayjs(range.value.start).format('YYYY-MM-DD HH:mm')
  saveWeekClass.endTime = dayjs(range.value.end).format('YYYY-MM-DD HH:mm')
  // console.log('我是要新增的課程', saveWeekClass)

  EventStore.addNewClass(saveWeekClass)
  props.NewWeekClass.course = ''
  emits('closePopup')
}

// ---------清除表單---------
const clearForm = () => {
  props.NewWeekClass.course = ''
}

// ---------VDatePicker設定檔---------
const timezone = ref('Asia/Taipei')
const range = ref({
  start: props.NewWeekClass.startTime,
  end: props.NewWeekClass.startTime
})

// ---------時間排列RWD---------
const vsmLabel = ref(window.innerWidth < 414)
const checkWindowSize = () => {
  vsmLabel.value = window.innerWidth < 414
}
onMounted(() => {
  window.addEventListener('resize', checkWindowSize)
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

    <form @submit.prevent="saveWeekClass" class="">
      <!-- 選擇課程 -->
      <div class="mb-6" v-if="classData">
        <label for="course" class="mb-2 block">選擇課程</label>
        <select
          id="course"
          class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-1 focus:ring-third"
          required
          v-model="props.NewWeekClass.course"
        >
          <option v-for="(course, index) in classData" :key="index" :value="course">
            {{ course.className }}
          </option>
        </select>
      </div>

      <!-- 時間設定 -->
      <div class="vsm: mb-6 flex w-full flex-col justify-center py-3 vsm:py-0">
        <div class="mb-2 flex justify-start gap-14" v-if="!vsmLabel">
          <label for="appt" class="ml-6 vsm:ml-0">選擇起始時間：</label>
          <label for="appt" class="">選擇結束時間：</label>
        </div>
        <label for="appt" class="flex vsm:mb-3 vsm:justify-center" v-else
          >選擇起始時間與結束時間：</label
        >

        <VDatePicker v-model.range="range" mode="time" :timezone="timezone" />
        <!-- :is24hr="true" -->
      </div>

      <!-- 儲存/取消 -->
      <div class="flex gap-3">
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
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 414px) {
  .vc-bordered {
    gap: 1rem;
  }
}
</style>
