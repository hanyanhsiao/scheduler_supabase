<template>
  <div>
    <Qalendar :events="events" :config="config" />
  </div>
</template>

<script>
import { Qalendar } from 'qalendar'

export default {
  components: {
    Qalendar
  },

  data() {
    return {
      events: [
        // ...
        {
          title: '英文課',
          with: 'Chandler Bing',
          time: { start: '2023-08-13 12:05', end: '2023-08-13 13:35' },
          color: 'yellow',
          isEditable: true,
          id: '753944708f0f',
          description: '英文歌教學'
        },
        {
          title: 'Ralph on holiday',
          with: 'Rachel Greene',
          time: { start: '2022-05-10', end: '2022-05-22' },
          color: 'green',
          isEditable: true,
          id: '5602b6f589fc'
        }
        // ...
      ],
      config: {
        // see configuration section
      }
    }
  }
}
</script>

<style>
@import 'qalendar/dist/style.css';
</style>
