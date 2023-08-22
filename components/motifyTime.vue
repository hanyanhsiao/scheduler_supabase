<script setup>
const date = ref(new Date())

const emits = defineEmits(['closePopup', 'save'])
const close = () => {
  emits('closePopup')
}
</script>
<template>
  <div class="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
    <div class="flex items-center justify-between">
      <h1 class="mb-6 text-2xl font-semibold text-third">修改時間</h1>
      <!-- 關閉 -->
      <div
        class="mb-4 flex h-7 w-7 cursor-pointer self-start rounded-md p-1 text-xl transition-all hover:bg-secondary active:scale-90"
        @click="close"
      >
        <ClientOnly>
          <Icon name="material-symbols:close" />
        </ClientOnly>
      </div>
    </div>

    <!-- 時間設定 -->
    <div class="flex items-center justify-between">
      <div>
        <label for="appt">起始時間 </label>
        <input
          type="time"
          id="appt"
          name="appt"
          min="09:00"
          max="18:00"
          required
          style="border-color: #fed7aa; border-width: 3px"
        />
        <!-- primary: '#fffbeb', -->
      </div>
      <div>
        <label for="appt">結束時間 </label>
        <input
          type="time"
          id="appt"
          name="appt"
          min="09:00"
          max="18:00"
          required
          style="border-color: #fed7aa; border-width: 3px"
        />
      </div>
    </div>

    <!-- <VDatePicker v-model="date" mode="time" :timezone="timezone" /> -->
  </div>
</template>

<style></style>
