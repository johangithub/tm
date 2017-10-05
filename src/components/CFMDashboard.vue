<template>
  <v-container fluid>
  <v-layout row>
  <v-flex xs8 class="text-xs-left">
      <h4>CFM Dashboard</h4>
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
  <v-layout row wrap>
    <v-flex xs6 md2 class="mt-3" id="grade">
      <v-card>
      <v-card-title class="pb-0"><span>Grade</span></v-card-title>
        <v-card-media>
            <div id="dc-grade-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs6 md2 class="mt-3" id="rtg">
      <v-card>
      <v-card-title class="pb-0"><span>Rating</span></v-card-title>
        <v-card-media>
            <div id="dc-rtg-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs12 md3 class="mt-3" id="wic">
      <v-card>
      <v-card-title class="pb-0"><span>WIC</span></v-card-title>
        <v-card-media>
            <div id="dc-WIC-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>

  </v-layout>
  <v-layout row wrap>
    <v-flex xs12 md3 class="mt-3" id="rdtm">
      <v-card>
      <v-card-title class="pb-0"><span>RDTM</span></v-card-title>
        <v-card-media>
            <div id="dc-rdtm-rowchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12 md6 class="mt-3" id="year">
      <v-card>
      <v-card-title class="pb-0"><span>Adjusted Year Group</span></v-card-title>
        <v-card-media>
            <div id="dc-yearGroup-barchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 class="mt-3" id="fltHrs">
      <v-card>
      <v-card-title class="pb-0"><span>Flight Hours</span></v-card-title>
        <v-card-media>
          <div id="dc-fltHrs-barchart"></div>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-spacer></v-spacer>
  <v-flex xs12 md3 class="mt-3" id="vml">
    <v-card>
    <v-card-title class="pb-0"><span>VML</span></v-card-title>
      <v-card-media>
          <div id="dc-VML-rowchart"></div>
      </v-card-media>
    </v-card>
  </v-flex>
