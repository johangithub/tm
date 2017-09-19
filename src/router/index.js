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
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        authRequired: false
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        authRequired: true
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
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        authRequired: true
      },
    },
    {
      path: '/profile/:id',
      name: 'ProfileById',
      component: Profile,
      meta: {
        authRequired: true,
        profileViewRequired: true
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
  const authed = store.getters.isLoggedIn
  const authRequired = to.meta.authRequired
  const profileViewRequired = to.meta.profileViewRequired
  const id = store.getters.userId
  const role = store.getters.role

  //if authentication is required and not logged in, then send to login page 
  if (authRequired && !authed){
    next('/login')
  }
  //If visiting profile, check the authority and automatically reroute to his profile id
  //Differentiate between officer who can only view his profile and someone who can view anyone'someone
  else if (/\/profile\/\d+/.test(to.path)){
    //Only let admin through for other profile view
    if (role == 'admin'){
      next()
    }
    //if role is not sufficient, forward to his own profile
    else{
      next('/profile')
    }
  }
  else {
    next()
  }
})

