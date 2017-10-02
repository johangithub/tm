<template>
    <v-dialog :value="dialog" width="600px">
      <v-card>
        <v-card-title class="headline">Requisition<v-spacer></v-spacer><v-btn fab primary small flat @click.native="dialog = false"><v-icon dark >clear</v-icon></v-btn></v-card-title>
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

<style scoped>
    list__tile, list__tile--link {
        cursor: text;
    }
</style>
