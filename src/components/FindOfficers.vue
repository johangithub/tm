<template>
  <v-container fluid>
  <v-layout row>
  <v-flex xs6 class="text-xs-left">
      <h2>Officers</h2>
      <p>Use this page to find officers. Use the following charts to filter officers based on your criteria. Once done filtering, scroll to the bottom of the page to view the officers who meet your criteria. <a @click.prevent="jumpToSection('officers')" href='#'>Jump to officers</a></p>
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
    <v-flex d-flex xs12 md7>
        <v-expansion-panel expand>
            <v-expansion-panel-content :value="panelOpen.state" id="states">
                <div slot="header" style="font-size: 140%;">States</div>          
      <v-card>
        <v-card-media>
        </v-card-media>
      </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-flex>
    <v-flex d-flex xs12 md5>
        <v-expansion-panel expand>
            <v-expansion-panel-content :value="panelOpen.rdtm" id="rdtm">
                <div slot="header" style="font-size: 140%;">CONUS/OCONUS</div>
                <v-card>
                  <v-card-media>
                      <div id="dc-rdtm-rowchart">
                          <reset-btn @reset="resetChart($event)"></reset-btn>
                      </div>
                  </v-card-media>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    <v-flex d-flex>
    <v-layout row wrap>
        <v-flex d-flex xs12 class="pa-0 pt-2">
            <v-expansion-panel expand>
                <v-expansion-panel-content :value="panelOpen.api" id="api">
                    <div slot="header" style="font-size: 140%;">API Code</div>
                    <v-card>
                      <v-card-media>
                          <div id="dc-api-rowchart">
                              <reset-btn @reset="resetChart($event)"></reset-btn>
                          </div>
                      </v-card-media>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-flex> 
    </v-layout>
    </v-flex>
    </v-flex>
    </v-layout>
  <v-layout row wrap class="mt-3">
    <v-flex xs12>
        <v-expansion-panel expand>
            <v-expansion-panel-content :value="panelOpen.yearGroup" id="year">
                <div slot="header" style="font-size: 140%;">Location</div>
                <v-card>
                  <v-card-media>
                      <div id="dc-yearGroup-barchart">
                          <reset-btn @reset="resetChart($event)"></reset-btn>
                      </div>
                  </v-card-media>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-flex>
  </v-layout>
  <v-layout wrap class="mt-3">
    <v-flex xs6 md4>
        <v-expansion-panel expand>
            <v-expansion-panel-content :value="panelOpen.aircraft" id="arcft">
                <div slot="header" style="font-size: 140%;">Aircraft</div>
                <v-card>
                  <v-card-media>
                      <div id="dc-aircraft-barchart">
                          <reset-btn @reset="resetChart($event)"></reset-btn>
                      </div>
                  </v-card-media>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-flex>
    <v-flex xs6 md4>
        <v-expansion-panel expand>
            <v-expansion-panel-content :value="panelOpen.grade" id="grade">
                <div slot="header" style="font-size: 140%;">Grade</div>
                <v-card>
                  <v-card-media>
                      <div id="dc-grade-barchart">
                          <reset-btn @reset="resetChart($event)"></reset-btn>
                      </div>
                  </v-card-media>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-flex>
    <v-flex xs12 md4>
        <v-expansion-panel expand>
            <v-expansion-panel-content :value="panelOpen.afsc" id="afsc">
                <div slot="header" style="font-size: 140%;">AFSC</div>
                <v-card>
                  <v-card-media>
                      <div id="dc-afsc-rowchart">
                          <reset-btn @reset="resetChart($event)"></reset-btn>
                      </div>
                  </v-card-media>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-flex>
  </v-layout>
  <v-layout row wrap class="mt-3" id="Officers">
    <v-flex xs12>
        <!--doesn't have to be on card, but easier to add search bar with card-->
        <v-card elevation-3>
            <v-card-title><h5>Officers</h5>
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
                    <td>
                        <!--can't find a way to dynamically change material icons colors, so use two-->
                        <!--icons with v-show for now-->
                        <v-icon v-show="favorited(props.item)" warning @click="toggleFavorite(props.item)" style="cursor: pointer;">star</v-icon>
                        <v-icon v-show="!favorited(props.item)" @click="toggleFavorite(props.item)" style="cursor: pointer;">star</v-icon>
                    </td>
                    <td class="text-xs-left" style="width 10%"><a href="#" @click.prevent = "showReqMethod($event)"  :id="props.item.id">{{props.item.id}}<req-sheet v-if="props.item.id === clickedId" :item="dialogData" v-model="showReq"></req-sheet></a></td>
                    <td class="text-xs-left" style="width: 10%">{{props.item.api}}</td>
                    <td class="text-xs-left" style="width: 10%">{{props.item.afsc}}</td>
                    <td class="text-xs-left" style="width: 10%">{{props.item.grade}}</td>
                    <td class="text-xs-left" style="width: 15%">{{props.item.aircraft}}</td>
                    <td class="text-xs-left" style="width: 35%">{{props.item.unit}}</td>
                    <td class="text-xs-left" style="width: 10%">{{props.item.state}}</td>
                </template> 
            </v-data-table>
        </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import ResetButton from './ResetButton'
