<template>
  <div class="bg-white py-24">
    <div class="flex flex-col items-center">
      <h1 class="text-6xl font-semibold text-sky-400">測試測試</h1>
      <p class="mt-4 text-9xl font-bold text-gray-600">鐵人賽</p>
    </div>
  </div>
</template>
<script setup>
// 不需要在 import ref 或 computed
const count = ref(1)
const double = computed(() => count.value * 2)
console.log(count)
</script>
