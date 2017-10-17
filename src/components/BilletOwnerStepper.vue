<template>
  <v-container fluid class='pa-0' >
    <v-stepper v-model="step">
      <v-stepper-header>
      <v-stepper-step step="1" :complete="step > 1"><v-btn small flat @click="step=1">Review your billets</v-btn></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="step > 2"><v-btn small flat @click="step=2">Update your billet</v-btn></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="step > 3"><v-btn small flat @click="step=3">Find officers</v-btn></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" :complete="step > 4"><v-btn small flat @click="step=4">Rank your officers</v-btn></v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <billet-list :myBillets="myBillets" :completedBillets="completedBillets" @gotoRank="step = 4" @next="step += 1"></billet-list>
        <v-layout row>
        <v-spacer></v-spacer>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="2">
        <billet :myBillet="myBillet" :step="step"></billet>
        <v-layout row>
        <v-btn warning class="ml-2" @click.native="step -= 1">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn primary @click.native="step += 1">Continue</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="3">
        <find-officers :step="step"></find-officers>
        <v-layout row>
        <v-btn warning class="ml-2" @click.native="step -= 1">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn primary @click.native="step += 1">Continue</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="4">
        <rank-officers></rank-officers>
        <v-layout row>
          <v-btn warning class="ml-3" @click.native="step -= 1">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn primary :disabled="faveOfficers.length==0" @click.native="submit">Submit</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="5">
        <thanks></thanks>
        <v-layout row>
          <v-btn warning class="ml-3" @click.native="step -= 1">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn primary @click.native="step = 1">Return to Billet List</v-btn>
        </v-layout>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>
<script>
import Home from '@/components/Home'
import Billet from '@/components/Billet'
import BilletList from '@/components/BilletList'
import FindOfficers from '@/components/FindOfficers'
import RankOfficers from '@/components/RankOfficers'
import Thanks from '@/components/Thanks'
import { mapGetters } from 'vuex'
export default{
  data(){
    return {
      step: Number(localStorage.getItem('billetStep')) || 1,
      myBillets: [],
      completedBillets: []
    }
  },
  computed: {
    ...mapGetters(['reqId','faveOfficers']),
    myBillet(){
      return this.myBillets.filter(d=>{return d.id == this.reqId})[0] || {}
    }
  },
  watch: {
    step: function() {
        localStorage.setItem('billetStep', this.step)

    },
  },
  components:{
    'home': Home,
    'billet': Billet,
    'billet-list': BilletList,
    'find-officers': FindOfficers,
    'rank-officers': RankOfficers,
    'thanks': Thanks
  },
  methods: {
    submit(){
      this.completedBillets.push(this.reqId)
      this.step += 1
    }
  },
  mounted: function(){
    window.axios.get('/billet_view').then(response => {
        this.myBillets = response.data.data.filter(d=>{return d.state=='TX'}).slice(0,10)
    }).catch(console.error)
  }
}
</script>
