import type { App } from 'vue'
import { ElButton } from 'element-plus'

const components = [ElButton]
// 注册全局Element-plus组件
export default function registerElements(app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
