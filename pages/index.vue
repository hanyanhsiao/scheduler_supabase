<script setup>
// ---------pinia---------
import { useStoreData } from '../stores/storeData'
import { storeToRefs } from 'pinia'

const classStore = useStoreData()
const { classData } = storeToRefs(classStore)

// ---------撈資料---------
// const classData = ref([])

onMounted(() => {
  classStore.getClassData()
  // classData.value = classStore.classData
  // console.log(classData.value)
})

// const classData = computed(() => {
//   console.log('Computed')
//   return classStore.classData
// })

// const classData = useState('classData', () => classStore.classData)

// const fetchData = () => {
// const response = await fetch('/data/class.json')
// const jsonResponse = await response.json()
//   const jsonResponse = counterStore.getClassData()
//   classData.value = jsonResponse.class
// }

// ---------顯示課程詳細資訊toggle--------

const toggleDetails = (item) => {
  item.showDetails = !item.showDetails
}

// ---------新增/修改彈窗--------
// 彈窗
const togglePopup = ref(false)

// 點擊的課程
const currentClass = ref({})

// 彈窗標題
const classTitle = ref('新增課程')

const handleClass = (item, indexx) => {
  togglePopup.value = !togglePopup.value
  classTitle.value = item ? '修改課程' : '新增課程'

  // 複製一份點擊的內容顯示在彈窗上
  const applyClass = { ...item }
  currentClass.value = applyClass
  currentClass.value.indexx = indexx
  // console.log(item.className.length)
}

// 關閉
const close = () => {
  togglePopup.value = false
}

//--------存入修改的內容--------
const save = (input) => {
  togglePopup.value = !togglePopup.value

  if (classStore.classData[input.indexx]) {
    // console.log('修改')
    // console.log('改前', classStore.classData[input.indexx])
    classStore.modifyClass(input)
    // console.log('改後', classStore.classData[input.indexx])
  } else {
    // console.log('新增')
    classStore.addClass(input)
    // console.log('新增', classStore.classData)
  }
}

// --------刪除課程--------
const deleteClass = (index) => {
  const yes = confirm('確定刪除?')
  if (yes) {
    classStore.classData.splice(index, 1)
  }
}
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側表格 -->
    <section class="relative w-screen bg-neutral-200 p-6">
      <!-- 上方按鈕 -->
      <div class="">
        <button
          class="flex w-32 items-center justify-center rounded-lg bg-primary px-4 py-2 font-bold transition-all hover:bg-secondary active:scale-90"
          @click="handleClass(false)"
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
              <div class="text-center">{{ item.teacherName }}</div>
              <div class="text-center">{{ item.subject }}</div>
              <div class="py-3 text-center">
                <span
                  class="whitespace-nowrap rounded-full bg-purple-200 px-3 py-1 text-purple-800 sm:px-1 sm:py-3 sm:[writing-mode:vertical-lr]"
                >
                  {{ item.grade }}
                </span>
              </div>
              <div class="col-span-2 text-center">{{ item.address }}</div>
              <div class="flex justify-center gap-3 sm:flex-wrap">
                <!-- 修改 -->
                <div
                  class="flex h-7 w-7 transform items-center justify-center rounded-md p-1 transition-all hover:bg-secondary active:scale-90"
                  @click.stop="handleClass(item, index)"
                >
                  <ClientOnly>
                    <Icon name="zondicons:edit-pencil" />
                  </ClientOnly>
                </div>
                <!-- 刪除 -->
                <div
                  class="flex h-7 w-7 transform items-center justify-center rounded-md p-1 transition-all hover:bg-secondary active:scale-90"
                  @click.stop="deleteClass(index)"
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
                <div class="text-right">更新日期：{{ item.updateDate }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分頁器 -->
      <!-- <paginationVue /> -->

      <!-- 遮罩 -->
      <div class="absolute left-0 top-0 h-full w-full bg-black/30" v-if="togglePopup">
        <!-- 彈窗 -->
        <div class="z-50 rounded-md bg-white">
          <ClassPopup
            class="absolute left-1/2 top-5 -translate-x-1/2"
            @closePopup="close"
            @save="save"
            :currentClass="currentClass"
            :classTitle="classTitle"
          />
        </div>
      </div>
    </section>
  </div>
</template>
