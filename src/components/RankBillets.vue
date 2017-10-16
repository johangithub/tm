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
                        <v-layout row>
                            <v-flex>
                                <h5>Rank Billets</h5>
                                <p>Use this page to rank your favorite billets. Drag and drop each billet's entry in order to rank the billets. Each billet's rank is denoted by the number to the left of the billet's information.</p>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                </v-card>
            </v-flex>
      </v-layout>
      <v-layout row v-if="faveBillets.length===0">
          <v-flex xs12>
              <v-alert warning value="true">Please favorite some Billets!
              </v-alert>
          </v-flex>
      </v-layout>
      <v-layout row v-if="faveBillets.length!==0">
          <v-flex xs12>
              <!--drag and drop tiles for ranking billets, possibly style better later-->
              <draggable v-model="rankBillets" class="list-group" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
              <transition-group type="transition" :name="'flip-list'">
                  <v-layout row v-for="(billet,index) in rankBillets" class="list-group-item" :key="billet">
                      <v-flex class="pt-3 text-xs-right" xs1 offset-md1 md1>
                          {{index+1}}. 
                      </v-flex>
                      <v-flex xs10 md8 class="text-xs-center">
                          <v-card class="pa-1">
                              <table style="width: 100%">
                                  <tr>
                                      <td style="width 10%">
                                      <v-btn flat primary dark :id="billet" @click="showReqMethod($event)" @click.native.stop="showReq = true" >
                                      {{billet}}</v-btn></td>
                                      <!--payload for removeBillet mutation is object with index as property-->
                                      <td style="width:10%"><v-btn error small @click="$store.dispatch('removeBillet',{'index': index})">Remove</v-btn></td>
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
    <v-dialog v-model="showReq" width="600px">
        <req-dialog-card v-if="showReq" :dialogData="dialogData" @reqClose="showReq = false"></req-dialog-card>
    </v-dialog>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import ReqDialogCard from '@/components/ReqDialogCard'
import { mapGetters } from 'vuex'
import { store } from '@/store'

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
      submitted: false,
      clickedId: null
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
      var id = event.currentTarget.id
      var billet = this.faveBillets.filter((d)=>{return d == id})[0]
      window.axios.get('/billet_view').then(response=>{
        this.dialogData = response.data.data.filter(d=>{return d.id == id})[0]
      })

    },
    submit: function () {
      window.axios.post('/billets_fave', {
          rankedBillets: JSON.stringify(this.faveBillets)
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
    'req-dialog-card': ReqDialogCard
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
