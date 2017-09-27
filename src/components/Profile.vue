<template>
  <v-container fluid id="profile">
  <v-layout row>
    <v-btn primary @click.native="getData">GET</v-btn>
    <v-btn primary @click.native="getData2">GET2</v-btn>
    <h4 v-if="dataReady">{{rank}} ID: {{this.apiData.rowid}}</h4>
  </v-layout>
  <div v-if="dataReady">
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header">Test Data</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <pre>{{pretty_apiData}}</pre>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>

<v-layout row>
  <v-flex xs3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">General</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            <div>Grade: {{ general.grade }}</div>
            <div>Component: {{ general.component }}</div>
            <div>Functional Category: {{ general.func_cat }}</div>
            <div>Competitive Cateogry: {{ general.comp_cat }}</div>
            <div>Record Status: {{ general.record_status }}</div>
            <div>Accounting Status: {{ general.accounting_status }}</div>
            <div>Short Tour Number: {{ general.short_tour_num }}</div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <v-flex xs3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">Current</div>
        <v-card>
          <v-card-text class="grey lighten-3">
           <div>PAS: {{}}</div>
            <div>AFSC: {{}}</div>
            <div>Duty Status: {{}}</div>
            <div>Duty Title: {{}}</div>
            <div>Command Level: {{}}</div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <v-flex xs3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">Projected</div>
        <v-card>
          <v-card-text class="grey lighten-3">
           <div>PAS: {{projected.assignment.pas}}</div>
            <div>AFSC: {{projected.assignment.afsc}}</div>
            <div>Assignment Selection Date: {{projected.assignment.asd}}</div>
            <div>Projected Departure Date: {{projected.assignment.pdd}}</div>
            <div>RNLTD: {{projected.assignment.rnltd}}</div>
            <div>Duty Effective Date: {{projected.duty.eff_date}}</div>
            <div>Duty Expiration Date: {{projected.duty.exp_date}}</div>
            <div>Duty Status: {{projected.duty.status}}</div>
            <div>Duty Title: {{projected.duty.title_pending}}</div>
            <div>Command Level: {{projected.duty.cmd_lvl_pending}}</div>
            <div>DAFSC: {{projected.duty.afsc_pending}}</div>
            <div>Projected Course
            <div v-for="course in projected.course">
                <span v-tooltip:right="{ html: courseFormat(course.course) }">{{course.course}}</span>:{{course.start_date}}--{{course.grad_date}}
            </div>
            </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <v-flex xs3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">Assignment Codes</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div v-for="abc in asgn_code.block_code">
            <div>Block code: 
              <span v-tooltip:right="{ html: abcFormat(abc.code) }">{{abc.code}}</span> ({{abc.date}})</div>
          </div>
          <div v-for="aac in asgn_code.avail_code">
            <div>Avail code: 
              <span v-tooltip:right="{ html: aacFormat(aac.code) }">{{aac.code}}</span> ({{aac.date}})</div>
          </div>
          <div v-for="alc in asgn_code.limit_code">
            <div>Limit code: 
              <span v-tooltip:right="{ html: alcFormat(alc.code) }">{{alc.code}}</span> ({{alc.date}})</div>
          </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
</v-layout>
<v-layout row>
  <v-flex xs3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">Courses</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div v-for="course in courses">
            <div><span v-tooltip:right="{ html: courseFormat(course.course) }">{{course.course}}</span> ({{course.date}})</div>
          </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <v-flex xs3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">Service Dates</div>
        <v-data-table
        :headers="service_dates_headers"
        :items="service_dates_array"
        hide-actions>
          <template slot="items" scope="props">
            <td>{{props.item.name}}</td>
            <td>{{props.item.date}}</td>
          </template>
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-flex>
    <v-flex xs3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">PME</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div>PME Highest: {{pme.pme_highest}}</div>
          <div v-for="item in pme.history">{{item.level}} - {{item.course}} / {{item.method}} / {{item.date}}
          </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <v-flex xs3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">Joint</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div>JDA Flag: {{joint.jda_flag}}</div>
          <div>JSO Code: {{joint.jso_code}}</div>
          <div>JSO_NUM Status: {{joint.jso_jsonum_status}}</div>
          <div v-for="tour in joint.history">
          {{tour.type}}//{{tour.credit}}//{{tour.reason}}//{{tour.posn}}//{{tour.start_date}} - {{tour.stop_date}}
          </div>
          </v-card-text>
        </v-card>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
