<template>
  <v-container id="losing-commander">
  <h4>Col Thorson, Commander of 35 OG</h4>
  <v-layout row wrap>
  <v-flex xs12>
  <h6>FGO</h6>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(officer,i) in FGO" :key="i">
      <div slot="header">{{officer.grade}} {{officer.name}} // Rank : {{ officer.rank }} // Quals: {{officer.qualifications.join(', ')}}</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <div>Rank and Qualify</div>
        <v-layout row wrap>
          <v-select
            :items="fgoRanks"
            v-model="officer.rank"
            label="Rank"
            single-line
            bottom
          ></v-select>
          <v-spacer></v-spacer>
          <v-select
            :items="qualList"
            v-model="officer.qualifications"
            label="Qualifications"
            multiple
            single-line
            bottom
          ></v-select>
        </v-layout>
        <div v-for="(vector, i) in officer.vectors">Vector {{i+1}}
          <v-layout row justify-space-around>
            <v-select
              class='mr-3'
              :items="vectorList"
              v-model="vector.vector"
              label="Vector"
              single-line
              bottom
            ></v-select>
            <v-select
              class='mr-3'
              :items="vectorLocation[vector.vector]"
              v-model="vector.location[0]"
              label="Location"
              single-line
              bottom
            ></v-select>
          </v-layout>
        </div>
        <div>Supporting Information</div>
        <v-layout row justify-space-around>
        <v-flex xs-4>  
            <v-checkbox color="primary" label="Join Spouse" v-model="officer.joinSpouse"></v-checkbox>
        </v-flex>
        <v-flex xs-4>
            <v-checkbox color="primary" label="EFMP/Humanitarian" v-model="officer.EFMP"></v-checkbox>
        </v-flex>
        <v-flex xs-4>
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
  <v-layout row wrap class="pt-3">
  <v-flex xs12>
  <h6>CGO</h6>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(officer,i) in CGO" :key="i">
      <div slot="header">{{officer.grade}} {{officer.name}} // Rank : {{ officer.rank }} // Quals: {{officer.qualifications.join(', ')}}</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <div>Rank and Qualify</div>
        <v-layout row wrap>
          <v-select
            :items="fgoRanks"
            v-model="officer.rank"
            label="Rank"
            single-line
            bottom
          ></v-select>
          <v-spacer></v-spacer>
          <v-select
            :items="qualList"
            v-model="officer.qualifications"
            label="Qualifications"
            multiple
            single-line
            bottom
          ></v-select>
        </v-layout>
        <div v-for="(vector, i) in officer.vectors">Vector {{i+1}}
          <v-layout row justify-space-around>
            <v-select
              class='mr-3'
              :items="vectorList"
              v-model="vector.vector"
              label="Vector"
              single-line
              bottom
            ></v-select>
            <v-select
              class='mr-3'
              :items="vectorLocation[vector.vector]"
              v-model="vector.location1"
              label="1st Location"
              single-line
              bottom
            ></v-select>
            <v-select
              class='mr-3'
              :items="vectorLocation[vector.vector]"
              v-model="vector.location2"
              label="2nd Location"
              single-line
              bottom
            ></v-select>
            <v-select
              class='mr-3'
              :items="vectorLocation[vector.vector]"
              v-model="vector.location3"
              label="3rd Location"
              single-line
              bottom
            ></v-select>
          </v-layout>
        </div>
        <div>Supporting Information</div>
        <v-layout row justify-space-around>
        <v-flex xs-4>  
            <v-checkbox color="primary" label="Join Spouse" v-model="officer.joinSpouse"></v-checkbox>
        </v-flex>
        <v-flex xs-4>
            <v-checkbox color="primary" label="EFMP/Humanitarian" v-model="officer.EFMP"></v-checkbox>
        </v-flex>
        <v-flex xs-4>
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
  >Submitted!<v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn></v-snackbar>
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
              'Remote',
              'Test',
              'F-35',
              'F-16 Ops',
              'F-16 FTU',
              'IFF/T-38',
              'Active Associate'
            ],
            vectorLocation:{
              'None': ['None'],
              'Slip': ['Current Location'],
              'Remote': ['Kunsan', 'Osan'],
              'Test': ['Edwards', 'Eglin','Nellis'],
              'F-35': ['Eglin', 'Luke', 'Hill'],
              'F-16 Ops': ['Aviano', 'Misawa', 'Shaw', 'Spangdahlem'],
              'F-16 FTU': ['Holloman', 'Luke'],
              'IFF/T-38': ['Columbus', 'Randolph', 'Sheppard'],
              'AGRS': ['Nellis', 'Eielson'],
              'Active Associate': ['Some guard base']
            },
            qualList:[
              'SEFE',
              'WIC',
              'IP',
              '4-ship',  
              '2-ship',
              'Wingman'
            ],
            snackbar: false,
            cgoRanks: [],
            fgoRanks: [],
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






