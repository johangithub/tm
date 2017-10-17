<template>
<v-container id="billet">
<v-layout row>
    <v-flex xs12 offset-md1 md10>
        <v-card class="elevation-6">
            <v-card-title class="cardTitle">Billet #{{myBillet.id}}</v-card-title>
          <v-card-text>
              <v-layout row>
                  <v-flex xs3 md2>
                    <v-text-field 
                        label="AFPC ID"
                        v-model="myBillet.id"></v-text-field>
                  </v-flex>
                  <v-flex d-flex>
                    <v-text-field 
                        label="Duty Title"
                        v-model="myBillet.general_duty_title"></v-text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs6>
                    <v-text-field 
                        label="PASCODE"
                        v-model="myBillet.pas"></v-text-field>
                  </v-flex> 
                  <v-flex xs6>
                    <v-text-field 
                        label="Position Number"
                        v-model="myBillet.position"></v-text-field>
                  </v-flex> 
              </v-layout>
              <v-layout row>
                  <v-flex xs1>
                    <v-text-field 
                        label="API"
                        v-model="myBillet.api"></v-text-field>
                  </v-flex>
                  <v-flex d-flex>
                    <v-text-field 
                        label="AFSC"
                        v-model="myBillet.afsc"></v-text-field>
                  </v-flex>
                  <v-flex d-flex>
                    <v-text-field 
                        label="Grade"
                        v-model="myBillet.grade"></v-text-field>
                  </v-flex>
                  <v-flex d-flex>
                    <v-text-field 
                        label="Aircraft"
                        v-model="myBillet.aircraft"></v-text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs5>
                      <v-text-field
                        label="Unit"
                        v-model="myBillet.unit"></v-text-field>
                  </v-flex> 
                  <v-flex xs5>
                    <v-text-field
                        label="Location"
                        v-model="myBillet.location"></v-text-field>
                  </v-flex> 
                  <v-flex xs2>
                      <v-text-field
                        label="State"
                        v-model="myBillet.state"></v-text-field> 
                  </v-flex> 
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <v-text-field
                        label="Description"
                        v-model="myBillet.description"
                        textarea></v-text-field>
                  </v-flex> 
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <v-text-field
                        label="Qualifications"
                        v-model="myBillet.quals"
                        textarea></v-text-field>
                  </v-flex> 
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <v-text-field
                        label="Remarks"
                        v-model="myBillet.prd_remarks"
                        textarea></v-text-field>
                  </v-flex> 
              </v-layout>
          </v-card-text>
        </v-card>
    </v-flex>
</v-layout>
</v-container>
</template>

<script>

export default{
  props: ['myBillet', 'id'],
}
</script>

<style scoped>
.cardTitle {
    font-size: 25px;
    padding: 8px 0px 8px 12px;
}  

</style>
