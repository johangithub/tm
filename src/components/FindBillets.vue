<template>
  <v-container fluid>
  <v-layout row>
  <v-spacer></v-spacer>
  <v-flex xs6 class="dc-data-count text-xs-right">
    <span class="filter-count"></span>
    selected out of
    <span class="total-count"></span>
    billets | 
    <v-btn small error round @click.prevent="resetAll">Reset All</v-btn>
  </v-flex>    
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12 md6 id="states">
        <v-card>
        <v-card-title class='pb-0'><span>State</span></v-card-title>
        <v-card-media>
            <div id="dc-state-choropleth"></div>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
    <v-layout row class="mt-3">
    <v-flex xs12 md12 id="location">
        <v-card>
        <v-card-title class='pb-0'><span>Location</span></v-card-title>
          <v-card-media>
              <div id="dc-location-barchart"></div>
          </v-card-media>
        </v-card>
    </v-flex>
  </v-layout>
  <v-layout row class="mt-3">
    <v-flex xs6 md3 id="aircraft">
      <v-card>
      <v-card-title class='pb-0'><span>Aircraft</span></v-card-title>
        <v-card-media>
            <div id="dc-aircraft-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs4 md1 id="grade">
      <v-card>
      <v-card-title class='pb-0'><span>Grade</span></v-card-title>
        <v-card-media>
            <div id="dc-grade-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs4 md1 id="afsc">
      <v-card>
      <v-card-title class='pb-0'><span>AFSC</span></v-card-title>
        <v-card-media>
            <div id="dc-afsc-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
      <v-flex xs4 md1 id="conus">
      <v-card>
      <v-card-title class='pb-0'><span>CONUS/OCONUS</span></v-card-title>
        <v-card-media>
            <div id="dc-conus-rowchart"></div>
        </v-card-media>
      </v-card>
      </v-flex>
        <v-flex xs4 md1 id="flying">
          <v-card>
          <v-card-title class='pb-0'><span>Flying</span></v-card-title>
            <v-card-media>
                <div id="dc-flying-rowchart"></div>
            </v-card-media>
          </v-card>
        </v-flex> 
    </v-layout>
  <v-layout row wrap class="mt-3" id="billets">
    <v-flex xs12>
        <!--doesn't have to be on card, but easier to add search bar with card-->
        <v-card elevation-3>
                 <v-card-title class="pb-0"><h5>Billets Available</h5>
                <v-spacer></v-spacer>
                <!--search bar , remove append-icon for IE-->
                <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    v-model="search">
                </v-text-field>
            </v-card-title>
            <v-data-table 
                          v-model="selected"
                          :headers="headers" 
                          :items="items" 
                          :search="search"
                          selected-key="id">
                <template slot="items" scope="props">
                    <!--TODO: edit for IE11 support (see vuetify docs)-->
                    <td class="text-xs-left" style="width 10%">
                      <v-btn flat primary dark right small block @click="showReqMethod(props.item)" @click.native.stop="showReq = true" >{{props.item.id}}</v-btn>
                    </td>
                    <td class="text-xs-left" style="width: 10%">{{props.item.afsc}}</td>
                    <td class="text-xs-left" style="width: 10%">{{props.item.grade}}</td>
                    <td class="text-xs-left" style="width: 30%">{{props.item.unit}}</td>
                    <td class="text-xs-left" style="width: 15%">{{props.item.location}}</td>
                    <td class="text-xs-left" style="width: 10%">{{props.item.state}}</td>
                    <td class="text-xs-center">
                      <v-icon :warning="props.selected" 
                              @click="toggleFavorite(props)" 
                              style="cursor: pointer;">star</v-icon></td>
                    </td>
                </template> 
            </v-data-table>
        </v-card>
    </v-flex>
  </v-layout>
  <v-dialog v-model="showReq" width="600px" >
      <req-dialog-card v-if="showReq" :dialogData="dialogData" @reqClose="showReq = false"></req-dialog-card>
  </v-dialog>
  </v-container>
