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
            :items="qualList"
            v-model="officer.qualifications"
            label="Qualifications"
            multiple
            single-line
            bottom
          ></v-select>
          </v-flex>
          </v-layout>
        </div>
        <div>Slip
        <v-layout row>
          <v-flex xs2>
            <v-select
              :items="['Slip', 'No slip']"
              v-model="officer.slip"
              label="Slip"
              single-line
              bottom
            ></v-select>
          </v-flex>
          <v-flex xs6>
          <v-text-field 
              name="slip _reason"
              label="Slip Reason"
              v-model="officer.slip_comments"
              v-if="officer.slip=='Slip'"
          >
          </v-text-field>
          </v-flex>
        </v-layout>
        </div>

        <div v-for="(vector, i) in officer.vectors">Vector {{i+1}}
          <v-layout row>
            <v-flex xs3>
            <v-select
              class='mr-3'
              :items="vectorList"
              label="Vector"
              v-model="vector.vector"
              single-line
              bottom
            ></v-select>
            </v-flex>
            <v-flex xs3 v-for="i in vectorLengthLocation(vector.vector)" :key="i">
            <v-select
              class='mr-3'
              :items="vectorLocation[vector.vector]"
              label="Location"
              single-line
              bottom
            ></v-select>
            </v-flex>
            <v-flex xs4>
            </v-flex>
          </v-layout>
        </div>
        <div>Supporting Information</div>
        <v-layout row>
        <v-flex xs4>  
            <v-checkbox color="primary" v-model="officer.joinSpouse" label="Join Spouse"></v-checkbox>
        </v-flex>
        <v-flex xs4>
            <v-checkbox color="primary" v-model="officer.issueRNLTD" label="RNLTD Issue?"></v-checkbox>
        </v-flex>
        </v-layout>
          <div>
            <span>Member comment:</span>
            <p>Quals: 1220 F-16 hrs / 227 hrs combat. F-16 SEAD 4-ship FL, FAC(A), MSN/CC.
            <br>
            Previous JTAC-qualified ALO with Army in USAFE.
            <br>
            Current/Qual in F-16 at PCS: No
            <br>