</v-layout>
  <v-layout row>
  <v-flex xs6>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header">Degrees</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <div v-for="deg in degree.history">
          {{deg.degree_ct}}//{{deg.level}}//{{deg.method}}//{{deg.school}}//{{deg.date}}            
        </div>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-flex>
  <v-flex xs6>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header">Language</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <div v-if="language.dlab_score">DLAB Score(Date): {{language.dlab_score}} ({{language.dlab_date}})</div>
        <div v-for="lang in language.list">
          {{lang.id}}//{{lang.listen}}//{{lang.read}}//{{lang.date}}
        </div>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-flex>
  </v-layout>
  <v-layout row>
  <v-flex xs4>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header">Aircraft Data</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <div>Aircraft // Hours // Date Last Flown</div>
        <div v-for="ac in rated.aircraft_history">
        {{ ac.aircraft }} //
        {{ ac.hours }} //
        {{ ac.aircraft_date_flown }}
        </div>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-flex>
  <v-flex xs4>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header">Rated Data</div>
      <v-card>
        <v-card-text class="grey lighten-3">
          <div>Aero Rating: {{rated.aero_rating_ct}}</div>
          <div>Flight Activity Code: {{rated.flt_activity_code}}</div>
          <div>Gates Current: {{rated.gates_curr}}</div>
          <div>Flight Hours(Combat): {{rated.flt_hrs_combat}}</div>
          <div>Flight Hours(Inst): {{rated.flt_hrs_instr}}</div>
          <div>Flight Hours(Total): {{rated.flt_hrs_total}}</div>
          <div>Aviation Service Code: {{rated.avn_service_code_ct}}</div>
          <div>RDTM: {{rated.rdtm}}</div>
          <div>Aircrew Position ID: {{rated.aircrew_position_id}}</div>
          <div>Aviation Service Date: {{rated.avn_service_date}}</div>
          <div>Aero Rating Date: {{rated.aero_rating_date}}</div>
          <div>Return To Fly Date: {{rated.return_to_fly_date}}</div>
          <div>ACP Eligible Date: {{rated.acp_elig_date}}</div>
          <div>ACP Effective Date: {{rated.acp_effective_date}}</div>
          <div>ACP Stop Date: {{rated.acp_stop_date}}</div>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-flex>
  <v-flex xs4>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header">Exp Identifier</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <div>{{spec_exp}}</div>
        <div>Nuclear Experience</div>
        <div v-for="item in spec_exp.nuclear">
        {{item.nei}}//{{item.start_date}}//{{item.stop_date}}
        </div>
        <div>SEI</div>
        <div v-for="item in spec_exp.sei">
        {{item.sei}}
        </div>
        <div>Acquisition</div>
        <div>{{spec_exp.acquisitions}}</div>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-flex>
  </v-layout>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header">Duty History</div>
            <v-data-table
          :headers="duty_history_headers"
          :items="duty_history"
          hide-actions>
          <template slot="items" scope="props">
            <td>{{props.item.duty_title}}</td>
            <td>{{props.item.unit}}</td>
            <td>{{ajh4Format(props.item.location) }}</td>
            <td>{{props.item.org_majcom}}</td>
            <td>{{props.item.command_level}}</td>
            <td>{{props.item.dafsc}}</td>
            <td>{{props.item.eff_date}}</td>
          </template>
  </v-data-table>
    </v-expansion-panel-content>
  </v-expansion-panel>


  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header">Self Advertise</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <v-layout row>
        <v-flex xs3>
        <div>Desired Departure Date</div>
        <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="showDDD"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-left="40"
                  max-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="Select a date"
                    v-model="desiredDepartureDate"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker 
                  v-model="desiredDepartureDate"
                  no-title
                  scrollable
                  actions
                  :allowed-dates="allowedDepartureDates">
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                        <v-btn flat primary @click.native="save()">Save</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
        </v-menu>
        </v-flex>
        <v-flex xs3>
        <div>Desired RNLTD</div>
        <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="showRNLTD"
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
        <v-flex xs3>
        <div>Quals</div>
        <v-select
          :items="qualList"
          v-model="qualifications"
          label="Qualifications"
          multiple
          single-line
          bottom
        ></v-select>
        </v-flex>
        <v-flex xs3>
        <div>Interest</div>
        <v-select
          :items="interestList"
          v-model="interests"
          label="Interests"
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
  </div>
  <v-btn v-if="dataReady" primary @click.native="snackbar = true">Submit</v-btn>
  <v-snackbar
    :timeout="1000"
    :top="true"
    v-model="snackbar"
  >Submitted!<v-btn flat class="blue--text" @click.native="snackbar = false">Close</v-btn></v-snackbar>
  </v-container>
