<template>
  <v-container fluid>
      <v-layout row>
          <v-flex xs6 class="text-xs-left">
              <h2>Rank Officers</h2>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
              <v-btn v-if="faveOfficers.length!==0" success small @click.prevent="save">Save</v-btn>  
          </v-flex>
      </v-layout>
      <v-layout row>
          <v-flex xs12>
              <v-snackbar top v-model="saved">
                  <div style="color: LimeGreen;">Saved!</div>
                  <v-btn dark flat error @click.native="saved = false">Close</v-btn>
              </v-snackbar>
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
      <v-layout row v-else>
          <v-flex class="pt-1 text-xs-right" xs1 offset-md1 md1>
              <!--rank to left of drag and drop area, could find better way-->
              <b>Rank</b> 
          </v-flex>
          <v-flex xs10 md8 class="pb-1 text-xs-center">
              <!--need to make header better, quick hack for now-->
              <table style="width: 100%">
                  <thead>
                  <tr>
                      <th style="width:10%">ID</th>
                      <th style="width:16%">Grade</th>
                      <th style="width:16%">Year Group</th>
                      <th style="width:16%">Rating</th>
                      <th style="width:16%">RDTM</th>
                      <th style="width:16%">Total Hours</th>
                      <th style="width:10%"></th>
                  </tr>
                  </thead>
              </table>
          </v-flex>
      </v-layout>
      <v-layout row v-if="faveOfficers.length!==0">
          <v-flex xs12>
              <!--drag and drop tiles for ranking officers, possibly style better later-->
              <draggable v-model="rankOfficers" class="list-group" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
              <transition-group type="transition" :name="'flip-list'">
                  <v-layout row v-for="(officer,index) in rankOfficers" class="list-group-item" :key="officer.ID">
                      <v-flex class="pt-3 text-xs-right" xs1 offset-md1 md1>
                          {{index+1}}. 
                      </v-flex>
                      <v-flex xs10 md8 class="text-xs-center">
                          <v-card class="pa-1">
                              <table style="width: 100%">
                                  <tr>
                                      <td style="width 10%">
                                        <v-btn :id="officer.ID" flat primary dark @click="showOffMethod($event)" @click.native.stop="showOff = true" >{{officer.ID}}</v-btn>
                                      </td>
                                      <td style="width:16%">{{officer.grade}}</td>
                                      <td style="width:16%">{{officer.adjYG}}</td>
                                      <td style="width:16%">{{officer.RTG}}</td>
                                      <td style="width:16%">{{officer.rdtm}}</td>
                                      <td style="width:16%">{{Math.round(officer.flt_hrs_total)}}</td>
                                      <!--payload for removeOfficer mutation is object with index as property-->
                                      <td style="width:10%"><v-btn error small @click="$store.dispatch('removeOfficer',{'index': index})">Remove</v-btn></td>
                                  </tr>
                              </table>
                              </h6>
                          </v-card>
                      </v-flex>
                      <v-spacer></v-spacer>
                  </v-layout>
              </transition-group>
              </draggable>
          </v-flex>
      </v-layout>
      <v-layout row>
          <v-flex offset-xs3 xs6 offset-md4 md4 class="mt-5 text-xs-center">
              <v-btn primary large block v-if="faveOfficers.length!==0" @click.prevent="submit">Submit</v-btn>  
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import Off from './Off'
import { mapGetters } from 'vuex'

export default {
  name: 'officer',
  data () {
    return {
      title: 'officer page',
      dialogData: {},
      showOff: false,
      editable: true,
      isDragging: false,
      delayedDragging: false,
      saved: false,
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
        //need setter to dispatch ranked officers to the store so 
        //vuex state 'faveOfficers' always has most recent rank - 
        //remember, index of each officer in array tells rank
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
        var id = event.target.id
        var officer = this.faveOfficers.filter((d)=>{return d.ID == id})[0]
        this.dialogData['id']=officer.ID
        this.dialogData['grade']=officer.grade
        this.dialogData['adjYG']=officer.adjYG
        this.dialogData['RTG']=officer.RTG
        this.dialogData['rdtm']=officer.rdtm
        this.dialogData['flt_hrs_total']=Math.round(officer.flt_hrs_total)
        this.showOff = true
        //save clicked id to prevent lots of req-sheets from being loaded in the DOM (sluggish behavior)
        this.clickedId = id
      },
      save: function () {
        //store vuex state 'faveOfficers' (array of officers) to local storage
        //(faveOfficers will be ranked officers if officer ranked officers due to
        //setter on rankedOfficers)
        var payload = {'name': 'rankedOfficers', 'value': JSON.stringify(this.faveOfficers)}
        //save action accepts a payload object where name property is the name of the localstorage item and value contains the value to be saved
        this.$store.dispatch('save',payload)
        this.saved = true; 
      },
      submit: function () {
        //TODO: need to add axios call
        this.submitted = true; 
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
    'off-sheet': Off 
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
