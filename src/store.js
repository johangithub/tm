//Mutation names
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const ADD_BILLET = "ADD_BILLET";
const REMOVE_BILLET = "REMOVE_BILLET";
const RANK_BILLETS = "RANK_BILLETS";
const VERIFY_ADMIN = "VERIFY_ADMIN";

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("token"),
    pending: false,
    adminVerified: false,
    userId: localStorage.getItem("id"),
    role: localStorage.getItem("role"),
    baseUrl: "http://192.168.1.85:5005/api",
    //if user saved their ranked billets, pull them from local storate, 
    //else start with empty array
    faveBillets: localStorage.getItem('rankedBillets') ? JSON.parse(localStorage.getItem('rankedBillets')) : [] 
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
    },
    faveBillets: state => {
        return state.faveBillets
    },
    adminVerified: state=> {
      return state.adminVerified
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
    [ADD_BILLET] (state,payload) {
        //payload is object for billet, and only add billet to faveBillets if not
        //already in faveBillets array
        if (state.faveBillets.some(function(d) {d.id === payload.id})) {
            return
        } else {
            state.faveBillets.push(payload)    
        }
    },
    [REMOVE_BILLET] (state,payload) {
        //payload is object and index property is index of billet to remove
        state.faveBillets.splice(payload.index,1)
    },
    [RANK_BILLETS] (state,payload) {
        //payload is the array of ranked billets
        //note: when billets are ranked, the rank of each billet is denoted by
        //the index of each billet in an array (ie - first ranked billet has 
        //index of 0)
        state.faveBillets = payload
    },
    [VERIFY_ADMIN](state){
      state.adminVerified = true
    }
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
            console.log('login success')
            setTimeout(()=>{
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
                    //handle admin login
                    if (token_decoded.role =='admin' && !this.state.adminVerified ){
                      resolve()
                      commit(LOGOUT)
                    }
                    else{
                      commit(VERIFY_ADMIN)
                      commit(LOGIN_SUCCESS)
                      resolve()
                    }
                
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
    },
    addBillet ({ commit },payload) {
        commit(ADD_BILLET,payload)
    },
    removeBillet( { commit },payload) {
        commit(REMOVE_BILLET,payload)
    },
    rankBillets( { commit },payload) {
        commit(RANK_BILLETS,payload)
    },
    save ({commit},payload) {
        //save action accepts a payload object where name property is the name of the localstorage item and value contains the value to be saved
        localStorage.setItem(payload.name, payload.value)
    },
    direct_login ({ commit }){
      commit(LOGIN_SUCCESS)
    }
  }
}); 
