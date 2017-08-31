<template>
  <v-container id="squadrons">
  <v-layout row>
  <v-flex xs6>
    <h2>Billets</h2>
  </v-flex>
  <v-flex xs6 class="dc-data-count">
  <br>
    <span class="filter-count"></span>
    selected out of
    <span class="total-count"></span>
    billets | 
    <v-btn small warning round @click.prevent="resetAll">Reset All</v-btn>
  </v-flex>    
  </v-layout>
  <v-layout row wrap>
    <v-flex xs5>
      <v-card class="pa-1">
        <v-card-media>
          <hide-btn v-if="!showStates" name="States" @toggleShow="showStates = !showStates" :value="showStates"></hide-btn>
          <div v-show="showStates" id="dc-state-choropleth">
          <hide-btn name="States" @toggleShow="showStates = !showStates" :value="showStates"></hide-btn>
          <reset-btn @reset="resetChart($event)"></reset-btn>
          </div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs4>
    <v-layout row>
    <v-flex>
    <v-card class="pa-1">
      <v-card-media>
        <hide-btn v-if="!showConus" name="CONUS/OCONUS" @toggleShow="showConus = !showConus" :value="showConus"></hide-btn>
        <div v-show="showConus" id="dc-conus-rowchart">
        <hide-btn name="CONUS/OCONUS" @toggleShow="showConus = !showConus" :value="showConus"></hide-btn>
        <reset-btn @reset="resetChart($event)"></reset-btn>
        </div>
      </v-card-media>
    </v-card>
    </v-flex>
    </v-layout>
    <v-layout row class="mt-2">
    <v-flex>
     <v-card class="pa-1">
      <v-card-media>
      <hide-btn v-if="!showAPICode" name="API Code" @toggleShow="showAPICode = !showAPICode" :value="showAPICode"></hide-btn>
      <div v-show="showAPICode" id="dc-api-rowchart">
      <hide-btn name="API Code" @toggleShow="showAPICode = !showAPICode" :value="showAPICode"></hide-btn>
      <reset-btn @reset="resetChart($event)"></reset-btn>
      </div>
      </v-card-media>
      </v-card>
      </v-flex>
    </v-layout>
    </v-flex>
  </v-layout>
  <v-layout row wrap class="mt-3">
    <v-flex xs12>
    <v-card class="pa-1">
      <v-card-media>
      <hide-btn v-if="!showLocation" name="Location" @toggleShow="showLocation = !showLocation" :value="showLocation"></hide-btn>
      <div v-show="showLocation" id="dc-location-barchart">
      <hide-btn name="Location" @toggleShow="showLocation = !showLocation" :value="showLocation"></hide-btn>
      <reset-btn @reset="resetChart($event)"></reset-btn>
      </div>
      </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout class="mt-3">
    <v-flex xs3 class="mr-2">
    <v-card class="pa-1">
      <v-card-media>
      <hide-btn v-if="!showAircraft" name="Aircraft" @toggleShow="showAircraft = !showAircraft" :value="showAircraft"></hide-btn>
      <div v-show="showAircraft" id="dc-aircraft-barchart">
      <hide-btn name="Aircraft" @toggleShow="showAircraft = !showAircraft" :value="showAircraft"></hide-btn>
      <reset-btn @reset="resetChart($event)"></reset-btn>
      </div>
      </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import ResetButton from './ResetButton'
import HideButton from './HideButton'
import statesJson from '../assets/data/us-states.json'

export default{
  data(){
    return {
      data: [],
      showConus: true,
      showStates: true,
      showLocation: true,
      showAPICode: true,
      showAircraft: true,
    }
  },
  computed: {
    ndx: function(){
      return crossfilter(this.data)
    },
    allGroup: function(){
      return this.ndx.groupAll()
    }
  },
  components:{
    'reset-btn': ResetButton,
    'hide-btn': HideButton
  },
  methods: {
    resetAll: (event)=>{
      //Emulate javascript:dc.filterAll();dc.redrawAll()
      dc.filterAll()
      dc.redrawAll()
    },
    resetChart: (id)=>{
      dc.chartRegistry.list().filter(chart=>{
        return chart.anchorName() == id
      }).forEach(chart=>{
        chart.filterAll()
      })
      dc.redrawAll()
    }
  },
  created: function(){
    console.log('created')
    var data = require('@/assets/data/fighter_billets.csv')
    this.data = data
  },
  beforeMount: function(){
    console.log('beforeMount')
  },
  mounted: function(){
    console.log('mounted')

    //Data count
    dc.dataCount(".dc-data-count")
      .dimension(this.ndx)
      .group(this.allGroup)

    //State Map
    var stateChart = dc.geoChoroplethChart("#dc-state-choropleth")
    var states = this.ndx.dimension(function(d){return d.state})
    var statesGroup = states.group()

    stateChart
    .height(400)
    .dimension(states)
    .group(statesGroup)
    .projection(d3.geo.albersUsa().scale(750).translate([300,200]))
    .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
    .colorDomain([0, 100])
    .overlayGeoJson(statesJson.features, "state", function (d) {
      return d.properties.name;
    })

    //CONUS
    var conusChart = dc.rowChart("#dc-conus-rowchart")
    var conusDim = this.ndx.dimension(function(d){return d.conus})
    var conusGroup = conusDim.group()

    conusChart
      .height(100)
      .dimension(conusDim)
      .group(conusGroup)

    //Location
    var locationChart = dc.barChart("#dc-location-barchart")
    var locationDim = this.ndx.dimension(function(d){return d.location;})
    var locationGroup = locationDim.group()

    locationChart
    .height(300)
    .margins({top: 10, left: 30, right: 10, bottom: 100})
    .dimension(locationDim)
    .group(locationGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .colors(["orange"])

    //API code
    var apiChart = dc.rowChart('#dc-api-rowchart')
    var apiDim = this.ndx.dimension(function(d){return d.api;})
    var apiGroup = apiDim.group()

    apiChart
    .height(200)
    .margins({top: 10, left: 10, right: 10, bottom: 30})
    .dimension(apiDim)
    .group(apiGroup)
    .elasticX(true)
    .colors(d3.scale.category10())
    
    //Aircraft
    var aircraftChart = dc.barChart("#dc-aircraft-barchart")
    var aircraftDim = this.ndx.dimension(function(d){return d.aircraft;})
    var aircraftGroup = aircraftDim.group()

    aircraftChart
    .height(200)
    .margins({top: 10, left: 30, right: 10, bottom: 70})
    .dimension(aircraftDim)
    .group(aircraftGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .colors(["orange"])

    function onresize (){
      dc.chartRegistry.list().forEach(chart => {
        let _bbox = chart.root().node().parentNode.getBoundingClientRect();
        chart.width(_bbox.width).render();
      });
    }

    onresize()
    //window.addEventListener('resize', onresize);

  },
  beforeUpdate: function(){
    console.log('before update')
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