<template>
  <div class="">
    <div class="flex">
      <!-- 側邊欄 -->
      <aside class="flex w-72 flex-col space-y-5 p-5 text-xl" style="height: 100vh">
        <hero-outline-academic-cap />

        <NuxtLink to="/" class="flex rounded-md px-2 py-3 hover:bg-primary hover:text-secondary"
          >查看課程</NuxtLink
        >
        <NuxtLink to="/Qalendar" class="rounded-md px-2 py-3 hover:bg-primary hover:text-secondary"
          >安排課程時間</NuxtLink
        >
        <NuxtLink to="/table" class="rounded-md px-2 py-3 hover:bg-primary hover:text-secondary"
          >表格呈現</NuxtLink
        >
      </aside>
      <div class="w-full border bg-neutral-200 p-4">
        <!-- 上方按鈕 -->
        <div class="addClass">
          <button
            class="inline-flex items-center rounded bg-primary px-4 py-2 font-bold hover:bg-secondary"
          >
            <span>新增課程</span><Icon name="clarity:add-line" color="black" />
          </button>
        </div>
        <!-- 下方列表 -->
        <div class="flex min-h-screen items-center justify-center overflow-hidden">
          <div class="w-full lg:w-5/6">
            <div class="my-6 rounded-lg bg-white shadow-md">
              <table class="w-full min-w-max table-auto">
                <thead>
                  <tr class="bg-secondary text-sm uppercase leading-normal text-gray-600">
                    <th class="px-6 py-3 text-left">課程名稱QQQQ</th>
                    <th class="px-6 py-3 text-left">老師名稱</th>
                    <th class="px-6 py-3 text-center">領域</th>
                    <th class="px-6 py-3 text-center">年級</th>
                    <th class="px-6 py-3 text-center">上課地點</th>
                    <th class="px-6 py-3 text-center">修改/刪除</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr class="border-b border-gray-200 hover:bg-primary">
                    <td class="whitespace-nowrap px-6 py-3 text-left">
                      <div class="flex items-center">
                        <div class="mr-2"></div>
                        <span class="font-medium">小一國文：探索生僻字與破音字</span>
                      </div>
                    </td>
                    <td class="px-6 py-3 text-left">
                      <div class="flex items-center">
                        <div class="mr-2"></div>
                        <span>王小明</span>
                      </div>
                    </td>
                    <td class="px-6 py-3 text-center">
                      <div class="flex items-center justify-center">
                        <p>語言</p>
                      </div>
                    </td>
                    <td class="px-6 py-3 text-center">
                      <span class="rounded-full bg-purple-200 px-3 py-1 text-xs text-purple-600"
                        >小一</span
                      >
                    </td>
                    <!-- <td class="px-6 py-3 text-center">台北市中山區中山捷運站</td> -->
                    <td class="px-6 py-3 text-center">
                      <div class="item-center flex justify-center">
                        <div class="mr-2 w-4 transform hover:scale-110 hover:text-purple-500"></div>
                        <div class="mr-2 w-4 transform hover:scale-110 hover:text-purple-500"></div>
                      </div>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                    <td class="px-6 py-3 text-left">
                      <div class="flex items-center">
                        <div class="mr-2">
                          <img
                            class="h-6 w-6"
                            src="https://img.icons8.com/color/100/000000/vue-js.png"
                          />
                        </div>
                        <span class="font-medium">Vue Project</span>
                      </div>
                    </td>
                    <td class="px-6 py-3 text-left">
                      <div class="flex items-center">
                        <div class="mr-2">
                          <img
                            class="h-6 w-6 rounded-full"
                            src="https://randomuser.me/api/portraits/women/2.jpg"
                          />
                        </div>
                        <span>Anita Rodriquez</span>
                      </div>
                    </td>
                    <td class="px-6 py-3 text-center">
                      <div class="flex items-center justify-center">
                        <img
                          class="h-6 w-6 transform rounded-full border border-gray-200 hover:scale-125"
                          src="https://randomuser.me/api/portraits/men/1.jpg"
                        />
                        <img
                          class="-m-1 h-6 w-6 transform rounded-full border border-gray-200 hover:scale-125"
                          src="https://randomuser.me/api/portraits/women/2.jpg"
                        />
                        <img
                          class="-m-1 h-6 w-6 transform rounded-full border border-gray-200 hover:scale-125"
                          src="https://randomuser.me/api/portraits/men/3.jpg"
                        />
                      </div>
                    </td>
                    <td class="px-6 py-3 text-center">
                      <span class="rounded-full bg-green-200 px-3 py-1 text-xs text-green-600"
                        >Completed</span
                      >
                    </td>
                    <td class="px-6 py-3 text-center">
                      <div class="item-center flex justify-center">
                        <div class="mr-2 w-4 transform hover:scale-110 hover:text-purple-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                        <div class="mr-2 w-4 transform hover:scale-110 hover:text-purple-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </div>
                        <div class="mr-2 w-4 transform hover:scale-110 hover:text-purple-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 hover:bg-gray-100">
                    <td class="px-6 py-3 text-left">
                      <div class="flex items-center">
                        <div class="mr-2">
                          <img
                            class="h-6 w-6"
                            src="https://img.icons8.com/color/100/000000/angularjs.png"
                          />
                        </div>
                        <span class="font-medium">Angular Project</span>
                      </div>
                    </td>
                    <td class="px-6 py-3 text-left">
                      <div class="flex items-center">
                        <div class="mr-2">
                          <img
                            class="h-6 w-6 rounded-full"
                            src="https://randomuser.me/api/portraits/men/3.jpg"
                          />
                        </div>
                        <span>Taylan Bush</span>
                      </div>
                    </td>
                    <td class="px-6 py-3 text-center">
                      <div class="flex items-center justify-center">
                        <img
                          class="h-6 w-6 transform rounded-full border border-gray-200 hover:scale-125"
                          src="https://randomuser.me/api/portraits/men/1.jpg"
                        />
                        <img
                          class="-m-1 h-6 w-6 transform rounded-full border border-gray-200 hover:scale-125"
                          src="https://randomuser.me/api/portraits/women/2.jpg"
                        />
                        <img
                          class="-m-1 h-6 w-6 transform rounded-full border border-gray-200 hover:scale-125"
                          src="https://randomuser.me/api/portraits/men/3.jpg"
                        />
                      </div>
                    </td>
                    <td class="px-6 py-3 text-center">
                      <span class="rounded-full bg-yellow-200 px-3 py-1 text-xs text-yellow-600"
                        >Scheduled</span
                      >
                    </td>
                    <td class="px-6 py-3 text-center">
                      <div class="item-center flex justify-center">
                        <div class="mr-2 w-4 transform hover:scale-110 hover:text-purple-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                        <div class="mr-2 w-4 transform hover:scale-110 hover:text-purple-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </div>
                        <div class="mr-2 w-4 transform hover:scale-110 hover:text-purple-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
