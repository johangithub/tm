<template>
  <v-container fluid>
  <v-layout row>
  <v-spacer></v-spacer>
  <v-flex xs6 class="dc-data-count text-xs-right">
    <span class="filter-count"></span>
    selected out of
    <span class="total-count"></span>
    officers | 
    <v-btn small error round @click.prevent="resetAll">Reset All</v-btn>
  </v-flex>    
  </v-layout>
  <v-layout row wrap class="mt-3">
    <v-flex xs12 md2 id="grade">
      <v-card>
        <v-card-title class="pb-0"><span>Grade</span></v-card-title>
        <v-card-media>
            <div id="dc-grade-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs12 md2 id="rtg">
      <v-card>
        <v-card-title class="pb-0"><span>Rating</span></v-card-title>
        <v-card-media>
            <div id="dc-rtg-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex> 
    <v-flex xs12 md4 id="rdtm">
      <v-card>
        <v-card-title class="pb-0"><span>RDTM</span></v-card-title>
        <v-card-media>
            <div id="dc-rdtm-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row class="mt-3">
    <v-flex xs12 md6 id="yeargroup">
      <v-card>
        <v-card-title class="pb-0"><span>Year Group</span></v-card-title>
        <v-card-media>
            <div id="dc-yeargroup-barchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 id="flthrs">
      <v-card>
        <v-card-title class="pb-0"><span>Flight Hours</span></v-card-title>
        <v-card-media>
            <div id="dc-flthrs-barchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row class="mt-3" id="officers">
    <v-flex xs12>
        <!--doesn't have to be on card, but easier to add search bar with card-->
        <v-card elevation-3>
            <v-card-title>
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
                    <td class="text-xs-left" style="width 10%">
                      <v-btn :id="props.item.dod_id" flat primary dark right small block @click="showOffMethod($event)" @click.native.stop="showOff = true" >{{props.item.dod_id}}</v-btn>
                    </td>
                    <td class="text-xs-left">{{props.item.name}}</td>
                    <td class="text-xs-left">{{props.item.grade}}</td>
                    <td class="text-xs-left">{{props.item.adjYG}}</td>
                    <td class="text-xs-left">{{props.item.rating}}</td>
                    <td class="text-xs-left">{{props.item.rdtm}}</td>
                    <td class="text-xs-left">{{props.item.dafsc}}</td>
                    <td class="text-xs-center">
                        <v-icon :warning="faveOfficers.includes(props.item.dod_id)" 
                                @click="toggleFavorite(props.item)" 
                                style="cursor: pointer;">star</v-icon></td>
                </template> 
            </v-data-table>
        </v-card>
    </v-flex>
    <v-dialog v-model="showOff" width="600px" lazy absolute>
      <v-card>
        <v-card-title class="headline">Requisition<v-spacer></v-spacer><v-btn fab primary small flat @click.native="showOff = false"><v-icon dark >clear</v-icon></v-btn></v-card-title>
        <v-card-text>
            <v-container fluid grid-list-xs>
                <v-layout row wrap>
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
import statesJson from '../assets/data/us-states.json'
import OfficerDialogCard from '@/components/OfficerDialogCard'
import dchelpers from '@/dchelpers'
import { store } from '@/store'
import { mapGetters } from 'vuex'
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
        {
            text: 'ID', align: 'center', sortable: false
        },
        {
            text: 'Name', value: 'name', align: 'left' 
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
            text: 'Aircraft', value: 'rdtm', align: 'left'
        },
        {
            text: 'DAFSC', value: 'dafsc', align: 'left'
        },
        {
            text: 'Favorite', align: 'left', sortable: false
        },

      ]
    }
  },
  components:{
    'off-dialog-card': OfficerDialogCard 
  },
  props: ['step'],
  watch: {
    step: function(){
      if (this.step=='4'){
        dc.redrawAll()
      }
    },
  },
  computed: {
    ...mapGetters([
        'curFaveOfficers',
        'reqId'
    ]),
    faveOfficers(){
      return this.$store.getters.faveOfficers
    },
    ndx(){
      return crossfilter(this.data)
    },
    idDim(){
      return this.ndx.dimension(function(d){return d.dod_id})
    }
  },
  methods: {
    toggleFavorite: function(officer) {
      console.log(this.faveOfficers, officer.dod_id)
      if (this.faveOfficers.includes(officer.dod_id)){
        this.$store.dispatch('removeOfficer', officer.dod_id)
      }
      else {
        this.$store.dispatch('addOfficer', officer.dod_id)
      }
      // officer.favorited = !officer.favorited
      // var off = this.data.filter(d=>{
      //   return d.dod_id == officer.dod_id
      // })[0]
      // off.favorited = officer.favorited
      // this.idDim.filter(officer.dod_id)
      // this.ndx.remove()
      // this.idDim.filterAll()
      // this.ndx.add([off])
      // dc.redrawAll()

      //Dispatch to Vuex
      // var favorited = this.data.filter(d=>{return d.favorited}).map(d=>{return d.dod_id})
      // this.$store.dispatch('updateFavoriteOfficers', favorited)
    },
    showOffMethod: function(event){
        //shows officer view and updates values in dialog (needed to make dialog dynamic)
      var id = event.currentTarget.id
      var officer = this.items.filter((d)=>{return d.dod_id == id})[0]
      this.dialogData=officer
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
        // var ndx =  crossfilter(this.data)
        var allGroup = this.ndx.groupAll()
        dc.dataCount(".dc-data-count")
          .dimension(this.ndx)
          .group(allGroup)

        function getHeightWidth(minHeight, aspectRatio){
          var documentWidth = document.documentElement.clientWidth;
          const smallScreenFactor = 0.96
          if (documentWidth > 960) {
            var width = Math.round(documentWidth*(6/12));
          }
          else {
            var width = Math.round(documentWidth*smallScreenFactor);
          }
          var height = width/aspectRatio;
          if (height < minHeight) {
              height = minHeight;
          }
          return [height, width]
        }

        function preRedraw(chart, id, aspectRatio, minHeight){
          var newWidth = document.getElementById(id).offsetWidth;
          var newHeight = newWidth/aspectRatio < minHeight ? minHeight : newWidth/aspectRatio;
          chart
         .width(newWidth)
         .height(newHeight)
         .root().select('svg').attr('width',newWidth).attr('height',newHeight)
        }

        //grade
        var gradeConfig = {}
        gradeConfig.id = 'grade'
        gradeConfig.dim = this.ndx.dimension(function(d){return d.general.grade})
        gradeConfig.group = gradeConfig.dim.group()
        gradeConfig.minHeight = 150
        gradeConfig.aspectRatio = 3
        gradeConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        gradeConfig.colors = d3.scale.category20()
        var gradeChart = dchelpers.getRowChart(gradeConfig)
        gradeChart
        .ordering(function(d){return d.key})

        //RTG
        var rtgConfig = {}
        rtgConfig.id = 'rtg'
        rtgConfig.dim = this.ndx.dimension(function(d){return d.duty.core_group})
        rtgConfig.group = rtgConfig.dim.group()
        rtgConfig.minHeight = 150
        rtgConfig.aspectRatio = 3
        rtgConfig.margins = {top: 10, left: 10, right: 20, bottom: 20}
        rtgConfig.colors = d3.scale.category20()
        var rtgChart = dchelpers.getRowChart(rtgConfig)

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

        
        //Flight Hours
        var flthrsMax = d3.max(this.data.map(d=>{return d.rated.flt_hrs_total})) + 100
        var flthrsConfig = {}
        flthrsConfig.id = 'flthrs'
        flthrsConfig.dim = this.ndx.dimension(function(d){return Math.round(d.rated.flt_hrs_total/100)*100})
        flthrsConfig.x = d3.scale.linear().domain([0, flthrsMax])
        flthrsConfig.xUnits = 50
        flthrsConfig.group = flthrsConfig.dim.group()
        flthrsConfig.minHeight = 150
        flthrsConfig.aspectRatio = 5
        flthrsConfig.margins = {top: 30, left: 40, right: 50, bottom: 40}
        flthrsConfig.colors = ["#1976d2"]
        var flthrsChart = dchelpers.getBrushBarChart(flthrsConfig)


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
            favorited: d.favorited
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
