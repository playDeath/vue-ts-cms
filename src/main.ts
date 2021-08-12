import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { useGlobal } from '@/global'
import 'element-plus/lib/theme-chalk/index.css'
// import ElementUI from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
const app = createApp(App)
app.use(useGlobal).use(router).use(store).mount('#app')
