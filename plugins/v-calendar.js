import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(setupCalendar, {})
  nuxtApp.vueApp.component('Vcalendar', Calendar)
  nuxtApp.vueApp.component('VDatePicker', DatePicker)
})

// import 'v-calendar/lib/v-calendar.min.css'

// {
//   // second is optional
//   datePickerTintColor: '#F00',
//   datePickerShowDayPopover: false
// }