</template>
<script>
import ResetButton from './ResetButton'
import HideButton from './HideButton'
import statesJson from '../assets/data/us-states.json'
import ReqDialogCard from './ReqDialogCard'
import { store } from '@/store'
import { mapGetters } from 'vuex'
import dchelpers from '@/dchelpers'
export default{
  data(){
    return {
      data: [],
      showReq: false,
      dialogData: {},
      items: [],
      search: '',
      selected: [],
      headers: [
        {
            text: '', value: 'id', align: 'center', sortable: false
        },
        {
            text: 'AFSC', value: 'afsc', align: 'left'
        },
        {
            text: 'Grade', value: 'grade', align: 'left'
        },
        {
            text: 'Unit', value: 'unit', align: 'left'
        },
        {
            text: 'Location', value: 'location', align: 'left'
        },
        {
            text: 'State', value: 'state', align: 'left'
        },
        {
            text: 'Favorite', align: 'center', sortable: false 
        },
      ]
    }
  },
  computed: {
    ...mapGetters([
        'faveBillets'
    ]),
    ndx(){
      return crossfilter(this.data)
    },
    idDim(){
      return this.ndx.dimension(function(d){return d.id})
    }
  },
  components:{
    'reset-btn': ResetButton,
    'hide-btn': HideButton,
    'req-dialog-card': ReqDialogCard
  },
  methods: {
      favorited: function(obj) {
          //have to use some method to check if billet id exists in 
          //faveBillets array (includes method doesn't work)
          return this.faveBillets.some(function(d) {return d.id === obj.id})
      },
      
    //TODO: Currently toggle favorite is broken. No vuex is emitted 
    toggleFavorite: function(props) {
      console.log(props)
        if (!props.selected){
          props.selected = !props.selected
          this.selected = this.faveBillets
        }
        else{
          props.selected = !props.selected
          this.selected = this.faveBillets
        }
    },
      showReqMethod: function(req){
          //shows req and updates values in dialog (needed to make dialog dynamic) 
        var id = req.id
        var billet = this.items.filter((d)=>{return d.id == id})[0]
        this.dialogData = billet
      },
    resetAll: (event)=>{
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
  mounted: function(){
    console.log('mounted')

    window.axios.get('/billet_view').then(response => {
        this.data = response.data.data
        window.billet = this.data[0]
        renderCharts()
    }).catch(console.error)

    //es6 arrow function
      var renderCharts = () => {
        //Data count
        var allGroup = this.ndx.groupAll()
        dc.dataCount(".dc-data-count")
          .dimension(this.ndx)
          .group(allGroup)
     
        //State Map
        var stateChart = dc.geoChoroplethChart("#dc-state-choropleth")
        var states = this.ndx.dimension(function(d){return d.state})
        var statesGroup = states.group()
        var statesAspectRatio = 1.8
        var statesXRatio = 2.5
        var statesYRatio = 1.9
        var statesSizeFactor = 1.2
        // get document width, and if on md or larger screen, manually
        // reduce size of first state map so fits in 7 columns
        var documentWidth = document.documentElement.clientWidth
        if (documentWidth > 960) {
            var statesWidth = Math.round(documentWidth*statesSizeFactor)
        }
        else {
            var statesWidth = documentWidth*1.15
        }
        var statesHeight = statesWidth/statesAspectRatio
        var xOffset = statesWidth/statesXRatio
        var yOffset = statesHeight/statesYRatio

        stateChart
        .dimension(states)
        .group(statesGroup)
        .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
        .colorDomain([0, 100])
        .minWidth(statesWidth)
        .width(statesWidth)
        .height(statesHeight)
        .projection(d3.geo.albersUsa().scale(statesWidth).translate([xOffset,yOffset]))
        .overlayGeoJson(statesJson.features, "state", function (d) {
          return d.properties.name
        })
        .on('preRedraw', function(chart) {
            // values for width, height, and offsets are for formatting -
            // numbers are fairly arbitrary
            var newWidth = document.getElementById('states').offsetWidth*statesSizeFactor
            var newHeight = newWidth/statesAspectRatio
            var newxOffset = newWidth/statesXRatio
            var newyOffset = newHeight/statesYRatio
           chart
           .minWidth(newWidth)
           .width(newWidth)
           .height(newHeight)
           .transitionDuration(0)
           .projection(d3.geo.albersUsa().scale(newWidth).translate([newxOffset,newyOffset]))
           .root().select('svg').attr('width',newWidth).attr('height',newHeight)
        })

        //Location
        var locationConfig = {}
        locationConfig.id = 'location'
        locationConfig.dim = this.ndx.dimension(function(d){return d.location ? d.location : 'NONE'})
        locationConfig.group = locationConfig.dim.group()
        locationConfig.minHeight = 150
        locationConfig.aspectRatio = 5
        locationConfig.margins = {top: 30, left: 40, right: 50, bottom: 100}
        locationConfig.colors = ["#1976d2"]
        var locationChart = dchelpers.getOrdinalBarChart(locationConfig)

        //aircraft
        var aircraftConfig = {}
        aircraftConfig.id = 'aircraft'
        aircraftConfig.dim = this.ndx.dimension(function(d){return d.aircraft ? d.aircraft[0]=='A' && d.aircraft.length == 2 ? d.aircraft : 'OTHER' : 'OTHER'})
        aircraftConfig.group = aircraftConfig.dim.group()
        aircraftConfig.minHeight = 150
        aircraftConfig.aspectRatio = 2
        aircraftConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        aircraftConfig.colors = d3.scale.category10()
        var aircraftChart = dchelpers.getRowChart(aircraftConfig)

        //grade
        var gradeConfig = {}
        gradeConfig.id = 'grade'
        gradeConfig.dim = this.ndx.dimension(function(d){return d.grade})
        gradeConfig.group = gradeConfig.dim.group()
        gradeConfig.minHeight = 150
        gradeConfig.aspectRatio = 2
        gradeConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        gradeConfig.colors = d3.scale.category10()
        var gradeChart = dchelpers.getRowChart(gradeConfig)

        //afsc
        var afscConfig = {}
        afscConfig.id = 'afsc'
        afscConfig.dim = this.ndx.dimension(function(d){return d.afsc.substr(0,3)})
        afscConfig.group = afscConfig.dim.group()
        afscConfig.minHeight = 150
        afscConfig.aspectRatio = 2
        afscConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        afscConfig.colors = d3.scale.category10()
        var afscChart = dchelpers.getRowChart(afscConfig)

        //conus
        var conusConfig = {}
        conusConfig.id = 'conus'
        conusConfig.dim = this.ndx.dimension(function(d){return d.conus})
        conusConfig.group = conusConfig.dim.group()
        conusConfig.minHeight = 150
        conusConfig.aspectRatio = 2
        conusConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        conusConfig.colors = d3.scale.category10()
        var conusChart = dchelpers.getRowChart(conusConfig)

        //flying
        var flyingConfig = {}
        flyingConfig.id = 'flying'
        flyingConfig.dim = this.ndx.dimension(function(d){return ['1','3','6'].indexOf(d.api) >= 0 ? 'Flying' : 'Non-flying'})
        flyingConfig.group = flyingConfig.dim.group()
        flyingConfig.minHeight = 150
        flyingConfig.aspectRatio = 2
        flyingConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        flyingConfig.colors = d3.scale.category10()
        var flyingChart = dchelpers.getRowChart(flyingConfig)

        function tableData(d){
          var obj = {
            id: d.id,
            afsc: d.afsc,
            grade: d.grade,
            aircraft: d.aircraft,
            unit: d.unit,
            location: d.location,
            state: d.state,
          }
          return obj
        }

        // Create data for data table
        var vm = this
        var itemDim = this.ndx.dimension(function(d) {return d})
        vm.items = itemDim.top(Infinity).map((d)=>{return tableData(d)})
        // update rows in data table upon each chart being filtered 
        dc.chartRegistry.list().forEach(function(chart) {
            chart.on('filtered', function() {
              vm.items = itemDim.top(Infinity).map((d)=>{return tableData(d)})
            })
        })

        var temp
        window.onresize = function(event) {
            clearTimeout(temp)
            temp = setTimeout(dc.redrawAll(), 500)
        }
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
