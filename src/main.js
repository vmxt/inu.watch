import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Popper from 'vue3-popper'

import 'uno.css'
import '@unocss/reset/tailwind.css'

const app = createApp(App)

app.component('VPopper', Popper)

app.use(createPinia())
app.use(router)

app.mount('#app')
