<template>
<v-container id="login">
<v-layout row >
<v-flex xs12 sm10 offset-sm1 md8 offset-md2 elevation-2 class="pa-4" v-if="!agreed">
<h4>Notice and Consent Statement</h4>
<p>You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only. By using this IS (which includes any device attached to this IS), you consent to the following conditions: </p>
<ol>
<li>
  The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations. 
</li>
<li>
  At any time, the USG may inspect and seize data stored on this IS. 
</li>
<li>
  Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG authorized purpose. 
</li>
<li>
  This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy. 
</li>
<li>
  Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. 
</li>
</ol>
<v-btn primary @click="agreed = true">I Agree</v-btn>
</v-flex>
</v-layout>
<v-layout row wrap>
<v-flex xs12 sm10 offset-sm1 md6 offset-md3>
<transition name="fade" mode="out-in">
<v-layout v-if="agreed && pending">
    <v-flex xs12 class="text-xs-center pt-5 mt-5">
        <v-progress-circular indeterminate :size="120" :width="4" class="primary--text text-xs-center"></v-progress-circular>
    </v-flex>
</v-layout>
<!--<v-progress-linear v-if="pending" :indeterminate="true"></v-progress-linear>-->
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
    :timeout="3000"
    :top="true"
    v-model="show_snackbar"
  >{{ snackbar_text }}<v-btn flat class="blue--text" @click.native="show_snackbar = false">Close</v-btn></v-snackbar>
</v-container>
</template>

<script>
import axios from 'axios'
import ClipSpinner from './ClipSpinner'
export default{
  name: 'Login',
  components:{
    'clip-spinner': ClipSpinner
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
      autofocus: false
    }
  },
  methods:{
    showPassword: function(){
      this.show_password = !this.show_password  
    },
    login: function(){
      if (this.email_valid && this.password){ 
      this.$store.dispatch("login", {
              email: this.email,
              password: this.password
            }).then(() => {
            this.$router.push("/")
          }).catch((message)=>{
            //handle server side login rejection
            this.snackbar(message)
          })
      }
      else if (!this.email_valid){
        //Client side email validation
        this.snackbar('Wrong Email Format')
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
    },
    email_valid(){
      return /[A-Za-z]+\.[A-Za-z]+\.\d{1,2}/.test(this.email)
    }
  },
  watch: {
    autofocus(val){
      if(!val){
        return requestAnimationFrame(() => {
          this.$refs.focus.focus()
        })
      }
    }
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

