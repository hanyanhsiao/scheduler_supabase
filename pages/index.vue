<script setup>
import { useUserStore } from '../stores/user'
const store = useUserStore()
import dayjs from 'dayjs'

// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { storeToRefs } from 'pinia'

const classStore = useStoreData()
const { classData } = storeToRefs(classStore)

// ---------撈資料---------
onMounted(() => {
  classStore.getClassData()
  // console.log(store.id)
})

// ---------修改課程--------
// 彈窗
const togglePopup = ref(false)

// 點擊的課程
const currentClass = ref({})

// 彈窗標題
// const classTitle = ref('新增課程')

// 修改課程
const editClass = (item) => {
  // console.log('修改課程', item)
  // classTitle.value = '修改課程'
  togglePopup.value = true
  const applyClass = { ...item }
  // console.log('修改原黨', applyClass)
  currentClass.value = applyClass
  // currentClass.value.indexx = indexx
}
// ---------顯示課程內容toggle--------
const toggleDetails = (item) => {
  item.showDetails = !item.showDetails
}
// ---------新增課程--------
// 彈窗
const toggleAddPopup = ref(false)

// 新增課程
const addNewClass = () => {
  // currentClass.value.subject = {}
  // togglePopup.value = true
  // classTitle.value = '新增課程'
  toggleAddPopup.value = true
}

// ---------彈窗共用事件--------
// 關閉彈窗
const close = () => {
  togglePopup.value = false
  toggleAddPopup.value = false
}

// 儲存關閉彈窗
const save = () => {
  togglePopup.value = false
  toggleAddPopup.value = false
}

// ---------刪除課程---------
const deleteClass = async (input, index) => {
  await classStore.deleteClass(input, index)
  // 刪除完撈出全部課程
  classStore.getClassData()
}

// ---------年級顏色---------
const gradeColor = (grade) => {
  switch (grade) {
    case '小一':
      return 'bg-secondary text-orange-800'
    case '小二':
      return 'bg-purple-200 text-purple-800'
    case '小三':
      return 'bg-green-200 text-green-600'
    case '小四':
      return 'bg-yellow-200 text-yellow-600'
    case '小五':
      return 'bg-red-200 text-red-600'
    case '小六':
      return 'bg-indigo-200 text-indigo-800'
    default:
      return 'bg-black text-white'
  }
}

// ==========================================
// 串接實時更新
import { supabase } from '../composable/supabaseClinet'

supabase
  .channel('course')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'course'
    },
    (event) => {
      // console.log('訂閱course資料表的修改', event)
    }
  )
  .subscribe()
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <section class="relative w-10/12 bg-neutral-200 p-6">
      <!-- 上方按鈕 -->
      <button
        class="flex w-32 transform items-center justify-center rounded-lg border border-third bg-primary px-4 py-2 font-bold transition-all hover:bg-secondary active:scale-90"
        @click="addNewClass"
      >
        <span>新增課程 </span>
        <ClientOnly>
          <Icon name="clarity:add-line" />
        </ClientOnly>
      </button>

      <!-- 下方列表 -->
      <div class="flex items-center rounded-lg">
        <div
          id="style1"
          class="my-6 w-full overflow-x-auto bg-white shadow-md"
          v-if="classData && classData[0]"
        >
          <!-- 標題 -->
          <div>
            <!-- vsm:grid-cols-8 -->
            <div
              class="grid min-w-[1070px] grid-cols-9 items-center justify-items-center gap-3 bg-secondary p-3 text-center font-bold leading-normal"
            >
              <div class="col-span-1">編號</div>
              <div class="col-span-2">課程名稱</div>
              <div class="col-span-1">老師名稱</div>
              <div class="col-span-1">領域</div>
              <div class="col-span-1">年級</div>
              <div class="col-span-2">上課地點</div>
              <div class="col-span-1">修改 / 刪除</div>
            </div>
          </div>

          <!-- 內容 -->
          <div class="min-w-[1070px]" v-for="(item, index) in classData" :key="item.uuid">
            <!-- 課程清單 -->
            <!-- vsm:grid-cols-8 vsm:gap-2 -->
            <div
              class="grid w-full cursor-pointer grid-cols-9 place-items-stretch items-center gap-3 break-all border-b border-gray-300 p-3 hover:bg-primary"
              @click="toggleDetails(item)"
            >
              <div class="col-span-1 text-center">{{ index + 1 }}</div>
              <div class="col-span-2 text-left">
                {{ item.className }}
              </div>
              <!-- vsm:[text-orientation:upright] vsm:[writing-mode:vertical-lr] -->
              <div class="text-center">
                {{ item.teacher }}
              </div>
              <!-- <div class="text-center">{{ item.subject.name }}</div> -->
              <div class="text-center">{{ item.subject }}</div>
              <div class="py-3 text-center">
                <!-- sm:px-0 sm:py-3 sm:[writing-mode:vertical-lr] -->
                <span
                  class="whitespace-nowrap rounded-full px-3 py-1"
                  :class="gradeColor(item.grade)"
                >
                  {{ item.grade }}
                </span>
              </div>
              <div class="col-span-2 text-center vsm:col-span-1">{{ item.address }}</div>
              <div class="flex justify-center gap-3">
                <!-- 修改 -->
                <div
                  class="flex h-7 w-7 transform items-center justify-center rounded-md p-1 transition-all hover:bg-secondary active:scale-90"
                  @click.stop="editClass(item, index)"
                >
                  <ClientOnly>
                    <Icon name="zondicons:edit-pencil" />
                  </ClientOnly>
                </div>
                <!-- 刪除 -->
                <div
                  class="flex h-7 w-7 transform items-center justify-center rounded-md p-1 transition-all hover:bg-secondary active:scale-90"
                  @click.stop="deleteClass(item, index)"
                >
                  <ClientOnly>
                    <Icon name="bi:trash3-fill" />
                  </ClientOnly>
                </div>
              </div>
            </div>
            <!-- 詳細內容 -->
            <div v-if="item.showDetails" class="">
              <div class="flex flex-col gap-5 border-b-2 bg-zinc-50 px-6 py-3">
                <div class="text-left">
                  <p class="font-bold">課程內容：</p>
                  <p class="text-justify">{{ item.content }}</p>
                </div>
                <div class="text-left">
                  <p class="font-bold">建立日期：</p>
                  <p class="text-justify text-third">
                    {{ dayjs(item.created_at).format('YYYY-MM-DD') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分頁器 -->
      <!-- <paginationVue /> -->

      <!-- 遮罩 -->
      <div
        class="absolute left-0 top-0 h-full w-full bg-black/30"
        v-if="togglePopup || toggleAddPopup"
      >
        <!-- 彈窗 -->
        <div class="z-50 rounded-md bg-white">
          <!-- 修改課程 -->
          <motifyCoursePopup
            class="absolute left-1/2 top-5 -translate-x-1/2"
            v-if="togglePopup"
            @closePopup="close"
            @save="save"
            :currentClass="currentClass"
          />
          <!-- 新增課程 -->
          <addCoursePopup
            class="absolute left-1/2 top-5 -translate-x-1/2"
            v-if="toggleAddPopup"
            @closePopup="close"
            @save="save"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 捲軸本體顏色 */
::-webkit-scrollbar-thumb {
  background-color: #fed7aa;
}

/* 一定要寫寬!!!!!!!!!!!!! */
::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  background: #fffbeb;
}

/* ::-webkit-scrollbar-thumb:hover {
  background: #fb923c;
} */
</style>
