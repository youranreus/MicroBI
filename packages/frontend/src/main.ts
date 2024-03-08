import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import '@/assets/base.scss'
import 'tailwindcss/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