</template>

<script>
import { store } from '@/store'
import axios from 'axios'
var ajh4 = require('@/format/location_format')
var abc = require('@/format/abc')
var aac = require('@/format/aac')
var alc = require('@/format/alc')
var course = require('@/format/course')
const BASE_URL = store.state.baseUrl
export default {
  props: ['id'],
  data(){
    return {
      snackbar: false,
      comment: '',
      qualifications: [],
      interests: [],
      qualList:[
      'SEFE',
      'WIC',
      'IP/IWSO',
      '4-ship FL',  
      '2-ship FL',
      'Wingman',
      'FAC (A)',
      'SANDY'
      ],
      interestList: [
      'ALO Assignment',
      'Palace Chase',
      'Separate',
      'Squadron Snacko'      
      ],
      desiredDepartureDate: new Date('2018/05/30').toISOString().split('T')[0],
      allowedDepartureDates:function(date){
        return date < new Date('2018/09/30') & date > new Date('2018/05/30')
      },
      desiredRNLTD: new Date('2018/05/30').toISOString().split('T')[0],
      allowedRNLTD: function(date){
        return date < new Date('2018/09/30') & date > new Date('2018/05/30')
      },
      showDDD: false,
      showRNLTD: false,
      dataReady: false,
      errors: [],
      general: '',
      projected: '',
      rated: '',
      asgn_code: '',
      service_dates: '',
      duty_history: '',
      pme: '',
      degree: '',
      language: '',
      jonit: '',
      courses: '',
      spec_exp: '',
      duty_history_headers: [
        {text: 'Duty Title', value: 'duty_title', align: 'left', sortable: false },
        {text: 'Unit', value: 'unit', align: 'left', sortable: false },
        {text: 'Location', value: 'location', align: 'left', sortable: false },
        {text: 'MAJCOM', value: 'majcom', align: 'left', sortable: false },
        {text: 'Level', value: 'level', align: 'left', sortable: false },
        {text: 'DAFSC', value: 'dafsc', align: 'left', sortable: false },
        {text: 'Eff Date', value: 'date', align: 'left', sortable: false },
      ],
      service_dates_headers:[
        {text: 'Name', value: 'name', align: 'left', sortable: false },
        {text: 'Title', value: 'date', align: 'left', sortable: false },
      ],
      apiData: '',
      apiData2: ''
    }
  },
  methods: {
    getData(){
      axios.get(BASE_URL+'/officers',
      {
        headers: {
          'Authorization': localStorage.token 
        }
      })
          .then(response =>{
            var data = response.data.data
            this.apiData = data
            this.general = data.general
            this.duty_history = data.duty.history
            this.asgn_code = data.asgn_code
            this.service_dates = data.service_dates
            this.rated = data.rated
            this.pme = data.pme
            this.degree = data.degree
            this.language = data.language
            this.projected = data.projected
            this.joint = data.joint
            this.courses = data.courses
            this.spec_exp = data.special_experience
            this.dataReady = true
           })
          .catch(e => {
            console.error(e)
          })
    },
    getData2(){
      axios.get(BASE_URL+'/officer_view',
      {
        headers: {
          'Authorization': localStorage.token 
        }
      }).then(response =>{
            this.apiData2 = response.data.data
      }).catch(e => {
            console.error(e)
      })
    },
    abcFormat(value){
      return abc[value]
    },
    aacFormat(value){
      return aac[value]
    },
    alcFormat(value){
      return alc[value]
    },
    courseFormat(value){
      return course[value]
    },
    ajh4Format(value){
      return ajh4[value]
    }
  },
  computed: {
    profileId(){
      return this.id ? this.id : store.getters.userId
    },
    pretty_apiData(){
      if (this.apiData2){
        return JSON.stringify(this.apiData2, null, 2);
      }
      else{
        return ""
      }
    },
    rank(){
      var rank_obj = {
        "01": "2LT",
        "02": "1LT",
        "03": "CAPT",
        "04": "MAJ",
        "05": "LTC",
      }
      return rank_obj[this.general.grade]
    },
    service_dates_array(){
      var temp = []
      for (name in this.service_dates){
        temp.push({"name": name.toUpperCase(), "date": this.service_dates[name]})
      }
      return temp
    }
  },
}
</script>