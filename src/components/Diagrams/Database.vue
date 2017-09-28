<template>
  <v-layout row>
    <v-flex xs8>
      <h2>Database Diagram</h2>
      <div id="database" style="height: 500px; background-color: black"></div>
    </v-flex>
  </v-layout>
</template>
<script>
import vis from 'vis'
export default{
  mounted: function(){
  var opts = {
      manipulation: false,
      height: '90%',
      layout: {
        hierarchical: {
          enabled: false,
          levelSeparation: 300
        }
      },
      physics: {
        hierarchicalRepulsion: {
          nodeDistance: 300
        }
      }
    };

    var officerColumns=['OfficerID', 'Grade', 'CoreID']
    var billetColumns=['BilletID', 'Location', 'AFSC', 'Grade', 'PRD Remarks', 'Qualifications']
    var userColumns=['userID', 'Role', 'Password Hash', 'Salt', 'Login Count']
    var nodes = [
    {
      'id': 'officer', 
      'size': 150,
      'label': "Officer on VML\n\n"+officerColumns.join('\n'),
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
    },
    {
      'id': 'billets', 
      'size': 150,
      'label': "Billets\n\n"+billetColumns.join('\n'),
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'}
    },
    {
      'id': 'user', 
      'size': 150,
      'label': "User\n\n"+userColumns.join('\n'),
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'}
    },
    ]
    var edges = [
    {'from': "officer", 'to': "billets", 'arrows': 'to;from', 'physics': false, 'smooth': {'type': 'cubicBezier'}},
    {'from': "user", 'to': "billets", 'arrows': 'to;from', 'physics': false, 'smooth': {'type': 'cubicBezier'}},
    {'from': "user", 'to': "officer", 'arrows': 'to;from', 'physics': false, 'smooth': {'type': 'cubicBezier'}},
    ]


    var container = document.getElementById('database');
    var data = {'nodes': nodes, 'edges': edges}
    var gph = new vis.Network(container, data, opts);
  }
}
</script>