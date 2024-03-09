import { createApp } from 'vue'
import pinia from './stores/pinia'

import App from './App.vue'
import router from './router'

import '@/assets/base.scss'
import 'tailwindcss/tailwind.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
