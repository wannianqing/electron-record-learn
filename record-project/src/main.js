import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Directive from '@/directives'
import '@/assets/styles/reset.scss'
import '@/assets/styles/comm.scss'

const app = createApp(App)
app.use(Directive)
app.use(router).mount('#app')
