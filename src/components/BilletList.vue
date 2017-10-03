<template>
<v-container>
  <v-layout row v-if="myBillets.length!==0">
      <v-flex xs12>
        <v-layout row v-for="(billet,index) in myBillets" class="list-group-item" :key="billet.id">
            <v-flex xs10 md8 class="text-xs-center">
                <v-card class="pa-1">
                    <table style="width: 100%">
                        <tr>
                            <td style="width 10%">
                            <v-btn flat primary dark :id="billet.id" 
                            @click="showReqMethod($event)"
                            @click.native.stop="showReq = true"
                            >
                            {{billet.id}}</v-btn></td>
                            <td style="width:10%">{{billet.api}}</td>
                            <td style="width:10%">{{billet.grade}}</td>
                            <td style="width:10%">{{billet.aircraft}}</td>
                            <td style="width:35%">{{billet.unit}}</td>
                            <td style="width:10%">{{billet.state}}</td>
                            <td style="width:10%"><v-btn primary flat small :id="billet.id" @click="bidOfficers($event)">Bid Officers</v-btn></td>
                            <td style="width:10%"><v-btn primary flat small :id="billet.id" @click="viewBids($event)">View Bids</v-btn></td>
                        </tr>
                    </table>
                </v-card>
            </v-flex>
            <v-spacer></v-spacer>
        </v-layout>
      </v-flex>
  </v-layout>

<!--   <v-layout row>
      <v-flex offset-xs3 xs6 offset-md4 md4 class="mt-5 text-xs-center">
          <v-btn primary large block v-if="myBillets.length!==0" @click.prevent="submit">Submit</v-btn>  
      </v-flex>
  </v-layout> -->
    <v-dialog v-model="showReq" width="600px">
        <req-dialog-card v-if="showReq" :dialogData="dialogData" @reqClose="showReq = false"></req-dialog-card>
    </v-dialog>
</v-container>
</template>

<script>
import ReqDialogCard from '@/components/ReqDialogCard'
export default{
  components: {
    'req-dialog-card': ReqDialogCard
  },
  data(){
    return {
      myBillets: [],
      dialogData: {},
      isDragging: false,
      delayedDragging: false,
      showReq: false,
    }
  },
  methods: {
    showReqMethod: function(event){
      //shows req and updates (allows dialog to dynamically update values) 
      var id = event.currentTarget.id
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
      this.$router.push('/find_officers')
    },
    viewBids: function(event){
      var id = event.currentTarget.id
      console.log('View Bids for ',id)
    }
  },
  mounted: function(){
    //Retrieve only the billets I own
    window.axios.get('/billet_view').then(response => {
        this.myBillets = response.data.data
    }).catch(console.error)
  }
}
  
</script>