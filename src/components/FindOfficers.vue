<template>
  <v-container fluid>
  <v-layout row>
  <v-flex xs8 class="text-xs-left">
      <h4>Search Officers for AFPCID {{reqId}}</h4>
      <p>Use this page to find officers. Use the following charts to filter officers based on your criteria. Once done filtering, scroll to the bottom of the page to view the officers who meet your criteria. <a @click.prevent="jumpToSection('officers')" href='#'>Jump to officers</a></p>
  </v-flex>
  <v-flex xs4 class="dc-data-count text-xs-right">
  <br>
    <span class="filter-count"></span>
    selected out of
    <span class="total-count"></span>
    officers | 
    <v-btn small error round @click.prevent="resetAll">Reset All</v-btn>
    <v-btn small warning round @click.prevent="togglePanels">Toggle</v-btn>
  </v-flex>    
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12 md6 class="mt-3">
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
    <v-flex xs12 md6 class="mt-3">
        <v-expansion-panel expand>
            <v-expansion-panel-content :value="panelOpen.rtg" id="rtg">
                <div slot="header" style="font-size: 140%;">Rating</div>
                <v-card>
                  <v-card-media>
                      <div id="dc-rtg-rowchart">
                          <reset-btn @reset="resetChart($event)"></reset-btn>
                      </div>
                  </v-card-media>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-flex> 
  </v-layout>
  <v-layout row wrap class="mt-3">
    <v-flex xs12>
        <v-expansion-panel expand>
            <v-expansion-panel-content :value="panelOpen.yearGroup" id="year">
                <div slot="header" style="font-size: 140%;">Adjusted Year Group</div>
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
  <v-layout wrap>
    <v-flex xs12 md6 class="mt-3">
        <v-expansion-panel expand>
            <v-expansion-panel-content :value="panelOpen.rdtm" id="rdtm">
                <div slot="header" style="font-size: 140%;">RDTM</div>
                <v-card>
                  <v-card-media>
                      <div id="dc-rdtm-rowchart">
                          <reset-btn @reset="resetChart($event)"></reset-btn>
                      </div>
                  </v-card-media>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-flex>
    <v-flex xs12 md6 class="mt-3">
        <v-expansion-panel expand>
            <v-expansion-panel-content :value="panelOpen.fltHrs" id="fltHrs">
                <div slot="header" style="font-size: 140%;">Flight Hours</div>
                <v-card>
                  <v-card-media>
                      <div id="dc-fltHrs-barchart">
                          <reset-btn @reset="resetChart($event)"></reset-btn>
                      </div>
                  </v-card-media>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-flex>
  </v-layout>
  <v-layout row wrap class="mt-3" id="officers">
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
            <v-data-table v-model="selected"
                          :headers="headers" 
                          :items="items" 
                          :search="search"
                          selected-key="ID">
                <template slot="items" scope="props">
                    <!--TODO: edit for IE11 support (see vuetify docs)-->
                    <td class="text-xs-center">
                        <v-icon :warning="props.selected" 
                                @click="toggleFavorite(props)" 
                                style="cursor: pointer;">star</v-icon></td>
                    <td class="text-xs-left" style="width 10%">
                      <v-btn :id="props.item.ID" flat primary dark right small block @click="showOffMethod($event)" @click.native.stop="showOff = true" >{{props.item.ID}}</v-btn>
                    </td>
                    <td class="text-xs-left" style="width: 18%">{{props.item.grade}}</td>
                    <td class="text-xs-left" style="width: 18%">{{props.item.adjYG}}</td>
                    <td class="text-xs-left" style="width: 18%">{{props.item.RTG}}</td>
                    <td class="text-xs-left" style="width: 18%">{{props.item.rdtm}}</td>
                    <td class="text-xs-left" style="width: 18%">{{Math.round(props.item.flt_hrs_total)}}</td>
                </template> 
            </v-data-table>
        </v-card>
    </v-flex>
    <v-flex>
      <v-btn primary @click.native="nextClicked">Next</v-btn>
      <div>{{selected}}</div>
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
import ResetButton from './ResetButton'
import HideButton from './HideButton'
import statesJson from '../assets/data/us-states.json'
import Off from './Off'
import { store } from '@/store'
import { mapGetters } from 'vuex'

