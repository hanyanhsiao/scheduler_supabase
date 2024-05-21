<!-- 使用方式 父層容器指定寬度，讓元件自適應
  //   <div class="w-[400px]">
  //   <InputSelectDropdown />
  // </div>
  // -->
<script setup>
import { ref } from 'vue'
const router = useRouter()
const route = useRoute()
const dropdownRef = ref(null)

const props = defineProps({
  identityList: {
    type: Array
  },
  originList: {
    type: [Number, Array]
  }
  // originFieldList: {
  //   type: Number,
  // },
})

const emit = defineEmits(['send'])

const isShow = ref(false)
const options = ref([])
const selectedValue = ref('')
const originData = ref()
const originStatus = ref(true)

watchEffect(() => {
  options.value = props.identityList
  originData.value = props.originList
  if (originStatus.value) {
    if (originData.value) {
      // console.log(originData.value);
      selectedValue.value = options.value.find((item) => item.name === originData.value)
      emit('send', selectedValue.value)
    }
  }
})
if (originData.value) {
  selectedValue.value = options.value.find((item) => item.id === originData.value)
  emit('send', selectedValue.value)
}
// else {
//   selectedValue.value = options.value[0]
//   emit('send', selectedValue.value)
// }

const selectClick = (index) => {
  originStatus.value = false
  const newSelectedValue = { ...options.value[index] }
  selectedValue.value = newSelectedValue
  // selectedValue.value.name = options.value[index].name;
  isShow.value = false
  emit('send', options.value[index])
}

const toggleShow = () => {
  isShow.value = !isShow.value
  if (isShow.value) {
    document.addEventListener('click', closeDropdown)
  } else {
    document.removeEventListener('click', closeDropdown)
  }
}

const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isShow.value = false
    document.removeEventListener('click', closeDropdown)
  }
}
</script>
<template>
  <div ref="dropdownRef" class="relative">
    <div class="relative w-full" @click="toggleShow">
      <p
        class="flex h-10 w-full items-center rounded-md border bg-gray-50 px-[14px] py-2 text-sm"
        :class="[
          isShow ? 'border-1 border-third' : '',
          selectedValue ? '' : 'text-[#838383]',
          route.path === '/Qalendar' ? 'bg-white' : ''
        ]"
      >
        <!-- {{ selectedValue ? selectedValue.name : route.path === '/Qalendar' ? '全部' : '請選擇' }} -->

        {{ selectedValue ? selectedValue.name : '請選擇' }}
      </p>
      <button class="absolute right-4 top-[18px] h-[4.63px] w-[7.8px]">
        <img v-if="!isShow" src="../assets/img/selectDown.svg" alt="" />
        <img v-else src="../assets/img/selectDown.svg" alt="" class="rotate-180" />
      </button>
    </div>
    <ul
      v-if="isShow"
      class="absolute z-50 mt-1 w-full cursor-pointer rounded border border-[#4156C84D] bg-white text-sm leading-[30px] shadow-[0px_2px_4px_rgba(0,0,0,0.25)]"
      @click.stop
    >
      <li
        v-for="(option, index) in options"
        :key="index"
        class="flex h-[30px] items-center pl-[14px] text-left hover:bg-secondary active:bg-primary"
        @click="selectClick(index)"
      >
        {{ option.name ? option.name : option.text }}
        <p v-if="option.type" class="text-cmsDeepBlue ml-2"></p>
      </li>
    </ul>
  </div>
</template>
