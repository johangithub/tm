const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("token"),
    pending: false
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    isPending: state => {
      return state.pending
    }
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    // this is a fake login system. Will replace with axios call to the serverside
    login({ commit }, creds) {
      commit(LOGIN)
      return new Promise(resolve => {
        setTimeout(()=>{
          localStorage.setItem("token", "JWT")
          commit(LOGIN_SUCCESS)
          resolve()
        }, 3000)
      })
    },
    logout ({ commit }) {
      localStorage.removeItem("token")
      commit(LOGOUT)
    }
  }
}); 