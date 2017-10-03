<template>
<v-container fluid class="pa-2">
<v-toolbar dark fixed class="primary">
    <v-toolbar-title class="white--text">
        <router-link to='/' tag="span" style="cursor: pointer">AF Talent Marketplace</router-link>
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
      if (this.userRole == 'officer'){
        return [
          {name: "My Profile", link: "profile"},
          {name: "Find Billets", link: "find_billets"},
          {name: "Rank Billets", link: "rank_billets"},
        ]
      }
      else if (this.userRole == 'billet_owner'){
        return [
          {name: "My Billets", link: "find_billets"},
          {name: "Find Officers", link: "find_officers"},
          {name: "Rank Officers", link: "rank_officers"},
        ]
      }
      else if (this.userRole == 'losing_commander'){
        return [
          {name: "Commander Input", link:"losing_commander"}
        ]
      }
      else if (this.userRole == 'assignment_officer'){
        return [
          {name: "My Profile", link: "profile"},
          {name: "AO Dashboard", link: "#"},
          {name: "Manage Officers", link: "find_officers"},
          {name: "Manage Billets", link: "find_billets"},
        ]
      }
      else{
        return [
          {name: "My Profile", link: "profile"},
          {name: "Find Billets", link: "find_billets"},
          {name: "Rank Billets", link: "rank_billets"},
          {name: "My Billets", link: "billet_list"},
          {name: "Find Officers", link: "find_officers"},
          {name: "Rank Officers", link: "rank_officers"},
          {name: "Commander Input", link: "losing_commander"},
          {name: "AO Dashboard", link: "#"},
          {name: "Diagrams", link: "diagrams"},
        ]
      }
    },
    userRole(){
      return this.$store.getters.userRole
    }
  },
}
</script>
