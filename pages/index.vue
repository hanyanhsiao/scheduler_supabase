<script setup>
const showDetails = ref(false)

const addClass = ref(false)
</script>

<template>
  <div class="">
    <div class="flex">
      <!-- 側邊欄 -->
      <sideBar />
      <!-- 右側表格 -->
      <div class="relative w-full border bg-neutral-200 p-4">
        <!-- 上方按鈕 -->
        <div class="">
          <button
            class="inline-flex place-items-center rounded bg-primary px-4 py-2 font-bold hover:bg-secondary"
            @click="addClass = !addClass"
          >
            <span>新增課程</span>
            <Icon name="clarity:add-line" cursor-pointer />
          </button>
        </div>
        <!-- 下方列表 -->
        <div class="relative flex w-full items-center justify-start rounded">
          <div class="my-6 bg-white shadow-md">
            <table class="mx-auto w-full min-w-max table-auto">
              <!-- 表格標題 -->
              <thead>
                <tr class="bg-secondary text-sm uppercase leading-normal">
                  <th class="px-6 py-3 text-left">課程名稱</th>
                  <th class="px-6 py-3 text-left">老師名稱</th>
                  <th class="px-6 py-3 text-center">領域</th>
                  <th class="px-6 py-3 text-center">年級</th>
                  <th class="px-6 py-3 text-center">上課地點</th>
                  <th class="px-6 py-3 text-center">修改/刪除</th>
                </tr>
              </thead>
              <!-- 表格內容 -->
              <tbody class="text-sm">
                <!-- 課程清單 -->
                <tr
                  class="cursor-pointer border-b border-gray-200 hover:bg-primary"
                  @click="showDetails = !showDetails"
                >
                  <td class="col-span-4 whitespace-nowrap px-6 py-3 text-left">
                    小一國文：探索生僻字與破音字
                  </td>
                  <td class="px-6 py-3 text-center">王小明</td>
                  <td class="px-6 py-3 text-center">語言</td>
                  <td class="px-6 py-3 text-center">
                    <span class="rounded-full bg-purple-200 px-3 py-1 text-xs text-purple-600"
                      >小一</span
                    >
                  </td>
                  <td class="px-6 py-3 text-center">台北市中山區中山捷運站</td>
                  <td class="item-center flex justify-center px-6 py-3 text-center">
                    <div class="mr-2 w-4 transform hover:scale-110 hover:text-third">
                      <Icon name="zondicons:edit-pencil" />
                    </div>
                    <div class="mr-2 w-4 transform hover:scale-110 hover:text-third">
                      <Icon name="bi:trash3-fill" />
                    </div>
                  </td>
                </tr>
                <!-- 詳細內容 -->
                <tr class="items-center justify-between border-b-2 font-bold" v-show="showDetails">
                  <td class="px-6 py-3 text-left" colspan="3">生僻字教學、破音字教學</td>
                  <td class="px-6 py-3 text-right" colspan="3">更新日期: 2023/11/07</td>
                </tr>
                <tr
                  class="cursor-pointer border-b border-gray-200 hover:bg-primary"
                  @click="showDetails = !showDetails"
                >
                  <td class="col-span-4 whitespace-nowrap px-6 py-3 text-left">
                    小一國文：探索生僻字與破音字
                  </td>
                  <td class="px-6 py-3 text-center">王小明</td>
                  <td class="px-6 py-3 text-center">語言</td>
                  <td class="px-6 py-3 text-center">
                    <span class="rounded-full bg-purple-200 px-3 py-1 text-xs text-purple-600"
                      >小一</span
                    >
                  </td>
                  <td class="px-6 py-3 text-center">台北市中山區中山捷運站</td>
                  <td class="item-center flex justify-center px-6 py-3 text-center">
                    <div class="mr-2 w-4 transform hover:scale-110 hover:text-third">
                      <Icon name="zondicons:edit-pencil" />
                    </div>
                    <div class="mr-2 w-4 transform hover:scale-110 hover:text-third">
                      <Icon name="bi:trash3-fill" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <addNewClass class="absolute left-1/2 top-1/2 -translate-x-1/2" v-if="addClass" />
        </div>
      </div>
    </div>
  </div>
</template>
