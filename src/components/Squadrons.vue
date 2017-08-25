<template>
  <v-container id="squadrons">
  <v-layout row wrap>
    <div id="dc-category-barchart"></div>
    <div id="dc-score-barchart"></div>
    <div id="dc-api-rowchart"></div>
  </v-layout>
  <!--
    <v-layout row wrap>
      <v-data-table
          v-bind:headers="headers"
          :items="data"
          class="elevation-1"
        >
        <template slot="headerCell" scope="props">
          <span v-tooltip:bottom="{ 'html': props.header.text }">
            {{ props.header.text }}
          </span>
        </template>
        <template slot="items" scope="props">
          <<td>{{ props.item.unit }}</td>
          <td class="text-xs-right">{{ props.item.location }}</td>
          <td class="text-xs-right">{{ props.item.api }}</td>
        </template>
      </v-data-table>
    </v-layout>
    -->
  </v-container>
</template>
<script>
export default{
  data(){
    return {
      data: [],
      headers:[
      {
        text: 'Unit',
        value: 'unit'
      },
      { 
        text: 'Location',
        value: 'location',
      },
      { 
        text: 'API Code', 
        value: 'api',
      },
      ],
    }
  },
  mounted: function(){
    var data = require('@/assets/data/fighter_billets.csv')
    this.data = data
  },
  computed: {
    ndx: function(){
      return crossfilter(this.data)
    },
    all: function(){
      return this.ndx.groupAll()
    },
    scoreChart: function(){
      return dc.barChart("#dc-score-barchart")
    },
    bookDimension: function(){
      return this.ndx.dimension(function(d){return d.aircraft;})
    },
    bookGroup: function(){
      return this.bookDimension.group()
    },
    categoryChart: function(){
      return dc.barChart("#dc-category-barchart")
    },
    categoryDimension: function(){
      return this.ndx.dimension(function(d){return d.location;})
    },
    categoryGroup: function(){
      return this.categoryDimension.group()
    },
    apiChart: function(){
      return dc.rowChart("#dc-api-rowchart")
    },
    apiDimension: function(){
      return this.ndx.dimension(function(d){return d.api;})
    },
    apiGroup: function(){
      return this.apiDimension.group()
    }
  },
  beforeUpdate: function(){
    var cc = this.categoryChart
    cc
    .width(1300)
    .height(320)
    .margins({top: 10, left: 30, right: 10, bottom: 100})
    .dimension(this.categoryDimension)
    .group(this.categoryGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .colors(["orange"])

    var sc = this.scoreChart
    sc
    .width(300)
    .height(320)
    .margins({top: 10, left: 30, right: 10, bottom: 100})
    .dimension(this.bookDimension)
    .group(this.bookGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .colors(["orange"])
    
    var ac = this.apiChart
    ac
    .width(320)
    .height(320)
    .dimension(this.apiDimension)
    .group(this.apiGroup)
    .elasticX(true)
    .colors(d3.scale.category20())
    dc.renderAll()
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