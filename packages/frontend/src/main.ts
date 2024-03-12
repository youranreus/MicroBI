import { createApp } from 'vue'
import pinia from './stores/pinia'

import App from './App.vue'
import router from './router'

import '@/assets/base.scss'
import 'tailwindcss/tailwind.css'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const app = createApp(App)

dayjs.extend(relativeTime)

app.use(pinia)
app.use(router)

app.mount('#app')
