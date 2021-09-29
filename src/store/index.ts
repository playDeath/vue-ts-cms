import { createStore } from 'vuex'
import loginModule from './login/login'
import purchaseApply from './home/purchase_apply'
const store = createStore({
  state() {
    return {
      count: 1
    }
  },
  actions: {},
  modules: {
    loginModule,
    purchaseApply
  }
})
export const setDynamicRouter = () => {
  store.dispatch('loginModule/setRouter')
}
export default store
