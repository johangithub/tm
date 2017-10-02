//Mutation names
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const ADD_BILLET = "ADD_BILLET";
const REMOVE_BILLET = "REMOVE_BILLET";
const RANK_BILLETS = "RANK_BILLETS";
const ADD_OFFICER = "ADD_OFFICER";
const REMOVE_OFFICER = "REMOVE_OFFICER";
const RANK_OFFICERS = "RANK_OFFICERS";
const SET_ROLE = "SET_ROLE";
//const BASE_URL = "http://192.168.1.85:5005/api" //pi
const BASE_URL = "http://localhost:5005/api" //local server

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//set defaults for axios in store, axios imports in components inherit defaults
axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("id"),
    pending: false,
    //need to prevent these from pulling from localStorage, need to decode token
    userId: localStorage.getItem("id"),
    userRole: localStorage.getItem("role"),
    baseUrl: BASE_URL,
    //if user saved their ranked billets, pull them from local storage, 
    //else start with empty array TODO: need to get from server first
    faveBillets: localStorage.getItem('rankedBillets') ? JSON.parse(localStorage.getItem('rankedBillets')) : [],
    faveOfficers: localStorage.getItem('rankedOfficers') ? JSON.parse(localStorage.getItem('rankedOfficers')) : []
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
    userRole: state => {
      return state.userRole
    },
    faveBillets: state => {
        return state.faveBillets
    },
    faveOfficers: state => {
        return state.faveOfficers
    },
  },
  mutations: {
    [LOGIN] (state) {
      // set true for non-debug mode
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
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
    [ADD_OFFICER] (state,payload) {
        //payload is object for officer, and only add officer to faveOfficers if not
        //already in faveOfficers array
        if (state.faveOfficers.some(function(d) {d.ID === payload.ID})) {
            return
        } else {
            state.faveOfficers.push(payload)    
        }
    },
    [REMOVE_OFFICER] (state,payload) {
        //payload is object and index property is index of officer to remove
        state.faveOfficers.splice(payload.index,1)
    },
    [RANK_OFFICERS] (state,payload) {
        //payload is the array of ranked officers 
        //note: when officers are ranked, the rank of each officer is denoted by
        //the index of each officer in an array (ie - first ranked officer has 
        //index of 0)
        state.faveOfficers = payload
    },
    [SET_ROLE](state, role){
      state.userRole = role
    }
  },
  actions: {
    // this is a fake login system. Will replace with axios call to the serverside
    login({ commit }, creds) {
      commit(LOGIN)
      return new Promise((resolve,reject) => {
          axios.post('/authenticate',{
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
                    //add token to axios
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", token_decoded.role)
                    localStorage.setItem("id", token_decoded.id)
                    //make axios header reference token in localStorage, so when we remove the token from localStorage, the axios header equals an undefined variable
                    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token") 
                    commit(SET_ROLE, token_decoded.role)
                    commit(LOGIN_SUCCESS)
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
      //remove token on logout (axios header points to this, so when it is gone, axios Authorization property in header will be undefined)
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
    addOfficer({ commit },payload) {
        commit(ADD_OFFICER,payload)
    },
    removeOfficer( { commit },payload) {
        commit(REMOVE_OFFICER,payload)
    },
    rankOfficers( { commit },payload) {
        commit(RANK_OFFICERS,payload)
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
