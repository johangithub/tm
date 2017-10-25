<template>
  <v-container fluid id="dcjs_demo">
<!--   <v-layout row>
  <v-flex xs8 class="text-xs-left">
      <h4>Dashboard Demo</h4>
  </v-flex>
  <v-flex xs4 class="dc-data-count text-xs-right">
    <span class="filter-count"></span>
    selected out of
    <span class="total-count"></span>
    officers | 
    <v-btn small error round @click.prevent="resetAll">Reset All</v-btn>
  </v-flex>    
  </v-layout> -->
  <v-layout row>
    <div id="dc-grade-rowchart"></div>
    <div id="dc-rtg-rowchart"></div>
  </v-layout>
   
  </v-container>
</template>
<script>
import dchelpers from '@/dchelpers'
import statesJson from '../assets/data/us-states.json'
import OfficerDialogCard from '@/components/OfficerDialogCard'
import rdtm from '@/format/rdtm'

export default{
  data(){
    return {
      data: [],
      showOff: false,
      dialogData: {},
      items: [],
      selected: [],
      search: '',
    
    }
  },
  components:{
    'off-dialog-card': OfficerDialogCard 
  },
  computed: {
    // ndx(){
    //   return crossfilter(this.data)
    // },
    // idDim(){
    //   return this.ndx.dimension(function(d){return d.dod_id})
    // }
  },
  methods: {
    resetAll: (event)=>{
      dc.filterAll()
      dc.redrawAll()
    },
    resetChart: (id)=>{
      dc.chartRegistry.list().filter(chart=>{
        return chart.anchorName() == id
      })[0].filterAll()
      dc.redrawAll()
    }
  },
  mounted: function(){
    window.axios.get('/ao_dashboard_view').then(response => {
      this.data = response.data.data
      renderCharts()
    }).catch(e => {
      console.error(e)
    })
    // this.selected = (this.curFaveOfficers) ? this.curFaveOfficers : [] 
    
    // es6 arrow function 
    var renderCharts = () => {
      window.data = this.data
        var ndx = crossfilter(this.data)
        //Data count
        var allGroup = ndx.groupAll()
        dc.dataCount(".dc-data-count")
          .dimension(ndx)
          .group(allGroup)

        var gradeChart = dc.rowChart("#dc-grade-rowchart")
        var gradeDim = ndx.dimension(function(d){return d.general.grade})
        var gradeGroup = gradeDim.group()
        gradeChart
          .width(300)
          .height(150)
          .margins({top: 10, left: 10, right: 20, bottom: 20})
          .dimension(gradeDim)
          .group(gradeGroup)
          .ordering(function(d){return d.key})
          .elasticX(true)
          .colors(d3.scale.category10())         

        var rtgChart = dc.rowChart("#dc-rtg-rowchart")
        var rtgDim = ndx.dimension(function(d){return d.duty.core_group})
        var rtgGroup = rtgDim.group()
        rtgChart
          .width(300)
          .height(150)
          .margins({top: 10, left: 10, right: 20, bottom: 20})
          .dimension(rtgDim)
          .group(rtgGroup)
          .elasticX(true)
          .colors(d3.scale.category10())         

        dc.renderAll()
        dc.redrawAll()
    }
  },
  beforeDestroy: function(){
    // This clears all registered chart. Otherwise, it'll keep appending charts on top of empty DOM
    dc.chartRegistry.clear()
  },
}

</script>
<style src="../../node_modules/dc/dc.css">
</style>
<style>
div[id*="-barchart"] .x.axis text{
    text-anchor: end !important;
    transform: rotate(-45deg);
  }

div[id*="-rowchart"] g.row text{
    fill: black;
}

</style> 
