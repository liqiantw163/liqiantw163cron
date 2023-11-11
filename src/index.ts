import cron from './cron.vue'
cron.install = (Vue) => Vue.component('MyCron', cron);
export default cron