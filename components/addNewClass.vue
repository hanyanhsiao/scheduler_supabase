<template>
  <div class="flex max-w-screen-sm items-center justify-center">
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h1 class="mb-6 text-center text-2xl font-semibold text-third">新增課程</h1>
      <form>
        <!-- 課程名稱 -->
        <div class="mb-6">
          <label for="className" class="mb-2 block text-sm">課程名稱</label>
          <input
            type="text"
            id="className"
            name="className"
            class="w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
            required
          />
        </div>
        <!-- 老師名稱 -->
        <div class="mb-6">
          <label for="teacher" class="mb-2 block text-sm">老師名稱</label>
          <input
            type="text"
            id="teacher"
            name="teacher"
            class="w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
            required
          />
        </div>
        <!-- 領域 -->
        <div class="mb-6">
          <label for="subject" class="mb-2 block text-sm">領域</label>
          <select
            id="subject"
            class="block w-full rounded-lg border bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
          >
            <option selected value="first">語言</option>
            <option value="second">科技</option>
            <option value="third">才藝</option>
          </select>
        </div>
        <!-- 年級 -->
        <div class="mb-6">
          <label for="grade" class="mb-2 block text-sm">年級</label>
          <select
            id="grade"
            class="block w-full rounded-lg border bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
          >
            <option selected value="first">小一</option>
            <option value="second">小二</option>
            <option value="third">小三</option>
            <option value="fourth">小四</option>
            <option value="fifth">小五</option>
            <option value="sixth">小六</option>
          </select>
        </div>
        <!-- 上課地點 -->
        <div class="mb-6">
          <label for="content" class="mb-2 block text-sm">上課地點</label>
          <input
            type="text"
            id="address"
            name="address"
            class="w-full rounded-lg border bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-third"
            required
          />
        </div>
        <!-- 課程內容 -->
        <div class="mb-6">
          <label for="content" class="mb-2 block text-sm">課程內容</label>
          <textarea
            id="content"
            rows="4"
            class="block w-full rounded-lg border bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
            placeholder="課程內容"
          ></textarea>
        </div>

        <!-- 儲存/取消 -->
        <div class="flex">
          <button
            type="submit"
            class="relative mx-auto mb-2 block w-32 rounded-lg bg-secondary bg-gradient-to-r py-2 text-black focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            儲存
          </button>
          <button
            type="submit"
            class="relative mx-auto mb-2 block w-32 rounded-lg bg-secondary py-2 text-black focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
