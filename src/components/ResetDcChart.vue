<template>
    <span>
        <a href="#" @click.prevent="resetClicked($event)" class="reset" style="display: none">reset</a>
    </span>
</template>

<script>
export default{
  props:
    ['value']
  ,
  methods: {
    resetClicked: (event)=>{
      //Emulate javascript:someChart.filterAll();dc.redrawAll()
      var id = event.target.parentNode.parentNode.id

      dc.chartRegistry.list().filter(chart=>{
        return chart.anchorName() == id
      }).forEach(chart=>{
        chart.filterAll()
      })
      dc.redrawAll()

      console.log('reset clicked')
    },
  },
}
</script>

<style scoped>

</style>