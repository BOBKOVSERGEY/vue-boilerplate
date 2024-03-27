import './assets/styles/main.scss'
import router from "@/router/index.js";
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
