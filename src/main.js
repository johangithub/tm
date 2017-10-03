// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import Vuetify from 'vuetify'
import { store } from './store'
import { router } from './router'
Vue.config.productionTip = false


import ('../node_modules/animate.css/animate.min.css')
import ('../node_modules/vuetify/dist/vuetify.min.css')
Vue.use(Vuetify)

window.axios = axios.create({baseURL: 'http://localhost:5005/api'})
window.axios.defaults.headers.common.Authorization = localStorage.getItem('token');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<app/>',
  components: { App },
  store
})
