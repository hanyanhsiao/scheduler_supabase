<script setup>
import EasyDataTable from 'vue3-easy-data-table'

// ---------pinia---------
import { useQalendarData } from '../stores/qalendarData'
import { storeToRefs } from 'pinia'

const EventStore = useQalendarData()
const { eventData } = storeToRefs(EventStore)

// ---------首次撈取已安排的課表---------
onMounted(() => {
  EventStore.getEventData()
})

// ---------表格標題---------
const headers = ref([
  { text: '課程名稱', value: 'className', width: 200 },
  { text: '老師', value: 'teacher' },
  { text: '領域', value: 'subject' },
  { text: '年級', value: 'grade' },
  { text: '上課地點', value: 'address', width: 200 },
  { text: '起始時間', value: 'startTime', sortable: true },
  { text: '結束時間', value: 'endTime', sortable: true },
  { text: '時長', value: 'duration', sortable: true }
])

// ---------表格內容---------
const items = ref([])

eventData.value.forEach((eachEvent) => {
  // 賦值給table屬性
  items.value.push({
    // id: eachEvent.id,
    className: eachEvent.className,
    teacher: eachEvent.teacher,
    grade: eachEvent.grade,
    subject: eachEvent.subject.name, //{ id: eachEvent.subject.id, name: eachEvent.subject.name },
    address: eachEvent.address,
    startTime: eachEvent.startTime,
    endTime: eachEvent.endTime,
    content: eachEvent.content,
    duration: duration()
  })

  // 時長計算
  function duration() {
    const startTimeStamp = new Date(eachEvent.startTime).getTime()
    const endTimeStamp = new Date(eachEvent.endTime).getTime()
    const duration = new Date(endTimeStamp - startTimeStamp)
    const hours = duration.getUTCHours()
    const minutes = duration.getUTCMinutes()
    return `${hours} 小時 ${minutes} 分`
    // console.log(`差：${hours} 小時 ${minutes} 分鐘`)
  }
})

// const itemsSelected: Item[] = ref([])
// const itemsSelected = ref<Item[]>([])
// ---------篩選/搜尋---------
const searchField = ref('')
const searchValue = ref()
const sortBy = ref(['startTime', 'endTime', 'duration'])
const sortType = 'desc'
// ASC由小至大排列，DESC由大至小排列

// ---------時長計算---------
// console.log(items.value[0].startTime)
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <div class="w-10/12 bg-neutral-200 p-6">
      <!-- 上方搜尋 -->
      <div class="mb-3 flex">
        <session class="w-full px-2 py-3">
          <span class="mr-5 text-sm">請選擇搜尋欄位</span>
          <select
            class="rounded-lg px-10 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-third"
            v-model="searchField"
          >
            <option value="" selected>--請選擇--</option>
            <option
              v-for="(header, index) in headers"
              :key="index"
              :value="header.value"
              class="p-2 text-sm"
            >
              {{ header.text }}
            </option>
          </select>
        </session>

        <session class="w-full px-2 py-3">
          <span class="mr-5 text-sm">請輸入搜尋內容</span>
          <input
            type="text"
            class="rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-third"
            placeholder="請輸入搜尋內容"
            v-model="searchValue"
          />
        </session>
      </div>

      <!-- 下方表格 -->
      <EasyDataTable
        class="rounded-lg"
        :headers="headers"
        :items="items"
        alternating
        border-cell
        buttons-pagination
        theme-color="#fb923c"
        table-class-name="customize-table"
        header-text-direction="center"
        body-text-direction="center"
        :sort-by="sortBy"
        :sort-type="sortType"
        :search-field="searchField"
        :search-value="searchValue"
        show-index
        fixed-index
        :index-column-width="40"
        :rows-per-page="5"
        :rows-items="[10, 20]"
        fixed-expand
        :expand-column-width="40"
      >
        <!-- 展開內容 -->
        <template #expand="item">
          <div style="padding: 10px">
            {{ item.content }}
          </div>
        </template>
      </EasyDataTable>
    </div>
  </div>
</template>

<style scoped>
.customize-table {
  --easy-table-header-background-color: #fb923c;
  --easy-table-header-font-color: black;
  --easy-table-header-height: 40px;
  --easy-table-body-row-hover-background-color: #fffbeb;
  --easy-table-body-item-padding: 5px 5px;
  --easy-table-footer-height: 50px;
  --easy-table-scrollbar-track-color: #fffbeb;
  --easy-table-scrollbar-thumb-color: #fb923c;
  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
