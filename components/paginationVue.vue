<script setup>
import { toRefs, computed } from 'vue'

// 定義總數量、每一頁的個數、當前頁碼
const props = defineProps({
  total: { type: Number },
  onePage: { type: Number },
  currentNum: { type: Number }
})

const { currentNum } = toRefs(props)

// 計算總頁數
const pages = computed(() => {
  return Math.ceil(props.total / props.onePage)
})

// 依據產品數量產生頁碼
const list = computed(() => {
  const result = []
  for (let i = 1; i <= pages.value; i++) {
    result.push(i)
  }
  return result
})

// 自定義改變頁碼事件
const emit = defineEmits(['changePage'])

// 改變頁碼
function changePage(type) {
  // 點擊上一頁按鈕
  if (type === false) {
    if (currentNum.value > 1) {
      emit('changePage', currentNum.value - 1)
    }
  } // 點擊下一頁按鈕
  else if (type === true) {
    if (currentNum.value <= pages.value) {
      emit('changePage', currentNum.value + 1)
    }
  } // 點擊頁碼
  else {
    emit('changePage', type)
  }
}
</script>

<template>
  <ul class="pagination">
    <span
      class="previous_page"
      :class="{ disabled: currentNum === 1 }"
      @click="currentNum !== 1 && changePage(false)"
      >«</span
    >
    <li
      class="pagetabs"
      v-for="item in list"
      :key="item"
      :class="{ active: currentNum === item }"
      @click="changePage(item)"
    >
      {{ item }}
    </li>
    <span
      class="next_page"
      :class="{ disabled: currentNum === pages }"
      @click="currentNum !== pages && changePage(true)"
      >»</span
    >
  </ul>
</template>
