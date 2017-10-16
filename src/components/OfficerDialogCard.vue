<template>
      <v-card>
        <v-card-title class="headline"><v-spacer></v-spacer>
          <v-btn fab primary small flat @click.native="$emit('offClose')"><v-icon dark >clear</v-icon></v-btn></v-card-title>
        <v-card-text>
            ID: {{dialogData.dod_id}} <br>
            Grade: {{dialogData.general.grade}} <br>
            Adjusted Year Group: {{dialogData.general.adjYG}} <br>
            Rating: {{dialogData.duty.core_afsc}} <br>
            RDTM: {{rdtm[dialogData.rated.rdtm]}} <br>
            Total Flight Hours: {{Math.round(dialogData.rated.flt_hrs_total)}} <br>
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
