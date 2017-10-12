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
        <v-btn flat primary dark right small block @click="showReqMethod(props.item)" @click.native.stop="showReq = true" >{{props.item.id}}</v-btn>
      </td>
      <td>{{props.item.actual_duty_title}}</td>
      <td>{{props.item.unit}}</td>
      <td>{{props.item.state}}</td>
      <td>
        <v-icon v-if="isComplete(props.item.id)" class="green--text text--darken-2">thumb_up</v-icon>
        <v-icon v-else class="red--text text--darken-2">thumb_down</v-icon>
      </td>
      <td><v-btn primary flat small :id="props.item.id" @click="viewBids($event)">View Bids</v-btn></td>
      <td><v-btn primary flat small :id="props.item.id" @click="bidOfficers($event)">Bid Officers</v-btn></td>
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
            text: '', value: 'id', align: 'center', sortable: false
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
      console.log('View Bids for ',id)
    },
    isComplete: function(id){
      return this.completedBillets.some(d=>{return d==id}) ? true : false
    }
  },
  mounted: function(){

  }
}
  
</script>