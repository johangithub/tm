<template>
  <div id="billet">
    <h1>{{ title }}</h1>
    <ul id="sortable">
      <li class="ui-state-default noselect" v-for="billet in billets">{{billet.base}}/{{billet.unit}}</li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/sortable';

export default {
  name: 'billet',
  data () {
    return {
      title: 'billet page',
      // Fake data
      billets: [
            {base: 'SHAW', unit: '55 FS', aircraft: 'F-16'},
            {base: 'SHAW', unit: '77 FS', aircraft: 'F-16'},
            {base: 'SHAW', unit: '79 FS', aircraft: 'F-16'},
            ]
    }
  },
  mounted: function(){
    $( function() {
        $( "#sortable" ).sortable({
          revert: 100,
          axis: "y"
        })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.billet{
  margin-top: 10px;
}
h1, h2 {
  font-weight: normal;
}

ul { list-style-type: none; margin: 0; padding: 0; margin-bottom: 10px; }
li { margin: 5px; padding: 5px; width: 150px; }

a {
  color: #42b983;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
