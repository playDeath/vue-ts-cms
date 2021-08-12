// import 'element-plus/lib/theme-chalk/index.css'
import type { App } from 'vue'
import registerElements from './registerElements'
export function useGlobal(app: App):void {
  registerElements(app)
}
