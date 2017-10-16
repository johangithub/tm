<template>
  <v-container id="home">
      <v-layout row class="pb-3">
          <v-flex xs12>
              <v-card class="elevation-8">
                  <v-card-media
                      height="350px"
                      src="/static/welcome_tight.jpg">
                      <v-container fill-height fluid>
                          <v-layout fill-height>
                              <v-flex xs12 align-end flexbox>
                                  <span class="headline white--text">Welcome!</span>
                              </v-flex>
                          </v-layout>
                      </v-container>
                  </v-card-media>
              </v-card>
          </v-flex>
      </v-layout>
      <v-layout row class="pb-3">
          <v-flex xs3>
              <v-card height="200px" class="elevation-8">
                  <v-card-media
                      height="200px">
                      <iframe width="100%" height="200"
                              src="https://www.youtube.com/embed/I8i8hVrkF0o"
                              frameborder="0"
                              allowfullscreen></iframe>
                  </v-card-media>
              </v-card>      
          </v-flex>
          <v-flex xs9>
              <v-card height="200px" class="elevation-8">
                  <v-card-title class="headline">
                      Tutorial
                  </v-card-title>
                  <v-card-text>
                      Watch the video to see a F-15 video (Talent Marketplace demo in the works)!
                  </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
  <v-layout row justify-space-around wrap>
   <v-flex xs4 v-for="role in userRoles" :key="role" class="pb-3">
    <officer-card v-if="role=='officer'"></officer-card>
    <billet-owner-card v-if="role=='billet_owner'"></billet-owner-card>
    <losing-commander-card v-if="role=='losing_commander'"></losing-commander-card>
    <majcom-card v-if="role=='majcom'"></majcom-card>
    <afpc-card v-if="role=='assignment_officer'"></afpc-card>
    <!--<admin-card v-if="role=='admin'"></admin-card>-->
  </v-flex> 
  </v-layout>
  </v-container>
</template>

<script>
import OfficerCard from './HomepageCards/OfficerCard'
import BilletOwnerCard from './HomepageCards/BilletOwnerCard'
import LosingCommanderCard from './HomepageCards/LosingCommanderCard'
import MajcomCard from './HomepageCards/MajcomCard'
import AfpcCard from './HomepageCards/AfpcCard'
import AdminCard from './HomepageCards/AdminCard'
export default {
  name: 'home',
  data () {
    return {
      title: 'Air Force Talent Marketplace Home Page',
      //testRoles: ['officer','billet_owner','losing_commander','majcom','afpc','admin'],
      //shouldn't need computed, just get from local storage
      userRoles: typeof localStorage.getItem("role") == "string" ? localStorage.getItem("role").split(',') == "admin" ? ['officer', 'billet_owner', 'losing_commander', 'majcom', 'assignment_officer'] : localStorage.getItem("role").split(',') : [],
    }
  },
  //computed doesnt work, (have to refresh to get roles right), not using now
  //computed:{
  //  userRole(){
  //    console.log(this.$store.getters.userRole)
  //    return this.$store.getters.userRole
  //  }
  //},
  components:{
    'officer-card': OfficerCard,
    'billet-owner-card': BilletOwnerCard,
    'admin-card': AdminCard,
    'losing-commander-card': LosingCommanderCard,
    'afpc-card': AfpcCard,
    'majcom-card': MajcomCard,
  }
}
</script>

<style scoped>
.banner {
    
}
</style>
