<template>
<v-container id="login">
<notice-consent v-if="!agreed" @agreeClicked="agreed = true">
</notice-consent>
<v-layout row wrap>
<v-flex xs12 sm10 offset-sm1 md6 offset-md3>
<transition name="fade" mode="out-in">
<v-layout v-if="agreed && pending">
    <v-flex xs12 class="text-xs-center pt-5 mt-5">
        <v-progress-circular indeterminate :size="120" :width="4" class="primary--text text-xs-center"></v-progress-circular>
    </v-flex>
</v-layout>
<v-card v-if="agreed && !pending" class="py-5 px-3">
<v-card-text @keyup.enter="login">
  <v-text-field
    name="input-email"
    label="email"
    v-model="email"
    suffix="@us.af.mil"
    autofocus
  ></v-text-field>
    <v-text-field
      name="input-password"
      label="password"
      v-model="password"
      :append-icon="show_password ? 'visibility_off' : 'visibility'"
      :append-icon-cb="showPassword"
      :type="show_password ? 'text': 'password'"
      counter
    ></v-text-field>
</v-card-text>
<v-btn primary @click.native="login">Login</v-btn>
</v-card>
</transition>
</v-flex>
</v-layout>
  <v-snackbar
    :timeout="1500"
    :top="true"
    v-model="show_snackbar"
  >{{ snackbar_text }}<v-btn flat class="blue--text" @click.native="show_snackbar = false">Close</v-btn></v-snackbar>
</v-container>
</template>

<script>
import NoticeConsent from '@/components/NoticeConsent'
import axios from 'axios'
import ClipSpinner from './ClipSpinner'
export default{
  name: 'Login',
  components:{
    'clip-spinner': ClipSpinner,
    'notice-consent': NoticeConsent
  },
  data(){
    return {
      show_snackbar: false,
      snackbar_text: '',
      show_password: false,
      agreed: false,
      validate_email: false,
      email: '',
      password: '',
      totp:''
    }
  },
  methods:{
    showPassword: function(){
      this.show_password = !this.show_password  
    },
    login: function(){
      if (this.password){
      this.$store.dispatch("login", {
              email: this.email,
              password: this.password
            }).then(() => {
                this.$router.push({path: "/"})
            }).catch((message)=>{
            //handle server side login rejection
            this.snackbar(message)
          })
      }
      else if (!this.password){
        //Password is required
        this.snackbar('Please input password')
      }
    },
    snackbar(text){
      this.snackbar_text = text
      this.show_snackbar = true
    }
  },
  computed: {
    pending(){
      return this.$store.getters.isPending
    }
  },
  mounted: function(){
    console.log('login mounted')
  }
}
</script>
<style lang="scss">
#login {
    margin-top: 20px;
}

.login-form{
    padding: 15px;
    outline: 2px solid #ccc;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

</style>

