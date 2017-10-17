<template>
      <v-card>
        <v-card-title class="headline">Officer<v-spacer></v-spacer>
          <v-btn fab primary small flat @click.native="$emit('offClose')"><v-icon dark >clear</v-icon></v-btn></v-card-title>
            <v-card-text>
                <v-container fluid grid-list-xs>
                    <v-layout row>
                        <v-flex xs6>
                            <v-text-field
                                label="DoDID"
                                v-model="dialogData.dod_id">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex flexbox>
                            <v-text-field
                                label="First Name"
                                v-model="dialogData.general.firstName">
                            </v-text-field>
                        </v-flex>
                        <v-flex flexbox>
                            <v-text-field
                                label="Last Name"
                                v-model="dialogData.general.lastName">
                            </v-text-field>
                        </v-flex>
                        <v-flex flexbox>
                            <v-text-field
                                label="Location"
                                v-model="dialogData.duty.location">
                            </v-text-field>
                        </v-flex>
                        <v-flex flexbox>
                            <v-text-field
                                label="Grade"
                                v-model="dialogData.general.grade">
                            </v-text-field>
                        </v-flex>
                        <v-flex flexbox>
                            <v-text-field
                                label="Adjusted Year Group"
                                v-model="dialogData.general.adjYG">
                            </v-text-field>
                        </v-flex>
                        <v-flex flexbox>
                            <v-text-field
                                label="Rating"
                                v-model="dialogData.duty.core_group">
                            </v-text-field>
                        </v-flex>
                        <v-flex flexbox>
                            <v-text-field
                                label="RDTM"
                                v-model="rdtm[dialogData.rated.rdtm]">
                            </v-text-field>
                        </v-flex>
                        <v-flex flexbox>
                            <v-text-field
                                label="Current Duty Title"
                                v-model="dialogData.duty.title">
                            </v-text-field>
                        </v-flex>
                        <v-flex flexbox>
                            <v-text-field
                                label="DAFSC"
                                v-model="dialogData.duty.dafsc">
                            </v-text-field>
                        </v-flex>
                        <v-flex flexbox>
                            <v-text-field
                                label="Total Flight Hours"
                                v-model="dialogData.rated.flt_hrs_total">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat="flat" @click.native="$emit('offClose')">Close</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
import rdtm from '@/format/rdtm'
export default{
  data(){
    return{
      rdtm: rdtm
    }
  },
  props: ['dialogData'],
}
</script>
