<template>
    <v-container fluid id="profile">
    <h4>Greetings, Maj FirstName LastName / ID: {{id}}</h4>
    <v-layout row>
    <v-flex xs8>
    <v-expansion-panel class="mt-3" expand>
      <v-expansion-panel-content>
        <div slot="header">Test Data</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            <div>{{apiData}}</div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel class="mt-3">
      <v-expansion-panel-content>
        <div slot="header">Personal</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div>Name: </div>
          <div>Age: </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel class="mt-3">
      <v-expansion-panel-content>
        <div slot="header">Assignments</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div>Name: </div>
          <div>Age: </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-layout row>
    <v-flex xs4>
    <v-expansion-panel class="mt-3">
      <v-expansion-panel-content>
        <div slot="header">Service Dates</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div>DOR: {{ DOR }}</div>
          <div>DAS: {{ DAS }}</div>
          <div>ODSD: {{ ODSD }}</div>
          <div>TFCSD: {{ TFCSD }}</div>
          <div>TFMSD: {{ TFMSD }}</div>
          <div>EAD: {{ EAD }}</div>
          <div>PAY: {{ PAY }}</div>
          <div>DOS: {{ DOS }}</div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-flex>
    <v-flex xs8>
    <v-expansion-panel class="mt-3">
      <v-expansion-panel-content>
        <div slot="header">PME</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div v-for="item in pme">{{item.pme_level}} - {{item.pme_title}} / {{item.pme_method}} / {{item.pme_date}}
          </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-flex>
    </v-layout>
    <v-layout row>
    <v-flex xs6>
    <v-expansion-panel class="mt-3">
      <v-expansion-panel-content>
        <div slot="header">Degrees</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div>Name: </div>
          <div>Age: </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-flex>
    
    </v-layout>
    <v-layout row>
    <v-flex xs6>
    <v-expansion-panel class="mt-3">
      <v-expansion-panel-content>
        <div slot="header">Aircraft Data</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div>Aircraft // Hours // Date Last Flown</div>
          <div v-for="ac in rated_data.aircrafts">
          {{ ac.aircraft }} //
          {{ ac.hours }} //
          {{ ac.date_flown_last }}
          </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-flex>
    <v-flex xs6>
    <v-expansion-panel class="mt-3">
      <v-expansion-panel-content>
        <div slot="header">Rated Data</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div>Aviation Service Date: {{ rated_data.avsd }}</div>
          <div>ACP Status: {{ rated_data.acp_status}} </div>
          <div>Gate Return to Fly Date: {{ rated_data.gate_rtfd}} </div>
          <div>Gate months: {{ rated_data.gate_months}} </div>
          <div>Combat Hours: {{ rated_data.combat_hours}} </div>
          <div>Instructor Hours: {{ rated_data.instructor_hours}} </div>
          <div>Total Hours: {{ rated_data.total_hours}} </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-flex>
    </v-layout>
    <v-expansion-panel class="mt-3">
      <v-expansion-panel-content>
        <div slot="header">Duty History</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            <div  v-for="history in duty_history">
            {{ history.dafsc}} //
            {{ history.duty_title }} //
            {{ history.unit }} //
            {{ history.majcom }} //
            {{ history.level }} //
            {{ history.base }} //
            {{ history.state }} //
            {{ history.start_date }}
            </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel class="mt-3">
      <v-expansion-panel-content>
        <div slot="header">Self Advertise</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <v-layout row>
          <v-flex xs3>
          <div>Desired RNLTD</div>
          <v-menu
                    lazy
                    :close-on-content-click="false"
                    v-model="menu"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      label="Select a date"
                      v-model="desiredRNLTD"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker 
                    v-model="desiredRNLTD"
                    no-title
                    scrollable
                    actions
                    :allowed-dates="allowedRNLTD">
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                          <v-btn flat primary @click.native="save()">Save</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
          </v-menu>
          </v-flex>
          <v-flex xs6 offset-xs2>
          <div>Qualifications</div>
          <v-select
            :items="qualList"
            v-model="qualifications"
            label="Qualifications"
            multiple
            single-line
            bottom
          ></v-select>
          </v-flex>
          </v-layout>
          <div>Comments</div>
          <v-text-field
                name="officer-comment"
                label="Insert comment"
                v-model="comment"
                textarea
          ></v-text-field>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-flex>
    </v-layout>
    
    </v-container>
