<template>
<v-toolbar dark class="primary">
    <v-toolbar-title class="white--text" style="user-select: none">AF Talent Marketplace</v-toolbar-title>
    <v-btn class="white--text" flat v-for="item in headerList" :to="'/'+item.link" :key="item.name" router>{{item.name}}</v-btn>
    <my-about></my-about>
</v-toolbar>
</template>

<script>
import About from './About.vue'
export default{
  data() {
    return {
      headerList: [
        {name: "Home", link: "/"},
        {name: "Login", link: "login"},
        {name: "My Profile", link: "profile"},
        {name: "Rank Billets", link: "billet"},
        {name: "Find Billets", link: "find_billets"},
        {name: "Find Officers", link: "find_officers"},
        {name: "Losing Commander", link: "losing_commander"},
        {name: "Squadrons", link: "squadrons"},
      ],
    }
  },
  components:{
    'my-about': About
  }
}
</script>