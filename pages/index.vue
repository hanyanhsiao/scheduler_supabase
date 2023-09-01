<script setup>
import dayjs from 'dayjs'

// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { storeToRefs } from 'pinia'

const classStore = useStoreData()
const { classData } = storeToRefs(classStore)

// ---------撈資料---------
onMounted(() => {
  classStore.getClassData()
  // classData.value = classStore.classData
  // console.log(classData.value)
})

// ---------顯示課程詳細資訊toggle--------

const toggleDetails = (item) => {
  item.showDetails = !item.showDetails
}

// ---------修改課程--------
// 彈窗
const togglePopup = ref(false)

// 點擊的課程
const currentClass = ref({})

// 彈窗標題
const classTitle = ref('新增課程')

// 關閉彈窗
const close = () => {
  togglePopup.value = false
}

// 修改課程
const editClass = (item, indexx) => {
  togglePopup.value = true
  classTitle.value = '修改課程'
  const applyClass = { ...item }
  // console.log('修改原黨', applyClass)
  currentClass.value = applyClass
  currentClass.value.indexx = indexx
}

// 儲存關閉彈窗
const save = () => {
  togglePopup.value = false
}

// ---------新增課程--------
// 彈窗
const toggleAddPopup = ref(false)

// 新增課程
const addNewClass = () => {
  currentClass.value.subject = {}
  // currentClass.value.indexx = null
  console.log('新增課程', currentClass.value)
  toggleAddPopup.value = true
}

// ---------刪除課程---------
const deleteClass = (input, index) => {
  classStore.deleteClass(input, index)
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
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <section class="relative w-10/12 bg-neutral-200 p-6">
      <!-- 上方按鈕 -->
      <div class="">
        <button
          class="flex w-32 items-center justify-center rounded-lg border-2 border-solid border-third bg-primary px-4 py-2 font-bold transition-all hover:bg-third active:scale-90"
          @click="addNewClass"
        >
          <span>新增課程 </span>
          <ClientOnly>
            <Icon name="clarity:add-line" />
          </ClientOnly>
        </button>
      </div>

      <!-- 下方列表 -->
      <div class="flex w-full items-center rounded-lg">
        <div class="my-6 bg-white shadow-md" v-if="classData[0]">
          <!-- 標題 -->
          <div>
            <div
              class="grid grid-cols-9 items-center justify-items-center gap-3 bg-secondary p-3 text-center font-bold leading-normal"
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
          <div class="" v-for="(item, index) in classData" :key="item.uuid">
            <!-- 課程清單 -->
            <div
              class="grid cursor-pointer grid-cols-9 items-center gap-3 border-b border-gray-300 p-3 hover:bg-primary"
              @click="toggleDetails(item)"
            >
              <div class="col-span-1 text-center">{{ index + 1 }}</div>
              <div class="col-span-2 text-left">
                {{ item.className }}
              </div>
              <div class="text-center">{{ item.teacher }}</div>
              <div class="text-center">{{ item.subject.name }}</div>
              <div class="py-3 text-center">
                <span
                  class="whitespace-nowrap rounded-full px-3 py-1 sm:px-1 sm:py-3 sm:[writing-mode:vertical-lr]"
                  :class="gradeColor(item.grade)"
                >
                  {{ item.grade }}
                </span>
              </div>
              <div class="col-span-2 text-center">{{ item.address }}</div>
              <div class="flex justify-center gap-3 sm:flex-wrap">
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
            <div v-if="item.showDetails">
              <div class="flex items-center justify-between border-b-2 px-6 py-3 font-bold">
                <div class="text-left">課程內容：{{ item.content }}</div>
                <div class="text-right">
                  建立日期：{{ dayjs(item.create_time).format('YYYY-MM-DD') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分頁器 -->
      <!-- <paginationVue /> -->

      <!-- 修改遮罩 -->
      <div class="absolute left-0 top-0 h-full w-full bg-black/30" v-if="togglePopup">
        <!-- 彈窗 -->
        <div class="z-50 rounded-md bg-white">
          <motifyPopup
            class="absolute left-1/2 top-5 -translate-x-1/2"
            @closePopup="close"
            @save="save"
            :currentClass="currentClass"
            :classTitle="classTitle"
          />
        </div>
      </div>
      <!-- 新增遮罩 -->
      <div class="absolute left-0 top-0 h-full w-full bg-black/30" v-if="toggleAddPopup">
        <!-- 彈窗 -->
        <div class="z-50 rounded-md bg-white">
          <addPopup
            class="absolute left-1/2 top-5 -translate-x-1/2"
            @closePopup="close"
            @save="save"
            :currentClass="currentClass"
          />
        </div>
      </div>
    </section>
  </div>
</template>
