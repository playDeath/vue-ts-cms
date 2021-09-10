import type { App } from 'vue'
import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElFormItem,
  ElInput,
  ElForm,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElRow,
  ElCol,
  ElAside,
  ElAvatar,
  ElDropdownMenu,
  ElDropdownItem,
  ElDropdown,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDatePicker,
  ElIcon,
  ElEmpty,
  ElDrawer,
  ElDescriptions,
  ElDescriptionsItem
} from 'element-plus'
import { Edit } from '@element-plus/icons'

const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElSubmenu,
  ElRow,
  ElCol,
  ElAvatar,
  ElDropdownMenu,
  ElDropdownItem,
  ElDropdown,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDatePicker,
  ElIcon,
  Edit,
  ElEmpty,
  ElDrawer,
  ElDescriptions,
  ElDescriptionsItem
]
// 注册全局Element-plus组件
export default function registerElements(app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
