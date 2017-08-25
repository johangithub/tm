<template>
<v-container id="login">
<v-layout row wrap>
<v-flex xs6 offset-xs3>
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
</v-flex>
</v-layout>
<v-layout row wrap>
<v-flex xs4 offset-xs4>
<v-card>
<v-card-text>
  <v-text-field
    name="input-username"
    label="username"
    v-model="username"
    :type="'text'"
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
<v-btn primary @click.native="snackbar_login = true">Login</v-btn>
</v-card>
</v-flex>
</v-layout>
  <v-snackbar
    :timeout="3000"
    :top="true"
    v-model="snackbar_login"
  >Welcome!<v-btn flat class="blue--text" @click.native="snackbar_login = false">Close</v-btn></v-snackbar>
</v-layout>
</v-container>

</template>

<script>
export default{
  name: 'Login',
  data(){
    return {
      snackbar_login: false,
      show_password: false,
      username: '',
      password: ''
    }
  },
  methods:{
    showPassword: function(){
      this.show_password = !this.show_password  
    } 
  }
}
</script>

<style>
#login {
    margin-top: 20px;
}

.login-form{
    padding: 15px;
    outline: 2px solid #ccc;
}
</style>

