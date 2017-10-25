import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import RankBillets from '@/components/RankBillets'
import Profile from '@/components/Profile'
import FindBillets from '@/components/FindBillets'
import FindOfficers from '@/components/FindOfficers'
import RankOfficers from '@/components/RankOfficers'
import About from '@/components/About'
import Login from '@/components/Login'
import Activate from '@/components/Activate'
import Diagrams from '@/components/Diagrams'
import Billet from '@/components/Billet'
import BilletList from '@/components/BilletList'
import LosingCommander from '@/components/LosingCommander'
import CFMDashboard from '@/components/CFMDashboard'
import OfficerStepper from '@/components/OfficerStepper'
import BilletOwnerStepper from '@/components/BilletOwnerStepper'
import MajcomOwnerStepper from '@/components/MajcomOwnerStepper'
import LosingCommanderStepper from '@/components/LosingCommanderStepper'
import dcjsDemo from '@/components/dcjsDemo'
import { store } from '@/store.js'
Vue.use(Router)
export const router = new Router({
  routes: [
    {
      path: '/dcjs_demo',
      name: 'dcjs_demo',
      component: dcjsDemo,
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
      path: '/activate',
      name: 'Activate',
      component: Activate,
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
      path: '/rank_billets',
      name: 'Rank_Billets',
      component: RankBillets,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/rank_officers',
      name: 'Rank_Officers',
      component: RankOfficers,
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
      path: '/losing_commander',
      name: 'LosingCommander',
      component: LosingCommander,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/cfm_dashboard',
      name: 'CFMDashboard',
      component: CFMDashboard,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/billet_list',
      name: 'BilletList',
      component: BilletList,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/diagrams',
      name: 'Diagrams',
      component: Diagrams,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/stepper_officer',
      name: 'OfficerStepper',
      component: OfficerStepper,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/stepper_losingcommander',
      name: 'LosingCommanderStepper',
      component: LosingCommanderStepper,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/stepper_billetowner',
      name: 'BilletOwnerStepper',
      component: BilletOwnerStepper,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/stepper_majcom',
      name: 'MAJCOMOwnerStepper',
      component: MajcomOwnerStepper,
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
  // const profileViewRequired = to.meta.profileViewRequired
  // const id = store.getters.userId
  // const role = store.getters.role
  // if authentication is required and not logged in, then send to login page 
  if (to.path=='/activate'){
    next()
  }
  else if (authRequired && !authed){
    next('/login')
  }
  else{
    next()
  }
  // //If visiting profile, check the authority and automatically reroute to his profile id
  // //Differentiate between officer who can only view his profile and someone who can view anyone'someone
  // else if (/\/profile\/\d+/.test(to.path)){
  //   //Only let admin through for other profile view
  //   if (role == 'admin'){
  //     next()
  //   }
  //   //if role is not sufficient, forward to his own profile
  //   else{
  //     next('/profile')
  //   }
  // }
  // else {
  //   next()
  // }
})

