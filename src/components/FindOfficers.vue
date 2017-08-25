<template>
  <div class="find_officers">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'find_officers',
  data () {
    return {
      title: 'find_officers page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.find_officers{
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