</template>

<script>
import axios from 'axios'
const BASE_URL = 'http://localhost:5002'
function getAxios(){
  const url = BASE_URL + '/officers/'
  console.log(url)
}
export default {
  props: ['id'],
  data(){
    return {
      grade: 'Maj',
      name: 'Jonathan Smith',
      comment: '',
      qualifications: [],
      qualList:[
      'SEFE',
      'WIC',
      'IP',
      '4-ship',  
      '2-ship',
      'Wingman'
      ],
      desiredRNLTD: new Date('2018/05/30').toISOString().split('T')[0],
      allowedRNLTD: function(date){
        return date < new Date('2018/09/30') & date > new Date('2018/05/30')
      },
      DAS: '2014-08-09',
      DOR: '2013-12-01',
      ODSD: '2005-08-07',
      TFCSD: '1999-06-02',
      TFMSD: '1999-06-02',
      EAD: '1999-06-02',
      PAY: '1999-06-02',
      DOS: '2027-06-30',
      pme: [
      {
        "pme_date": "06-2013",
        "pme_method": "RESIDENCE",
        "pme_level": "IDE",
        "pme_title": "AIR COMMAND ADN STAFF COLLEGE (ACSC)"
      },
      {
        "pme_date": "12-2004",
        "pme_method": "RESIDENCE",
        "pme_level": "PDE",
        "pme_title": "SQUADRON OFFICER SCHOOL"
      }
      ],
      duty_history: [
      {
        "dafsc": "C11F3Y",
        "duty_title": "COMMANDER",
        "unit": "86 FIGHTER WEAPONS SQ",
        "majcom": "ACC",
        "level": "SQ",
        "base": "EGLIN",
        "state": "FL",
        "start_date": "2015-08-20"
      },
      {
        "dafsc": "B11F3Y",
        "duty_title": "DO/F-16 OT&E IP",
        "unit": "85 TEST AND EVALUATION SQ",
        "majcom": "ACC",
        "level": "SQ",
        "base": "EGLIN",
        "state": "FL",
        "start_date": "2014-08-09"
      }
      ],
      rated_data: {
        "aircrafts": [
          {
            "aircraft": "F-16C",
            "date_flown_last": "2017-05-02",
            "hours": 1500.2
          },
          {
            "aircraft": "F-16D",
            "date_flown_last": "2017-05-01",
            "hours": 341.6
          },
          {
            "aircraft": "F-15C",
            "date_flown_last": "2001-07-31",
            "hours": 1.3
          },
          {
            "aircraft": "AT-38B",
            "date_flown_last": "2001-02-15",
            "hours": 25.1
          },
          {
            "aircraft": "T-38A",
            "date_flown_last": "2000-12-07",
            "hours": 7.5
          },
        ],
        acp_status: "Bonus accepted 25000",
        avsd: "2014-06-13",
        gate_rtfd: "2005-03-01",
        combat_hours: 156,
        instructor_hours: 709,
        total_hours: 2086,
        gate_months: 187,
    },
      menu: false,
      apiData: '',
      errors: []
    }
  },
  watch: {
    '$route': function(to, from){
      axios.get('http://localhost:5002/officers/'+this.id)
      .then((response)=>{
        this.apiData = response.data.data[0]
      })
      .catch((e) => {
        console.log(e)
      })
    }
  },
  methods: {
  },
  created(){
    axios.get('http://localhost:5002/officers/'+this.id)
      .then((response)=>{
        this.apiData = response.data.data[0]
      })
      .catch((e) => {
        console.log(e)
      })
  },
}
</script>