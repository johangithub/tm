<template>
  <v-container fluid>
  <v-layout row>
  <v-spacer></v-spacer>
  <v-flex xs6 class="dc-data-count text-xs-right mt-0">
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
    <v-flex xs12 md6>
    <v-layout row>
    <v-flex xs12 md12 id="location">
        <v-card>
        <v-card-title class='pb-0'><span>Location</span></v-card-title>
          <v-card-media>
              <div id="dc-location-barchart"></div>
          </v-card-media>
        </v-card>
    </v-flex>
    </v-layout>
  <v-layout row class="mt-2">
    <v-flex xs4 md3 id="grade">
      <v-card>
      <v-card-title class='pb-0'><span>Grade</span></v-card-title>
        <v-card-media>
            <div id="dc-grade-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs4 md3 id="afsc">
      <v-card>
      <v-card-title class='pb-0'><span>AFSC</span></v-card-title>
        <v-card-media>
            <div id="dc-afsc-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
      <v-flex xs4 md3 id="conus">
      <v-card>
      <v-card-title class='pb-0'><span>CONUS</span></v-card-title>
        <v-card-media>
            <div id="dc-conus-rowchart"></div>
        </v-card-media>
      </v-card>
      </v-flex>
        <v-flex xs4 md3 id="flying">
          <v-card>
          <v-card-title class='pb-0'><span>Flying</span></v-card-title>
            <v-card-media>
                <div id="dc-flying-rowchart"></div>
            </v-card-media>
          </v-card>
        </v-flex>
    </v-layout>
  </v-flex>
  </v-layout>
  <v-layout row wrap class="mt-3" id="billets">
    <v-flex xs12>
      <v-card elevation-3>
        <v-card-title class="pb-0">
          <v-flex md2>
            <v-select @input="toggleShowFavorite" :items="['Show All', 'Only Favorites']" v-model="showFavorite"></v-select>
          </v-flex>
          <v-spacer></v-spacer>
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
            selected-key="id"
            :rows-per-page-items="[5,10,25,{text: 'All', value: -1}]">
            <template slot="items" scope="props">
              <!--TODO: edit for IE11 support (see vuetify docs)-->
              <td class="text-xs-left">
                <v-btn flat primary dark right small block @click="showReqMethod(props.item)" @click.native.stop="showReq = true" >{{props.item.id}}</v-btn>
              </td>
              <td class="text-xs-left">{{props.item.afsc}}</td>
              <td class="text-xs-left">{{props.item.grade}}</td>
              <td class="text-xs-left">{{props.item.unit}}</td>
              <td class="text-xs-left">{{props.item.duty_title}}</td>
              <td class="text-xs-left">{{props.item.location}}</td>
              <td class="text-xs-left">{{props.item.state}}</td>
              <td class="text-xs-center">
                <v-icon :warning="props.item.favorited" 
                        @click="toggleFavorite(props.item)"
                        style="cursor: pointer;">star</v-icon>
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
import dchelpers from '@/dchelpers'
import statesJson from '../assets/data/us-states.json'
import { store } from '@/store'
import { mapGetters } from 'vuex'
import showReqMixin from '@/components/showReqMixin'
export default{
  mixins: [showReqMixin],
  props: ['step'],
  data(){
    return {
      data: [],
      showReq: false,
      showFavorite: 'Show All',
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
            text: 'Title', value: 'duty_title', align: 'left'
        },
        {
            text: 'Location', value: 'location', align: 'left'
        },
        {
            text: 'State', value: 'state', align: 'left'
        },
        {
            text: 'Favorite', value: 'favorited', align: 'center' 
        },
      ]
    }
  },
  watch: {
    step: function(){
      if (this.step==2){
        dc.redrawAll()
      }
    },
  },
  computed: {
    ndx(){
      return crossfilter(this.data)
    },
    idDim(){
      return this.ndx.dimension(function(d){return d.id})
    },
    faveDim(){
      return this.ndx.dimension(function(d){return d.favorited})
    },
    itemDim(){
      return this.ndx.dimension(function(d){return d})
    },
    faveBillets(){
      var curFave = this.$store.getters.faveBillets
      return curFave
    }
    // ...mapGetters([
        // 'faveBillets'
    // ]),
  },
  methods: {
    setTableData: function(){
      this.items = this.itemDim.top(Infinity).map((d)=>{
        return {          
          id: d.id,
          afsc: d.afsc,
          grade: d.grade,
          aircraft: d.aircraft,
          unit: d.unit,
          duty_title: d.actual_duty_title,
          location: d.location,
          state: d.state,
          favorited: d.favorited
        }
        })
    },
    toggleFavorite: function(billet) {
      billet.favorited = !billet.favorited
      var bill = this.data.filter(d=>{
        return d.id == billet.id 
      })[0]
      bill.favorited = billet.favorited
      this.idDim.filter(billet.id)
      this.ndx.remove()
      this.idDim.filterAll()
      this.ndx.add([bill])
      dc.redrawAll()

      //Dispatch to Vuex
      var favorited = this.data.filter(d=>{return d.favorited}).map(d=>{return d.id})
      this.$store.dispatch('updateFavoriteBillets', favorited)
    },
    toggleShowFavorite: function(){
      if(this.showFavorite == 'Only Favorites'){
        this.faveDim.filterFunction(function(d){
          return d
        })
      }
      else{
        this.faveDim.filterAll()
      }

      this.setTableData()
      dc.redrawAll()
    },
    resetAll: function(event){
      this.showFavorite = 'Show All'
      this.toggleShowFavorite()
      dc.filterAll()
      dc.redrawAll()
    },
  },
  mounted: function(){
      console.log('findbillets mounted')
    window.axios.get('/billet_view').then(response => {
        this.data = response.data.data
        window.billet = this.data[0]
        this.data.forEach(d=>{
          d.favorited = (this.faveBillets.indexOf(d.id) >= 0) ? true : false  
        })
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
        .colorDomain([0, Math.round(this.data.length/10)])
        .minWidth(statesWidth)
        .width(statesWidth)
        .height(statesHeight)
        .minHeight(150)
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

        var locationCount = {}
        this.data.map(d=>{return d.location}).forEach(d=>{
          locationCount[d] = locationCount[d] ? locationCount[d] + 1 : 1 
        })

        //Location
        var locationConfig = {}
        locationConfig.id = 'location'
        locationConfig.dim = this.ndx.dimension(function(d){return d.location ? locationCount[d.location]>1 ? d.location : 'OTHER' : 'NONE'})
        locationConfig.group = locationConfig.dim.group()
        locationConfig.minHeight = 300
        locationConfig.aspectRatio = 5
        locationConfig.margins = {top: 30, left: 40, right: 50, bottom: 100}
        locationConfig.colors = ["#1976d2"]
        var locationChart = dchelpers.getOrdinalBarChart(locationConfig)

        //grade
        var gradeOrder = {
          "LTC": 4,
          "MAJ": 3,
          "CPT": 2,
          "1LT": 1
        }
        var gradeConfig = {}
        gradeConfig.id = 'grade'
        gradeConfig.dim = this.ndx.dimension(function(d){return d.grade})
        gradeConfig.group = gradeConfig.dim.group()
        gradeConfig.minHeight = 150
        gradeConfig.aspectRatio = 2
        gradeConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        gradeConfig.colors = d3.scale.category10()
        var gradeChart = dchelpers.getRowChart(gradeConfig)
        gradeChart
        .ordering(function(d){
          return gradeOrder[d.key]
        })
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
        flyingConfig.dim = this.ndx.dimension(function(d){return ['1','2','3','6'].indexOf(d.api) >= 0 ? 'Flying' : 'Non-flying'})
        flyingConfig.group = flyingConfig.dim.group()
        flyingConfig.minHeight = 150
        flyingConfig.aspectRatio = 2
        flyingConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        flyingConfig.colors = d3.scale.category10()
        var flyingChart = dchelpers.getRowChart(flyingConfig)


        var vm = this
        // update rows in data table upon each chart being filtered 
        dc.chartRegistry.list().forEach((chart)=>{
            chart.on('filtered',function(){
              vm.setTableData()
            })
        })

        var temp
        window.onresize = function(event) {
            clearTimeout(temp)
            temp = setTimeout(dc.redrawAll(), 500)
        }

        this.setTableData()
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
