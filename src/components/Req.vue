<template>
<v-layout row justify-center>
    <v-dialog :value="value" @input="$emit('input',$event.value)" width="600px">
      <v-card>
        <v-card-title class="headline">Requisition<v-spacer></v-spacer><v-btn fab primary small flat @click.native.stop="close"><v-icon dark >clear</v-icon></v-btn></v-card-title>
        <v-card-text>
        <slot>
        ID: {{item.id}} <br>
            Api: {{item.api}} <br>
            AFSC: {{item.afsc}} <br>
            Grade: O-{{item.grade}} <br>
            Aircraft: {{item.aircraft}} <br>
            Unit: {{item.unit}} <br>
            State: {{item.state}} <br>
        </slot>
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
