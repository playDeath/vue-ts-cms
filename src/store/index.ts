import { createStore } from 'vuex'
import loginModule from './login/login'

const store = createStore({
  state() {
    return {
      count: 1
    }
  },
  actions: {},
  modules: {
    loginModule
  }
})
export const setDynamicRouter = () => {
  store.dispatch('loginModule/setRouter')
}
export default store
