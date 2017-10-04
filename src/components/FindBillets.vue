<template>
  <v-container fluid>
  <v-layout row>
  <v-flex xs6 class="text-xs-left">
      <h2>Billets</h2>
      <p>Use this page to find billets. Use the following charts to filter billets based on your personal criteria. Once done filtering, scroll to the bottom of the page to view the billets that meet your criteria. <a @click.prevent="jumpToSection('billets')" href='#'>Jump to Billets</a></p>
  </v-flex>
  <v-flex xs6 class="dc-data-count text-xs-right">
  <br>
    <span class="filter-count"></span>
    selected out of
    <span class="total-count"></span>
    billets | 
    <v-btn small error round @click.prevent="resetAll">Reset All</v-btn>
    <v-btn small warning round @click.prevent="togglePanels">Toggle</v-btn>
  </v-flex>    
  </v-layout>
  <v-layout row wrap>
    <v-flex d-flex xs12 md7 id="states">
        <v-card>
        <v-card-title><h5 class='pa-2'>States</h5></v-card-title>          
        <v-card-media>
            <div id="dc-state-choropleth">
                <reset-btn @reset="resetChart($event)"></reset-btn>
            </div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex d-flex xs12 md5 id="conus">
      <v-card>
      <v-card-title><h5 class='pa-2'>CONUS/OCONUS</h5></v-card-title>
        <v-card-media>
            <div id="dc-conus-rowchart">
                <reset-btn @reset="resetChart($event)"></reset-btn>
            </div>
        </v-card-media>
      </v-card>
    <v-flex d-flex>
    <v-layout row wrap>
        <v-flex d-flex xs12 class="pa-0 pt-2" id="api">
          <v-card>
          <v-card-title><h5 class='pa-2'>API Code</h5></v-card-title>
            <v-card-media>
                <div id="dc-api-rowchart">
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
    <v-flex xs12 id="loc">
        <v-card>
        <v-card-title><h5 class='pa-2'>Location</h5></v-card-title>
          <v-card-media>
              <div id="dc-location-barchart">
                  <reset-btn @reset="resetChart($event)"></reset-btn>
              </div>
          </v-card-media>
        </v-card>
    </v-flex>
  </v-layout>
  <v-layout wrap class="mt-3">
    <v-flex xs6 md3 id="arcft">
      <v-card>
      <v-card-title><h5 class='pa-2'>Aircraft</h5></v-card-title>
        <v-card-media>
            <div id="dc-aircraft-barchart">
                <reset-btn @reset="resetChart($event)"></reset-btn>
            </div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs6 md3 id="grade">
                <v-card>
                <v-card-title><h5 class='pa-2'>Grade</h5></v-card-title>
                  <v-card-media>
                      <div id="dc-grade-barchart">
                          <reset-btn @reset="resetChart($event)"></reset-btn>
                      </div>
                  </v-card-media>
                </v-card>
    </v-flex>
    <v-flex xs12 md3 id="afsc">
      <v-card>
      <v-card-title><h5 class='pa-2'>AFSC</h5></v-card-title>
        <v-card-media>
            <div id="dc-afsc-rowchart">
                <reset-btn @reset="resetChart($event)"></reset-btn>
            </div>
        </v-card-media>
      </v-card>
    </v-flex>

  </v-layout>
  <v-layout row wrap class="mt-3" id="billets">
    <v-flex xs12>
        <!--doesn't have to be on card, but easier to add search bar with card-->
        <v-card elevation-3>
            <v-card-title><h5>Billets</h5>
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
            <v-data-table :headers="headers" 
                          :items="items" 
                          :search="search"
                          selected-key="items.id">
                <template slot="items" scope="props">
                    <!--TODO: edit for IE11 support (see vuetify docs)-->
                    <td class="text-xs-center">
                        <!--can't find a way to dynamically change material icons colors, so use two-->
                        <!--icons with v-show for now-->
                        <v-icon v-show="favorited(props.item)" warning @click="toggleFavorite(props.item)" style="cursor: pointer;">star</v-icon>
                        <v-icon v-show="!favorited(props.item)" @click="toggleFavorite(props.item)" style="cursor: pointer;">star</v-icon>
                    </td>
                    <td class="text-xs-left" style="width 10%">
                      <v-btn flat primary dark right small block @click="showReqMethod(props.item)" @click.native.stop="showReq = true" >{{props.item.id}}</v-btn>
                    </td>
                    <td class="text-xs-left" style="width: 10%">{{props.item.api}}</td>
                    <td class="text-xs-left" style="width: 10%">{{props.item.afsc}}</td>
                    <td class="text-xs-left" style="width: 10%">{{props.item.grade}}</td>
                    <td class="text-xs-left" style="width: 15%">{{props.item.aircraft}}</td>
                    <td class="text-xs-left" style="width: 30%">{{props.item.unit}}</td>
                    <td class="text-xs-left" style="width: 10%">{{props.item.state}}</td>
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

