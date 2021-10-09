import { createStore } from 'vuex'
import loginModule from './login/login'
import purchaseApply from './home/purchase_apply'
import supplier from './home/supplier'
import depositModule from './home/deposit'
import contractModule from './home/contract'
import userModule from './home/user'
import purchaseExcutionModule from './home/purchase_excution'
import newsModule from './home/news'
import selectionSupplierModule from './home/selection_suppliers'
const store = createStore({
  state() {
    return {
      count: 1
    }
  },
  actions: {},
  modules: {
    loginModule,
    purchaseApply,
    supplier,
    depositModule,
    contractModule,
    userModule,
    purchaseExcutionModule,
    newsModule,
    selectionSupplierModule
  }
})
export const setDynamicRouter = (): void => {
  store.dispatch('loginModule/setRouter')
}
export default store
