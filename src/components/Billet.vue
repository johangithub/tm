<template>
<v-container id="billet">
<div>{{id}}</div>
<div>{{myBillet}}</div>
</v-container>
</template>

<script>
export default{
  props: ['myBillet', 'id']
}
</script>

<style>
  
</style>