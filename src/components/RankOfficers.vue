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
      <v-layout row class="pb-3">
          <v-flex xs6>
                <v-card>
                    <v-card-title>
                        <h5>Billet #{{reqId}}</h5>
                        <v-layout row>
                            <v-flex>
                                <p>Use this page to rank your favorite officers. Drag and drop each officer's entry in order to rank the officers. Each officer's rank is denoted by the number to the left of the officer's information.</p>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                </v-card>
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
                              <table>
                                  <tr>
                                      <td style="width: 25%">
                                          <v-btn flat primary dark large
                                             :id="officer" 
                                             @click="showOffMethod($event)" 
                                             @click.native.stop="showOff = true">
                                             {{officerInfo(officer).general.lastName}}, <br>
                                             {{officerInfo(officer).general.firstName}} 
                                         </v-btn>
                                      </td>
                                      <td style="width: 10%">{{grade[officerInfo(officer).general.grade]}}</td>
                                      <td style="width: 10%">{{officerInfo(officer).general.adjYG}}</td>
                                      <td style="width: 10%">{{rdtm[officerInfo(officer).rated.rdtm]}}</td>
                                      <td style="width: 25%">{{officerInfo(officer).duty.title}}</td>
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
import rdtm from '@/format/rdtm'
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
      clickedId: null,
      officerData: [],
      rdtm: rdtm,
      grade: {
        '01': '2LT',
        '02': '1LT',
        '03': 'CPT',
        '04': 'MAJ',
        '05': 'LTC'
      }
    }
  },
  computed: {
    ...mapGetters([
        'faveOfficers',
        'reqId'
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
      this.dialogData = this.officerData.filter(d=>{return d.dod_id == id})[0]
    },
    submit: function () {
      window.axios.post('/billets_fave', {
          rankedBillets: JSON.stringify(this.faveOfficers)
      }).then(response => {
          console.log('information sent')
          this.submitted = true; 
      }).catch(console.error)
    },
    officerInfo: function(id){
      return this.officerData.filter(d=>{return d.dod_id == id})[0]
    }
  },
  watch: {
    isDragging (newValue) {
        //need to learn more about this 
        if (newValue) {
            this.delayedDragging = true
            return
        }
        this.$nextTick(() => {
            this.delayedDragging = false
        })
    }
  },
  components: {
    'draggable': draggable,
    'off-dialog-card': OfficerDialogCard
  },
  mounted: function(){
    window.axios.get('/ao_dashboard_view').then(response=>{
      this.officerData = response.data.data
    })
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