export default{
  data(){
    return {
      data: [],
      showOff: false,
      dialogData: {},
      panelOpen: {
         rdtm: true,
         rtg: true,
         yearGroup: true,
         fltHrs: true,
         grade: true
      },
      items: [],
      selected: [],
      search: '',
      clickedId: null,
      headers: [
        {
            text: 'Favorite', align: 'left', sortable: false  
        },
        {
            // value must be exact name of property for column!!!
            text: 'ID', value: 'ID', align: 'left'
        },
        {
            text: 'Grade', value: 'grade', align: 'left' 
        },
        {
            text: 'Year Group', value: 'adjYG', align: 'left'
        },
        {
            text: 'Rating', value: 'RTG', align: 'left'
        },
        {
            text: 'RDTM', value: 'rdtm', align: 'left'
        },
        {
            text: 'Total Hours', value: 'flt_hrs_total', align: 'left'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
        'faveOfficers',
        'curFaveOfficers',
        'reqId'
    ]),
  },
  components:{
    'reset-btn': ResetButton,
    'hide-btn': HideButton,
    'off-sheet': Off 
  },
  methods: {
    jumpToSection: function(id) {
        document.getElementById(id).scrollIntoView();
    },
    toggleFavorite: function(props) {
        if (!props.selected){
          this.$store.commit('ADD_OFFICER', props.item)
          props.selected = !props.selected
          this.selected = this.curFaveOfficers
        }
        else{
          this.$store.commit('REMOVE_OFFICER', props.item)
          props.selected = !props.selected
          this.selected = this.curFaveOfficers
        }
    },
    togglePanels: function(){
      for (var key in this.panelOpen) {
          this.panelOpen[key] = !this.panelOpen[key]
      }
    },
    showOffMethod: function(event){
        //shows officer view and updates values in dialog (needed to make dialog dynamic)
      var id = event.target.id
      var officer = this.items.filter((d)=>{return d.ID == id})[0]
      this.dialogData['id']=officer.ID
      this.dialogData['grade']=officer.grade
      this.dialogData['adjYG']=officer.adjYG
      this.dialogData['RTG']=officer.RTG
      this.dialogData['rdtm']=officer.rdtm
      this.dialogData['flt_hrs_total']=officer.flt_hrs_total
      this.showOff = true
      this.clickedId = id
    },
    nextClicked: function(){
      this.$router.push('/rank_officers')
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
    window.axios.get('/officer_view').then(response => {
      this.data = response.data.data
      renderCharts()
    }).catch(e => {
      console.error(e)
    })
    this.selected = (this.curFaveOfficers) ? this.curFaveOfficers : [] 
   
    // es6 arrow function 
    var renderCharts = () => {
        //Data count
        var ndx =  crossfilter(this.data)
        var allGroup = ndx.groupAll()
        dc.dataCount(".dc-data-count")
          .dimension(ndx)
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
        var gradeChart = dc.barChart("#dc-grade-barchart")
        var gradeDim = ndx.dimension(function(d){
            return d.grade;
        })
        var gradeGroup = gradeDim.group()
        var gradeMinHeight = 200 
        var gradeAspectRatio = 3
        var [gradeHeight, gradeWidth] = getHeightWidth(gradeMinHeight, gradeAspectRatio)

        gradeChart
        .minWidth(gradeWidth)
        .width(gradeWidth)
        .height(gradeHeight)
        .minHeight(gradeMinHeight)
        .margins({top: 30, left: 30, right: 40, bottom: 30})
        .dimension(gradeDim)
        .group(gradeGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .barPadding(0.1)
        .outerPadding(0)
        .colors(["#2277ff"])
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'grade', gradeAspectRatio, gradeMinHeight)
          //Use rescale for ordinal x-axis on redraw
          chart.rescale()
        })


        //Rating
        var rtgChart = dc.rowChart('#dc-rtg-rowchart')
        var rtgDim = ndx.dimension(function(d){return d.RTG;})
        var rtgGroup = rtgDim.group()
        var rtgMinHeight = 200 
        var rtgAspectRatio = 3
        var [rtgHeight, rtgWidth] = getHeightWidth(rtgMinHeight, rtgAspectRatio)

        rtgChart
        .minWidth(rtgWidth)
        .width(rtgWidth)
        .minHeight(rtgMinHeight)
        .height(rtgHeight)
        .margins({top: 30, left: 30, right: 50, bottom: 40})
        .dimension(rtgDim)
        .group(rtgGroup)
        .elasticX(true)
        .colors(d3.scale.category10())
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'rtg', rtgAspectRatio, rtgMinHeight)
        })

        // yeargroup
        var yearGroupChart = dc.barChart("#dc-yearGroup-barchart")
        var yearGroupDim = ndx.dimension(function(d){
            return d.adjYG    
        })
        var yearGroupGroup = yearGroupDim.group()
        var yearMinHeight = 330
        var yearAspectRatio = 3
        var [yearHeight, yearWidth] = getHeightWidth(yearMinHeight, yearAspectRatio)

        yearGroupChart
        .minWidth(yearWidth)
        .width(yearWidth)
        .minHeight(yearMinHeight)
        .height(yearHeight)
        .margins({top: 30, right: 50, left: 40, bottom: 50})
        .dimension(yearGroupDim)
        .group(yearGroupGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .elasticX(true)
        .colors(["orange"])
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'year', yearAspectRatio, yearMinHeight)
          //Use rescale for ordinal x-axis on redraw
          chart.rescale()
        })

        // RDTM
        var rdtmChart = dc.rowChart("#dc-rdtm-rowchart")
        var rdtmDim = ndx.dimension(function(d){return d.rdtm ? d.rdtm : 'NONE'})
        var rdtmGroup = rdtmDim.group()
        var rdtmMinHeight = 380
        var rdtmAspectRatio = 3
        var [rdtmHeight, rdtmWidth] = getHeightWidth(rdtmMinHeight, rdtmAspectRatio)

        rdtmChart
        .minWidth(rdtmWidth)
        .width(rdtmWidth)
        .minHeight(rdtmMinHeight)
        .height(rdtmHeight)
        .margins({top: 30, left: 30, right: 50, bottom: 40})
        .elasticX(true)
        .dimension(rdtmDim)
        .group(rdtmGroup)
        .colors(d3.scale.category10())
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'rdtm', rdtmAspectRatio, rdtmMinHeight)
        })
        
        //Total Flight hours
        var fltHrsChart = dc.barChart("#dc-fltHrs-barchart")
        var fltHrsDim = ndx.dimension(function(d){
            //round to nearest 500
            return Math.round(d.flt_hrs_total/100)*100;
        })
        var fltHrsGroup = fltHrsDim.group()
        var fltHrsMinHeight = 380 
        var fltHrsAspectRatio = 3
        var [fltHrsHeight, fltHrsWidth] = getHeightWidth(fltHrsMinHeight, fltHrsAspectRatio)

        fltHrsChart
        .minWidth(fltHrsWidth)
        .width(fltHrsWidth)
        .height(fltHrsHeight)
        .minHeight(fltHrsMinHeight)
        .margins({top: 30, left: 30, right: 40, bottom: 60})
        .dimension(fltHrsDim)
        .group(fltHrsGroup)
        .brushOn(true)
        .x(d3.scale.linear().domain([0, 4000]))
        .xUnits(function() {return 50})
        .outerPadding(0)
        .barPadding(0)
        .elasticY(true)
        .colors(["orange"])
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'fltHrs', fltHrsAspectRatio, fltHrsMinHeight)
        })

        // Create data for data table
        var vm = this
        var itemDim = ndx.dimension(function(d) {return d;})
        vm.items = itemDim.top(Infinity)
        // update rows in data table upon each chart being filtered 
        dc.chartRegistry.list().forEach(function(chart) {
            chart.on('filtered', function() {
              vm.items = itemDim.top(Infinity)
            })
        })

        var temp 
        window.onresize = function(event) {
            console.log('resize')
            clearTimeout(temp)
            temp = setTimeout(resizeDone,200)
        }
        function resizeDone() {
            // hacky way to prevent getElementById from firing when not on FindOfficers page
            if (vm.$route.name !== 'FindOfficers') {
                return
            }
            // call redraw to preRedraw event on charts, which resizes charts
            console.log('redrawn')
            dc.redrawAll();
        }

        dc.renderAll();
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
