import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router/index'
const loginModule = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {
        name: '林旭培'
      },
      userMenus: [
        {
          id: 1,
          type: 1,
          name: '事务中心',
          icon: 'el-icon-copy-document',
          url: '/home/routine',
          children: [
            {
              id: 2,
              type: 2,
              icon: 'el-icon-copy-document',
              name: '代办事务',
              pre: 1,
              url: '/home/routine/backlog'
            }
          ]
        },
        {
          id: 5,
          type: 1,
          icon: 'el-icon-tickets',
          name: '采购执行报批',
          url: '/home/purchase_excution',
          children: [
            {
              id: 6,
              type: 2,
              icon: 'el-icon-news',
              name: '采购执行查询',
              pre: 5,
              url: '/home/purchase_excution/search'
            },
            {
              id: 7,
              type: 2,
              icon: 'el-icon-news',
              name: '遴选中标供应商提交',
              pre: 5,
              url: '/home/purchase_excution/submit'
            }
          ]
        },
        {
          id: 8,
          type: 1,
          icon: 'el-icon-shopping-cart-full',
          name: '采购申请管理',
          url: '/home/purchase_apply',
          children: [
            {
              id: 9,
              type: 2,
              icon: 'el-icon-news',
              name: '采购申请查询',
              pre: 8,
              url: '/home/purchase_apply/search'
            },
            {
              id: 10,
              type: 2,
              icon: 'el-icon-news',
              name: '采购申请审核',
              pre: 8,
              url: '/home/purchase_apply/review'
            }
          ]
        },
        {
          id: 11,
          type: 1,
          icon: 'el-icon-s-shop',
          name: '供应商管理',
          url: '/home/supplier',
          children: [
            {
              id: 12,
              type: 2,
              icon: 'el-icon-search',
              name: '查看供应商',
              pre: 11,
              url: '/home/supplier/check'
            },
            {
              id: 13,
              type: 2,
              icon: 'el-icon-document-checked',
              name: '供应商审核',
              pre: 11,
              url: '/home/supplier/review'
            },
            {
              id: 14,
              type: 2,
              icon: 'el-icon-star-off',
              name: '年度评分',
              pre: 11,
              url: '/home/supplier/Ascore'
            },
            {
              id: 15,
              type: 2,
              icon: 'el-icon-star-off',
              name: '月度评分',
              pre: 11,
              url: '/home/supplier/Mscore'
            }
          ]
        }
      ]
    }
  },
  getters: {},
  mutations: {},
  actions: {
    setRouter(context: any): void {
      const children = mapMenusToRoutes(context.state.userMenus)
      children.forEach((child) => {
        router.addRoute('home', child)
      })
    }
  }
}

export default loginModule
