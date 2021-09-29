import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { useGlobal } from './global'
import './assets/css/style.less'
import 'element-plus/lib/theme-chalk/index.css'
import { setDynamicRouter } from './store/index'
import cache from './utils/cache'
// import ElementUI from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
app.use(useGlobal)
app.use(store)
console.log('sdsdsd')
cache.getCache('userMenus') !== null ? setDynamicRouter() : null

// app.use(router) 之后 回去调用router里面的install
// 这时候会获取当前url导航栏里面的path值
// 接着根据该path值去路由表里匹配对应的路由(用来决定路由守卫的to值，此时路由守卫的回调函数没被执行)
// 接着才去执行路由守卫的回调
// 换句话说，要实现动态路由且导航栏回车时对应的路由是匹配得到的，就必须在app.use(router)时就将路由表决定好
app.use(router)

// 实测发现 createApp 执行的时候只是生成了一个对象(虚拟Dom)
// 并没有执行各个组件中setup的语句，而是在进行app.mount('#app')的时候帮你执行
app.mount('#app')
