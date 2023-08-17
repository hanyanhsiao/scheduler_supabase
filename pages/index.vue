<script setup>
// ---------pinia---------
import { storeData } from '@/stores/storeData'
const counterStore = storeData()
// console.log(counterStore)

// ---------撈資料---------

// ref([])

const classData = computed(() => {
  console.log('Computed', classData)
  // counterStore.classData
  return counterStore.classData
})
// const classData = useState('classData', () => [])

// const fetchData = () => {
// const response = await fetch('/data/class.json')
// const jsonResponse = await response.json()
//   const jsonResponse = counterStore.getClassData()
//   classData.value = jsonResponse.class
// }

onBeforeMount(() => {
  counterStore.getClassData()
  classData.value = counterStore.classData
  // console.log(classData.value)
})

// ---------顯示課程詳細資訊--------

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

  // console.log('coby', applyClass)
  // currentClass.value.uuid = item.uuid
  // currentClass.value.className = item.className
  // currentClass.value.teacherName = item.teacherName
  // currentClass.value.subject = item.subject
  // currentClass.value.grade = item.grade
  // currentClass.value.address = item.address
  // currentClass.value.content = item.content

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

//存入修改的內容
const save = (input) => {
  togglePopup.value = !togglePopup.value

  if (
    input.className.length == 0 ||
    input.teacherName.length == 0 ||
    input.subject == undefined ||
    input.grade == undefined ||
    input.address.length == 0 ||
    input.address.content == 0
  ) {
    alert('欄位不得為空')
  } else {
    console.log(counterStore.classData[input.indexx])
    counterStore.set(input)
    // counterStore.classData[input.index] = input
    console.log(counterStore.classData[input.indexx])
  }
}

// 刪除課程
const deleteClass = (index) => {
  const yes = confirm('確定刪除?')
  if (yes) {
    counterStore.classData.splice(index, 1)
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
          <Icon name="clarity:add-line" />
        </button>
      </div>

      <!-- 下方列表 -->
      <div class="flex w-full items-center justify-center rounded-lg">
        <div class="my-6 bg-white shadow-md">
          <!-- 標題 -->
          <div>
            <div
              class="grid grid-cols-8 items-center justify-items-center bg-secondary text-center font-bold leading-normal"
            >
              <div class="col-span-2 px-6 py-3">課程名稱</div>
              <div class="px-6 py-3">老師名稱</div>
              <div class="px-6 py-3">領域</div>
              <div class="px-6 py-3">年級</div>
              <div class="r col-span-2 px-6 py-3">上課地點</div>
              <div class="px-6 py-3">修改 / 刪除</div>
            </div>
          </div>

          <!-- 內容 -->
          <div class="" v-for="(item, index) in classData" :key="item.uuid">
            <!-- 課程清單 -->
            <div
              class="grid cursor-pointer grid-cols-8 items-center border-b border-gray-300 hover:bg-primary"
              @click="toggleDetails(item)"
            >
              <div class="col-span-2 px-6 py-3 text-left">
                {{ item.className }}
              </div>
              <div class="px-6 py-3 text-center">{{ item.teacherName }}</div>
              <div class="px-6 py-3 text-center">{{ item.subject }}</div>
              <div class="px-6 py-3 text-center">
                <span class="rounded-full bg-purple-200 px-3 py-1 text-purple-800">
                  {{ item.grade }}
                </span>
              </div>
              <div class="col-span-2 px-6 py-3 text-center">{{ item.address }}</div>
              <div class="item-center flex justify-center gap-2 px-6 py-3">
                <!-- 修改 -->
                <div
                  class="flex h-7 w-7 transform items-center justify-center rounded-md p-1 transition-all hover:scale-110 hover:bg-secondary active:scale-90"
                  @click.stop="handleClass(item, index)"
                >
                  <Icon name="zondicons:edit-pencil" />
                </div>
                <!-- 刪除 -->
                <div
                  class="flex h-7 w-7 transform items-center justify-center rounded-md p-1 transition-all hover:scale-110 hover:bg-secondary active:scale-90"
                  @click.stop="deleteClass(index)"
                >
                  <Icon name="bi:trash3-fill" />
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
        <div class="z-50 w-full max-w-sm overflow-hidden rounded-md bg-white">
          <ClassPopup
            class="absolute left-1/2 top-5 -translate-x-1/2 transition-all duration-300"
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
../node-local ../plugins/nodeLocal.js
