<template>
  
</template>
<script>
import ReqDialogCard from '@/components/ReqDialogCard'
export default{
  components:{
    'req-dialog-card': ReqDialogCard
  },
  methods: {
    showReqMethod: function(req){
        //shows req and updates values in dialog (needed to make dialog dynamic) 
      var id = req.id
      var billet = this.data.filter((d)=>{return d.id == id})[0]
      this.dialogData = billet
    },
  },
}
</script>