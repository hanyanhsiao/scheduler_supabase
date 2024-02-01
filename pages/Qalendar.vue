<script setup>
import { Qalendar } from 'qalendar'
// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { useQalendarData } from '../stores/qalendarData'
import { storeToRefs } from 'pinia'

const classStore = useStoreData()
const { classData } = storeToRefs(classStore)
const { subjectOptions } = storeToRefs(classStore)

const EventStore = useQalendarData()
const { eventData } = storeToRefs(EventStore)
// console.log('已安排的課程', eventData.value)

// ---------首次撈取已安排的課表---------
onMounted(() => {
  classStore.getClassData()
  classStore.getSubject()
  EventStore.getEventData()
  // console.log(eventData)
})

// -------------篩選課程-------------
const isSelectedTeacher = ref('0')
const isSelectedSubject = ref('0')
const isSelectedGrade = ref('0')
// 篩選後顯示的陣列
const results = ref([])

function search() {
  // 在三個都是--請選擇--的狀態下是預設全撈，可以做新增刪除修改
  if (
    isSelectedTeacher.value === '0' &&
    isSelectedSubject.value === '0' &&
    isSelectedGrade.value === '0'
  ) {
    results.value = []
    return
  }

  // 若沒有選value==='0'就回傳全部
  const filterData = (selectedValue, property) => {
    return selectedValue === '0'
      ? eventData.value
      : eventData.value.filter((eachCourse) => {
          return eachCourse[property].includes(selectedValue)
        })
  }

  const teacher = filterData(isSelectedTeacher.value, 'teacher')
  const subject = filterData(isSelectedSubject.value, 'subject')
  const grade = filterData(isSelectedGrade.value, 'grade')
  // console.log('老師:', teacher)
  // console.log('領域', subject)
  // console.log('年級', grade)

  // 賦值給results.value顯示在日曆上
  results.value = teacher.filter((course) => subject.includes(course) && grade.includes(course))

  // 條件沒符合時
  if (results.value.length === 0) {
    alert('沒有符合篩選條件的課程')
    // select回到"請選擇"
    isSelectedTeacher.value = '0'
    isSelectedSubject.value = '0'
    isSelectedGrade.value = '0'
  }

  // console.log('我選了啥?', results.value)
}

// ---------日曆上事件，定義computed，同時更新events(Qalendar的參數)---------
const events = computed(() => {
  // 日曆上陣列
  const updatedEvents = ref([])

  // 篩選
  if (results.value.length > 0) {
    results.value.forEach((eachEvent) => {
      const colorScheme = getColorScheme(eachEvent.grade)
      // 賦值給Qalendar屬性
      updatedEvents.value.push({
        id: eachEvent.id,
        title: eachEvent.className,
        with: eachEvent.teacher,
        location: eachEvent.address,
        description: eachEvent.content,
        topic: eachEvent.subject,
        time: { start: eachEvent.startTime, end: eachEvent.endTime },
        colorScheme: colorScheme,
        isEditable: true
      })
    })
  }
  // 全部
  else {
    eventData.value.forEach((eachEvent) => {
      const colorScheme = getColorScheme(eachEvent.grade)
      // 賦值給Qalendar屬性
      updatedEvents.value.push({
        id: eachEvent.id,
        title: eachEvent.className,
        with: eachEvent.teacher,
        location: eachEvent.address,
        description: eachEvent.content,
        topic: eachEvent.subject,
        time: { start: eachEvent.startTime, end: eachEvent.endTime },
        colorScheme: colorScheme,
        isEditable: true
      })
    })
  }

  return updatedEvents.value
})

//--------- 拖曳更新日期---------
function dragEvent($event) {
  EventStore.dragEvent($event)
}

// ---------刪除該時段的課程(@delete-event回傳id)---------
function deleteEvent(id) {
  // console.log('刪除回傳啥?', id)
  EventStore.deleteTimeClass(id)
}

// ---------編輯課程時間(@edit-event回傳id)---------
// 彈窗
const togglePopup = ref(false)
const toggleAddClassPopup = ref(false)
const weekDayPopup = ref(false)

// 關閉彈窗
const close = () => {
  togglePopup.value = false
  toggleAddClassPopup.value = false
  weekDayPopup.value = false
}

// 點擊的課程的時間
const currentTime = ref({})

// 帶入彈窗顯示原本時間
function updateTime(id) {
  // console.log(id)

  // setTimeout(() => {
  // }, 100)
  togglePopup.value = true

  const index = eventData.value.findIndex((event) => event.id === id)
  if (index !== -1) {
    currentTime.value.startTime = eventData.value[index].startTime
    currentTime.value.endTime = eventData.value[index].endTime
    currentTime.value.id = id
    // console.log('跟子元件說我的id', currentTime.value.id)
  }
}

// ---------新增課程至日曆(月)---------
const lastClicked = ref(null)
const NewClass = ref({})
// console.log(NewClass)

//判斷是新增還點擊事件
// 點擊事件
function eventClicked() {
  // console.log('點擊事件')

  lastClicked.value = 'event'
}

// 新增事件
function dateClicked(date) {
  if (lastClicked.value !== 'event') {
    // console.log('新增', date)
    toggleAddClassPopup.value = true
    //顯示點擊的日期至addToQalendar的彈窗
    NewClass.value.date = date
  }
  lastClicked.value = null // 重置標誌
}

// ---------新增課程至日曆(週 & 日)---------
const NewWeekClass = ref({})

function datetimeClicked(clickTime) {
  weekDayPopup.value = true
  NewWeekClass.value.startTime = clickTime
  // console.log(NewWeekClass.value.startTime)
}

