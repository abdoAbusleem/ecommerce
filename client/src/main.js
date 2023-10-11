import { createApp } from 'vue'
import router from '@/plugins/router'
import pinia from '@/plugins/store'
import './styles/index.scss'
import App from './App.vue'

createApp(App).use(router).use(pinia).mount('#app')
