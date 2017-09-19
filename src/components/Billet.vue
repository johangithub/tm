<template>
  <v-container fluid>
      <draggable v-model="billets" class="list-group" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
      <transition-group type="transition" :name="'flip-list'">
          <v-layout row v-for="(billet,index) in billets" class="list-group-item" :key="billet.id">
              <v-flex class="pt-3 text-xs-right" xs1 offset-md2 md1>
                  {{index+1}}. 
              </v-flex>
              <v-flex xs10 md6 class="text-xs-center">
                  <v-card class="pa-1">
                      <h6>{{billet.base}} | {{billet.unit}} | {{billet.aircraft}} 
                          <v-btn primary small @click="billets.splice(index,1)">Remove</v-btn>
                      </h6>
                  </v-card>
              </v-flex>
              <v-spacer></v-spacer>
          </v-layout>
      </transition-group>
      </draggable>
    <!--<h1>{{ title }}</h1>-->
    <!--<ul id="sortable">-->
      <!--<li class="ui-state-default noselect" v-for="billet in billets">{{billet.base}}/{{billet.unit}}</li>-->
    <!--</ul>-->
    <div>
        {{billets}}
    </div>
  </v-container>
</template>

<script>
//import $ from 'jquery'
//import 'jquery-ui/themes/base/core.css';
//import 'jquery-ui/themes/base/theme.css';
//import 'jquery-ui/ui/core';
//import 'jquery-ui/ui/widgets/sortable';
import draggable from 'vuedraggable'

export default {
  name: 'billet',
  data () {
    return {
      title: 'billet page',
      editable: true,
      isDragging: false,
      delayedDragging: false,
      // Fake data
      billets: [
            {id: 1, base: 'SHAW', unit: '55 FS', aircraft: 'F-16', rank: 1},
            {id: 2, base: 'SHAW', unit: '77 FS', aircraft: 'F-16', rank: 2},
            {id: 3, base: 'SHAW', unit: '79 FS', aircraft: 'F-16', rank: 3},
            ],
    }
  },
  computed: {
    dragOptions () {
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
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    }
  },
  watch: {
    isDragging (newValue) {
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
    'draggable': draggable
  }
//  mounted: function(){
//    $( function() {
//        $( "#sortable" ).sortable({
//          revert: 100,
//          axis: "y"
//        })
//      })
//  }
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
