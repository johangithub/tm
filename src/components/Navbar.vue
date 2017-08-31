<template>
<v-container fluid>
<v-toolbar dark class="primary">
    <v-toolbar-title class="white--text" style="user-select: none">AF Talent Marketplace</v-toolbar-title>
    <v-btn class="white--text" flat v-for="item in headerList" :to="'/'+item.link" :key="item.name" router>{{item.name}}</v-btn>
    <my-about></my-about>
    <v-spacer></v-spacer>
    <v-btn class="white--text" flat to="/login" router>{{ login_text }}</v-btn>
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
      ],
      isLoggedIn: false
    }
  },
  components:{
    'my-about': About,
  },
  computed: {
    login_text: function(){
      return this.isLoggedIn ? 'Log Out' : 'Log In'
    }
  }
}
</script>