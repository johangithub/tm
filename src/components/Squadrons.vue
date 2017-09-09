<template>
  <v-container fluid id="squadrons">
  <v-layout row>
  <v-flex xs6 class="text-xs-left">
      <h2>Billets {{ width }} - {{ height }}</h2>
  </v-flex>
  <v-flex xs6 class="dc-data-count text-xs-right">
  <br>
    <span class="filter-count"></span>
    selected out of
    <span class="total-count"></span>
    billets | 
    <v-btn small warning round @click.prevent="resetAll">Reset All</v-btn>
  </v-flex>    
  </v-layout>
  <v-layout row wrap>
    <v-flex d-flex xs12 md7>
        <v-expansion-panel expand id="test">
            <v-expansion-panel-content>
                <div slot="header">States</div>          
      <v-card>
          <!--<v-card-title class="title" @click.prevent="$emit('toggleShow')">-->
              <!--States<hide-btn @toggleShow="showStates = !showStates" :value="showStates"></hide-btn>-->
          <!--</v-card-title>-->
        <v-card-media >
            <div id="dc-state-choropleth" style="height: 500px">
                <reset-btn @reset="resetChart($event)"></reset-btn>
            </div>
        </v-card-media>
      </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-flex>
    <v-flex d-flex xs12 md5>
    <v-card class="pa-1">
        <v-card-title class="title">
        CONUS/OCONUS<hide-btn @toggleShow="showConus = !showConus" :value="showConus"></hide-btn>
        </v-card-title>
      <v-card-media contain>
        <div v-show="showConus" id="dc-conus-rowchart">
        <reset-btn @reset="resetChart($event)"></reset-btn>
        </div>
      </v-card-media>
    </v-card>
    <v-flex d-flex>
    <v-layout row wrap>
        <v-flex d-flex xs12 class="pa-0 pt-2">
         <v-card class="pa-1">
             <v-card-title class="title">
               API Code<hide-btn name="API Code" @toggleShow="showAPICode = !showAPICode" :value="showAPICode"></hide-btn>
             </v-card-title>
          <v-card-media contain>
          <div v-show="showAPICode" id="dc-api-rowchart">
          <reset-btn @reset="resetChart($event)"></reset-btn>
          </div>
          </v-card-media>
          </v-card>
        </v-flex> 
    </v-layout>
    </v-flex>
    </v-flex>
    </v-layout>
  <v-layout row wrap class="mt-3">
    <v-flex xs12>
    <v-card class="pa-1">
        <v-card-title class="title">
          Location<hide-btn name="Location" @toggleShow="showLocation = !showLocation" :value="showLocation"></hide-btn>
        </v-card-title>
      <v-card-media>
      <div v-show="showLocation" id="dc-location-barchart">
      <reset-btn @reset="resetChart($event)"></reset-btn>
      </div>
      </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout class="mt-3">
    <v-flex xs3 class="mr-2">
    <v-card class="pa-1">
        <v-card-title class="title">
          Aircraft<hide-btn @toggleShow="showAircraft = !showAircraft" :value="showAircraft"></hide-btn>
        </v-card-title>
      <v-card-media>
      <div v-show="showAircraft" id="dc-aircraft-barchart">
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
      width: 0,
      height: 0
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
    },
    getWindowWidth(event) {
        this.width = document.getElementById('dc-state-choropleth').offsetWidth;
        //this.width = document.documentElement.clientWidth;
    },
    getWindowHeight(event) {
        this.height = document.documentElement.clientHeight; 
    },
    removeResize: ()=>{
        window.removeEventListener('resize', this.getWindowWidth);
        window.removeEventListener('resize', this.getWindowHeight);
    }
  },
  beforeCreate: function() {
    console.log('before create');

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
    // function to return window size (can't be in methods)

    //Data count
    dc.dataCount(".dc-data-count")
      .dimension(this.ndx)
      .group(this.allGroup)

    //State Map
    var stateChart = dc.geoChoroplethChart("#dc-state-choropleth")
    var states = this.ndx.dimension(function(d){return d.state})
    var statesGroup = states.group()
    var newWidth = document.getElementById('test').offsetWidth;
    var newHeight = document.getElementById('test').offsetHeight;
    var xOffset = newWidth/3;
    var yOffset = 250;

        console.log(newWidth)
        console.log(newHeight)
    stateChart
    .dimension(states)
    .group(statesGroup)
    .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
    .colorDomain([0, 100])
    .height(500)
    .projection(d3.geo.albersUsa().scale(newWidth).translate([xOffset,yOffset]))
    .overlayGeoJson(statesJson.features, "state", function (d) {
      return d.properties.name;
    })

    window.onresize = function(event) {
        var newWidth = document.getElementById('test').offsetWidth;
        var newHeight = document.getElementById('test').offsetHeight;
        var xOffset = newWidth/3;
        var yOffset = 250;
        stateChart
        .dimension(states)
            .group(statesGroup)
            .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
            .colorDomain([0, 100])
            .width(newWidth)
            .height(500)
            .transitionDuration(0)
            .projection(d3.geo.albersUsa().scale(newWidth).translate([xOffset,yOffset]))
            .overlayGeoJson(statesJson.features, "state", function (d) {
            return d.properties.name;})
        dc.renderAll()
    }

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

    //this.$forceUpdate();
    onresize()
    //window.addEventListener('resize', onresize);

  },
  beforeUpdate: function(){
    console.log('before update')
    //window.dispatchEvent( new Event('resize') )

  },
  beforeDestroy: function(){
    // This clears all registered chart. Otherwise, it'll keep appending charts on top of empty DOM
    dc.chartRegistry.clear()
    this.removeResize()
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
#dc-state-choropleth {
    width: 100%;
}

</style> 