export default{
  data(){
    return {
      data: [],
      showReq: false,
      dialogData: {},
      panelOpen: {
         state: true,
         conus: true,
         api: true,
         location: true,
         aircraft: true,
         grade: true,
         afsc: true,
         temp: true,
      },
      items: [],
      search: '',
      clickedId: null,
      headers: [
        {
            text: 'Favorite', sortable: false  
        },
        {
            text: 'ID', value: 'id', align: 'left'
        },
        {
            text: 'API code', value: 'api', align: 'left' 
        },
        {
            text: 'AFSC', value: 'afsc', align: 'left'
        },
        {
            text: 'Grade', value: 'grade', align: 'left'
        },
        {
            text: 'MWS', value: 'aircraft', align: 'left'
        },
        {
            text: 'Unit', value: 'unit', align: 'left'
        },
        {
            text: 'State', value: 'state', align: 'left'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
        'faveBillets'
    ]),
  },
  components:{
    'reset-btn': ResetButton,
    'hide-btn': HideButton,
    'req-dialog-card': ReqDialogCard
  },
  methods: {
      jumpToSection: function(id) {
          document.getElementById(id).scrollIntoView();
      },
      favorited: function(obj) {
          //have to use some method to check if billet id exists in 
          //faveBillets array (includes method doesn't work)
          return this.faveBillets.some(function(d) {return d.id === obj.id})
      },
      toggleFavorite: function(obj) {
          if (this.favorited(obj)) {
            //have to use findIndex method to find index of billet, by billet id, to remove from 
            //faveBillets array (indexOf method doesn't work)
            var index = this.faveBillets.findIndex(function(d) {return d.id === obj.id})
            //keep payload an object to follow convention
            var payload = {'index': index}
            this.$store.dispatch('removeBillet',payload)
          } 
          else {
            this.$store.dispatch('addBillet',obj)
          }
      },
      togglePanels: function() {
        for (var key in this.panelOpen) {
            this.panelOpen[key] = !this.panelOpen[key]
        }
      },
      showReqMethod: function(req){
          //shows req and updates values in dialog (needed to make dialog dynamic) 
        var id = req.id
        var billet = this.items.filter((d)=>{return d.id == id})[0]
        this.dialogData = billet
      },
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
  beforeCreate: function() {
    console.log('before create');

  },
  created: function(){
    console.log('created')
  },
  beforeMount: function(){
    console.log('beforeMount')
  },
  mounted: function(){
    console.log('mounted')

    window.axios.get('/billet_view').then(response => {
        this.data = response.data.data
        
        renderCharts()
    }).catch(console.error)

    //es6 arrow function
      var renderCharts = () => {
        //Data count
        var ndx = crossfilter(this.data)
        var allGroup = ndx.groupAll()
        dc.dataCount(".dc-data-count")
          .dimension(ndx)
          .group(allGroup)

        function preRedraw(chart, id, aspectRatio, minHeight){
          var newWidth = document.getElementById(id).offsetWidth;
          var newHeight = newWidth/aspectRatio < minHeight ? minHeight : newWidth/aspectRatio;
          chart
         .width(newWidth)
         .height(newHeight)
         .root().select('svg').attr('width',newWidth).attr('height',newHeight)
        }

        //State Map
        var stateChart = dc.geoChoroplethChart("#dc-state-choropleth")
        var states = ndx.dimension(function(d){return d.state})
        var statesGroup = states.group()
        var statesAspectRatio = 1.8
        var statesXRatio = 2.5
        var statesYRatio = 1.9
        var statesSizeFactor = 1.2
        // get document width, and if on md or larger screen, manually
        // reduce size of first state map so fits in 7 columns
        var documentWidth = document.documentElement.clientWidth;
        if (documentWidth > 960) {
            var statesWidth = Math.round(documentWidth*(7/12)*statesSizeFactor);
        }
        else {
            var statesWidth = documentWidth*1.15;
        }
        var statesHeight = statesWidth/statesAspectRatio;
        var xOffset = statesWidth/statesXRatio;
        var yOffset = statesHeight/statesYRatio;

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
          return d.properties.name;
        })
        .on('preRedraw', function(chart) {
            // values for width, height, and offsets are for formatting -
            // numbers are fairly arbitrary
            var newWidth = document.getElementById('states').offsetWidth*statesSizeFactor;
            var newHeight = newWidth/statesAspectRatio;
            var newxOffset = newWidth/statesXRatio;
            var newyOffset = newHeight/statesYRatio;
           chart
           .minWidth(newWidth)
           .width(newWidth)
           .height(newHeight)
           .transitionDuration(0)
           .projection(d3.geo.albersUsa().scale(newWidth).translate([newxOffset,newyOffset]))
           .root().select('svg').attr('width',newWidth).attr('height',newHeight)
        })


        //CONUS
        var conusChart = dc.rowChart("#dc-conus-rowchart")
        var conusDim = ndx.dimension(function(d){return d.conus})
        var conusGroup = conusDim.group()
        var conusMinHeight = 130
        var conusAspectRatio = 7
        var conusSizeFactor = 0.96
        if (documentWidth > 960) {
            var conusWidth = Math.round(documentWidth*(5/12));
        }
        else {
            var conusWidth = documentWidth*conusSizeFactor;
        }
        var conusHeight = conusWidth/conusAspectRatio;
        if (conusHeight < conusMinHeight) {
            conusHeight = conusMinHeight;
        }

        conusChart
        .minWidth(conusWidth)
        .width(conusWidth)
        .minHeight(130)
        .height(conusHeight)
        .margins({top: 30, left: 30, right: 50, bottom: 40})
        .elasticX(true)
        .dimension(conusDim)
        .group(conusGroup)
        .on('preRedraw', function(chart) {
          preRedraw(chart, 'conus', conusAspectRatio, conusMinHeight)
        })

        //Location
        var locationChart = dc.barChart("#dc-location-barchart")
        var locationDim = ndx.dimension(function(d){return d.location;})
        var locationGroup = locationDim.group()
        var locMinHeight = 300
        var locAspectRatio = 4
        var locSizeFactor = 0.96
        var locWidth = documentWidth*locSizeFactor;
        var locHeight = locWidth/locAspectRatio;
        if (locHeight < locMinHeight) {
            locHeight = locMinHeight;
        }

        locationChart
        .minWidth(locWidth)
        .width(locWidth)
        .minHeight(locMinHeight)
        .height(locHeight)
        .margins({top: 30, right: 50, left: 40, bottom: 100})
        .dimension(locationDim)
        .group(locationGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colors(["orange"])
        .on('preRedraw', function(chart) {
          preRedraw(chart, 'loc', locAspectRatio, locMinHeight)
          chart.rescale()
        })

        //API code
        var apiChart = dc.rowChart('#dc-api-rowchart')
        var apiDim = ndx.dimension(function(d){return d.api;})
        var apiGroup = apiDim.group()
        var apiMinHeight = 250
        var apiAspectRatio = 3
        var apiSizeFactor = 0.96
        if (documentWidth > 960) {
            var apiWidth = Math.round(documentWidth*(5/12));
        }
        else {
            var apiWidth = documentWidth*apiSizeFactor;
        }
        var apiHeight = apiWidth/apiAspectRatio;
        if (apiHeight < apiMinHeight) {
            apiHeight = apiMinHeight;
        }

        apiChart
        .minWidth(apiWidth)
        .width(apiWidth)
        .minHeight(apiMinHeight)
        .height(apiHeight)
        .margins({top: 30, left: 30, right: 50, bottom: 40})
        .dimension(apiDim)
        .group(apiGroup)
        .elasticX(true)
        .colors(d3.scale.category10())
        .on('preRedraw', function(chart) {
          preRedraw(chart, 'api', apiAspectRatio, apiMinHeight)
        })
        
        //Aircraft
        var aircraftChart = dc.barChart("#dc-aircraft-barchart")
        var aircraftDim = ndx.dimension(function(d){return d.aircraft;})
        var aircraftGroup = aircraftDim.group()
        var arcftMinWidth = 200
        var arcftAspectRatio = 3
        if (documentWidth > 960) {
            var arcftWidth = Math.round(documentWidth*(3/12));
        }
        else {
            var arcftWidth = Math.round(documentWidth/2);
        }
        var arcftHeight = arcftWidth/arcftAspectRatio;
        if (arcftHeight < arcftMinWidth) {
            arcftHeight = arcftMinWidth;
        }

        aircraftChart
        .minWidth(arcftWidth)
        .width(arcftWidth)
        .height(arcftHeight)
        .minHeight(arcftMinWidth)
        .margins({top: 30, left: 30, right: 40, bottom: 60})
        .dimension(aircraftDim)
        .group(aircraftGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colors(["orange"])
        .on('preRedraw', function(chart) {
          preRedraw(chart, 'arcft', arcftAspectRatio, arcftMinWidth)
          chart.rescale()
        })

        //grade
        var gradeChart = dc.barChart("#dc-grade-barchart")
        var gradeDim = ndx.dimension(function(d){return d.grade;})
        var gradeGroup = gradeDim.group()
        var gradeMinHeight = 200
        var gradeAspectRatio = 3
        if (documentWidth > 960) {
            var gradeWidth = Math.round(documentWidth*(3/12));
        }
        else {
            var gradeWidth = Math.round(documentWidth/2);
        }
        var gradeHeight = gradeWidth/gradeAspectRatio;
        if (gradeHeight < gradeMinHeight) {
            gradeHeight = gradeMinHeight;
        }

        gradeChart
        .minWidth(gradeWidth)
        .width(gradeWidth)
        .height(gradeHeight)
        .minHeight(gradeMinHeight)
        .margins({top: 30, left: 30, right: 40, bottom: 60})
        .dimension(gradeDim)
        .group(gradeGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .barPadding(0.1)
        .outerPadding(0)
        .colors(["#2277ff"])
        .on('preRedraw', function(chart) {
          preRedraw(chart, 'grade', gradeAspectRatio, gradeMinHeight)
          chart.rescale()
        })

        //AFSC
        var afscChart = dc.rowChart('#dc-afsc-rowchart')
        var afscDim = ndx.dimension(function(d){
            if (d.afsc.substr(0,3)=='11F'){
                return d.afsc.substr(0,3)
            }
            else {
                return 'OTHER'
            }
        }
            )
        var afscGroup = afscDim.group()
        var afscMinHeight = 200
        var afscAspectRatio = 4
        var afscSizeFactor = 0.96
        if (documentWidth > 960) {
            var afscWidth = Math.round(documentWidth*(3/12));
        }
        else {
            var afscWidth = documentWidth*afscSizeFactor;
        }
        var afscHeight = afscWidth/afscAspectRatio;
        if (afscHeight < afscMinHeight) {
            afscHeight = afscMinHeight;
        }

        afscChart
        .minWidth(afscWidth)
        .width(afscWidth)
        .minHeight(afscMinHeight)
        .height(afscHeight)
        .margins({top: 30, left: 30, right: 50, bottom: 40})
        .dimension(afscDim)
        .group(afscGroup)
        .elasticX(true)
        .colors(d3.scale.category10())
        .on('preRedraw', function(chart) {
          preRedraw(chart, 'afsc', afscAspectRatio, afscMinHeight)
        })

        // Create data for data table
        var vm = this
        var itemsDim = ndx.dimension(function(d) {return d;})
        vm.items = itemsDim.top(Infinity)
        // update rows in data table upon each chart being filtered 
        dc.chartRegistry.list().forEach(function(chart) {
            chart.on('filtered', function() {
                vm.items = itemsDim.top(Infinity)
            })
        })

        var temp 
        window.onresize = function(event) {
            clearTimeout(temp)
            temp = setTimeout(resizeDone,200)
        }
        function resizeDone() {
            // hacky way to prevent getElementById from firing when not on FindBillets page
            if (vm.$route.name !== 'FindBillets') {
                return
            }
            // call redraw to preRedraw event on charts, which resizes charts
            console.log('redrawn')
            dc.redrawAll();
        }

        dc.renderAll();

      }

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

/* edit anchor tag styling so no highlighting after 
click, also give feedback to users on click */
a, a:visited, a:focus {
    outline: 0;
    position: relative;
}
a:hover {
    outline: 0;
    positon: relative;
    color: green;
}
a:active {
    outline: 0;
    top: 1px;
    color: red;
}

div[id*="-barchart"] .x.axis text{
    text-anchor: end !important;
    transform: rotate(-45deg);
  }

div[id*="-rowchart"] g.row text{
    fill: black;
}
</style> 
