<template>
    <v-btn small error dark flat round absolute @click.prevent="resetClicked($event)" class="ml-3 reset" style="display: none">reset</v-btn>
</template>

<script>
export default{
  methods: {
    resetClicked: function(event){
      //Emulate javascript:someChart.filterAll();dc.redrawAll()
      var id = event.target.parentNode.id
      this.$emit('reset', id)
    },
  },
}
</script>

<style scoped>

</style>
