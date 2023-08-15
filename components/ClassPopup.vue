<script setup>
const emit = defineEmits()
const close = () => {
  emit('closePopup')
}

const props = defineProps({
  currentClass: {
    className: String,
    teacherName: String,
    subject: String,
    grade: String,
    address: String,
    content: String
  }
})
</script>

<template>
  <div class="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
    <div class="flex items-center justify-between">
      <h1 class="mb-6 text-2xl font-semibold text-third">新增課程</h1>
      <!-- 關閉 -->
      <div
        class="mb-4 flex h-7 w-7 cursor-pointer self-start rounded-md p-1 text-xl transition-all hover:bg-secondary active:scale-90"
        @click="close"
      >
        <Icon name="material-symbols:close" />
      </div>
    </div>

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
      <!-- 領域&年級 -->
      <div class="mb-6 flex justify-between gap-6">
        <div class="w-full">
          <label for="subject" class="mb-2 block text-sm">領域</label>
          <select
            id="subject"
            class="block w-full rounded-lg border bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
          >
            <option selected value="language">語言</option>
            <option value="technology">科技</option>
            <option value="talent">才藝</option>
          </select>
        </div>
        <div class="w-full">
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
          rows="3"
          class="block w-full rounded-lg border bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
          required
        ></textarea>
      </div>

      <!-- 儲存/取消 -->
      <div class="flex">
        <button
          type="submit"
          class="mx-auto block w-32 rounded-lg bg-secondary py-2 transition-all hover:bg-third active:scale-90"
        >
          儲存
        </button>
        <button
          type="reset"
          class="mx-auto block w-32 rounded-lg border-2 border-secondary py-2 transition-all hover:bg-third active:scale-90"
        >
          清除
        </button>
      </div>
    </form>
  </div>
</template>
