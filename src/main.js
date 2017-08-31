// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
Vue.config.productionTip = false

//require('../node_modules/bootstrap/dist/css/bootstrap.css')

import ('../node_modules/animate.css/animate.min.css')
import ('../node_modules/vuetify/dist/vuetify.min.css')
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<app/>',
  components: { App }
})
