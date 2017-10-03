<template>
<v-container id="activate">
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
<v-card-text>
  <div>Create New Password</div>
</v-card-text>
<v-card-text @keyup.enter="activate">
  <v-text-field
    name="input-password"
    label="password"
    v-model="password"
    type="password"
    hint="include one upper, one lower, one number, one special character"
    autofocus
  ></v-text-field>
    <v-text-field
      name="confirm-password"
      label="confirm password"
      v-model="password_confirm"
      type="password"
      counter
    ></v-text-field>
</v-card-text>
<v-btn primary @click.native="activate">Submit</v-btn>
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
import NoticeConsent from '@/components/NoticeConsent'
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
      agreed: false,
      password: '',
      password_confirm: '',
    }
  },
  methods:{
    activate: function(){
      //Check if confirmed password is equal
      if (this.password != this.password_confirm){
        this.snackbar('Password does not match')
      }
      else if (this.password.length<8){
        this.snackbar('Password needs to be at least 8 characters long')
      }
      //Password validation
      else if(!/(?=.*[a-z])/.test(this.password)){
        this.snackbar('Password needs to contain at least one lowercase letter')
      }
      else if(!/(?=.*[A-Z])/.test(this.password)){
        this.snackbar('Password needs to contain at least one uppercase letter')
      }
      else if(!/(?=.*\d)/.test(this.password)){
        this.snackbar('Password needs to contain at least one number')
      }
      else if(!/(?=.*[$@$!%*?&])/.test(this.password)){
        this.snackbar('Password needs to contain at least one special character')
      }
      //Password Valid
      else {
        this.snackbar('Login Success')
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
  },
  created(){
    //check if the token is expired
    console.log(this.$route.params)
  },
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


</template>