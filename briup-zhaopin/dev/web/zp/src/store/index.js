import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import city from './modules/city';
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    user,
    city
  },
  getters
})

export default store
