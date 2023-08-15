<script setup>
// ---------撈資料---------
const classData = ref([])
const fetchData = async () => {
  const response = await fetch('/data/class.json')
  const jsonResponse = await response.json()
  classData.value = jsonResponse.class
  console.log(classData.value)
}

onBeforeMount(() => {
  fetchData()
})
// ---------顯示課程詳細資訊--------
const showDetails = ref(false)
const activeClassId = ref(null)

const toggleDetails = (id) => {
  if (activeClassId.value === id) {
    showDetails.value = !showDetails.value
  } else {
    activeClassId.value = id
    showDetails.value = true
  }
}

// ---------新增/修改彈窗--------
const togglePopup = ref(false)

const addClass = (title) => {
  togglePopup.value = !togglePopup.value
  if (title == 'add') {
    title = '新增課程'
  }
  console.log(title)
}

// 關閉
const close = () => {
  togglePopup.value = false
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
          @click="addClass('add')"
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
          <div class="text-sm" v-for="item in classData" :key="item.uuid">
            <!-- 課程清單 -->
            <div
              class="grid cursor-pointer grid-cols-8 items-center border-b border-gray-300 hover:bg-primary"
              @click="toggleDetails(item.uuid)"
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
                  @click="addClass('revise')"
                >
                  <Icon name="zondicons:edit-pencil" />
                </div>
                <!-- 刪除 -->
                <div
                  class="flex h-7 w-7 transform items-center justify-center rounded-md p-1 transition-all hover:scale-110 hover:bg-secondary active:scale-90"
                >
                  <Icon name="bi:trash3-fill" />
                </div>
              </div>
            </div>
            <!-- 詳細內容 -->
            <div v-if="showDetails && activeClassId === item.uuid">
              <div class="flex items-center justify-between border-b-2 px-6 py-3 font-bold">
                <div class="text-left">{{ item.content }}</div>
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
            class="absolute left-1/2 top-10 -translate-x-1/2 transition-all duration-300"
            @closePopup="close"
          />
        </div>
      </div>
    </section>
  </div>
</template>
