<template>
  <v-container fluid id="squadrons">
  <v-layout row>
  <v-flex xs6 class="text-xs-left">
      <h2>Billets</h2>
  </v-flex>
  <v-flex xs6 class="dc-data-count text-xs-right">
  <br>
    <span class="filter-count"></span>
    selected out of
    <span class="total-count"></span>
    billets | 
    <v-btn small error round @click.prevent="resetAll">Reset All</v-btn>
  </v-flex>    
  </v-layout>
  <v-layout row wrap>
    <v-flex d-flex xs12 md7>
        <v-expansion-panel expand>
            <v-expansion-panel-content id="states">
                <div slot="header" style="font-size: 140%;">States</div>          
      <v-card>
        <v-card-media>
            <div id="dc-state-choropleth">
                <reset-btn @reset="resetChart($event)"></reset-btn>
            </div>
        </v-card-media>
      </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-flex>
    <v-flex d-flex xs12 md5>
        <v-expansion-panel expand>
            <v-expansion-panel-content id="conus">
                <div slot="header" style="font-size: 140%;">CONUS/OCONUS</div>
                <v-card>
                  <v-card-media>
                      <div id="dc-conus-rowchart">
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
                <v-expansion-panel-content id="api">
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
            <v-expansion-panel-content id="loc">
                <div slot="header" style="font-size: 140%;">Location</div>
                <v-card>
                  <v-card-media>
                      <div id="dc-location-barchart">
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
            <v-expansion-panel-content id="arcft">
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
            <v-expansion-panel-content id="grade">
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
            <v-expansion-panel-content id="afsc">
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
  <v-layout row wrap class="mt-3">
    <v-flex xs12 elevation-3 class="ma-1">
        <v-data-table :items="items">
            <template slot="items" scope="props">
                <td>{{props.item.api}}</td>
                <td>{{props.item.afsc}}</td>
                <td>{{props.item.grade}}</td>
                <td>{{props.item.aircraft}}</td>
                <td>{{props.item.unit}}</td>
                <td>{{props.item.state}}</td>
            </template> 
        </v-data-table>
        <!--<table class="table table-hover" id='dc-data-table'>-->
            <!--<thead>-->
                <!--<tr class='header'>-->
                    <!--<th>Favorite</th>-->
                    <!--<th>API</th>-->
                    <!--<th>Grade</th>-->
                    <!--<th>AFSC</th>-->
                    <!--<th>Aircraft</th>-->
                    <!--<th>Unit</th>-->
                    <!--<th>Location</th>-->
                    <!--<th>State</th>-->
                <!--</tr>-->
            <!--</thead>-->
        <!--</table>-->
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
      height: 0,
      items: [] 
    }
  },
  computed: {
    ndx: function(){
      return crossfilter(this.data)
    },
    allGroup: function(){
      return this.ndx.groupAll()
    }
 //   items: function() {
   //     return this.ndx.dimension(function(d) {return d;}).top(Infinity)
   // }
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

    //Data count
    dc.dataCount(".dc-data-count")
      .dimension(this.ndx)
      .group(this.allGroup)


    //State Map
    var stateChart = dc.geoChoroplethChart("#dc-state-choropleth")
    var states = this.ndx.dimension(function(d){return d.state})
    var statesGroup = states.group()
    // get document width, and if on md or larger screen, manually
    // reduce size of first state map so fits in 7 columns
    var documentWidth = document.documentElement.clientWidth;
    if (documentWidth > 960) {
        var statesWidth = Math.round(documentWidth*(7/12)*1.2);
    }
    else {
        var statesWidth = documentWidth;
    }
    var statesHeight = statesWidth/1.8;
    var xOffset = statesWidth/2.5;
    var yOffset = statesHeight/1.9;

        console.log(statesWidth)
        console.log(statesHeight)
        console.log('document width: ' + document.documentElement.clientWidth)
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


    //CONUS
    var conusChart = dc.rowChart("#dc-conus-rowchart")
    var conusDim = this.ndx.dimension(function(d){return d.conus})
    var conusGroup = conusDim.group()
    if (documentWidth > 960) {
        var conusWidth = Math.round(documentWidth*(5/12));
    }
    else {
        var conusWidth = documentWidth*0.90;
    }
    var conusHeight = conusWidth/7;
    if (conusHeight < 130) {
        conusHeight = 130;
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

    //Location
    var locationChart = dc.barChart("#dc-location-barchart")
    var locationDim = this.ndx.dimension(function(d){return d.location;})
    var locationGroup = locationDim.group()
    var locWidth = documentWidth;
    var locHeight = locWidth/4;
    if (locHeight < 300) {
        locHeight = 300;
    }

    locationChart
    .minWidth(locWidth)
    .width(locWidth)
    .minHeight(300)
    .height(locHeight)
    .margins({top: 30, right: 50, left: 40, bottom: 100})
    .dimension(locationDim)
    .group(locationGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .elasticX(true)
    .colors(["orange"])

    //API code
    var apiChart = dc.rowChart('#dc-api-rowchart')
    var apiDim = this.ndx.dimension(function(d){return d.api;})
    var apiGroup = apiDim.group()
    if (documentWidth > 960) {
        var apiWidth = Math.round(documentWidth*(5/12));
    }
    else {
        var apiWidth = documentWidth*0.90;
    }
    var apiHeight = apiWidth/3;
    if (apiHeight < 250) {
        apiHeight = 250;
    }

    apiChart
    .minWidth(apiWidth)
    .width(apiWidth)
    .minHeight(250)
    .height(apiHeight)
    .margins({top: 30, left: 30, right: 50, bottom: 40})
    .dimension(apiDim)
    .group(apiGroup)
    .elasticX(true)
    .colors(d3.scale.category10())
    
    //Aircraft
    var aircraftChart = dc.barChart("#dc-aircraft-barchart")
    var aircraftDim = this.ndx.dimension(function(d){return d.aircraft;})
    var aircraftGroup = aircraftDim.group()
    if (documentWidth > 960) {
        var arcftWidth = Math.round(documentWidth*(4/12));
    }
    else {
        var arcftWidth = Math.round(documentWidth/2);
    }
    var arcftHeight = arcftWidth/3;
    if (arcftHeight < 200) {
        arcftHeight = 200;
    }

    aircraftChart
    .minWidth(arcftWidth)
    .width(arcftWidth)
    .height(arcftHeight)
    .minHeight(200)
    .margins({top: 30, left: 30, right: 40, bottom: 60})
    .dimension(aircraftDim)
    .group(aircraftGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .colors(["orange"])

    //grade
    var gradeChart = dc.barChart("#dc-grade-barchart")
    var gradeDim = this.ndx.dimension(function(d){return d.grade;})
    var gradeGroup = gradeDim.group()
    if (documentWidth > 960) {
        var gradeWidth = Math.round(documentWidth*(4/12));
    }
    else {
        var gradeWidth = Math.round(documentWidth/2);
    }
    var gradeHeight = gradeWidth/3;
    if (gradeHeight < 200) {
        gradeHeight = 200;
    }

    gradeChart
    .minWidth(gradeWidth)
    .width(gradeWidth)
    .height(gradeHeight)
    .minHeight(250)
    .margins({top: 30, left: 30, right: 40, bottom: 60})
    .dimension(gradeDim)
    .group(gradeGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .barPadding(0.1)
    .outerPadding(0)
    .colors(["#2277ff"])

    //AFSC
    var afscChart = dc.rowChart('#dc-afsc-rowchart')
    var afscDim = this.ndx.dimension(function(d){
        if (d.afsc.substr(0,3)=='11F'){
            return d.afsc.substr(0,3)
        }
        else {
            return 'OTHER'
        }
    }
        )
    var afscGroup = afscDim.group()
    if (documentWidth > 960) {
        var afscWidth = Math.round(documentWidth*(4/12));
    }
    else {
        var afscWidth = documentWidth*0.90;
    }
    var afscHeight = afscWidth/4;
    if (afscHeight < 200) {
        afscHeight = 200;
    }

    afscChart
    .minWidth(afscWidth)
    .width(afscWidth)
    .minHeight(200)
    .height(afscHeight)
    .margins({top: 30, left: 30, right: 50, bottom: 40})
    .dimension(afscDim)
    .group(afscGroup)
    .elasticX(true)
    .colors(d3.scale.category10())

//    //Data Table
//    var dataTable = dc.dataTable('#dc-data-table')
//    var tableDimension = this.ndx.dimension( function (d) {
//        return d;
//    } )
//    dataTable
//    .group(function(d) { return 'Billets'})
//    .showGroups(false)
//    .dimension(tableDimension)
//    .columns([
//        function(d) {return d.api; },
//        function(d) {return d.grade;},
//        function(d) {return d.afsc;},
//        function(d) {return d.aircraft},
//        function(d) {return d.unit},
//        function(d) {return d.location},
//        function(d) {return d.state}
//    ])
//    .sortBy(function(d) { return d.unit })
//    .order(d3.ascending)

    function onresize (){
      dc.chartRegistry.list().forEach(chart => {
        let _bbox = chart.root().node().parentNode.getBoundingClientRect();
        chart.width(_bbox.width).render();
      });
    }

    window.onresize = function(event) {
        // values for width, height, and offsets are for formatting -
        // numbers are fairly arbitrary
        var statesWidth = document.getElementById('states').offsetWidth*1.2;
        var statesHeight = statesWidth/1.8;
        var xOffset = statesWidth/2.5;
        var yOffset = statesHeight/1.9;
        stateChart
        .dimension(states)
            .group(statesGroup)
            .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
            .colorDomain([0, 100])
            .minWidth(statesWidth)
            .width(statesWidth)
            .height(statesHeight)
            .transitionDuration(0)
            .projection(d3.geo.albersUsa().scale(statesWidth).translate([xOffset,yOffset]))
            .overlayGeoJson(statesJson.features, "state", function (d) {
            return d.properties.name;})

        // conus chart
        var conusWidth = document.getElementById('conus').offsetWidth;
        var conusHeight = conusWidth/7;
        if (conusHeight < 130) {
            conusHeight = 130;
        }
        conusChart
          .minWidth(conusWidth)
          .width(conusWidth)
          .height(conusHeight)
          .minHeight(130)
          .elasticX(true)
          .dimension(conusDim)
          .group(conusGroup)

        // location chart
        var locWidth = document.getElementById('loc').offsetWidth;
        var locHeight = locWidth/4;
        if (locHeight < 300) {
            locHeight = 300;
        }

        locationChart
        .minWidth(locWidth)
        .width(locWidth)
        .minHeight(300)
        .height(locHeight)
        .dimension(locationDim)
        .group(locationGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colors(["orange"])
        
        // api chart
        var apiWidth = document.getElementById('api').offsetWidth;
        var apiHeight = apiWidth/3;
        if (apiHeight < 250) {
            apiHeight = 250;
        }
        apiChart
        .minWidth(apiWidth)
        .width(apiWidth)
        .minHeight(250)
        .height(apiHeight)
        .dimension(apiDim)
        .group(apiGroup)
        .elasticX(true)
        .colors(d3.scale.category10())
        
        //aircraft bar chart
        var arcftWidth = document.getElementById('arcft').offsetWidth;
        var arcftHeight = arcftWidth/3;
        if (arcftHeight < 200) {
            arcftHeight = 200;
        }
        aircraftChart
        .minWidth(arcftWidth)
        .width(arcftWidth)
        .height(arcftHeight)
        .minHeight(200)
        .dimension(aircraftDim)
        .group(aircraftGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colors(["orange"])

        //grade bar chart
        var gradeWidth = document.getElementById('grade').offsetWidth;
        var gradeHeight = gradeWidth/3;
        if (gradeHeight < 200) {
            gradeHeight = 200;
        }
        gradeChart
        .minWidth(gradeWidth)
        .width(gradeWidth)
        .height(gradeHeight)
        .minHeight(250)
        .margins({top: 30, left: 30, right: 40, bottom: 60})
        .dimension(gradeDim)
        .group(gradeGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .barPadding(0.1)
        .outerPadding(0)
        .colors(["#2277ff"])
        
        //afsc row chart
        var afscWidth = document.getElementById('afsc').offsetWidth;
        var afscHeight = afscWidth/4;
        if (afscHeight < 200) {
            afscHeight = 200;
        }
        afscChart
        .minWidth(afscWidth)
        .width(afscWidth)
        .minHeight(200)
        .height(afscHeight)
        .margins({top: 30, left: 30, right: 50, bottom: 40})
        .dimension(afscDim)
        .group(afscGroup)
        .elasticX(true)
        .colors(d3.scale.category10())

        dc.redrawAll();
    }

    this.items = this.ndx.dimension(function(d){return d; }).top(Infinity)
    console.log(this.items)
    onresize()

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
.favorite {
    color: red;
}
</style> 