// ---------事件顏色(依年級)---------
function getColorScheme(grade) {
  switch (grade) {
    case '小一':
      return 'first'
    case '小二':
      return 'second'
    case '小三':
      return 'third'
    case '小四':
      return 'fourth'
    case '小五':
      return 'fifth'
    case '小六':
      return 'sixth'
    default:
      return 'first'
  }
}

// ---------Qalendar配置---------
const config = {
  style: {
    colorSchemes: {
      first: {
        color: '#000000',
        backgroundColor: '#fed7aa'
      },
      second: {
        color: '#fff',
        backgroundColor: '#805ad5'
      },
      third: {
        color: '#fff',
        backgroundColor: '#38a169'
      },
      fourth: {
        color: '#fff',
        backgroundColor: '#d69e2e'
      },
      fifth: {
        color: '#fff',
        backgroundColor: '#e53e3e'
      },
      sixth: {
        color: '#fff',
        backgroundColor: '#3182ce'
      }
    }
  },
  month: {
    // Hide leading and trailing dates in the month view (defaults to true when not set)
    showTrailingAndLeadingDates: false
  },
  defaultMode: 'month',
  locale: 'zh-TW'
}
// ---------老師/年級下拉選單---------
const set = new Set()
const setTeacher = classData.value.filter((course) =>
  set.has(course.teacher) ? false : set.add(course.teacher)
)
// console.log(setTeacher)
// console.log('不重複的所有老師陣列', setTeacher)
const gradeOptions = ['小一', '小二', '小三', '小四', '小五', '小六']

// ---------週 & 日拉大小調整時間---------
function resizedTime(event) {
  console.log('拉大小回傳', event)
  EventStore.dragEvent(event)
}
//------------------------------
// @wheel="handleWheel"
// const handleWheel = (event) => {
//   if (event.deltaY < 0) {
//     // 滾輪向上滾動
//     // 我想要向上滾動的時候，讓他回到上個月

//   } else {
//     // 滾輪向下滾動
//   }
// }
</script>

<!-- ------------------------【template】------------------------ -->
<template>
  <div class="flex w-full">
    <sideBar />

    <!-- 右側日曆 -->
    <section class="relative flex w-10/12 flex-col border bg-bgGray p-6">
      <!-- 上方篩選 -->
      <div class="mb-6 flex gap-6 sm:flex-wrap sm:gap-3" v-if="eventData">
        <!-- 選擇老師 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block">選擇老師</label>
          <select
            id="grade"
            class="block w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-third"
            v-model="isSelectedTeacher"
          >
            <option value="0" selected>--請選擇--</option>
            <option v-for="course in setTeacher" :key="course.id" :value="course.teacher">
              {{ course.teacher }}
            </option>
          </select>
        </div>

        <!-- 選擇領域 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block">選擇領域</label>
          <select
            id="grade"
            class="block w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-third"
            v-model="isSelectedSubject"
          >
            <option value="0" selected>--請選擇--</option>
            <option v-for="subject in subjectOptions" :key="subject.id" :value="subject.name">
              {{ subject.name }}
            </option>
          </select>
        </div>

        <!-- 選擇年級 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block">選擇年級</label>
          <select
            id="grade"
            class="block w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-third"
            v-model="isSelectedGrade"
          >
            <option value="0" selected>--請選擇--</option>
            <option v-for="(gradeValue, index) in gradeOptions" :key="index" :value="gradeValue">
              {{ gradeValue }}
            </option>
          </select>
        </div>

        <button
          type="submit"
          class="h-10 w-48 self-end rounded-lg border border-third bg-primary px-2 font-bold transition-all hover:bg-secondary active:scale-90 sm:mt-2 sm:w-full"
          @click="search"
        >
          篩選
        </button>
      </div>

      <!-- 下方日曆 -->
      <Qalendar
        class="rounded-lg bg-white shadow-md"
        :events="events"
        :config="config"
        @event-was-dragged="dragEvent"
        @edit-event="updateTime"
        @delete-event="deleteEvent"
        @date-was-clicked="dateClicked"
        @event-was-clicked="eventClicked"
        @datetime-was-clicked="datetimeClicked"
        @event-was-resized="resizedTime"
      >
      </Qalendar>

      <!-- 遮罩 -->
      <div
        class="absolute left-0 top-0 h-full w-full bg-black/30"
        v-if="togglePopup || toggleAddClassPopup || weekDayPopup"
      >
        <!-- 修改時間彈窗 -->
        <div class="z-50 rounded-md bg-white" v-if="togglePopup">
          <motifyTime
            class="fixed left-1/2 top-1/2 -translate-x-1/4 -translate-y-1/2 sm:max-w-fit"
            @closePopup="close"
            :currentTime="currentTime"
          />
        </div>

        <!-- 新增課程至日曆彈窗(月) -->
        <div class="z-50 rounded-md bg-white" v-if="toggleAddClassPopup">
          <addOnMonth
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            @closePopup="close"
            :NewClass="NewClass"
          />
        </div>

        <!-- 新增課程至日曆彈窗(週跟日) -->
        <div class="z-50 rounded-md" v-if="weekDayPopup">
          <addOnWeekAndDay
            class="fixed left-1/2 top-1/2 -translate-x-1/4 -translate-y-1/2 sm:absolute sm:top-1/4 sm:-translate-x-1/2"
            @closePopup="close"
            :NewWeekClass="NewWeekClass"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import 'qalendar/dist/style.css';
</style>
