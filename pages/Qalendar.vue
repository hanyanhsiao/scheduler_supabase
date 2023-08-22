<script setup>
import { Qalendar } from 'qalendar'
// ---------pinia---------
import { useQalendarData } from '../stores/qalendarData'
import { storeToRefs } from 'pinia'

const EventStore = useQalendarData()
const { eventData } = storeToRefs(EventStore)

// ---------首次撈取事件---------
onMounted(() => {
  EventStore.getEventData()
})

// ---------日曆上事件，定義 computed，同時更新 events---------
const events = computed(() => {
  const updatedEvents = []
  eventData.value.forEach((eachEvent) => {
    const colorScheme = getColorScheme(eachEvent.grade)

    updatedEvents.push({
      id: eachEvent.uuid,
      title: eachEvent.className,
      with: eachEvent.teacherName,
      location: eachEvent.address,
      description: eachEvent.content,
      topic: eachEvent.subject,
      time: { start: eachEvent.startTime, end: eachEvent.endTime },
      colorScheme: colorScheme,
      isEditable: true
    })
  })
  return updatedEvents
})

//--------- 拖曳更新日期---------
function dragEvent($event) {
  EventStore.dragEvent($event)
}

// ---------刪除該時段的課程---------
// delete-event回傳uuid
function deleteTimeClass(uuid) {
  EventStore.deleteTimeClass(uuid)
  // console.log('刪除後剩', events.value)
}

// ---------編輯課程時間---------
// @edit-event回傳uuidw

// 彈窗
const togglePopup = ref(false)
const close = () => {
  togglePopup.value = false
}

// 點擊的課程的時間
const currentTime = ref({})

// 帶入彈窗顯示原本時間
function updateTime(uuid) {
  togglePopup.value = !togglePopup.value
  const index = eventData.value.findIndex((event) => event.uuid === uuid)
  if (index !== -1) {
    currentTime.value.startTime = eventData.value[index].startTime
    currentTime.value.endTime = eventData.value[index].endTime
    currentTime.value.uuid = uuid
    // console.log('跟子元件說我的uuid', currentTime.value.uuid)
  }
}

//存入修改的內容
const save = (timeObject) => {
  togglePopup.value = !togglePopup.value
  console.log('改後時間', timeObject)
  EventStore.motifyTime(timeObject)
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

// ---------Qalendar配置檔---------
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
  defaultMode: 'month',
  locale: 'zh-TW'
}
</script>

<template>
  <div class="flex w-full">
    <sideBar />
    <div class="calendar relative flex w-screen flex-col border bg-neutral-200 p-6">
      <!-- 上方篩選 -->
      <div class="mb-6 flex gap-6">
        <!-- 選擇老師 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block text-sm">選擇老師</label>
          <select
            id="grade"
            class="block w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
          >
            <option value="first">王小明</option>
            <option value="second">王2明</option>
            <option value="third">王3明</option>
            <option value="fourth">王4明</option>
            <option value="fifth">王5明</option>
            <option value="sixth">王6明</option>
          </select>
        </div>

        <!-- 選擇領域 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block text-sm">選擇領域</label>
          <select
            id="grade"
            class="block w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
          >
            <option selected value="language">語言</option>
            <option value="technology">科技</option>
            <option value="talent">才藝</option>
          </select>
        </div>

        <!-- 選擇年級 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block text-sm">選擇年級</label>
          <select
            id="grade"
            class="block w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
          >
            <option value="first">小一</option>
            <option value="second">小二</option>
            <option value="third">小三</option>
            <option value="fourth">小四</option>
            <option value="fifth">小五</option>
            <option value="sixth">小六</option>
          </select>
        </div>

        <button
          type="submit"
          class="h-10 w-48 self-end rounded-lg bg-secondary px-2 text-black transition-all hover:bg-third active:scale-90"
        >
          篩選
        </button>
      </div>

      <!-- 下方日曆 -->
      <Qalendar
        :events="events"
        :config="config"
        class="rounded-lg bg-white"
        @event-was-dragged="dragEvent"
        @edit-event="updateTime"
        @delete-event="deleteTimeClass"
      >
        <!-- <template #weekDayEvent="eventProps">
          <div
            :style="{
              backgroundColor: 'cornflowerblue',
              color: '#fff',
              width: '100%',
              height: '100%',
              overflow: 'hidden'
            }"
          >
            <span>{{ timeFormattingFunction(eventProps.eventData.time) }}</span>

            <span>{{ eventProps.eventData.title }}</span>
          </div>
        </template> -->
        <!-- <template #eventDialog="props">
          <div v-if="props.eventDialogData && props.eventDialogData.title">
            <div :style="{ marginBottom: '8px' }">Edit event</div>

            <input
              class="flyout-input"
              type="text"
              :style="{ width: '90%', padding: '8px', marginBottom: '8px' }"
            />

            <button class="close-flyout" @click="props.closeEventDialog">Finished!</button>
          </div>
        </template> -->
      </Qalendar>

      <!-- 遮罩 -->
      <div class="absolute left-0 top-0 h-full w-full bg-black/30" v-if="togglePopup">
        <!-- 彈窗 -->
        <div class="z-50 rounded-md bg-white">
          <motifyTime
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            @closePopup="close"
            @save="save"
            :currentTime="currentTime"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import 'qalendar/dist/style.css';
</style>
