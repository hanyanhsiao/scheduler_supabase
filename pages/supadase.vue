<script setup>
// Initialize the JS client
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://jjbirjsxkllscyhxlogk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYmlyanN4a2xsc2N5aHhsb2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwMjEzMjQsImV4cCI6MjAxMDU5NzMyNH0.j-uusDVc-NbySoKe92ZeSKpMMrCTMKx_gjJvp8Ys370'
)

// Make a request
const { data: todos, error } = await supabase.from('course').select('className')
console.log(todos)
</script>

<template>
  <div class="flex w-full">
    <!-- 側邊欄 -->
    <sideBar />

    <!-- 右側 -->
    <div class="w-10/12 bg-neutral-200 p-6"></div>
  </div>
</template>
<style></style>
