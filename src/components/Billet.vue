<template>
<v-container id="billet">
<v-layout row>
    <v-flex xs12 offset-md1 md10>
        <v-card>
            <v-card-title class="cardTitle">Billet #{{myBillet.id}}</v-card-title>
          <v-card-text class="grey lighten-3">
              <v-layout row>
                  <v-flex xs3 md2>
                      <text-field :value="myBillet.id">AFPC ID</text-field>
                  </v-flex>
                  <v-flex d-flex>
                      <text-field :value="myBillet.general_duty_title">Duty Title</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs6>
                      <text-field :value="myBillet.pas">PASCODE</text-field>                    
                  </v-flex> 
                  <v-flex xs6>
                      <text-field :value="myBillet.position">Position Number</text-field>                    
                  </v-flex> 
              </v-layout>
              <v-layout row>
                  <v-flex xs1>
                      <text-field :value="myBillet.api">API</text-field>
                  </v-flex>
                  <v-flex d-flex>
                      <text-field :value="myBillet.afsc">AFSC</text-field>
                  </v-flex>
                  <v-flex d-flex>
                      <text-field :value="myBillet.grade">Grade</text-field>
                  </v-flex>
                  <v-flex d-flex>
                      <text-field :value="myBillet.aircraft">Aircraft <small>(RDTM)</small></text-field>
                  </v-flex>
                  <v-flex xs6>
                      <text-field :value="myBillet.unit">Unit</text-field>                    
                  </v-flex> 
              </v-layout>
              <v-layout row>
                  <v-flex xs10>
                      <text-field :value="myBillet.location">Location</text-field>                    
                  </v-flex> 
                  <v-flex xs2>
                      <text-field :value="myBillet.state">State</text-field>                    
                  </v-flex> 
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <text-field :value="myBillet.description">Description</text-field>                    
                  </v-flex> 
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <text-field :value="myBillet.quals">Qualifications</text-field>                    
                  </v-flex> 
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <text-field :value="myBillet.prd_remarks">Remarks</text-field>                    
                  </v-flex> 
              </v-layout>
          </v-card-text>
        </v-card>
    </v-flex>
</v-layout>
</v-container>
</template>

<script>
import TextField from '@/components/TextField'
import BlockTextField from '@/components/BlockTextField'

export default{
  props: ['myBillet', 'id'],
  components: {
    'text-field': TextField,
    'block-text-field': BlockTextField,
  }
}
</script>

<style scoped>
.cardTitle {
    font-size: 22px;
    padding: 8px 0px 8px 12px;
}  

</style>