import HideButton from './HideButton'
import statesJson from '../assets/data/us-states.json'
import Req from './Req'
import { mapGetters } from 'vuex'

export default{
  data(){
    return {
      data: [],
      showReq: false,
      dialogData: {},
      panelOpen: {
         state: true,
         rdtm: true,
         api: true,
         yearGroup: true,
         aircraft: true,
         grade: true,
         afsc: true 
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
    ndx: function(){
      return crossfilter(this.data)
    },
    allGroup: function(){
      return this.ndx.groupAll()
    }
  },
  components:{
    'reset-btn': ResetButton,
    'hide-btn': HideButton,
    'req-sheet': Req
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
      showReqMethod: function(event){
          //shows req and updates values in dialog (needed to make dialog dynamic) 
        var id = event.target.id
        var billet = this.items.filter((d)=>{return d.id == id})[0]
        this.dialogData['id']=billet.id
        this.dialogData['api']=billet.api
        this.dialogData['state']=billet.state
        this.dialogData['unit']=billet.unit
        this.dialogData['aircraft']=billet.aircraft
        this.dialogData['afsc']=billet.afsc
        this.dialogData['grade']=billet.grade
        this.showReq = true
        this.clickedId = id
      },
    resetAll: (event)=>{
      //Emulate javascript:dc.filterAll();dc.redrawAll()
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
  beforeCreate: function() {
    console.log('before create');

  },
  created: function(){
    console.log('created')
    var data = require('@/assets/data/officers.csv')
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

    var documentWidth = document.documentElement.clientWidth;

    //unformat
    function unformat(string) {
        var newString = string.split("'")[1]
        if (newString === undefined) {
            return "NONE"
        } else {
            return string.split("'")[1]
        }
    }

    // RDTM
    var rdtmChart = dc.rowChart("#dc-rdtm-rowchart")
    var rdtmDim = this.ndx.dimension(function(d){return unformat(d.rdtm)})
    var rdtmGroup = rdtmDim.group()
    var rdtmMinHeight = 330
    var rdtmAspectRatio = 3
    if (documentWidth > 960) {
        var rdtmWidth = Math.round(documentWidth*(5/12));
    }
    else {
        var rdtmWidth = documentWidth*0.90;
    }
    var rdtmHeight = rdtmWidth/rdtmAspectRatio;
    if (rdtmHeight < rdtmMinHeight) {
        rdtmHeight = rdtmMinHeight;
    }

    rdtmChart
    .minWidth(rdtmWidth)
    .width(rdtmWidth)
    .minHeight(rdtmMinHeight)
    .height(rdtmHeight)
    .margins({top: 30, left: 30, right: 50, bottom: 40})
    .elasticX(true)
    .dimension(rdtmDim)
    .group(rdtmGroup)
    .on('preRedraw', function(chart) {
        var newWidth = document.getElementById('rdtm').offsetWidth;
        var newHeight = newWidth/rdtmAspectRatio;
        if (newHeight < rdtmMinHeight) {
            newHeight = rdtmMinHeight;
        }
       chart
       .minWidth(newWidth)
       .width(newWidth)
       .minHeight(rdtmMinHeight)
       .height(newHeight)
       .root().select('svg').attr('width',newWidth).attr('height',newHeight)
    })

    // yeargroup
    var yearGroupChart = dc.barChart("#dc-yearGroup-barchart")
    var yearGroupDim = this.ndx.dimension(function(d){
        var date = new Date(-315619200000 + d.tafmsd * 86400000)
        var year = date.getFullYear();
        return year    
    })
    var yearGroupGroup = yearGroupDim.group()
    var yearMinHeight = 330
    var yearAspectRatio = 3
    var yearWidth = documentWidth;
    var yearHeight = yearWidth/yearAspectRatio;
    if (yearHeight < yearMinHeight) {
        yearHeight = yearMinHeight;
    }

    yearGroupChart
    .minWidth(yearWidth)
    .width(yearWidth)
    .minHeight(yearMinHeight)
    .height(yearHeight)
    .margins({top: 30, right: 50, left: 40, bottom: 100})
    .dimension(yearGroupDim)
    .group(yearGroupGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .elasticX(true)
    .colors(["orange"])
    .on('preRedraw', function(chart) {
        var newWidth = document.getElementById('year').offsetWidth;
        var newHeight = newWidth/yearAspectRatio;
        if (newHeight < yearMinHeight) {
            newHeight = yearMinHeight;
        }
       chart
       .minWidth(newWidth)
       .width(newWidth)
       .minHeight(yearMinHeight)
       .height(newHeight)
       .rescale()
       .root().select('svg').attr('width',newWidth).attr('height',newHeight)
    })

//    //API code
//    var apiChart = dc.rowChart('#dc-api-rowchart')
//    var apiDim = this.ndx.dimension(function(d){return d.api;})
//    var apiGroup = apiDim.group()
//    if (documentWidth > 960) {
//        var apiWidth = Math.round(documentWidth*(5/12));
//    }
//    else {
//        var apiWidth = documentWidth*0.90;
//    }
//    var apiHeight = apiWidth/3;
//    if (apiHeight < 250) {
//        apiHeight = 250;
//    }
//
//    apiChart
//    .minWidth(apiWidth)
//    .width(apiWidth)
//    .minHeight(250)
//    .height(apiHeight)
//    .margins({top: 30, left: 30, right: 50, bottom: 40})
//    .dimension(apiDim)
//    .group(apiGroup)
//    .elasticX(true)
//    .colors(d3.scale.category10())
//    .on('preRedraw', function(chart) {
//        var newWidth = document.getElementById('api').offsetWidth;
//        var newHeight = newWidth/3;
//        if (newHeight < 250) {
//            newHeight = 250;
//        }
//       chart
//       .minWidth(newWidth)
//       .width(newWidth)
//       .minHeight(250)
//       .height(newHeight)
//       .root().select('svg').attr('width',newWidth).attr('height',newHeight)
//    })
    
    //Aircraft
    var aircraftChart = dc.barChart("#dc-aircraft-barchart")
    var aircraftDim = this.ndx.dimension(function(d){
        var acftString = unformat(d.acft_hist_1)
        return acftString;
    })
    var aircraftGroup = aircraftDim.group()
    var aircraftMinHeight = 200 
    var aircraftAspectRatio = 3
    if (documentWidth > 960) {
        var arcftWidth = Math.round(documentWidth*(4/12));
    }
    else {
        var arcftWidth = Math.round(documentWidth/2);
    }
    var arcftHeight = arcftWidth/aircraftAspectRatio;
    if (arcftHeight < aircraftMinHeight) {
        arcftHeight = aircraftMinHeight;
    }

    aircraftChart
    .minWidth(arcftWidth)
    .width(arcftWidth)
    .height(arcftHeight)
    .minHeight(aircraftMinHeight)
    .margins({top: 30, left: 30, right: 40, bottom: 60})
    .dimension(aircraftDim)
    .group(aircraftGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .colors(["orange"])
    .on('preRedraw', function(chart) {
        var newWidth = document.getElementById('arcft').offsetWidth;
        var newHeight = newWidth/aircraftAspectRatio;
        if (newHeight < aircraftMinHeight) {
            newHeight = aircraftMinHeight;
        }
       chart
       .minWidth(newWidth)
       .width(newWidth)
       .minHeight(aircraftMinHeight)
       .height(newHeight)
       .rescale()
       .root().select('svg').attr('width',newWidth).attr('height',newHeight)
    })

    //grade
    var gradeChart = dc.barChart("#dc-grade-barchart")
    var gradeDim = this.ndx.dimension(function(d){
        var gradeFormat = "O-" + unformat(d.grade).substr(1,1)
        return gradeFormat;
    })
    var gradeGroup = gradeDim.group()
    var gradeMinHeight = 200 
    var gradeAspectRatio = 3
    if (documentWidth > 960) {
        var gradeWidth = Math.round(documentWidth*(4/12));
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
        var newWidth = document.getElementById('grade').offsetWidth;
        var newHeight = newWidth/gradeAspectRatio;
        if (newHeight < gradeMinHeight) {
            newHeight = gradeMinHeight;
        }
       chart
       .minWidth(newWidth)
       .width(newWidth)
       .minHeight(gradeMinHeight)
       .height(newHeight)
       .rescale()
       .root().select('svg').attr('width',newWidth).attr('height',newHeight)
    })

    //AFSC
    var afscChart = dc.rowChart('#dc-afsc-rowchart')
    var afscDim = this.ndx.dimension(function(d){
        var afscRegex = /\d\d\D/
        var afscString = unformat(d.afsc_duty)
        var afscMatch = afscString.match(afscRegex)
        if (afscMatch) {
            return afscMatch[0] 
        } else {
            return "NONE"
        }
    })
    var afscGroup = afscDim.group()
    var afscMinHeight = 600 
    var afscAspectRatio = 1
    if (documentWidth > 960) {
        var afscWidth = Math.round(documentWidth*(4/12));
    }
    else {
        var afscWidth = documentWidth*0.90;
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
        var newWidth = document.getElementById('afsc').offsetWidth;
        var newHeight = newWidth/afscAspectRatio;
        if (newHeight < afscMinHeight) {
            newHeight = afscMinHeight;
        }
       chart
       .minWidth(newWidth)
       .width(newWidth)
       .minHeight(afscMinHeight)
       .height(newHeight)
       .root().select('svg').attr('width',newWidth).attr('height',newHeight)
    })

    // Create data for data table
    var vm = this
    vm.items = vm.ndx.dimension(function(d) {return d;}).top(Infinity)
    // update rows in data table upon each chart being filtered 
    dc.chartRegistry.list().forEach(function(chart) {
        chart.on('filtered', function() {
            vm.items = vm.ndx.dimension(function(d) {return d;}).top(Infinity)
        })
    })

    var temp 
    window.onresize = function(event) {
        clearTimeout(temp)
        temp = setTimeout(resizeDone,200)
    }
    function resizeDone() {
        // hacky way to prevent getElementById from firing when not on FindBillets page
        if (vm.$route.name !== 'FindOfficers') {
            return
        }
        // call redraw to preRedraw event on charts, which resizes charts
        console.log('redrawn')
        dc.redrawAll();
    }

    dc.renderAll();

  },
  beforeUpdate: function(){
    console.log('before update')
    //window.dispatchEvent( new Event('resize') )

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
