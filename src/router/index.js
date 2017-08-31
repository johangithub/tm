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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/billet',
      name: 'Billet',
      component: Billet
    },
    {
      path: '/find_billets',
      name: 'FindBillets',
      component: FindBillets
    },
    {
      path: '/find_officers',
      name: 'FindOfficers',
      component: FindOfficers
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      props: true
    },
    {
      path: '/squadrons',
      name: 'Squadrons',
      component: Squadrons
    },
    {
      path: '/losing_commander',
      name: 'LosingCommander',
      component: LosingCommander
    },
    //Wildcard redirect
    {path: '*', redirect: '/'}
  ]
})