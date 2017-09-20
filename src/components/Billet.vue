<template>
  <v-container fluid>
      <v-layout row>
          <v-flex xs6 class="text-xs-left">
              <h2>Rank Billets</h2>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
              <v-btn v-if="faveBillets.length!==0" success small @click.prevent="save">Save</v-btn>  
          </v-flex>
      </v-layout>
      <v-layout row>
          <v-flex xs12>
              <v-alert success dismissible transition="scale-transition" v-model="saved">Saved!</v-alert>
              <v-alert info dismissible transition="scale-transition" v-model="submitted">Successfully Submitted!</v-alert>
          </v-flex>
      </v-layout>
      <v-layout row v-if="faveBillets.length===0">
          <v-flex xs12>
              <v-alert warning value="true">Please favorite some billets!
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
                      <th style="width:10.5%">ID</th>
                      <th style="width:10%">AFSC</th>
                      <th style="width:10%">Grade</th>
                      <th style="width:10%">MWS</th>
                      <th style="width:35%">UNIT</th>
                      <th style="width:10%">State</th>
                      <th style="width:12.5%"></th>
                  </tr>
                  </thead>
              </table>
          </v-flex>
      </v-layout>
      <v-layout row v-if="faveBillets.length!==0">
          <v-flex xs12>
              <!--drag and drop tiles for ranking billets, possibly style better later-->
              <draggable v-model="rankBillets" class="list-group" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
              <transition-group type="transition" :name="'flip-list'">
                  <v-layout row v-for="(billet,index) in rankBillets" class="list-group-item" :key="billet.id">
                      <v-flex class="pt-3 text-xs-right" xs1 offset-md1 md1>
                          {{index+1}}. 
                      </v-flex>
                      <v-flex xs10 md8 class="text-xs-center">
                          <v-card class="pa-1">
                              <table style="width: 100%">
                                  <tr>
                                      <td style="width 10%"><a href="#" @click.prevent = "showReqMethod($event)"  :id="billet.id">{{billet.id}}<req-sheet :item="dialogData" v-model="showReq"></req-sheet></a></td>
                                      <td style="width:10%">{{billet.api}}</td>
                                      <td style="width:10%">{{billet.grade}}</td>
                                      <td style="width:10%">{{billet.aircraft}}</td>
                                      <td style="width:35%">{{billet.unit}}</td>
                                      <td style="width:10%">{{billet.state}}</td>
                                      <!--payload for removeBillet mutation is object with index as property-->
                                      <td style="width:10%"><v-btn error small @click="$store.dispatch('removeBillet',{'index': index})">Remove</v-btn></td>
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
              <v-btn primary large block v-if="faveBillets.length!==0" @click.prevent="submit">Submit</v-btn>  
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
//import $ from 'jquery'
//import 'jquery-ui/themes/base/core.css';
//import 'jquery-ui/themes/base/theme.css';
//import 'jquery-ui/ui/core';
//import 'jquery-ui/ui/widgets/sortable';
import draggable from 'vuedraggable'
import Req from './Req'
import { mapGetters } from 'vuex'

export default {
  name: 'billet',
  data () {
    return {
      title: 'billet page',
      dialogData: {},
      showReq: false,
      editable: true,
      isDragging: false,
      delayedDragging: false,
      saved: false,
      submitted: false
    }
  },
  computed: {
    ...mapGetters([
        'faveBillets'
    ]),
    rankBillets: {
        //need getter to be faveBillets to get from vuex state
        get: function () {
            return this.faveBillets 
        },  
        //need setter to dispatch ranked billets to the store so 
        //vuex state 'faveBillets' always has most recent rank - 
        //remember, index of each billet in array tells rank
        set: function (rankedArray) {
            this.$store.dispatch('rankBillets',rankedArray) 
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
      showReqMethod: function(event){
        //shows req and updates (allows dialog to dynamically update values) 
        var id = event.target.id
        var billet = this.faveBillets.filter((d)=>{return d.id == id})[0]
        this.dialogData['id']=billet.id
        this.dialogData['api']=billet.api
        this.dialogData['state']=billet.state
        this.dialogData['unit']=billet.unit
        this.dialogData['aircraft']=billet.aircraft
        this.dialogData['afsc']=billet.afsc
        this.dialogData['grade']=billet.grade
        this.showReq = true
      },
      save: function () {
        //store vuex state 'faveBillets' (array of billets) to local storage
        //(faveBillets will be ranked billets if officer ranked billets due to
        //setter on rankedBillets)
        var payload = {'name': 'rankedBillets', 'value': JSON.stringify(this.faveBillets)}
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
    'req-sheet': Req
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
