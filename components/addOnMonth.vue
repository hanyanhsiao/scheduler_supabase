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
const props = defineProps({
  NewClass: {
    type: Object,
    default: () => ({
      date: '',
      course: '請選擇'
    })
  }
})

// 關閉彈窗
const close = () => {
  emits('closePopup')
}

// ---------VDatePicker設定檔---------
const timezone = ref('Asia/Taipei')
const range = ref({
  start: props.NewClass.date + ' 00:00:00', //new Date(props.NewClass.date)
  end: props.NewClass.date + ' 00:00:00' //new Date(props.NewClass.date)
})
console.log(range)
// console.log(props.NewClass)
// console.log('點擊的回傳', props.NewClass.date)
// console.log('轉換後', new Date(props.NewClass.date))

// ---------可以新增的課程選單---------
const optionCourse = classData.value
console.log('可以加的課程選項', optionCourse)
const courseList = ref([])
courseList.value = classData.value.map((course) => {
  return {
    id: course.id,
    name: course.name
  }
})

// ---------時間排列RWD---------
const smLabel = ref(window.innerWidth < 768)
const checkWindowSize = () => {
  smLabel.value = window.innerWidth < 768
}
onMounted(() => {
  window.addEventListener('resize', checkWindowSize)
})

// ---------新增課程---------
const newCourse = ref()

const saveNewClass = () => {
  console.log('newCourse', newCourse.value)
  if (!newCourse.value) {
    alert('請選擇課程')
    return
  }

  // 將id改名為courseID，並將其他資料解構出來
  let { id: courseID, ...ClassInfo } = newCourse.value
  const saveClass = {
    ...ClassInfo,
    courseID,
    startTime: dayjs(range.value.start).format('YYYY-MM-DD HH:mm'),
    endTime: dayjs(range.value.end).format('YYYY-MM-DD HH:mm')
  }
  // console.log('我是要新增的課程(月)', saveClass)

  EventStore.addNewClass(saveClass)
  emits('closePopup')
}
</script>

<template>
  <div class="max-w-sm rounded-lg bg-white p-6 shadow-lg sm:w-full sm:max-w-xs">
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
        <SelectDropdown
          :identity-list="optionCourse"
          @send="
            async (res) => {
              newCourse = res
            }
          "
        />
        <!-- <select
          id="course"
          class="block w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-1 focus:ring-third"
          required
          v-model="props.NewClass.course"
        >
          <option v-for="(course, index) in optionCourse" :key="index" :value="course">
            {{ course.name }}
          </option>
        </select> -->
      </div>

      <!-- 時間設定 -->
      <div class="mb-6 flex w-full flex-col justify-center py-3 sm:py-0">
        <div class="mb-2 flex justify-start gap-12" v-if="!smLabel">
          <label for="appt" class="ml-3 sm:ml-0">選擇起始時間：</label>
          <label for="appt" class="">選擇結束時間：</label>
        </div>
        <label for="appt" class="flex sm:mb-3 sm:justify-center" v-else
          >選擇起始時間與結束時間：</label
        >

        <VDatePicker v-model.range="range" mode="time" :timezone="timezone" />
        <!-- :is24hr="true" -->
      </div>

      <!-- 儲存 -->
      <div class="flex justify-between gap-6">
        <button
          type="submit"
          class="mx-auto block w-32 rounded-md bg-secondary py-2 transition-all hover:bg-third hover:text-white active:scale-90"
        >
          儲存
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
