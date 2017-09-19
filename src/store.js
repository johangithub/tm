//Mutation names
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
    pending: false,
    userId: localStorage.getItem("id"),
    role: localStorage.getItem("role"),
    baseUrl: "http://localhost:5005/api"
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    isPending: state => {
      return state.pending
    },
    userId: state => {
      return state.userId
    },
    role: state => {
      return state.role
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
    },
  },
  actions: {
    // this is a fake login system. Will replace with axios call to the serverside
    login({ commit }, creds) {
      commit(LOGIN)
      return new Promise((resolve,reject) => {
          axios.post(this.state.baseUrl+'/authenticate',{
            headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
            },
            email: creds.email+'@us.af.mil',
            password: creds.password
          })
          .then((response)=>{
            //If server-side login is successful
            setTimeout(()=>{
                    commit(LOGIN_SUCCESS)
                    var token = response.data.token  
                    function parseJwt (token) {
                      var base64Url = token.split('.')[1];
                      var base64 = base64Url.replace('-', '+').replace('_', '/');
                      return JSON.parse(window.atob(base64));
                    }
                    var token_decoded = parseJwt(token)
                    localStorage.setItem("token", token)
                    localStorage.setItem("id", token_decoded.id)
                    localStorage.setItem("role", token_decoded.role)
                    resolve()
                
            }, 1000)
          })
          .catch((e) => {
            // If server-side login is unsuccessful 
            setTimeout(()=>{
            commit(LOGOUT)
            var message = e.response.data.message
            reject(message)
            }, 1000)
          })    
      })
    },
    logout ({ commit }) {
      localStorage.removeItem("token")
      localStorage.removeItem("role")
      localStorage.removeItem("id")
      commit(LOGOUT)
    }
  }
}); 
