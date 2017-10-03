<template>
    <v-card>
      <v-card-title class="headline">
          <v-container fluid grid-list-md>
              <v-layout row>
                  <div>
                      <h3 class="headline mb-0">Requisition #{{dialogData.id}}</h3>
                  </div>
              <v-spacer></v-spacer>
              <v-btn fab primary small flat @click.native="$emit('reqClose')"><v-icon dark >clear</v-icon></v-btn>
              </v-layout>
              <v-layout row>
                  <v-flex xs3>
                    <v-text-field label="ID"
                                  :value="dialogData.id"
                                  readonly>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field label="Duty Title"
                                  :value="dialogData.actual_duty_title"
                                  readonly>
                    </v-text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs1 class="mr-2">
                    <v-text-field label="API"
                                  :value="dialogData.api"
                                  readonly>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs3 class="mr-2">
                    <v-text-field label="AFSC"
                                  :value="dialogData.afsc"
                                  readonly>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs3 class="mr-2">
                    <v-text-field label="Grade"
                                  :value="dialogData.grade"
                                  readonly>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4 class="mr-2">
                    <v-text-field label="Aircraft"
                                  :value="dialogData.aircraft"
                                  readonly>
                    </v-text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs10 class="mr-3">
                    <v-text-field label="Unit"
                                  :value="dialogData.unit"
                                  readonly>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs2 class="mr-3">
                    <v-text-field label="State"
                                  :value="dialogData.state"
                                  readonly>
                    </v-text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 class="mr-3">
                  <v-text-field label="Description"
                                :value="dialogData.description"
                                textarea
                                readonly
                                >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 class="mr-3">
                  <v-text-field label="Qualifications"
                                :value="dialogData.quals"
                                textarea
                                readonly
                                >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 class="mr-3">
                  <v-text-field label="Remarks"
                                :value="dialogData.prd_remarks"
                                textarea
                                readonly
                                >
                  </v-text-field>
                </v-flex>
              </v-layout>
          </v-container>
      </v-card-title>
      <v-card-text>
        <div>
      </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="$emit('reqClose')">Close</v-btn>
      </v-card-actions>
  </v-card>
</template>
<script>
export default{
  props: ['dialogData'],
  mounted: function(){
    console.log(this.dialogData)
  }
}
</script>