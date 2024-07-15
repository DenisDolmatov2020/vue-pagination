import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)

// Создайте инстанс Pinia
const pinia = createPinia()

// Используйте Pinia в приложении
app.use(pinia)

app.mount('#app')