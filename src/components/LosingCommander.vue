<template>
  <v-container id="losing-commander">
  <h4>Welcome Col Thorson, Commander of 99 OG</h4>
  <v-layout row wrap>
  <v-flex xs12>
  <h6>FGO</h6>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(officer,i) in FGO" :key="i">
      <div slot="header">{{officer.grade}} {{officer.name}} // Rank : {{ officer.rank }}</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <div>Rank and Qualify
          <v-layout row>
          <v-flex xs4>
          <v-select
            :items="fgoRanks"
            v-model="officer.rank"
            label="Rank"
            single-line
            bottom
          ></v-select>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs4>
          <v-select
            :items="qualOptions(officer.qualifications)"
            v-model="officer.qualifications"
            label="Qualifications"
            multiple
            single-line
            bottom
          ></v-select>
          {{officer.qualifications}}
          </v-flex>
          </v-layout>
        </div>
        <div v-for="(vector, i) in officer.vectors">Vector {{i+1}}
          <v-layout row>
            <v-flex xs3>
            <v-select
              class='mr-3'
              :items="vectorList"
              v-model="vector.vector"
              label="Vector"
              single-line
              bottom
            ></v-select>
            </v-flex>
            <v-flex xs2 v-for="i in vectorLengthLocation(vector.vector)" :key="i">
            <v-select
              class='mr-3'
              :items="vectorLocation[vector.vector]"
              v-model="vector.location[i]"
              label="Location"
              single-line
              bottom
            ></v-select>
            </v-flex>
          </v-layout>
        </div>
        <div>Supporting Information</div>
        <v-layout row>
        <v-flex xs4>  
            <v-checkbox color="primary" label="Join Spouse" v-model="officer.joinSpouse"></v-checkbox>
        </v-flex>
        <v-flex xs4>
            <v-checkbox color="primary" label="EFMP/Humanitarian" v-model="officer.EFMP"></v-checkbox>
        </v-flex>
        <v-flex xs4>
            <v-checkbox color="primary" label="RNLTD Issue?" v-model="officer.issueRNLTD"></v-checkbox>
        </v-flex>
        </v-layout>
          <v-text-field
                name="og-cc comment"
                label="OG/CC Comment"
                v-model="officer.comment_commander"
                textarea
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-flex>
  </v-layout>
  <v-btn primary @click.native="snackbar = true">Submit</v-btn>
  <v-snackbar
    :timeout="3000"
    :top="true"
    v-model="snackbar"
  >Submitted!<v-btn flat class="blue--text" @click.native="snackbar = false">Close</v-btn></v-snackbar>
</v-container>

</template>

<script>
import FGO from '../assets/data/FGO.json'
import CGO from '../assets/data/CGO.json'
export default{
    data(){
        return {
            FGO: FGO,
            CGO: CGO,
            vectorList:[
              'None',
              'Slip',
              'A-10',
              'F-15C',
              'F-15E',
              'F-16 Ops',
              'F-16 FTU',
              'F-22 Ops',
              'F-35',
              'IFF',
              'UPT: T-6/T-38',
              'White Jet',
              'Aggressors',
              'Test',
              'Staff',
              'TFI',
              'ALO'
            ],
            vectorLocation:{
              'A-10': ['Davis-Monthan','Osan', 'Moody','TFI-Whiteman'],
              'F-15C': ['Kadena', 'Lakenheath','Klamath Falls FTU','Barnes TFI', 'Jacksonville TFI', 'New Orleans TFI', 'Portland TFI','Fresno TFI'],
              'F-15E': ['Mountain Home', 'Lakenheath', 'Seymour Johnson Ops', 'Seymour Johnson FTU'],
              'F-16 Ops': ['Aviano', 'Kunsan', 'Osan', 'Misawa', 'Shaw', 'Spangdahlem'],
              'F-16 FTU': ['Holloman', 'Luke'],
              'F-22 Ops': ['Elmendorf', 'Langley', 'Tyndall', 'TFI-Hickham'],
              'F-35': ['Eglin', 'Luke', 'Hill'],
              'IFF': ['Columbus', 'Randolph', 'Sheppard'],
              'UPT: T-6/T-38': ['Columbus', 'Laughlin', 'Randolph', 'Sheppard', 'Vance'],
              'Aggressors': ['Nellis', 'Eielson'],
              'Test': ['Edwards', 'Eglin','Nellis','Other'],
              'Staff': ['OSD','SAF', 'HAF', 'MAJCOM', 'NAF', 'Joint' ],
              'TFI': ['Baltimore', 'Forth Worth'],
            },
            snackbar: false,
            cgoRanks: [],
            fgoRanks: [],
        }
    },
    methods: {
      vectorLengthLocation(vector){
        if (this.vectorLocation[vector]){
          //Only give three options for losing OGs for locations within a vector
          return Math.min(this.vectorLocation[vector].length,3)
        }
        else {
          // If the vector doesn't exist yet, don't render location boxes
          return 0
        }
      },
      qualOptions(quals){
        console.log(quals)
        var qualList =[
              'WIC',
              'SEFE',
              'MSN/CC',
              'IP',
              '4-ship',  
              '2-ship',
              'Wingman',
              'Safety',
              'FAC(A)',
              'SANDY',
        ]
        if (quals.length == 0){
          return qualList
        }
        else if (quals.indexOf('WIC')>=0){
          return ['WIC','SEFE', 'Safety', 'FAC(A)', 'SANDY']
        }
        else if (quals.indexOf('SEFE')>=0){
          return ['WIC','SEFE','MSN/CC','Safety', 'FAC(A)', 'SANDY']
        }
        else if (quals.indexOf('IP')>=0){
          return ['WIC','SEFE','MSN/CC','IP','Safety', 'FAC(A)', 'SANDY']
        }
        else {
          return qualList
        }
      }
    },
    created: function(){
      var totalCGO = this.CGO.length
      for (let i=1;i<=totalCGO;i++){
        this.cgoRanks.push(i+' out of '+totalCGO)
      }
      var totalFGO = this.FGO.length
      for (let i=1;i<=totalFGO;i++){
        this.fgoRanks.push(i+' out of '+totalFGO)
      }
    }

}
</script>






