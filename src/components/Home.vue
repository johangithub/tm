<template>
  <v-container id="home">
  <h4>Welcome to the Air Force Talent Marketplace</h4>  
  <p>Congratulations! As an active participant on the FY18 Summer VML cycle, you have been chosen to help shape the future Air Force assignment system.</p>
  <v-layout row justify-center>
  <v-flex xs6>
    <officer-card v-if="userRole=='officer'"></officer-card>
    <billet-owner-card v-if="userRole=='billet_owner'"></billet-owner-card>
    <admin-card v-if="userRole=='admin'"></admin-card>
    <losing-commander-card v-if="userRole=='losing_commander'"></losing-commander-card>
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
      title: 'Air Foce Talent Marketplace Home Page'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
