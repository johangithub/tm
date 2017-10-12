<template>
      <v-card>
        <v-card-title class="headline"><v-spacer></v-spacer>
          <v-btn fab primary small flat @click.native.stop="close"><v-icon dark >clear</v-icon></v-btn></v-card-title>
        <v-card-text>
            ID: {{dialogData.id}} <br>
            Grade: {{dialogData.grade}} <br>
            Adjusted Year Group: {{dialogData.adjYG}} <br>
            Rating: {{dialogData.RTG}} <br>
            RDTM: {{dialogData.rdtm}} <br>
            Total Flight Hours: {{Math.round(dialogData.flt_hrs_total)}} <br>
        </v-card-text>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat="flat" @click.native="$emit('offClose')">Close</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
export default{
  props: ['dialogData'],
}
</script>
