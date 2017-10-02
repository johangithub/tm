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
    <!--<v-flex xs12 md4>-->
        <!--<v-expansion-panel expand>-->
            <!--<v-expansion-panel-content :value="panelOpen.afsc" id="afsc">-->
                <!--<div slot="header" style="font-size: 140%;">AFSC</div>-->
                <!--<v-card>-->
                  <!--<v-card-media>-->
                      <!--<div id="dc-afsc-rowchart">-->
                          <!--<reset-btn @reset="resetChart($event)"></reset-btn>-->
                      <!--</div>-->
                  <!--</v-card-media>-->
                <!--</v-card>-->
            <!--</v-expansion-panel-content>-->
        <!--</v-expansion-panel>-->
    <!--</v-flex>-->
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
            <v-data-table :headers="headers" 
                          :items="items" 
                          :search="search"
                          selected-key="items.ID">
                <template slot="items" scope="props">
                    <!--TODO: edit for IE11 support (see vuetify docs)-->
                    <td class="text-xs-center">
                        <!--can't find a way to dynamically change material icons colors, so use two-->
                        <!--icons with v-show for now-->
                        <v-icon v-show="favorited(props.item)" warning @click="toggleFavorite(props.item)" style="cursor: pointer;">star</v-icon>
                        <v-icon v-show="!favorited(props.item)" @click="toggleFavorite(props.item)" style="cursor: pointer;">star</v-icon>
                    </td>
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
          <!--<div>-->
            <!--ID: {{dialogData.id}} <br>-->
            <!--Grade: {{dialogData.grade}} <br>-->
            <!--Adjusted Year Group: {{dialogData.adjYG}} <br>-->
            <!--Rating: {{dialogData.RTG}} <br>-->
            <!--RDTM: {{dialogData.rdtm}} <br>-->
            <!--Total Flight Hours: {{Math.round(dialogData.flt_hrs_total)}} <br></div>-->
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
import axios from 'axios'
axios.defaults.baseURL = store.state.baseUrl
axios.defaults.headers.common['Authorization'] = localStorage.token

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
        'faveOfficers'
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
      favorited: function(obj) {
          //have to use some method to check if officer id exists in 
          //faveOfficers array (includes method doesn't work)
          return this.faveOfficers.some(function(d) {return d.ID === obj.ID})
      },
      toggleFavorite: function(obj) {
          if (this.favorited(obj)) {
            //have to use findIndex method to find index of officer, by officer id, to remove from 
            //faveOfficers array (indexOf method doesn't work)
            var index = this.faveOfficers.findIndex(function(d) {return d.ID === obj.ID})
            //keep payload an object to follow convention
            var payload = {'index': index}
            this.$store.dispatch('removeOfficer',payload)
          } 
          else {
            this.$store.dispatch('addOfficer',obj)
          }
      },
      togglePanels: function() {
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
    
  },
  beforeMount: function(){
    console.log('beforeMount')
  },
  mounted: function(){
    console.log('mounted')
    axios.get('/officer_view').then(response => {
      this.data = response.data.data
      renderCharts()
    }).catch(e => {
      console.error(e)
    })
   
    // es6 arrow function 
    var renderCharts = () => {
        //Data count
        var ndx =  crossfilter(this.data)
        var allGroup = ndx.groupAll()
        dc.dataCount(".dc-data-count")
          .dimension(ndx)
          .group(allGroup)

        var documentWidth = document.documentElement.clientWidth;
        var smallScreenFactor = 0.96

        //grade
        var gradeChart = dc.barChart("#dc-grade-barchart")
        var gradeDim = ndx.dimension(function(d){
            return d.grade;
        })
        var gradeGroup = gradeDim.group()
        var gradeMinHeight = 200 
        var gradeAspectRatio = 3
        if (documentWidth > 960) {
            var gradeWidth = Math.round(documentWidth*(6/12));
        }
        else {
            var gradeWidth = Math.round(documentWidth*smallScreenFactor);
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
        .margins({top: 30, left: 30, right: 40, bottom: 30})
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

        //Rating
        var rtgChart = dc.rowChart('#dc-rtg-rowchart')
        var rtgDim = ndx.dimension(function(d){return d.RTG;})
        var rtgGroup = rtgDim.group()
        var rtgMinHeight = 200 
        var rtgAspectRatio = 3
        if (documentWidth > 960) {
            var rtgWidth = Math.round(documentWidth*(6/12));
        }
        else {
            var rtgWidth = Math.round(documentWidth*smallScreenFactor);
        }
        var rtgHeight = rtgWidth/rtgAspectRatio;
        if (rtgHeight < rtgMinHeight) {
            rtgHeight = rtgMinHeight;
        }
    
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
        .on('preRedraw', function(chart) {
            var newWidth = document.getElementById('rtg').offsetWidth;
            var newHeight = newWidth/rtgAspectRatio;
            if (newHeight < rtgMinHeight) {
                newHeight = rtgMinHeight;
            }
           chart
           .minWidth(newWidth)
           .width(newWidth)
           .minHeight(rtgMinHeight)
           .height(newHeight)
           .root().select('svg').attr('width',newWidth).attr('height',newHeight)
        })

        // yeargroup
        var yearGroupChart = dc.barChart("#dc-yearGroup-barchart")
        var yearGroupDim = ndx.dimension(function(d){
            return d.adjYG    
        })
        var yearGroupGroup = yearGroupDim.group()
        var yearMinHeight = 330
        var yearAspectRatio = 3
        var yearWidth = Math.round(documentWidth*smallScreenFactor);
        var yearHeight = yearWidth/yearAspectRatio;
        if (yearHeight < yearMinHeight) {
            yearHeight = yearMinHeight;
        }

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

        // RDTM
        var rdtmChart = dc.rowChart("#dc-rdtm-rowchart")
        var rdtmDim = ndx.dimension(function(d){return d.rdtm ? d.rdtm : 'NONE'})
        var rdtmGroup = rdtmDim.group()
        var rdtmMinHeight = 380
        var rdtmAspectRatio = 3
        if (documentWidth > 960) {
            var rdtmWidth = Math.round(documentWidth*(6/12));
        }
        else {
            var rdtmWidth = Math.round(documentWidth*smallScreenFactor);
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
        .colors(d3.scale.category10())
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
        
        //Total Flight hours
        var fltHrsChart = dc.barChart("#dc-fltHrs-barchart")
        var fltHrsDim = ndx.dimension(function(d){
            //round to nearest 500
            return Math.round(d.flt_hrs_total/100)*100;
        })
        var fltHrsGroup = fltHrsDim.group()
        var fltHrsMinHeight = 380 
        var fltHrsAspectRatio = 3
        if (documentWidth > 960) {
            var fltHrsWidth = Math.round(documentWidth*(6/12));
        }
        else {
            var fltHrsWidth = Math.round(documentWidth*smallScreenFactor);
        }
        var fltHrsHeight = fltHrsWidth/fltHrsAspectRatio;
        if (fltHrsHeight < fltHrsMinHeight) {
            fltHrsHeight = fltHrsMinHeight;
        }

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
        .on('preRedraw', function(chart) {
            var newWidth = document.getElementById('fltHrs').offsetWidth;
            var newHeight = newWidth/fltHrsAspectRatio;
            if (newHeight < fltHrsMinHeight) {
                newHeight = fltHrsMinHeight;
            }
           chart
           .minWidth(newWidth)
           .width(newWidth)
           .minHeight(fltHrsMinHeight)
           .height(newHeight)
           .rescale()
           .root().select('svg').attr('width',newWidth).attr('height',newHeight)
        })

//        //AFSC
//        var afscChart = dc.rowChart('#dc-afsc-rowchart')
//        var afscDim = ndx.dimension(function(d){
//            var afscRegex = /\d\d\D/
//            var afscString = d.afsc_duty
//            var afscMatch = afscString.match(afscRegex)
//            if (afscMatch) {
//                return afscMatch[0] 
//            } else {
//                return "NONE"
//            }
//        })
//        var afscGroup = afscDim.group()
//        var afscMinHeight = 600 
//        var afscAspectRatio = 1
//        if (documentWidth > 960) {
//            var afscWidth = Math.round(documentWidth*(4/12));
//        }
//        else {
//            var afscWidth = documentWidth*0.90;
//        }
//        var afscHeight = afscWidth/afscAspectRatio;
//        if (afscHeight < afscMinHeight) {
//            afscHeight = afscMinHeight;
//        }
//
//        afscChart
//        .minWidth(afscWidth)
//        .width(afscWidth)
//        .minHeight(afscMinHeight)
//        .height(afscHeight)
//        .margins({top: 30, left: 30, right: 50, bottom: 40})
//        .dimension(afscDim)
//        .group(afscGroup)
//        .elasticX(true)
//        .colors(d3.scale.category10())
//        .on('preRedraw', function(chart) {
//            var newWidth = document.getElementById('afsc').offsetWidth;
//            var newHeight = newWidth/afscAspectRatio;
//            if (newHeight < afscMinHeight) {
//                newHeight = afscMinHeight;
//            }
//           chart
//           .minWidth(newWidth)
//           .width(newWidth)
//           .minHeight(afscMinHeight)
//           .height(newHeight)
//           .root().select('svg').attr('width',newWidth).attr('height',newHeight)
//        })

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
  beforeUpdate: function(){
    console.log('before update')
  },
  beforeDestroy: function(){
    console.log('before destroy')
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
