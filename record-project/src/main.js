import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Directive from './directives'

import '@/assets/styles/reset.scss'
import '@/assets/styles/comm.scss'

createApp(App).use(Directive).use(router).mount('#app')
