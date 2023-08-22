import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime.js'
// import isBetween from 'dayjs/plugin/isBetween.js'
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
// import duration from 'dayjs/plugin/duration.js'
// // import calendar from 'dayjs/plugin/calendar.js'
// import weekOfYear from 'dayjs/plugin/weekOfYear'
// import weekday from 'dayjs/plugin/weekday'
// import customParseFormat from 'dayjs/plugin/customParseFormat'

export default defineNuxtPlugin((nuxtApp) => {
  // dayjs.extend(relativeTime)
  // dayjs.extend(isBetween)
  // dayjs.extend(isSameOrAfter)
  // dayjs.extend(duration)
  // // dayjs.extend(calendar)
  // dayjs.extend(weekOfYear)
  // dayjs.extend(weekday)
  // dayjs.extend(customParseFormat)

  nuxtApp.vueApp.provide('dayjs', dayjs)
})
