<template>
  <aside class="text-m flex w-72 flex-col space-y-5 p-5" style="height: 100vh">
    <NuxtLink
      to="/"
      class="flex transform rounded-md px-2 py-3 transition-all hover:bg-primary hover:text-third active:scale-90"
      >查看課程</NuxtLink
    >
    <NuxtLink
      to="/Qalendar"
      class="transform rounded-md px-2 py-3 transition-all hover:bg-primary hover:text-third active:scale-90"
      >安排課程時間</NuxtLink
    >
    <NuxtLink
      to="/table"
      class="transform rounded-md px-2 py-3 transition-all hover:bg-primary hover:text-third active:scale-90"
      >表格呈現</NuxtLink
    >
  </aside>
</template>
