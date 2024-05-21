<script setup>
// 父元件使用 <VTextInput :type="type" :name="name" :label="label" :required="required" :placeholder="placeholder" :left-icon="leftIcon" :debug="debug" :error="error" :disabled="disabled">TEST</VTextInput>
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String
    // required: true,
  },
  required: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  leftIcon: {
    type: String,
    default: ''
  },
  debug: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
// 父元件使用<VTextInput @handlePassword="handlePassword" />
const emits = defineEmits(['handlePassword'])
</script>
<template>
  <div class="field">
    <!-- 標題 -->
    <p class="mb-1 text-left text-black">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </p>
    <!-- <div class="label is-normal">
      <label class="label">{{ label }}</label>
    </div> -->
    <div class="field-body">
      <div class="field">
        <!-- <p class="relative control has-icons-left has-icons-right"> -->
        <!-- 當所有欄位都填寫正確時，meta.valid=true -->
        <VField :name="name" v-slot="{ field, meta, errors }" class="relative">
          <!-- <div class="flex relative w-full"> -->
          <div class="relative">
            <!-- input類型是textarea -->
            <textarea
              v-if="type == 'textarea'"
              v-bind="field"
              class="form-input w-full rounded-md px-4 py-2 text-stone-700 ring-secondary focus:outline-none focus:ring-1 focus:ring-third"
              :class="{
                'border-third': !(!meta.valid && meta.touched),
                'is-success': meta.valid && meta.touched,
                'is-danger border-error ': !meta.valid && meta.touched
              }"
              :placeholder="placeholder"
              :disabled="disabled"
            ></textarea>
            <!-- input類型是number -->
            <input
              v-else-if="type == 'number'"
              v-bind="field"
              class="form-input w-full rounded-md px-4 py-2 text-stone-700 ring-secondary focus:outline-none focus:ring-1 focus:ring-third"
              :class="{
                'border-third': !(!meta.valid && meta.touched),
                'is-success': meta.valid && meta.touched,
                'is-danger border-error': !meta.valid && meta.touched
              }"
              :placeholder="placeholder"
              type="number"
              :disabled="disabled"
            />
            <!-- input類型是其他 -->
            <input
              v-else
              v-bind="field"
              class="form-input w-full rounded-md px-4 py-2 text-stone-700 ring-secondary focus:outline-none focus:ring-1 focus:ring-third"
              :class="{
                'border-third': !(!meta.valid && meta.touched),
                'is-success': meta.valid && meta.touched,
                'is-danger border-error': !meta.valid && meta.touched
              }"
              :placeholder="placeholder"
              :type="type"
              :autocomplete="type == 'password' ? 'on' : 'off'"
              :disabled="disabled"
            />
            <!-- icon -->
            <ClientOnly>
              <div class="absolute right-0 -mt-9 mr-3 w-fit">
                <!-- <span class="is-left -ml-7">
                                            <Icon :name="leftIcon" />
                                          </span> -->
                <span
                  @click="emits('handlePassword', name)"
                  class="cursor-pointer text-third"
                  v-if="(name == 'password' || name == 'confirmed') && meta.touched"
                >
                  <Icon v-if="type == 'password'" name="ri:eye-off-line" size="20px" />
                  <Icon v-else name="ri:eye-line" size="20px" />
                </span>
                <span class="text-error" v-else-if="!meta.valid && meta.touched">
                  <Icon name="material-symbols:info-rounded" size="20px" />
                </span>
                <span class="text-third" v-else>
                  <Icon :name="leftIcon" size="20px" />
                </span>
              </div>
            </ClientOnly>
          </div>
          <VErrorMessage
            v-if="error"
            :name="name"
            as="div"
            class="help is-danger absolute m-3 text-sm text-error"
          />
          <div class="debug" v-if="debug">
            <pre>{{ errors }}</pre>
            <pre>{{ meta }}</pre>
          </div>
        </VField>
      </div>
    </div>
  </div>
</template>
<style>
/* type='number' 不顯示上下按鈕 */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
