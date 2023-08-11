// // plugins/vue3-easy-data-table.js
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

export default defineNuxtPlugin(  nuxtApp  => {
//   app.component('EasyDataTable', Vue3EasyDataTable);
    // console.log(nuxtApp.vueApp)
  nuxtApp.vueApp.component('EasyDataTable', Vue3EasyDataTable)
})
