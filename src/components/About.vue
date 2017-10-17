<template>
<v-layout row justify-center>
    <v-dialog :value="value" @input="$emit('input',$event.value)" width="600px">
      <v-card>
        <v-card-title class="headline">About<v-spacer></v-spacer><v-btn fab primary small flat @click.native.stop="close"><v-icon dark >clear</v-icon></v-btn></v-card-title>
        <v-card-text>The backbone of this assignment system is to test a talent matching algorithm that maximizes satisfaction between both officers and the billet owners themselves. This algorithm has been used successfully for nearly 50 years by the National Residency Matching Program, the process by which graduating medical students are awarded their initial placement in hospitals.</v-card-text>
        <v-card-text>To allow the algorithm to function at its maximum potential, it requires cooperation from both parties.  Officers need to create a 1-to-n list of assignments that they want, and billet owners need to create a 1-to-n list of officers that they want.  The proposed algorithm would then require further modifications by the AFPC Assignment Team as necessary to incorporate additional constraints such as unit manning requirements.</v-card-text>
        <v-card-text>To aid in the creation of preferential assignment lists, this test also incorporates an improved way to "shop" for assignments compared to the current AMS system.  The Find a Billet link allows officers to filter and view details about the assignments that are available. As you will notice, the information listed for each assignment is more than what is typically shown for assignments during your past VML cycles. This information is collected from the billet owners themselves using the Manage Billets link. As such if you are a billet owner, please provide as much detail about the assignment as possible, since this will allow officers to focus on assignments that are most suitable for their careers, and ultimately the Air Force.
        </v-card-text>
        <v-card-title class="headline">Contact us</v-card-title>
        <v-card-text>
          <p>
          Lt Col Crackin' Nuckles (HAF/A1)<br>
          crackin.nuckles@mail.mil<br>
          (123)456-7890
          </p>
          <p>
          Maj Snuff Anthony (AFPC/A-10/F-22/F-35 Assignments)<br>
          snuff.anthony@mail.mil<br>
          (123)456-7890
          </p>
          <p>
          Maj Dutch Cude (AFPC/Chief F-16 Assignments)<br>
          craig.cude@mail.mil<br>
          (123)456-7890
          </p>
          <p>
          Maj DATS Jansta (AFPC/F-15 Assignments)<br>
          dats.jansta@mail.mil<br>
          (123)456-7890
          </p>
        </v-card-text>
        <v-card-title class="headline">Want to contribute?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat="flat" @click.native="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default{
  data(){
    return {
      test: false,
      dialog: this.value
    }
  },
  props: ['value'],
  //watcher is important to make sure dialog opens again after
  //user clicks away from box. v-dialog emits an event that is not
  //passed up to parent if event 'input' is only emitted in close 
  //method
  methods: {
    close() {
        this.dialog = false 
        this.$emit('input',this.dialog)
    }
  }
}
</script>
