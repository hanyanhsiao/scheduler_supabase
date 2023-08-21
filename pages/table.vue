<template>
  <div class="flex w-full">
    <sideBar />
    <div class="flex w-screen flex-col border bg-neutral-200 p-6">
      <!-- 上方篩選 -->
      <div class="mb-6 flex gap-6">
        <!-- 選擇老師 -->
        <div class="w-full">
          <label for="grade" class="mb-2 block text-sm">選擇老師</label>
          <select
            id="grade"
            class="block w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
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
            class="block w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
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
            class="block w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-third"
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
          class="h-10 w-48 self-end rounded-lg bg-secondary px-2 text-black transition-all hover:bg-third active:scale-90"
        >
          篩選
        </button>
      </div>
      <!-- 上方搜尋 -->
      <form class="mb-6 flex items-center gap-6">
        <div class="w-full">
          <input
            type="text"
            id="voice-search"
            class="block w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-third"
            placeholder="請輸入關鍵字"
          />
        </div>
        <button
          type="submit"
          class="flex h-10 w-20 items-center justify-around rounded-lg bg-secondary px-2 transition-all hover:bg-third active:scale-90"
        >
          <ClientOnly>
            <Icon name="material-symbols:search-rounded" />
          </ClientOnly>
          <span>搜尋</span>
        </button>
      </form>
      <!-- 下方表格 -->
      <EasyDataTable :headers="headers" :items="items" class="rounded-lg bg-neutral-200" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// import Vue3EasyDataTable from 'vue3-easy-data-table'
// import 'vue3-easy-data-table/dist/style.css'
import type { Header, Item } from 'vue3-easy-data-table'

const headers: Header[] = [
  { text: 'PLAYER', value: 'player' },
  { text: 'TEAM', value: 'team' },
  { text: 'NUMBER', value: 'number' },
  { text: 'POSITION', value: 'position' },
  { text: 'HEIGHT', value: 'indicator.height' },
  { text: 'WEIGHT (lbs)', value: 'indicator.weight', sortable: true },
  { text: 'LAST ATTENDED', value: 'lastAttended', width: 200 },
  { text: 'COUNTRY', value: 'country' }
]

const items: Item[] = [
  {
    player: 'Stephen Curry',
    team: 'GSW',
    number: 30,
    position: 'G',
    indicator: { height: '6-2', weight: 185 },
    lastAttended: 'Davidson',
    country: 'USA'
  },
  {
    player: 'Lebron James',
    team: 'LAL',
    number: 6,
    position: 'F',
    indicator: { height: '6-9', weight: 250 },
    lastAttended: 'St. Vincent-St. Mary HS (OH)',
    country: 'USA'
  },
  {
    player: 'Kevin Durant',
    team: 'BKN',
    number: 7,
    position: 'F',
    indicator: { height: '6-10', weight: 240 },
    lastAttended: 'Texas-Austin',
    country: 'USA'
  },
  {
    player: 'Giannis Antetokounmpo',
    team: 'MIL',
    number: 34,
    position: 'F',
    indicator: { height: '6-11', weight: 242 },
    lastAttended: 'Filathlitikos',
    country: 'Greece'
  }
]
</script>
