<template>
  <v-container fluid class="pa-0">
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="step > 1">Welcome</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="step > 2">Update your profile</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="step > 3">Find billets</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" :complete="step > 4">Rank your billets</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <home></home>
        <v-layout row>
        <v-spacer></v-spacer>
        <v-btn primary @click.native="step += 1">Continue</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="2">
        <profile :profileData="profileData" :value="step"></profile>
        <v-layout row>
        <v-btn class="ml-3" warning @click.native="step -= 1">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn primary @click.native="step += 1">Continue</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="3">
        <find-billets :step="step"></find-billets>
        <v-layout row>
        <v-btn class="ml-3" warning @click.native="step -= 1">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn primary @click.native="step += 1">Continue</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="4">
        <rank-billets></rank-billets>
        <v-layout row>
          <v-btn class="ml-3" warning @click.native="step -= 1">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn primary>Submit</v-btn>
        </v-layout>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>
<script>
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import FindBillets from '@/components/FindBillets'
import RankBillets from '@/components/RankBillets'
export default{
  data(){
    return {
      step: 1,
      profileData: JSON.parse(localStorage.getItem("profileData")),
    }
  },
  components:{
    'home': Home,
    'profile': Profile,
    'find-billets': FindBillets,
    'rank-billets': RankBillets
  },
  mounted: function(){
    window.addEventListener('keydown', (e)=>{
      if(e.keyCode==39){
        this.step = this.step >= 4 ? 4 : this.step + 1
      }
      else if(e.keyCode==37){
        this.step = this.step <= 1 ? 1 : this.step - 1
      }
    })
  }
}
</script>