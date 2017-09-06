const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
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
      // set true for non-debug mode
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT](state) {
      state.isLoggedIn = false
      state.pending = false
    }
  },
  actions: {
    // this is a fake login system. Will replace with axios call to the serverside
    login({ commit }, creds) {
      commit(LOGIN)
      return new Promise((resolve,reject) => {
          axios.post('http://localhost:5005/api/authenticate',{
            headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
            },
            email: creds.email+'@us.af.mil',
            password: creds.password
          })
          .then((response)=>{
            if (response.data.success){
              setTimeout(()=>{
                commit(LOGIN_SUCCESS)
                localStorage.setItem("token", response.data.token)
                resolve()
              }, 2500)
            }
            else{
              //login failure on server side. e.g. wrong password, no user exists
              reject()
            }
          })
          .catch((e) => {
            console.log(e)
          })    
      })
    },
    logout ({ commit }) {
      localStorage.removeItem("token")
      commit(LOGOUT)
    }
  }
}); 