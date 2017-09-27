<template>
    <v-dialog :value="dialog" width="600px">
      <v-card>
        <v-card-title class="headline">Requisition<v-spacer></v-spacer><v-btn fab primary small flat @click.native="dialog = false"><v-icon dark >clear</v-icon></v-btn></v-card-title>
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
          <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
}
</script>
