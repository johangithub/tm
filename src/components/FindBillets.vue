<template>
  <div class="find_billets">
    <h1>{{ title }}</h1>
    <button @click="increment">{{val}}</button>
  </div>
</template>

<script>
export default {
  name: 'find_billets',
  data () {
    return {
      title: 'find_billets page',
      val: 0
    }
  },
  methods: {
    increment() {
      this.val += 1
    }
  },
  beforeCreate: ()=>{
    console.log('beforeCreate')
  },
  created: ()=>{
    console.log('created')
  },
  beforeMount: ()=>{
    console.log('beforeMount')

  },
  mounted: ()=>{
    console.log('mounted')

  },
  beforeUpdate: ()=>{
    console.log('beforeUpdate')

  },
  updated: ()=>{
    console.log('updated')

  },
  beforeDestroy: ()=>{
    console.log('beforeDestroy')

  },
  destroyed: ()=>{
    console.log('destroyed')
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.find_billets{
  margin-top: 10px;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
