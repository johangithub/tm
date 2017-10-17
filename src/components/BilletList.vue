<template>
<v-container>
  <v-data-table 
    v-model="selected"
    :headers="headers" 
    :items="myBillets" 
    :search="search"
    selected-key="id">
    <template slot="items" scope="props">
      <!--TODO: edit for IE11 support (see vuetify docs)-->
      <td class="text-xs-left">
        <v-btn flat primary dark right small block @click="showReqMethod(props.item)" @click.native.stop="showReq = true" >View</v-btn>
      </td>
      <td>{{props.item.id}}</td>
      <td>{{props.item.actual_duty_title}}</td>
      <td>{{props.item.unit}}</td>
      <td>{{props.item.state}}</td>
      <td>
        <v-icon v-if="isComplete(props.item.id)" class="blue--text text--darken-2">check_circle</v-icon>
        <v-icon v-else class="yellow--text text--darken-2">remove_circle</v-icon>
      </td>
      <td><v-btn primary flat small :disabled="!isComplete(props.item.id)" :id="props.item.id" @click="$emit('gotoRank')">View Bids</v-btn></td>
      <td><v-btn primary flat small :id="props.item.id" @click="bidOfficers($event)">Begin</v-btn></td>
  </template>
  </v-data-table> 
  <v-dialog v-model="showReq" width="600px">
      <req-dialog-card v-if="showReq" :dialogData="dialogData" @reqClose="showReq = false"></req-dialog-card>
  </v-dialog>
</v-container>
</template>

<script>
import ReqDialogCard from '@/components/ReqDialogCard'
export default{
  props: ['myBillets', 'completedBillets'],
  components: {
    'req-dialog-card': ReqDialogCard
  },
  data(){
    return {
      selected: [],
      headers: [
        {
            text: '', align: 'center', sortable: false
        },
        {
            text: 'AFPC ID', value: 'id', align: 'left'
        },
        {
            text: 'Title', value: 'title', align: 'left'
        },
        {
            text: 'Unit', value: 'unit', align: 'left'
        },
        {
            text: 'State', value: 'state', align: 'left'
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
      showReq: false,
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
    bidOfficers: function(event){
      //when clicked, go to find officers view that is associated with this particular id,
      //persist favorites
      //and then serve up the rank officers view
      var id = event.currentTarget.id
      this.$store.dispatch('bidOfficer',id)
      this.$emit('next')
    },
    viewBids: function(event){
      console.log(event)

      var id = event.currentTarget.id
      console.log('View Bids for ', id)
    },
    isComplete: function(id){
      return this.completedBillets.includes(id.toString())
    }
  },
  mounted: function(){

  }
}
  
</script>
