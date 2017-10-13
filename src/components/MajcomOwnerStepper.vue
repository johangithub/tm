<template>
  <v-container fluid class='pa-0'>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="step > 0">Prioritize your billets</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="step > 1">Review your billets</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <billet-list @next="step += 1"></billet-list>
        <v-layout row>
        <v-spacer></v-spacer>
        <v-btn primary @click.native="step += 1">Continue</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="2">
        <rank-officers></rank-officers>
        <v-layout row>
        <v-btn class="ml-3" warning @click.native="step -= 1">Back</v-btn>
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
  }
}
</script>
