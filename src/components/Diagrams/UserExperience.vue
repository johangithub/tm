<template>
  <v-layout row>
    <v-flex xs8 >
      <h2>User Experience Diagram</h2>
      <div id="user-experience" style="height: 800px"></div>
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
          enabled: true,
          levelSeparation: 300,
          nodeSpacing: 200
        }
      },
      physics:{
        enabled: false
      }
    };

    var nodes = [
    {
      'id': 'login', 
      'size': 150,
      'label': "Login",
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
      'level': 1
    },
    {
      'id': 'login2', 
      'size': 150,
      'label': "Enter Email/Password",
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
      'level': 1.5
    },
    {
      'id': 'set_password', 
      'size': 150,
      'label': "Set new password",
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
      'level': 1.5
    },
    {
      'id': 'officer_view', 
      'size': 150,
      'label': "Officer View\n\nMy Profile\nFind Billets\nRank Billets",
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
      'level': 2
    },
    {
      'id': 'update_profile', 
      'size': 150,
      'label': "My Profile\n\nSelf-advertise",
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
      'level': 2.3
    },
    {
      'id': 'view_billets', 
      'size': 150,
      'label': "Find Billets\n\nSearch Billets\n Mark favorite",
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
      'level': 2.6
    },
    {
      'id': 'rank_billets', 
      'size': 150,
      'label': "Rank Billets",
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
      'level': 2.9
    },
    {
      'id': 'billet_owner_view', 
      'size': 150,
      'label': "Billet Owner View",
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
      'level': 2
    },
    {
      'id': 'update_billet', 
      'size': 150,
      'label': "My Billet\n\nAdvertise",
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
      'level': 2.3
    },
    {
      'id': 'view_officers', 
      'size': 150,
      'label': "Find Officers\n\nSearch Officers\n Mark favorite",
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
      'level': 2.6
    },
    {
      'id': 'rank_officers', 
      'size': 150,
      'label': "Rank Officers",
      'color': "#FFCFCF",
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'},
      'level': 2.9
    },

    ]
    var edges = [
      {'from': "login", 'to': "set_password", 'arrows': 'to', 'physics': false, 'label': 'First Time?'},
      {'from': "login", 'to': "login2", 'arrows': 'to', 'physics': false, 'label': 'Not First Time'},
      {'from': "login2", 'to': "officer_view", 'arrows': 'to', 'physics': false, 'label': 'Role=Officer'},
      {'from': "login2", 'to': "billet_owner_view", 'arrows': 'to', 'physics': false, 'label': ''},
      {'from': "set_password", 'to': "officer_view", 'arrows': 'to', 'physics': false, 'label': ''},
      {'from': "set_password", 'to': "billet_owner_view", 'arrows': 'to', 'physics': false, 'label': 'Role=Billet Owner'},
      {'from': "officer_view", 'to': "update_profile", 'arrows': 'to', 'physics': false, 'label': ''},
      {'from': "update_profile", 'to': "view_billets", 'arrows': 'to', 'physics': false, 'label': ''},
      {'from': "view_billets", 'to': "rank_billets", 'arrows': 'to', 'physics': false, 'label': ''},
      {'from': "billet_owner_view", 'to': "update_billet", 'arrows': 'to', 'physics': false, 'label': ''},
      {'from': "update_billet", 'to': "view_officers", 'arrows': 'to', 'physics': false, 'label': ''},
      {'from': "view_officers", 'to': "rank_officers", 'arrows': 'to', 'physics': false, 'label': ''},
      {'from': "rank_officers", 'to': "rank_officers", 'arrows': 'to', 'physics': false, 'label': 'Update'},
      {'from': "rank_billets", 'to': "rank_billets", 'arrows': 'to', 'physics': false, 'label': 'Update'},
    ]

    var container = document.getElementById('user-experience');
    var data = {'nodes': nodes, 'edges': edges}
    var gph = new vis.Network(container, data, opts);
  }
}
</script>