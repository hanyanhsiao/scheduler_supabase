// 解析請求或擴展請由物件
export default defineEventHandler((event) => {
  event.context.auth = { username: 'ryan' }
})