</v-layout>
  <v-layout row wrap class="mt-3" id="officers">
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
                    <!--TODO: edit for IE11 support (see vuetify docs)-->
                    <td class="text-xs-center">
                      <v-btn :id="props.item.dod_id" flat primary dark right small block @click="showOffMethod($event)" @click.native.stop="showOff = true" >{{props.item.dod_id}}</v-btn>
                    </td>
                    <td class="text-xs-left">{{props.item.name}}</td>
                    <td class="text-xs-left">{{props.item.grade}}</td>
                    <td class="text-xs-left">{{props.item.adjYG}}</td>
                    <td class="text-xs-left">{{props.item.rating}}</td>
                    <td class="text-xs-left">{{props.item.rdtm}}</td>
                    <td class="text-xs-left">{{Math.round(props.item.flt_hrs_total)}}</td>
                    <td class="text-xs-center">
                        <v-switch 
                                @click="toggleVML(props.item)"
                                :input-value="props.item.vml"></v-switch></td>
                </template> 
            </v-data-table>
        </v-card>
    </v-flex>
    <v-flex>
      <v-btn primary @click.native="submit">Submit</v-btn>
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
import Off from './Off'

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
        },
        {
            text: 'VML', align: 'left', sortable: false  
        },
      ]
    }
  },
  components:{
    'off-sheet': Off 
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
    submit: function(){
      console.log('submit pressed')
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
      window.officer = this.data[0]
      renderCharts()
    }).catch(e => {
      console.error(e)
    })
    this.selected = (this.curFaveOfficers) ? this.curFaveOfficers : [] 
    
    // es6 arrow function 
    var renderCharts = () => {

        function getChartConfig(minHeight, aspectRatio, layout_length){
          var documentWidth = document.documentElement.clientWidth;
          const smallScreenFactor = 0.96
          if (documentWidth > 960) {
            var width = Math.round(documentWidth*(layout_length/12));
          }
          else {
            var width = Math.round(documentWidth*smallScreenFactor);
          }
          var height = width/aspectRatio;
          if (height < minHeight) {
              height = minHeight;
          }
          return {height: height, width: width, minHeight: minHeight, aspectRatio: aspectRatio}
        }

        function preRedraw(chart, id, aspectRatio){
          var minHeight = chart.minHeight()
          var newWidth = document.getElementById(id).offsetWidth;
          var newHeight = newWidth/aspectRatio < minHeight ? minHeight : newWidth/aspectRatio;
          chart
         .width(newWidth)
         .height(newHeight)
         .root().select('svg').attr('width',newWidth).attr('height',newHeight)
        }

        //Data count
        // var ndx =  crossfilter(this.data)
        var allGroup = this.ndx.groupAll()
        dc.dataCount(".dc-data-count")
          .dimension(this.ndx)
          .group(allGroup)

        //grade
        var gradeChart = dc.rowChart("#dc-grade-rowchart")
        var gradeDim = this.ndx.dimension(function(d){
            return d.general.grade;
        })
        var gradeGroup = gradeDim.group()
        var gradeChartConfig = getChartConfig(150, 3, 2)

        gradeChart
        .minWidth(gradeChartConfig.width)
        .width(gradeChartConfig.width)
        .height(gradeChartConfig.height)
        .minHeight(gradeChartConfig.minHeight)
        .margins({top: 10, left: 10, right: 20, bottom: 20})
        .dimension(gradeDim)
        .group(gradeGroup)
        .elasticX(true)
        .colors(d3.scale.category10())
        .ordering(function(d){return d.key})
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'grade', gradeChartConfig.aspectRatio)
        })

        //Rating
        var rtgChart = dc.rowChart('#dc-rtg-rowchart')
        var rtgDim = this.ndx.dimension(function(d){return d.duty.core_group;})
        var rtgGroup = rtgDim.group()
        var rtgChartConfig = getChartConfig(150, 3, 2)

        rtgChart
        .minWidth(rtgChartConfig.width)
        .width(rtgChartConfig.width)
        .minHeight(rtgChartConfig.minHeight)
        .height(rtgChartConfig.height)
        .margins({top: 10, left: 10, right: 20, bottom: 20})
        .dimension(rtgDim)
        .group(rtgGroup)
        .elasticX(true)
        .colors(d3.scale.category10())
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'rtg', rtgChartConfig.aspectRatio)
        })

        //WIC
        var wicChart = dc.rowChart('#dc-WIC-rowchart')
        var wicDim = this.ndx.dimension(function(d){return d.special_experience.WIC || 'NONE';})
        var wicGroup = wicDim.group()
        var wicChartConfig = getChartConfig(150, 3, 3)

        wicChart
        .minWidth(wicChartConfig.width)
        .width(wicChartConfig.width)
        .minHeight(wicChartConfig.minHeight)
        .height(wicChartConfig.height)
        .margins({top: 10, left: 10, right: 20, bottom: 20})
        .dimension(wicDim)
        .group(wicGroup)
        .elasticX(true)
        .colors(d3.scale.category10())
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'wic', wicChartConfig.aspectRatio)
        })

        //VML
        var vmlChart = dc.rowChart('#dc-VML-rowchart')
        // var vmlDim = this.ndx.dimension(function(d){ return d.vml })
        var vmlGroup = this.vmlDim.group()
        var vmlChartConfig = getChartConfig(150, 3, 3)
        vmlChart
        .minWidth(vmlChartConfig.width)
        .width(vmlChartConfig.width)
        .minHeight(vmlChartConfig.minHeight)
        .height(vmlChartConfig.height)
        .margins({top: 10, left: 10, right: 20, bottom: 20})
        .dimension(this.vmlDim)
        .group(vmlGroup)
        .elasticX(true)
        .ordering(function(d){return -d.key})
        .colors(d3.scale.category10())
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'vml', vmlChartConfig.aspectRatio)
        })


        // RDTM
        var rdtmChart = dc.rowChart("#dc-rdtm-rowchart")
        var rdtmDim = this.ndx.dimension(function(d){return d.rated.rdtm ? d.rated.rdtm : 'NONE'})
        var rdtmGroup = rdtmDim.group()
        var rdtmChartConfig = getChartConfig(150, 3, 3)

        rdtmChart
        .minWidth(rdtmChartConfig.width)
        .width(rdtmChartConfig.width)
        .minHeight(rdtmChartConfig.minHeight)
        .height(rdtmChartConfig.height)
        .margins({top: 10, left: 10, right: 20, bottom: 20})
        .elasticX(true)
        .dimension(rdtmDim)
        .group(rdtmGroup)
        .colors(d3.scale.category10())
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'rdtm', rdtmChartConfig.aspectRatio)
        })

        // yeargroup
        var yearGroupChart = dc.barChart("#dc-yearGroup-barchart")
        var yearGroupDim = this.ndx.dimension(function(d){
            return d.general.adjYG    
        })
        var yearGroupGroup = yearGroupDim.group()
        var yearChartConfig = getChartConfig(200, 5, 6)

        yearGroupChart
        .minWidth(yearChartConfig.width)
        .width(yearChartConfig.width)
        .minHeight(yearChartConfig.minHeight)
        .height(yearChartConfig.height)
        .margins({top: 30, right: 50, left: 40, bottom: 50})
        .dimension(yearGroupDim)
        .group(yearGroupGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colors(["#1976d2"])
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'year', yearChartConfig.aspectRatio)
          //Use rescale for ordinal x-axis on redraw
          chart.rescale()
        })

        
        
        //Total Flight hours
        var fltHrsMax = 4000
        var fltHrsChart = dc.barChart("#dc-fltHrs-barchart")
        var fltHrsDim = this.ndx.dimension(function(d){
            //round to nearest 500
            return Math.min(fltHrsMax- 100, Math.round(d.rated.flt_hrs_total/100)*100);
        })
        var fltHrsGroup = fltHrsDim.group()
        var fltHrsChartConfig = getChartConfig(200, 5, 6)

        fltHrsChart
        .minWidth(fltHrsChartConfig.width)
        .width(fltHrsChartConfig.width)
        .height(fltHrsChartConfig.height)
        .minHeight(fltHrsChartConfig.minHeight)
        .margins({top: 30, left: 30, right: 40, bottom: 60})
        .dimension(fltHrsDim)
        .group(fltHrsGroup)
        .brushOn(true)
        .x(d3.scale.linear().domain([0, fltHrsMax]))
        .xUnits(function() {return 50})
        .outerPadding(0)
        .barPadding(0)
        .elasticY(true)
        .colors(["#1976d2"])
        .on('preRedraw', (chart)=>{
          preRedraw(chart, 'fltHrs', fltHrsChartConfig.aspectRatio)
        })

        function tableData(d){
          var obj = {
            dod_id: d.dod_id,
            name: d.general.firstName + ' ' + d.general.lastName,
            grade: d.general.grade,
            adjYG: d.general.adjYG,
            rating: d.duty.core_group,
            rdtm: d.rated.rdtm,
            flt_hrs_total: d.rated.flt_hrs_total,
            vml: d.vml
          }
          return obj
        }

        // Create data for data table
        var vm = this
        var itemDim = this.ndx.dimension(function(d) {return d;})
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
