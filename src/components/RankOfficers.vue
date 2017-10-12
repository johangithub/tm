<template>
  <v-container fluid>
      <v-layout row>
          <v-flex xs12>
              <v-snackbar top v-model="submitted">
                  <div style="color: DeepSkyBlue">Submitted!</div>
                  <v-btn dark flat error @click.native="submitted = false">Close</v-btn>
              </v-snackbar>
          </v-flex>
      </v-layout>
      <v-layout row v-if="faveOfficers.length===0">
          <v-flex xs12>
              <v-alert warning value="true">Please favorite some officers!
              </v-alert>
          </v-flex>
      </v-layout>
      <v-layout row v-if="faveOfficers.length!==0">
          <v-flex xs12>
              <!--drag and drop tiles for ranking billets, possibly style better later-->
              <draggable v-model="rankOfficers" class="list-group" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
              <transition-group type="transition" :name="'flip-list'">
                  <v-layout row v-for="(officer,index) in rankOfficers" class="list-group-item" :key="officer">
                      <v-flex class="pt-3 text-xs-right" xs1 offset-md1 md1>
                          {{index+1}}. 
                      </v-flex>
                      <v-flex xs10 md8 class="text-xs-center">
                          <v-card class="pa-1">
                              <table style="width: 100%">
                                  <tr>
                                      <td style="width 10%">
                                      <v-btn flat primary dark :id="officer" @click="showOffMethod($event)" @click.native.stop="showOff = true" >
                                      {{officer}}</v-btn></td>
                                      <!--payload for removeBillet mutation is object with index as property-->
                                      <td style="width:10%"><v-btn error small @click="$store.dispatch('removeOfficer',officer)">Remove</v-btn></td>
                                  </tr>
                              </table>
                          </v-card>
                      </v-flex>
                      <v-spacer></v-spacer>
                  </v-layout>
              </transition-group>
              </draggable>
          </v-flex>
      </v-layout>
    <v-dialog v-model="showOff" width="600px">
        <off-dialog-card v-if="showOff" :dialogData="dialogData" @offClose="showOff = false"></off-dialog-card>
    </v-dialog>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import OfficerDialogCard from '@/components/OfficerDialogCard'
import { mapGetters } from 'vuex'
import { store } from '@/store'

export default {
  data () {
    return {
      title: 'billet page',
      dialogData: {},
      showOff: false,
      editable: true,
      isDragging: false,
      delayedDragging: false,
      submitted: false,
      clickedId: null
    }
  },
  computed: {
    ...mapGetters([
        'faveOfficers'
    ]),
    rankOfficers: {
        //need getter to be faveOfficers to get from vuex state
        get: function () {
          return this.faveOfficers
        },  
        //need setter to dispatch ranked billets to the store so 
        //vuex state 'faveOfficers' always has most recent rank - 
        //remember, index of each billet in array tells rank
        set: function (rankedArray) {
          this.$store.dispatch('rankOfficers',rankedArray) 
        }
    },
    dragOptions () {
        //need to learn more about this
        return {
            animation: 0,
            group: 'description',
            disabled: !this.editable,
            ghostClass: 'ghost'
        };
    }
  },
  methods: {
    onMove ({relatedContext, draggedContext}) {
        //need to learn more about this 
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    showOffMethod: function(event){
      //shows req and updates (allows dialog to dynamically update values) 
      var id = event.currentTarget.id
      window.axios.get('/officer_view').then(response=>{
        this.dialogData = response.data.data.filter(d=>{return d.ID == id})[0]
      })
    },
    submit: function () {
      window.axios.post('/billets_fave', {
          rankedBillets: JSON.stringify(this.faveOfficers)
      }).then(response => {
          console.log('information sent')
          this.submitted = true; 
      }).catch(console.error)
    }
  },
  watch: {
    isDragging (newValue) {
        //need to learn more about this 
        if (newValue) {
            this.delayedDragging = true
            return
        }
        this.$nextTick( () => {
            this.delayedDragging = false
        })
    }
  },
  components: {
    'draggable': draggable,
    'off-dialog-card': OfficerDialogCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flip-list-move {
    transition: transform 0.4s;
}
.no-move {
    transition: transform 0s;
}
.list-group {
    min-height: 20px;
}
.list-group-item {
    cursor: move;
}
.ghost{
    opacity: .5;
    background: #C8EBFB;
}
</style>
