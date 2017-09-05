<template>
<v-container fluid>
<v-toolbar dark class="primary">
    <v-toolbar-title class="white--text" style="user-select: none">AF Talent Marketplace</v-toolbar-title>
    <v-btn v-if="isLoggedIn" class="white--text" flat v-for="item in headerList" :to="'/'+item.link" :key="item.name" router>{{item.name}}</v-btn>
    <my-about v-if="isLoggedIn"></my-about>
    <v-spacer></v-spacer>
    <v-btn v-if="!isLoggedIn" class="white--text" flat to="/login" router>LOG IN</v-btn>
    <v-btn v-if="isLoggedIn" class="white--text" flat @click="logout">LOG OUT</v-btn>
</v-toolbar>
</v-container>
</template>

<script>
import About from './About'
export default{
  data() {
    return {
      headerList: [
        {name: "Home", link: "/"},
        {name: "My Profile", link: "profile/1"},
        {name: "Rank Billets", link: "billet"},
        {name: "Find Billets", link: "find_billets"},
        {name: "Find Officers", link: "find_officers"},
        {name: "Losing Commander", link: "losing_commander"},
        {name: "Squadrons", link: "squadrons"},
      ]
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
    }
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>