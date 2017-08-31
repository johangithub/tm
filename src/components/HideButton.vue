<template>
  <span>
  {{this.name}}
    <v-btn small primary flat round dark @click.prevent="clicked">{{this.value ? 'hide' : 'show'}}</v-btn>
  </span>
    
</template>
<script>
export default{
  props:[
  'name',
  'value'
  ],
  methods:{
    clicked: function(){
      this.$emit('toggleShow')
    }
  },
}
</script>