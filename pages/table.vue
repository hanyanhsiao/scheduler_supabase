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
  // console.log(eventData)
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
  { text: '時長', value: 'duration' }
])

// ---------表格內容---------

const items = computed(() => {
  return eventData.value.map((eachEvent) => {
    // 時長計算
    function duration() {
      const startTimeStamp = new Date(eachEvent.startTime).getTime()
      const endTimeStamp = new Date(eachEvent.endTime).getTime()
      const duration = new Date(endTimeStamp - startTimeStamp)
      const hours = duration.getUTCHours()
      const minutes = duration.getUTCMinutes()
      return `${hours} 小時 ${minutes} 分`
    }

    // 賦值給table屬性
    return {
      // id: eachEvent.id,
      className: eachEvent.className,
      teacher: eachEvent.teacher,
      grade: eachEvent.grade,
      subject: eachEvent.subject, //{ id: eachEvent.subject.id, name: eachEvent.subject.name },
      address: eachEvent.address,
      startTime: eachEvent.startTime,
      endTime: eachEvent.endTime,
      content: eachEvent.content,
      duration: duration()
    }
  })
})

// const itemsSelected: Item[] = ref([])
// const itemsSelected = ref<Item[]>([])
// ---------篩選/搜尋---------
const searchField = ref('')
const searchValue = ref()
const sortBy = ref(['startTime', 'endTime'])
const sortType = 'desc'
// ASC由小至大排列，DESC由大至小排列

// ---------排序---------
function sortColums(what) {
  // console.log(what)
}
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <div class="h-screen w-full overflow-y-auto bg-bgGray p-6 sm:absolute">
      <!-- <p
        class="mb-4 text-3xl font-bold text-third"
        style="text-shadow: 1px 1px 2px rgba(234, 110, 28, 0.3)"
      >
        已安排課程總覽
      </p> -->
      <!-- 上方搜尋 -->
      <section class="mb-5 flex gap-10 sm:mt-10 sm:flex-wrap">
        <div class="flex w-full flex-col">
          <label class="mb-2">請選擇搜尋欄位</label>
          <select
            class="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-third sm:w-full"
            v-model="searchField"
          >
            <option value="" selected>--請選擇--</option>
            <option
              v-for="(header, index) in headers"
              :key="index"
              :value="header.value"
              class="p-2"
            >
              {{ header.text }}
            </option>
          </select>
        </div>
        <!-- border-4 border-indigo-500/100 -->
        <div class="flex w-full flex-col">
          <label class="mb-2">請輸入搜尋內容</label>
          <input
            type="text"
            class="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-third sm:w-full"
            placeholder="請輸入搜尋內容"
            v-model="searchValue"
          />
        </div>
      </section>

      <!-- 下方表格 -->
      <EasyDataTable
        class="rounded-lg shadow-md"
        :headers="headers"
        :items="items"
        alternating
        border-cell
        buttons-pagination
        theme-color="#fed7aa"
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
        :rows-per-page="10"
        :rows-items="[5, 10, 20]"
        fixed-expand
        :expand-column-width="40"
        @update-sort="sortColums"
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
  --easy-table-header-font-size: 14px;
  --easy-table-body-row-font-size: 14px;
  --easy-table-header-background-color: #fed7aa;
  --easy-table-header-font-color: black;
  --easy-table-header-height: 40px;
  --easy-table-body-row-hover-background-color: #fffbeb;
  --easy-table-body-item-padding: 5px 5px;
  --easy-table-footer-height: 50px;
  --easy-table-scrollbar-track-color: #fffbeb;
  --easy-table-scrollbar-thumb-color: #fed7aa;
  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
