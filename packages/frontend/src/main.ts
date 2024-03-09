import { createApp } from 'vue'
import pinia from './stores/pinia'

import App from './App.vue'
import router from './router'

import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import '@/assets/base.scss'
import 'tailwindcss/tailwind.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
