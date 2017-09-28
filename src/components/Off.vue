<template>
<v-layout row>
    <v-dialog :value="value" @input="$emit('input',$event.value)" width="600px">
      <v-card>
        <v-card-title class="headline">Officer<v-spacer></v-spacer><v-btn fab primary small flat @click.native.stop="close"><v-icon dark >clear</v-icon></v-btn></v-card-title>
        <v-card-text>
            <v-container fluid grid-list-xs>
                <v-layout row wrap>
                    <v-flex flexbox v-for="(property,key) in item" :key="key">
                            <v-text-field
                                :label="key"
                                :value="property"
                                readonly 
                                ></v-text-field>
                    </v-flex>
                </v-layout> 
            </v-container>
            ID: {{item.id}} <br>
            Grade: {{item.grade}} <br>
            Adjusted Year Group: {{item.adjYG}} <br>
            Rating: {{item.RTG}} <br>
            RDTM: {{item.rdtm}} <br>
            Total Flight Hours: {{Math.round(item.flt_hrs_total)}} <br>
        </v-card-text>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat="flat" @click.native="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default{
  data(){
    return {
      test: false,
      dialog: this.value
    }
  },
  props: ['value','item'],
  methods: {
    close() {
        this.dialog = false 
        this.$emit('input',this.dialog)
    }
  }
}
</script>
