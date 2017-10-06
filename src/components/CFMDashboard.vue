<template>
  <v-container fluid id="cfm_dashboard">
  <v-layout row>
  <v-flex xs8 class="text-xs-left">
      <h4>Fighter CFM Dashboard</h4>
  </v-flex>
  <v-flex xs4 class="dc-data-count text-xs-right">
    <span class="filter-count"></span>
    selected out of
    <span class="total-count"></span>
    officers | 
    <v-btn small error round @click.prevent="resetAll">Reset All</v-btn>
    <!-- <v-btn small warning round @click.prevent="togglePanels">Toggle</v-btn> -->
  </v-flex>    
  </v-layout>
  <v-layout row>
    <v-flex xs4 md2 id="grade">
      <v-card>
      <v-card-title class="pb-0"><span>Grade</span></v-card-title>
        <v-card-media>
            <div id="dc-grade-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs4 md2 id="rtg">
      <v-card>
      <v-card-title class="pb-0"><span>Rating</span></v-card-title>
        <v-card-media>
            <div id="dc-rtg-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs4 md2 id="wic">
      <v-card>
      <v-card-title class="pb-0"><span>WIC</span></v-card-title>
        <v-card-media>
            <div id="dc-wic-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs4 md2 id="vml">
      <v-card>
      <v-card-title class="pb-0"><span>VML</span></v-card-title>
        <v-card-media>
            <div id="dc-vml-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row class="mt-3">
    <v-flex xs12 md2 id="rdtm">
      <v-card>
      <v-card-title class="pb-0"><span>RDTM</span></v-card-title>
        <v-card-media>
            <div id="dc-rdtm-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs12 md2 id="prefix">
      <v-card>
      <v-card-title class="pb-0"><span>DAFSC Prefix</span></v-card-title>
        <v-card-media>
            <div id="dc-prefix-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row class="mt-3">
    <v-flex xs12 md4 id="yeargroup">
      <v-card>
      <v-card-title class="pb-0"><span>Adjusted Year Group</span></v-card-title>
        <v-card-media>
            <div id="dc-yeargroup-barchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs12 md4 id="flthrs">
      <v-card>
      <v-card-title class="pb-0"><span>Flight Hours</span></v-card-title>
        <v-card-media>
          <div id="dc-flthrs-barchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs12 md4 id="tos">
      <v-card>
      <v-card-title class="pb-0"><span>Time on Station</span></v-card-title>
        <v-card-media>
          <div id="dc-tos-barchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row class="mt-3">
    <v-flex xs12 md4 id="tis">
      <v-card>
      <v-card-title class="pb-0"><span>Time In Service</span></v-card-title>
        <v-card-media>
          <div id="dc-tis-barchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row class="mt-3">
    <v-flex xs12 md12 id="location">
      <v-card>
      <v-card-title class="pb-0"><span>Location</span></v-card-title>
        <v-card-media>
            <div id="dc-location-barchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row class="mt-3" id="officers">
    <v-flex xs12>
        <!--doesn't have to be on card, but easier to add search bar with card-->
        <v-card elevation-3>
            <v-card-title class="pb-0"><h5>Officers</h5>
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
            <v-data-table v-model="selected"
                          :headers="headers" 
                          :items="items" 
                          :search="search"
                          selected-key="dod_id">
                <template slot="items" scope="props">
                    <td class="text-xs-center">
                      <v-btn :id="props.item.dod_id" flat primary dark right small block @click="showOffMethod($event)" @click.native.stop="showOff = true" >{{props.item.dod_id}}</v-btn>
                    </td>
                    <td class="text-xs-left">{{props.item.name}}</td>
                    <td class="text-xs-left">{{props.item.location}}</td>
                    <td class="text-xs-left">{{props.item.grade}}</td>
                    <td class="text-xs-left">{{props.item.adjYG}}</td>
                    <td class="text-xs-left">{{props.item.rating}}</td>
                    <td class="text-xs-left">{{props.item.rdtm}}</td>
                    <td class="text-xs-left">{{props.item.dafsc}}</td>
                    <td class="text-xs-center">
                        <v-switch
                          color="primary"       
                          @click="toggleVML(props.item)"
                          :input-value="props.item.vml"></v-switch></td>
                </template> 
            </v-data-table>
        </v-card>
    </v-flex>
    <v-dialog v-model="showOff" width="600px" lazy absolute>
      <v-card>
        <v-card-title class="headline">Officer<v-spacer></v-spacer><v-btn fab primary small flat @click.native="showOff = false"><v-icon dark >clear</v-icon></v-btn></v-card-title>
        <v-card-text>
            <v-container fluid grid-list-xs>
                <v-layout row>
                    <v-flex flexbox v-for="(property,key) in dialogData" :key="key">
                            <v-text-field
                                :label="key"
                                :value="property"
                                readonly 
                                ></v-text-field>
                    </v-flex>
                </v-layout> 
            </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat="flat" @click.native="showOff = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      headers: [
            // value must be exact name of property for column!!!
        {
            text: 'ID', align: 'center', sortable: false
        },
        {
            text: 'Name', value: 'name', align: 'left' 
        },
        {
            text: 'Location', value: 'location', align: 'left' 
        },
        {
            text: 'Grade', value: 'grade', align: 'left' 
        },
        {
            text: 'Year Group', value: 'adjYG', align: 'left'
        },
        {
            text: 'Rating', value: 'rating', align: 'left'
        },
        {
            text: 'RDTM', value: 'rdtm', align: 'left'
        },
        {
            text: 'DAFSC', value: 'dafsc', align: 'left'
        },
        {
            text: 'VML', align: 'left', sortable: false  
        },
      ]
    }
  },
  components:{
    'off-dialog-card': OfficerDialogCard 
  },
  computed: {
    ndx(){
      return crossfilter(this.data)
    },
    idDim(){
      return this.ndx.dimension(function(d){return d.dod_id})
    }
  },
  methods: {
    toggleVML: function(officer) {
      officer.vml = !officer.vml
      // var ind = this.data.findIndex(d=>{return d.dod_id == officer.dod_id})
      var off = this.data.filter(d=>{return d.dod_id == officer.dod_id})[0]
      off.vml = officer.vml
      this.idDim.filter(officer.dod_id)
      this.ndx.remove()
      this.idDim.filterAll()
      this.ndx.add([off])
      dc.redrawAll()
    },
    showOffMethod: function(event){
        //shows officer view and updates values in dialog (needed to make dialog dynamic)
      var id = event.currentTarget.id
      var officer = this.data.filter((d)=>{return d.dod_id == id})[0]
      this.dialogData = officer.general
    },
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
    this.selected = (this.curFaveOfficers) ? this.curFaveOfficers : [] 
    
    // es6 arrow function 
    var renderCharts = () => {

        //Data count
        var allGroup = this.ndx.groupAll()
        dc.dataCount(".dc-data-count")
          .dimension(this.ndx)
          .group(allGroup)

        //grade
        var gradeConfig = {}
        gradeConfig.id = 'grade'
        gradeConfig.dim = this.ndx.dimension(function(d){return d.general.grade})
        gradeConfig.group = gradeConfig.dim.group()
        gradeConfig.minHeight = 150
        gradeConfig.aspectRatio = 3
        gradeConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        gradeConfig.colors = d3.scale.category10()
        var gradeChart = dchelpers.getRowChart(gradeConfig)
        gradeChart
          .ordering(function(d){return d.key})

        //rtg
        var rtgConfig = {}
        rtgConfig.id = 'rtg'
        rtgConfig.dim = this.ndx.dimension(function(d){return d.duty.core_group})
        rtgConfig.group = rtgConfig.dim.group()
        rtgConfig.minHeight = 150
        rtgConfig.aspectRatio = 2
        rtgConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        rtgConfig.colors = d3.scale.category10()
        var rtgChart = dchelpers.getRowChart(rtgConfig)

        //WIC
        var wicConfig = {}
        wicConfig.id = 'wic'
        wicConfig.dim = this.ndx.dimension(function(d){return d.special_experience.WIC || 'NONE'})
        wicConfig.group = wicConfig.dim.group()
        wicConfig.minHeight = 150
        wicConfig.aspectRatio = 2
        wicConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        wicConfig.colors = d3.scale.category10()
        var wicChart = dchelpers.getRowChart(wicConfig)

        var vmlConfig = {}
        vmlConfig.id = 'vml'
        vmlConfig.dim = this.ndx.dimension(function(d){return d.vml ? 'VULNERABLE' : 'NOT VULNERABLE'})
        vmlConfig.group = vmlConfig.dim.group()
        vmlConfig.minHeight = 150
        vmlConfig.aspectRatio = 2
        vmlConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        vmlConfig.colors = d3.scale.category10()
        var vmlChart = dchelpers.getRowChart(vmlConfig)

        // RDTM
        var rdtmConfig = {}
        rdtmConfig.id = 'rdtm'
        rdtmConfig.dim = this.ndx.dimension(function(d){return d.rated.rdtm ? rdtm[d.rated.rdtm] : 'NONE'})
        rdtmConfig.group = rdtmConfig.dim.group()
        rdtmConfig.minHeight = 200
        rdtmConfig.aspectRatio = 3
        rdtmConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        rdtmConfig.colors = d3.scale.category10()
        var rdtmChart = dchelpers.getRowChart(rdtmConfig)

        // DAFSC
        var dafsc_prefix= {
          "P": "(P) Rated",
          "C": "(C) Commander",
          "B": "(B) Director of Ops",
          "K": "(K) Instructor",
          "T": "(T) Trainer",
          "W": "(W) Weapons",
          "Q": "(Q) Evaluator",
          "S": "(S) Safety",
          "R": "(R) Planner",
        }

        var prefixConfig = {}
        prefixConfig.id = 'prefix'
        prefixConfig.dim = this.ndx.dimension(function(d){return "PCBKTWQSR".indexOf(d.duty.dafsc[0]) >= 0 ? dafsc_prefix[d.duty.dafsc[0]] : 'NONE'})
        prefixConfig.group = prefixConfig.dim.group()
        prefixConfig.minHeight = 200
        prefixConfig.aspectRatio = 3
        prefixConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        prefixConfig.colors = d3.scale.category10()
        var prefixChart = dchelpers.getRowChart(prefixConfig)
        prefixChart
          .ordering(function(d){return d.key})

        // yeargroup
        var yeargroupConfig = {}
        yeargroupConfig.id = 'yeargroup'
        yeargroupConfig.dim = this.ndx.dimension(function(d){return d.general.adjYG})
        yeargroupConfig.group = yeargroupConfig.dim.group()
        yeargroupConfig.minHeight = 150
        yeargroupConfig.aspectRatio = 5
        yeargroupConfig.margins = {top: 30, left: 30, right: 30, bottom: 30}
        yeargroupConfig.colors = ["#1976d2"]
        var yeargroupChart = dchelpers.getOrdinalBarChart(yeargroupConfig)
        
        //Flight Hours
        var fltHrsMax = d3.max(this.data.map(d=>{return d.rated.flt_hrs_total})) + 100
        var fltHrsConfig = {}
        fltHrsConfig.id = 'flthrs'
        fltHrsConfig.dim = this.ndx.dimension(function(d){return Math.round(d.rated.flt_hrs_total/100)*100})
        fltHrsConfig.x = d3.scale.linear().domain([0, fltHrsMax])
        fltHrsConfig.xUnits = 50
        fltHrsConfig.group = fltHrsConfig.dim.group()
        fltHrsConfig.minHeight = 150
        fltHrsConfig.aspectRatio = 5
        fltHrsConfig.margins = {top: 30, left: 40, right: 50, bottom: 40}
        fltHrsConfig.colors = ["#1976d2"]
        var fltHrsChart = dchelpers.getBrushBarChart(fltHrsConfig)

        //Time on station
        var tosMax = 4
        var tosConfig = {}
        tosConfig.id = 'tos'
        tosConfig.dim = this.ndx.dimension(function(d){
            return Math.min(tosMax-.1, parseFloat(d.general.tos).toFixed(1))
        })
        tosConfig.x = d3.scale.linear().domain([0, tosMax])
        tosConfig.xUnits = 50
        tosConfig.group = tosConfig.dim.group()
        tosConfig.minHeight = 150
        tosConfig.aspectRatio = 5
        tosConfig.margins = {top: 30, left: 40, right: 50, bottom: 40}
        tosConfig.colors = ["#1976d2"]
        var tosChart = dchelpers.getBrushBarChart(tosConfig)


        //Time in service
        var tisMax = 24
        var tisConfig = {}
        tisConfig.id = 'tis'
        tisConfig.dim = this.ndx.dimension(function(d){
          return Math.min(tisMax-.1, parseFloat(d.general.tis).toFixed(1))
        })
        tisConfig.x = d3.scale.linear().domain([0, tisMax])
        tisConfig.xUnits = 50
        tisConfig.group = tisConfig.dim.group()
        tisConfig.minHeight = 150
        tisConfig.aspectRatio = 5
        tisConfig.margins = {top: 30, left: 40, right: 50, bottom: 40}
        tisConfig.colors = ["#1976d2"]
        var tisChart = dchelpers.getBrushBarChart(tisConfig)


        // location
        var locationConfig = {}
        locationConfig.id = 'location'
        locationConfig.dim = this.ndx.dimension(function(d){return d.duty.location})
        locationConfig.group = locationConfig.dim.group()
        locationConfig.minHeight = 150
        locationConfig.aspectRatio = 5
        locationConfig.margins = {top: 30, left: 30, right: 30, bottom: 100}
        locationConfig.colors = ["#1976d2"]
        var locationChart = dchelpers.getOrdinalBarChart(locationConfig)
        
        function tableData(d){
          var obj = {
            dod_id: d.dod_id,
            name: d.general.firstName + ' ' + d.general.lastName,
            location: d.duty.location,
            grade: d.general.grade,
            adjYG: d.general.adjYG,
            rating: d.duty.core_group,
            rdtm: rdtm[d.rated.rdtm],
            dafsc: d.duty.dafsc,
            vml: d.vml
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
            console.log('resize')
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
