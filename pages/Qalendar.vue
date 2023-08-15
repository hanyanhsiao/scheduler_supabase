<template>
  <div class="flex w-full">
    <sideBar />
    <div class="calendar flex w-screen flex-col border bg-neutral-200 p-6">
      <!-- 上方篩選 -->
      <div class="mb-6 flex gap-6">
        <!-- 選擇老師 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block text-sm">選擇老師</label>
          <select
            id="grade"
            class="block w-full rounded-lg border bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
          >
            <option value="first">王小明</option>
            <option value="second">王2明</option>
            <option value="third">王3明</option>
            <option value="fourth">王4明</option>
            <option value="fifth">王5明</option>
            <option value="sixth">王6明</option>
          </select>
        </div>

        <!-- 選擇領域 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block text-sm">選擇領域</label>
          <select
            id="grade"
            class="block w-full rounded-lg border bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
          >
            <option selected value="language">語言</option>
            <option value="technology">科技</option>
            <option value="talent">才藝</option>
          </select>
        </div>

        <!-- 選擇年級 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block text-sm">選擇年級</label>
          <select
            id="grade"
            class="block w-full rounded-lg border bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
          >
            <option value="first">小一</option>
            <option value="second">小二</option>
            <option value="third">小三</option>
            <option value="fourth">小四</option>
            <option value="fifth">小五</option>
            <option value="sixth">小六</option>
          </select>
        </div>

        <button
          type="submit"
          class="h-10 w-48 self-end rounded-lg bg-secondary bg-gradient-to-r px-2 text-black transition-all hover:bg-third active:scale-90"
        >
          篩選
        </button>
      </div>

      <!-- 下方日曆 -->
      <Qalendar :events="events" :config="config" class="rounded-lg bg-white" />
    </div>
  </div>
</template>

<script>
import { Qalendar } from 'qalendar'

export default {
  components: {
    Qalendar
  },

  data() {
    return {
      events: [
        // ...
        {
          title: '英文課',
          with: 'Chandler Bing',
          time: { start: '2023-08-17 12:05', end: '2023-08-17 13:35' },
          color: 'yellow',
          isEditable: true,
          id: '753944708f0f',
          description: '英文歌教學'
        },
        {
          title: '國文課',
          with: 'Rachel Greene',
          time: { start: '2023-08-15 10:05', end: '2023-08-15 13:35' },
          color: 'green',
          isEditable: true,
          id: '5602b6f589fc'
        }
        // ...
      ],
      config: {
        // see configuration section
      }
    }
  }
}
</script>

<style>
@import 'qalendar/dist/style.css';
</style>
