import { createApp } from 'vue'
import App from '../demo/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import myButton from './cron.vue'
const app = createApp(App)
app.use(ElementPlus)
app.component('myButton', myButton)
app.mount('#app')