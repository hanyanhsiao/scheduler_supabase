<script setup>
// ---------pinia---------
import { useQalendarData } from '../stores/qalendarData'
import { storeToRefs } from 'pinia'

const EventStore = useQalendarData()
const { eventData } = storeToRefs(EventStore)

// ---------定義---------
// 定義事件
const emits = defineEmits(['closePopup'])

// 定義屬性
const props = defineProps({
  currentTime: {
    startTime: String,
    endTime: String,
    id: String
  }
})
// 關閉彈窗
const close = () => {
  emits('closePopup')
}

//--------- 修改內容存檔---------
const save = () => {
  props.currentTime.startTime = range.value.start
  props.currentTime.endTime = range.value.end
  // console.log(props.currentTime)
  EventStore.motifyTime(props.currentTime)
  emits('closePopup')
}

//---------VDatePicker設定檔---------
const timezone = ref('Asia/Taipei')
const range = ref({
  start: props.currentTime.startTime,
  end: props.currentTime.endTime
})

// ---------時間排列RWD---------
const smLabel = ref(window.innerWidth < 768)
const checkWindowSize = () => {
  smLabel.value = window.innerWidth < 768
}
onMounted(() => {
  window.addEventListener('resize', checkWindowSize)
})
</script>

<template>
  <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:w-full sm:max-w-xs">
    <!-- 標題及關閉 -->
    <div class="flex items-center justify-between">
      <h1 class="mb-6 text-2xl font-semibold text-third">修改時間</h1>
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
      <!-- 時間設定 -->
      <div class="mb-6 flex flex-col items-center justify-around py-3">
        <div class="mb-3 flex justify-between gap-11" v-if="!smLabel">
          <label for="appt" class="">起始時間：</label>
          <label for="appt" class="">結束時間：</label>
        </div>
        <label for="appt" class="flex sm:mb-3 sm:justify-center" v-else
          >選擇起始時間與結束時間：</label
        >
        <VDatePicker
          borderless
          transparent
          v-model.range="range"
          mode="time"
          :timezone="timezone"
        />
      </div>

      <!-- 儲存/取消 -->
      <div class="flex">
        <button
          type="submit"
          class="mx-auto block w-32 rounded-lg bg-secondary py-2 transition-all hover:bg-third active:scale-90"
        >
          儲存
        </button>
        <!-- <button
          type="button"
          class="mx-auto block w-32 rounded-lg border-2 border-secondary py-2 transition-all hover:bg-third active:scale-90"
          @click="clearForm"
        >
          清除
        </button> -->
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
