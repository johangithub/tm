import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("id"),
    pending: false,
    //As a billet Owner, needs to keep track of which req is being worked on
    reqId: '',
    //need to prevent these from pulling from localStorage, need to decode token
    userId: localStorage.getItem("id"),
    //userRole is string with every role separated by a comma, but needs to be array, so make it an array
    userRoles: typeof localStorage.getItem("role") == "string" ? localStorage.getItem("role").split(',') : [],
    //if user saved their ranked billets, pull them from local storage, 
    //else start with empty array TODO: need to get from server first
    faveBillets: localStorage.getItem('rankedBillets') ? JSON.parse(localStorage.getItem('rankedBillets')) : [],
    faveOfficers: localStorage.getItem('rankedOfficers') ? JSON.parse(localStorage.getItem('rankedOfficers')) : [],
    curFaveOfficers: [],
    //dates for cycle
    startCycle:  localStorage.getItem("startCycle"),
    firstRNLTD: localStorage.getItem("firstRNLTD"),
    endCycle: localStorage.getItem("endCycle") 
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
    curFaveOfficers: state => {
      return state.curFaveOfficers
    },
    faveOfficers: state => {
      return state.faveOfficers
    },
    reqId: state => {
      return state.reqId
    },
    startCycle: state=> {
      return state.startCycle
    },
    firstRNLTD: state=> {
      return state.firstRNLTD
    },
    endCycle: state=> {
      return state.endCycle
    }
  },
  mutations: {
    LOGIN (state) {
      // set true for non-debug mode
      state.pending = true
    },
    LOGIN_SUCCESS (state) {
      state.isLoggedIn = true
    },
    LOGOUT (state) {
      state.isLoggedIn = false
      state.pending = false
    },
    ADD_BILLET (state,payload) {
        //payload is object for billet
        state.faveBillets.push(payload)    
    },
    REMOVE_BILLET (state,payload) {
        //payload is object and index property is index of billet to remove
        state.faveBillets.splice(payload.index,1)
    },
    SET_FAV_BILLETS (state,payload) {
        //payload is the array of ranked billets
        //note: when billets are ranked, the rank of each billet is denoted by
        //the index of each billet in an array (ie - first ranked billet has 
        //index of 0)
        state.faveBillets = payload
    },
    SET_FAV_OFFICERS (state,payload) {
        //payload is the array of ranked billets
        //note: when billets are ranked, the rank of each billet is denoted by
        //the index of each billet in an array (ie - first ranked billet has 
        //index of 0)
        state.faveOfficers = payload
    },
    ADD_OFFICER (state, payload) {
      state.faveOfficers.push(payload)
    },
    REMOVE_OFFICER (state, payload) {
      //payload is object and index property is index of officer to remove
      var ind = state.faveOfficers.indexOf(payload)
      state.faveOfficers.splice(ind,1)
    },
    SET_CUR_FAV_OFFICERS (state,payload) {
        //payload is the array of ranked officers 
        //note: when officers are ranked, the rank of each officer is denoted by
        //the index of each officer in an array (ie - first ranked officer has 
        //index of 0)
        state.curFaveOfficers = payload
        state.faveOfficers[state.reqId] = payload
    },
    SET_CYCLE_DATES (state, dates) {
        state.startCycle = dates.startCycle
        state.firstRNLTD = dates.firstRNLTD
        state.endCycle = dates.endCycle
        localStorage.setItem("startCycle", state.startCycle)
        localStorage.setItem("firstRNLTD", state.firstRNLTD)
        localStorage.setItem("endCycle", state.endCycle)
    },
    SET_ROLE (state, role){
      state.userRole = role
    },
    SET_REQID (state, reqId){
      state.reqId = reqId
    },
  },
  actions: {
    // this is a fake login system. Will replace with axios call to the serverside
    login({ commit, dispatch }, creds) {
      commit("LOGIN")
      return new Promise((resolve,reject) => {
          window.axios.post('authenticate',{
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
                    var roles = token_decoded.role.split(',')
                    localStorage.setItem("role", token_decoded.role)
                    //add token to axios
                    localStorage.setItem("token", token)
                    window.axios.defaults.headers.common.Authorization = token
                    localStorage.setItem("id", token_decoded.id)
                    //get favorite billets if officer is logging in
                    dispatch('getCycleDates')
                    commit("SET_ROLE", token_decoded.role)
                    if (token_decoded.role === "officer") {
                      dispatch('loadFaveBillets') 
                      dispatch('loadOfficerProfile').then(()=>{
                      resolve()
                      })
                    } else {
                      commit("LOGIN_SUCCESS")
                      resolve()
                    }
            }, 1000)
          })
          .catch((e) => {
            // If server-side login is unsuccessful 
            setTimeout(()=>{
            commit("LOGOUT")
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
      localStorage.removeItem("rankedBillets")
      localStorage.removeItem("rankedOfficers")
      //since profileData is sensitive, we may need to be better about removing the profile data - maybe use sessionStorage? 
      localStorage.removeItem("profileData")
      window.axios.defaults.headers.common.Authorization = null
      commit("LOGOUT")
    },
    updateFavoriteBillets({commit, state, dispatch}, payload){
      //faveorite billet comes in a form of array of AFPCIDs
      commit("SET_FAV_BILLETS", payload)
    },
    updateFavoriteOfficers({commit, state, dispatch}, payload){
      //faveorite billet comes in a form of array of AFPCIDs
      commit("SET_FAV_OFFICERS", payload)
    },
    addBillet ({ commit, state, dispatch },payload) {
      commit("ADD_BILLET",payload)
      //save favorited billets to localStorage (retains during refresh)
      dispatch('save',{'name': 'rankedBillets', 'value': JSON.stringify(state.faveBillets)})  
    },
    removeBillet( { commit, state, dispatch },payload) {
      commit("REMOVE_BILLET",payload)
      //save favorited billets to localStorage (retains during refresh)
      dispatch('save',{'name': 'rankedBillets', 'value': JSON.stringify(state.faveBillets)})  
    },
    rankBillets( { commit, state, dispatch },payload) {
      commit("SET_FAV_BILLETS",payload)
      //save ranked billets to localStorage (retains during refresh)
      dispatch('save',{'name': 'rankedBillets', 'value': JSON.stringify(state.faveBillets)})  
    },
    getCycleDates({ commit }) {
        window.axios.get('/cycle_dates')
            .then(response => {
                var dates = response.data.data
                commit('SET_CYCLE_DATES',dates)
            })
            .catch(console.error)
    },
    //load favorite Billets in store, but submit fave billets in RankBillets component
    loadOfficerProfile({ commit, dispatch }) {
        return new Promise((resolve, reject)=>{window.axios.get('/officers')
           .then(response => {
                var profileData = response.data.data
                dispatch('save',{'name': 'profileData', 'value': JSON.stringify(profileData)})
           }).then(()=>{
                commit("LOGIN_SUCCESS")
                resolve()
           })
           .catch(console.error)})
    },
    loadFaveBillets({ commit, state, dispatch }) {
        window.axios.get('/billets_fave')
            .then(response => {
                var billetString = response.data.data.rankedBillets
                var loadedFaveBillets = billetString ? JSON.parse(billetString) : []
                commit("SET_FAV_BILLETS", loadedFaveBillets) 
                //save ranked billets to localStorage (retains during refresh)
                dispatch('save',{'name': 'rankedBillets', 'value': JSON.stringify(state.faveBillets)})  
            })
            .catch(console.error)
    },
    addOfficer({ commit },payload) {
      commit("ADD_OFFICER", payload)
    },
    removeOfficer( { commit },payload) {
      commit("REMOVE_OFFICER",payload)
    },
    rankOfficers( { commit },payload) {
      commit("SET_FAV_OFFICERS",payload)
    },
    save ({commit},payload) {
        //save action accepts a payload object where name property is the name of the localstorage item and value contains the value to be saved
        localStorage.setItem(payload.name, payload.value)
    },
    bidOfficer({commit}, payload){
      //TODO: fetch favorite officer list associated with reqid
      commit("SET_REQID", payload)

    }
  }
}); 