*Summary:  haven't met 2nd gate- 102/120 mo. Foreign IDE in-residence complete at PCS. Desire Traditional Staff as 11F, 16R, or 16P at PACOM or PACAF in Hawaii (that order). Desire path that leads to command. Open to academic pursuit as instructor/student. Completed masters in Mil Ops. For staff, desire joint strategy work in J3, J5, J8, legislative work, RAS, or PAS.
<br>
*Volunteer for:
<br>
1. Traditional Staff: a) Hawaii PACOM  b) Hawaii PACAF c) D.C. JCS, SAF, HAF (as 11F or RAS/PAS)
<br>
2. Colorado: a) USAFA Academic Instructor  b) Staff at NORAD
<br>
3. Asst. Air Attaché, Australia
<br>
4. UCC or MAJCOM staff: a) AFRICOM (Germany) b) EUCOM c) USSOCOM
<br>
5. Return to fly: a) F-35 b) F-16: Holloman, Luke, Hill, Aviano
<br>
*Non-Volunteer for:  I don't desire staff in Indonesia, Korea, or Mid East</p>
          </div>
          <v-text-field
                name="og-cc comment"
                label="CC Comment"
                textarea
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-flex>
  </v-layout>
  <v-layout row wrap>
  <v-flex xs12>
  <h6 class="mt-3">CGO</h6>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(officer,i) in CGO" :key="i">
      <div slot="header">{{officer.grade}} {{officer.name}} // Rank : {{ officer.rank }}</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <div>Rank and Qualify
          <v-layout row>
          <v-flex xs4>
          <v-select
            :items="cgoRanks"
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
          </v-flex>
          </v-layout>
        </div>
        <div>Slip
        <v-layout row fluid>
          <v-flex xs2>
            <v-select
              :items="['Slip', 'No slip']"
              v-model="officer.slip"
              label="Slip"
              single-line
              bottom
            ></v-select>
          </v-flex>
          <v-flex xs6>
          <v-text-field 
              name="slip _reason"
              label="Slip Reason"
              v-model="officer.slip_comments"
              v-if="officer.slip=='Slip'"
          >
          </v-text-field>
          </v-flex>
        </v-layout>
        </div>

        <div v-for="(vector, i) in officer.vectors">Vector {{i+1}}
          <v-layout row>
            <v-flex xs3>
            <v-select
              class='mr-3'
              :items="vectorList"
              label="Vector"
              v-model="vector.vector"
              single-line
              bottom
            ></v-select>
            </v-flex>
            <v-flex xs3 v-for="i in vectorLengthLocation(vector.vector)" :key="i">
            <v-select
              class='mr-3'
              :items="vectorLocation[vector.vector]"
              label="Location"
              single-line
              bottom
            ></v-select>
            </v-flex>
            <v-flex xs4>
            </v-flex>
          </v-layout>
        </div>
        <div>Supporting Information</div>
        <v-layout row>
        <v-flex xs4>  
            <v-checkbox color="primary" label="Join Spouse" v-model="officer.joinSpouse"></v-checkbox>
        </v-flex>
        <v-flex xs4>
            <v-checkbox color="primary" label="RNLTD Issue?" v-model="officer.issueRNLTD"></v-checkbox>
        </v-flex>
        </v-layout>
                  <div>
                    <span>Member comment:</span>
                    <p>Quals: 1220 F-16 hrs / 227 hrs combat. F-16 SEAD 4-ship FL, FAC(A), MSN/CC.
                    <br>
                    Previous JTAC-qualified ALO with Army in USAFE.
                    <br>
                    Current/Qual in F-16 at PCS: No
                    <br>
        *Summary:  haven't met 2nd gate- 102/120 mo. Foreign IDE in-residence complete at PCS. Desire Traditional Staff as 11F, 16R, or 16P at PACOM or PACAF in Hawaii (that order). Desire path that leads to command. Open to academic pursuit as instructor/student. Completed masters in Mil Ops. For staff, desire joint strategy work in J3, J5, J8, legislative work, RAS, or PAS.
        <br>
        *Volunteer for:
        <br>
        1. Traditional Staff: a) Hawaii PACOM  b) Hawaii PACAF c) D.C. JCS, SAF, HAF (as 11F or RAS/PAS)
        <br>
        2. Colorado: a) USAFA Academic Instructor  b) Staff at NORAD
        <br>
        3. Asst. Air Attaché, Australia
        <br>
        4. UCC or MAJCOM staff: a) AFRICOM (Germany) b) EUCOM c) USSOCOM
        <br>
        5. Return to fly: a) F-35 b) F-16: Holloman, Luke, Hill, Aviano
        <br>
        *Non-Volunteer for:  I don't desire staff in Indonesia, Korea, or Mid East</p>
                  </div>
          <v-text-field
                name="og-cc comment"
                label="CC Comment"
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
    :timeout="2000"
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
            qualList: [
              'WIC',
              'SEFE',
              'MSN/CC',
              'IP/IWSO',
              '4 FL/Tier 2 WSO',  
              '2 FL/Tier 1 WSO',
              'Wingman',
              'Safety',
              'FAC(A)',
              'SANDY',
            ],
            vectorList:[
              'None',
              'A-10',
              'F-15C',
              'F-15E',
              'F-16 Ops',
              'F-16 FTU',
              'F-16 TFI',
              'F-22',
              'F-35',
              'IFF',
              'T-6/T-38',
              'White Jet',
              'Aggressors',
              'Test',
              'Staff',
              'Other'
            ],
            vectorLocation:{
              'A-10': ['Davis-Monthan Ops', 'Davis-Monthan FTU','Osan', 'Moody','TFI-Whiteman'],
              'F-15C': ['Kadena','Klamath Falls FTU','Lakenheath','Barnes TFI', 'Fresno TFI', 'Jacksonville TFI', 'New Orleans TFI', 'Portland TFI'],
              'F-15E': ['Mountain Home', 'Lakenheath', 'Seymour Johnson Ops', 'Seymour Johnson FTU'],
              'F-22': ['Elmendorf', 'Langley', 'Tyndall Ops', 'Tyndall FTU', 'TFI-Hickham'],
              'F-35': ['Eglin', 'Luke', 'Hill'],
              'F-16 Ops': ['Aviano', 'Kunsan', 'Osan', 'Misawa', 'Shaw', 'Spangdahlem'],
              'F-16 TFI': [
              'Atlantic City',
              'Buckley',
              'Burlington', 
              'Duluth',
              'Fort Wayne',
              'Forth Worth',
              'Fresno',
              'Jacksonville',
              'Madison',
              'Martin State',
              'McEntire',
              'Montgomery',
              'New Orleans',
              'Selfridge',
              'Sioux Falls',
              'Toledo',
              'Tulsa'
              ],
              'F-16 FTU': ['Holloman', 'Luke'],
              'IFF': ['Columbus', 'Randolph', 'Sheppard'],
              'T-6/T-38': ['Columbus', 'Laughlin', 'Randolph', 'Sheppard', 'Vance'],
              'Aggressors': ['Nellis', 'Eielson'],
              'Test': ['Edwards', 'Eglin','Nellis','Other'],
              'Staff': ['OSD','HAF', 'MAJCOM', 'NAF', 'Joint']
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
      changeList(event){
        event.push('SSS')
        return event
      },
      qualOptions(quals){
        var qualList =[
              'WIC',
              'SEFE',
              'MSN/CC',
              'IP/IWSO',
              '4 FL/Tier 2 WSO',  
              '2 FL/Tier 1 WSO',
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
        else if (quals.indexOf('IP/IWSO')>=0){
          return ['WIC','SEFE','MSN/CC','IP/IWSO','Safety', 'FAC(A)', 'SANDY']
        }
        else if (quals.indexOf('4 FL/Tier 2 WSO')>=0){
          return ['WIC','SEFE','MSN/CC','IP/IWSO','4 FL/Tier 2 WSO','Safety', 'FAC(A)', 'SANDY']
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






