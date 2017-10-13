<template>
<v-container fluid class="pa-2">
<v-toolbar dark fixed class="primary">
    <v-toolbar-title class="white--text noselect">
        AF Talent Marketplace
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="isLoggedIn" class="hidden-sm-and-down">
        <v-btn class="white--text" flat v-for="item in headerList" :to="'/'+item.link" :key="item.name" router>{{item.name}}</v-btn>
        <v-btn class="white--text" flat @click.native.stop="dialog = true">About</v-btn><my-about v-model="dialog"></my-about>
        <v-btn class="white--text" flat @click="logout">LOG OUT</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="!isLoggedIn" class="hidden-sm-and-down">
        <v-btn class="white--text" flat to="/login" router right>LOG IN</v-btn>
    </v-toolbar-items>
    <span @click.stop="sideNav = !sideNav"
          class="hidden-md-and-up">
          <v-toolbar-side-icon ></v-toolbar-side-icon>
    </span>
</v-toolbar>
<v-navigation-drawer temporary dark right v-model="sideNav" class="hidden-md-and-up">
  <v-list>
      <v-list-tile 
          v-for="item in headerList" 
          :key="item.name"
          router
          :to="'/'+item.link"
          >
          <v-list-tile-content>{{item.name}}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click.native.stop="showAboutSide">About<my-about v-model="dialog"></my-about></v-list-tile>
      <v-list-tile v-if="isLoggedIn" @click="logout">Log out</v-list-tile>
      <v-list-tile v-if="!isLoggedIn" router to="/login"></v-list-tile>
  </v-list> 
</v-navigation-drawer>
</v-container>
</template>

<script>
import About from './About'
export default{
  data() {
    return {
      dialog: false,
      sideNav: false,
    }
  },
  components:{
    'my-about': About,
  },
  methods: {
    logout(){
      this.$store.dispatch('logout').then(()=>{
        this.$router.push("/login")
      })
    },
    showAboutSide () {
        this.dialog = true
        this.sideNav = false
    }
  },
  computed: {
    userId() {
      return this.$store.getters.userId
    },
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    },
    headerList(){
      console.log(this.userRoles)
      var headers = []
      this.userRoles.forEach(role=>{

      if (role == 'officer'){
      }
      else if (role == 'billet_owner'){
      }
      else if (role == 'losing_commander'){
      }
      else if (role == 'assignment_officer'){
        return [
          {name: "CFM Dashboard", link: "cfm_dashboard"},
        ]
      }
      else if (role == 'admin'){
        return [
          {name: "My Profile", link: "profile"},
          {name: "Find Billets", link: "find_billets"},
          {name: "Rank Billets", link: "rank_billets"},
          {name: "My Billets", link: "billet_list"},
          {name: "Find Officers", link: "find_officers"},
          {name: "Rank Officers", link: "rank_officers"},
          {name: "Commander Input", link: "losing_commander"},
          {name: "CFM Dashboard", link: "cfm_dashboard"},
          {name: "Diagrams", link: "diagrams"},
        ]
      }
      })
    },
    userRoles(){
      return this.$store.getters.userRole.split(',')
    }
  },
}
</script>
<style scoped>
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
  }
</style>