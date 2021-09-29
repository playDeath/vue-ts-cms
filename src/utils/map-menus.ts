import { RouteRecordRaw } from 'vue-router'
import router from '@/router/index'
let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/home', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/home' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.authorityType === 2) {
        const route = allRoutes.find((route) => route.path === menu.path)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.childrenRolePermissions ?? [])
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
// 在这里定义全局变量，如果是在函数里面定义，则递归时返回的结果不会被拿到，因为每次都会在函数里创建新的res_id

export function getCurrentMenuId(userMenu: any[], path: string): number {
  let res_id = 2
  if (path === '/home') {
    if (userMenu[0].childrenRolePermissions[0].length !== 0) {
      router.push(userMenu[0].childrenRolePermissions[0].path)
      return userMenu[0].childrenRolePermissions[0].authorityId
    }
  }
  function recur(userMenu: any[], path: string): void {
    for (const item of userMenu) {
      if (item.authorityType === 1) {
        recur(item.childrenRolePermissions ?? [], path)
      } else if (item.authorityType === 2 && item.path === path) {
        res_id = item.authorityId
      }
    }
  }
  recur(userMenu, path)
  return res_id
}
// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
//   const breadcrumbs: IBreadcrumb[] = []

//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrumbs.push({ name: menu.name, path: menu.url })
//         breadcrumbs.push({ name: findMenu.name, path: findMenu.url })
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }

//   return breadcrumbs
// }

// // /main/system/role  -> type === 2 对应menu
// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }
