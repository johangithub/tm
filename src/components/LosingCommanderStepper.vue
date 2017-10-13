<template>
  <v-container fluid class='pa-0' >
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="step > 1">Review your officers</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="step > 2">Vector your officers</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="step > 2">Complete</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <my-officer-list :myOfficers="myOfficers" :vectoredOfficers="vectoredOfficers" @next="step += 1"></my-officer-list>
        <v-layout row>
        <v-btn warning class="ml-3" @click.native="step -= 1">Back</v-btn>
        <v-spacer></v-spacer>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="2">
        <!-- <billet :myBillet="myBillet" :id="reqId"></billet> -->
        <v-layout row>
        <v-btn warning class="ml-3" @click.native="step -= 1">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn primary @click.native="step += 1">Continue</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="3">
        <thanks></thanks>
        <v-layout row>
          <v-btn warning class="ml-3" @click.native="step -= 1">Back</v-btn>
          <v-spacer></v-spacer>
        </v-layout>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>
<script>
// import Home from '@/components/Home'
// import Billet from '@/components/Billet'
// import BilletList from '@/components/BilletList'
// import FindOfficers from '@/components/FindOfficers'
// import RankOfficers from '@/components/RankOfficers'
import MyOfficerList from '@/components/MyOfficerList'
import Thanks from '@/components/Thanks'
import { mapGetters } from 'vuex'
export default{
  data(){
    return {
      step: 1,
      myOfficers: [],
      vectoredOfficers: []
    }
  },
  components:{
    'my-officer-list': MyOfficerList,
    'thanks': Thanks
  },
  mounted: function(){
    window.addEventListener('keydown', (e)=>{
      if(e.keyCode==39){
        this.step = this.step >= 3 ? 3 : this.step + 1
      }
      else if(e.keyCode==37){
        this.step = this.step <= 1 ? 1 : this.step - 1
      }
    })
    //Retrieve only the billets I own
    window.axios.get('/ao_dashboard_view').then(response => {
        this.myOfficers = _.slice(_.shuffle(response.data.data),0,10)
    }).catch(console.error)
  }
}
</script>