<template>
<v-container>
  FGO
  <v-data-table 
    v-model="selected"
    :headers="headers" 
    :items="FGO" 
    :search="search"
    selected-key="id"
    :rows-per-page-items="[10,25, {text: 'All', value: -1}]">
    <template slot="items" scope="props">
      <!--TODO: edit for IE11 support (see vuetify docs)-->
      <td class="text-xs-left">
        <v-btn flat primary dark right small block @click="showOffMethod(props.item)" @click.native.stop="showReq = true" >{{props.item.dod_id}}</v-btn>
      </td>
      <td>{{props.item.general.firstName}} {{props.item.general.lastName}}</td>
      <td>{{props.item.general.grade}}</td>
      <td>
        <v-icon v-if="isComplete(props.item.id)" class="blue--text text--darken-2">check_circle</v-icon>
        <v-icon v-else class="yellow--text text--darken-2">remove_circle</v-icon>
      </td>
      <td><v-btn primary flat small :id="props.item.id" @click="vectorOfficers($event)">Vector</v-btn></td>
  </template>
  </v-data-table>
  CGO
  <v-data-table 
    v-model="selected"
    :headers="headers" 
    :items="CGO" 
    :search="search"
    selected-key="id"
    :rows-per-page-items="[10,25, {text: 'All', value: -1}]">
    <template slot="items" scope="props">
      <!--TODO: edit for IE11 support (see vuetify docs)-->
      <td class="text-xs-left">
        <v-btn flat primary dark right small block @click="showOffMethod(props.item)" @click.native.stop="showReq = true" >{{props.item.dod_id}}</v-btn>
      </td>
      <td>{{props.item.general.firstName}} {{props.item.general.lastName}}</td>
      <td>{{props.item.general.grade}}</td>
      <td>
        <v-icon v-if="isComplete(props.item.id)" class="blue--text text--darken-2">check_circle</v-icon>
        <v-icon v-else class="yellow--text text--darken-2">remove_circle</v-icon>
      </td>
      <td><v-btn primary flat small :id="props.item.id" @click="vectorOfficers($event)">Vector</v-btn></td>
  </template>
  </v-data-table> 
  <v-dialog v-model="showOff" width="600px">
      <!-- <off-dialog-card v-if="showOff" :dialogData="dialogData" @offClose="showOff = false"></off-dialog-card> -->
  </v-dialog>
</v-container>
</template>

<script>
// import OffDialogCard from '@/components/OffDialogCard'
export default{
  props: ['myOfficers', 'vectoredOfficers'],
  components: {
    // 'off-dialog-card': OffDialogCard
  },
  data(){
    return {
      selected: [],
      headers: [
        {
            text: '', value: 'id', align: 'center', sortable: false
        },
        {
            text: 'Name', value: 'name', align: 'left'
        },
        {
            text: 'Grade', value: 'grade', align: 'left'
        },
        {
            text: 'Status', value: 'status', align: 'left', sortable: false
        },
      ],
      items: [],
      search: '',
      dialogData: {},
      isDragging: false,
      delayedDragging: false,
      showOff: false,
    }
  },
  methods: {
    showReqMethod: function(billet){
      //shows req and updates (allows dialog to dynamically update values) 
      var id = billet.id
      var billet = this.myBillets.filter((d)=>{return d.id == id})[0]
      this.dialogData = billet
      //save clicked id to prevent lots of req-sheets from being loaded in the DOM (sluggish behavior)
    },
    vectorOfficers: function(event){
      //when clicked, go to find officers view that is associated with this particular id,
      //persist favorites
      //and then serve up the rank officers view
      var id = event.currentTarget.id
      // this.$store.dispatch('bidOfficer',id)
      this.$emit('next')
    },
    isComplete: function(id){
      return this.vectoredOfficers.includes(id)
    }
  },
  computed: {
    FGO: function(){
      return this.myOfficers.filter(d=>{return d.general.grade>3})
    },
    CGO: function(){
      return this.myOfficers.filter(d=>{return d.general.grade<=3})
    },
  },
}
  
</script>