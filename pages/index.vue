<script setup>
import { useUserStore } from '../stores/user'
const store = useUserStore()
import dayjs from 'dayjs'

// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { storeToRefs } from 'pinia'

const classStore = useStoreData()
const { classData } = storeToRefs(classStore)
const isLoading = ref(true)

// ---------撈資料---------
onMounted(() => {
  classStore.getClassData()
  isLoading.value = false
  // console.log(store.id)
})
// ---------修改課程--------
const togglePopup = ref(false)

// 點擊的課程
const currentClass = ref({})

// 修改課程
const editClass = (item) => {
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

// 點擊遮罩關閉彈窗
const closeIfMask = (event) => {
  if (event.target === event.currentTarget) {
    close()
  }
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
      return 'bg-purple-100 text-purple-800'
    case '小三':
      return 'bg-green-100 text-green-800'
    case '小四':
      return 'bg-yellow-100 text-yellow-800'
    case '小五':
      return 'bg-red-100 text-red-800'
    case '小六':
      return 'bg-indigo-100 text-indigo-800'
    default:
      return 'bg-black text-white'
  }
}

// // ==========================================
// // 串接實時更新
// import { supabase } from '../composable/supabaseClinet'

// supabase
//   .channel('course')
//   .on(
//     'postgres_changes',
//     {
//       event: 'UPDATE',
//       schema: 'public',
//       table: 'course'
//     },
//     (event) => {
//       // console.log('訂閱course資料表的修改', event)
//     }
//   )
//   .subscribe()

// // ==========================================
</script>

<template>
  <div class="relative flex">
    <!-- 側邊欄 -->

    <sideBar />

    <!-- 右側 -->
    <section class="h-screen w-full overflow-y-auto bg-bgGray p-6 sm:absolute sm:z-0">
      <!-- 上方按鈕 -->
      <div class="flex justify-between">
        <!-- <p class="text-2xl font-bold">課程清單</p> -->

        <button
          class="flex w-32 transform items-center justify-center rounded-md border border-third bg-primary px-4 py-2 transition-all hover:bg-secondary active:scale-90"
          @click="addNewClass"
        >
          <span>新增課程 </span>
          <ClientOnly>
            <Icon name="clarity:add-line" />
          </ClientOnly>
        </button>
      </div>
      <div v-if="isLoading" class="flex h-full items-center justify-center">
        <Loading />
      </div>

      <!-- 下方列表 -->
      <div v-if="classData && classData[0]" class="flex items-center rounded-lg">
        <div id="style1" class="my-6 w-full overflow-x-auto bg-white shadow-md">
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
              <!-- {{ item }} -->
              <div class="col-span-1 text-center">{{ index + 1 }}</div>
              <div class="col-span-2 text-left">
                {{ item.name }}
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
              <div class="col-span-2 text-center">{{ item.address }}</div>
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

      <!-- 遮罩 -->
      <div
        class="absolute left-0 top-0 z-10 h-screen w-full bg-black/30"
        v-if="togglePopup || toggleAddPopup"
        @click="closeIfMask($event)"
      ></div>
      <!-- 彈窗 -->
      <div
        class="fixed left-1/2 top-1/2 z-20 w-full max-w-[500px] -translate-x-1/4 -translate-y-1/2 rounded-md bg-white sm:w-full sm:max-w-[300px] sm:-translate-x-1/2"
      >
        <!-- 修改課程 -->
        <motifyCoursePopup
          class="w-full"
          v-if="togglePopup"
          @closePopup="close"
          @save="save"
          :currentClass="currentClass"
        />
        <!-- 新增課程 -->
        <addCoursePopup class="w-full" v-if="toggleAddPopup" @closePopup="close" @save="save" />
      </div>
    </section>
  </div>
</template>

<style></style>
