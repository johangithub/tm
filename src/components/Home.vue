<template>
  <v-container id="home">
      <v-layout row>
          <v-flex xs12 class="text-xs-center">
              <v-card>
                
              </v-card>
              <h3>Welcome to the Air Force's Talent Marketplace!</h3>
          </v-flex>
      </v-layout>
      <v-layout row>
          <v-flex xs12>
              <p>Congratulations! As an active participant on the FY18 Summer VML cycle, you have been chosen to help shape the future Air Force assignment system.</p>
          </v-flex>
      </v-layout>
  <v-layout row wrap>
   <v-flex xs4 v-for="role in testRoles" :key="role" class="pb-3">
    <officer-card v-if="role=='officer'"></officer-card>
    <billet-owner-card v-if="role=='billet_owner'"></billet-owner-card>
    <losing-commander-card v-if="role=='losing_commander'"></losing-commander-card>
    <admin-card v-if="role=='admin'"></admin-card>
  </v-flex> 
  </v-layout>
  </v-container>
</template>

<script>
import OfficerCard from './HomepageCards/OfficerCard'
import BilletOwnerCard from './HomepageCards/BilletOwnerCard'
import AdminCard from './HomepageCards/AdminCard'
import LosingCommanderCard from './HomepageCards/LosingCommanderCard'
export default {
  name: 'home',
  data () {
    return {
      title: 'Air Force Talent Marketplace Home Page',
      testRoles: ['officer','billet_owner','losing_commander','majcom','afpc','admin']
    }
  },
  computed:{
    userRole(){
      console.log(this.$store.getters.userRole)
      return this.$store.getters.userRole
    }
  },
  components:{
    'officer-card': OfficerCard,
    'billet-owner-card': BilletOwnerCard,
    'admin-card': AdminCard,
    'losing-commander-card': LosingCommanderCard
  }
}
</script>
