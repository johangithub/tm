import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Billet from '@/components/Billet'
import Profile from '@/components/Profile'
import FindBillets from '@/components/FindBillets'
import FindOfficers from '@/components/FindOfficers'
import About from '@/components/About'
import Login from '@/components/Login'
import Squadrons from '@/components/Squadrons'
import LosingCommander from '@/components/LosingCommander'
import { store } from '@/store.js'
Vue.use(Router)
export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        authRequired: false
      }
    },
    {
      path: '/billet',
      name: 'Billet',
      component: Billet,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/find_billets',
      name: 'FindBillets',
      component: FindBillets,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/find_officers',
      name: 'FindOfficers',
      component: FindOfficers,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      meta: {
        authRequired: true
      },
      props: true
    },
    {
      path: '/squadrons',
      name: 'Squadrons',
      component: Squadrons,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/losing_commander',
      name: 'LosingCommander',
      component: LosingCommander,
      meta: {
        authRequired: true
      }
    },
    //Wildcard redirect
    {path: '*', redirect: '/'},
  ]
})

router.beforeEach((to, from, next) => {
  const authed = store.state.isLoggedIn
  const authRequired = to.meta.authRequired
  if (authRequired && !authed){
    next('/login')
  }
  else {
    next()
  }
})