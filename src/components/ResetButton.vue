<template>
  <v-btn small primary flat round dark @click.prevent="resetClicked($event)" class="reset" style="display: none">reset</v-btn>
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