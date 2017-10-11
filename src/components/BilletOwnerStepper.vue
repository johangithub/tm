<template>
  <v-container fluid class='pa-0' >
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="step > 1">Welcome</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="step > 2">Review all your billets</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="step > 3">Update your billets</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" :complete="step > 4">Find officers</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="5">Rank your officers</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <home></home>
        <v-layout row>
        <v-spacer></v-spacer>
        <v-btn primary @click.native="step += 1">Continue</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="2">
        <billet-list @next="step += 1"></billet-list>
        <v-layout row>
        <v-btn warning class="ml-3" @click.native="step -= 1">Back</v-btn>
        <v-spacer></v-spacer>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="3">
        <div>Update AFPCID {{this.$store.getters.reqId}}</div>
        <v-layout row>
        <v-btn warning class="ml-3" @click.native="step -= 1">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn primary @click.native="step += 1">Continue</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="4">
        <find-officers :step="step"></find-officers>
        <v-layout row>
        <v-btn warning class="ml-3" @click.native="step -= 1">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn primary @click.native="step += 1">Continue</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="5">
        <rank-officers></rank-officers>
        <v-layout row>
          <v-btn warning class="ml-3" @click.native="step -= 1">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn primary @click.native="step = 2">Submit</v-btn>
        </v-layout>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>
<script>
import Home from '@/components/Home'
import BilletList from '@/components/BilletList'
import FindOfficers from '@/components/FindOfficers'
import RankOfficers from '@/components/RankOfficers'
export default{
  data(){
    return {
      step: 1
    }
  },
  components:{
    'home': Home,
    'billet-list': BilletList,
    'find-officers': FindOfficers,
    'rank-officers': RankOfficers
  },
  mounted: function(){
    window.addEventListener('keydown', (e)=>{
      if(e.keyCode==39 && this.step != 2){
        this.step = this.step >= 6 ? 6 : this.step + 1
      }
      else if(e.keyCode==37){
        this.step = this.step <= 1 ? 1 : this.step - 1
      }
    })
  }
}
</script>