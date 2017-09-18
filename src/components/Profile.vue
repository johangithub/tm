<template>
    <v-container fluid id="profile">
    <h4>Maj FirstName LastName / ID: {{profileId}}</h4>
    <v-btn primary @click.native="getData">GET</v-btn>
    <v-layout row v-if="dataReady">
    <v-flex xs8>
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

    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">General</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div>Grade: {{ general_data.grade }}</div>
          <div>Component: {{ general_data.component }}</div>
          <div>Functional Category: {{ general_data.func_cat }}</div>
          <div>Competitive Cateogry: {{ general_data.comp_cat }}</div>
          <div>Record Status: {{ general_data.record_status }}</div>
          <div>Accounting Status: {{ general_data.accounting_status }}</div>
          <div>Short Tour Number: {{ general_data.short_tour_num }}</div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">Projected</div>
        <v-card>
          <v-card-text class="grey lighten-3">
           <div>Projected PAS: {{projected.assignment.pas}}</div>
            <div>Projected AFSC: {{projected.assignment.afsc}}</div>
            <div>Projected Assignment Selection Date: {{projected.assignment.asd}}</div>
            <div>Projected Departure Date: {{projected.assignment.pdd}}</div>
            <div>Projected RNLTD: {{projected.assignment.rnltd}}</div>
            <div>Projected Duty Effective Date: {{projected.duty.eff_date}}</div>
            <div>Projected Duty Expiration Date: {{projected.duty.exp_date}}</div>
            <div>Projected Duty Status: {{projected.duty.status}}</div>
            <div>Projected Duty Title: {{projected.duty.title_pending}}</div>
            <div>Projected Duty Command Level: {{projected.duty.cmd_lvl_pending}}</div>
            <div>Projected Duty AFSC: {{projected.duty.afsc_pending}}</div>
            <div>Projected Duty Effective Date Pending: {{projected.duty.eff_date_pending}}</div>
            <span>Projected Course</span>
            <div v-for="course in projected.course">
              {{course.course}}//{{course.course_ct}}//{{course.start_date}}//{{course.grad_date}}
            </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">Assignment Codes</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div v-for="abc in asgn_code.block_code">
            <span>Block code: {{abc.code}} ({{abc.date}})</span>
          </div>
          <div v-for="aac in asgn_code.avail_code">
            <span>Avail code: {{aac.code}} ({{aac.date}})</span>
          </div>
          <div v-for="alc in asgn_code.limit_code">
            <span>Limit code: {{alc.code}} ({{alc.date}})</span>
          </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-layout row>
    <v-flex xs4>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">Service Dates</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <div>DAS: {{service_dates._das}}</div>
          <div>DDLDS: {{service_dates._ddlds}}</div>
          <div>Duty Status Eff Date: {{service_dates._duty_status_eff_date}}</div>
          <div>ODSD: {{service_dates._odsd}}</div>
          <div>STRD: {{service_dates._strd}}</div>
          <div>DOS: {{service_dates._dos}}</div>
          <div>EAD: {{service_dates._ead}}</div>
          <div>PAY Date: {{service_dates._pay_date}}</div>
          <div>TAFCSD: {{service_dates._tafcsd}}</div>
          <div>TFCSD: {{service_dates._tfcsd}}</div>
          <div>TAFMSD: {{service_dates._tafmsd}}</div>
          <div>Grade Effective Date: {{service_dates._grade_eff_date}}</div>
          <div>DOR: {{service_dates._dor}}</div>
          <div>DEROS: {{service_dates._deros}}</div>
          <div>CC Date: {{service_dates._cc_date}}</div>
          <div>Projected RET/SEP Effecitive Date: {{service_dates._ret_sep_date_proj}}</div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-flex>
    <v-flex xs8>
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
    <v-flex xs6>
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
    <v-flex xs6>
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
    </v-layout>
<v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">Duty History</div>
    <table>
      <tr>
        <th>Duty Title</th>
        <th>Unit</th>
        <th>Location</th>
        <th>MAJCOM</th>
        <th>Level</th>
        <th>DFASC</th>
        <th>EFF Date</th>
      </tr>
      <tr v-for="history in duty_history">
        <td>{{ history.duty_title }}</td>
        <td>{{ history.unit}}</td>
        <td>{{ history.location }}</td>
        <td>{{ history.org_majcom }}</td>
        <td>{{ history.command_level }}</td>
        <td>{{ history.dafsc }}</td>
        <td>{{ history.eff_date }}</td>
      </tr>
    </table>
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
    </v-flex>
    </v-layout>
    <v-btn primary @click.native="snackbar = true">Submit</v-btn>
    <v-snackbar
      :timeout="1000"
      :top="true"
      v-model="snackbar"
    >Submitted!<v-btn flat class="blue--text" @click.native="snackbar = false">Close</v-btn></v-snackbar>
    </v-container>
</template>

<script>
import { store } from '@/store.js'
import axios from 'axios'
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
      'IP',
      '4-ship',  
      '2-ship',
      'Wingman'
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
      apiData: '',
      errors: [],
      general_data: '',
      projected: '',
      rated: '',
      asgn_code: '',
      service_dates: '',
      duty_history: '',
      pme: '',
      degree: '',
      language: '',
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
            this.general_data = data.general
            this.duty_history = data.duty.history
            this.asgn_code = data.asgn_code
            this.service_dates = data.service_dates
            this.rated = data.rated
            this.pme = data.pme
            this.degree = data.degree
            this.language = data.language
            this.projected = data.projected

            this.dataReady = true
           })
          .catch(e => {
            console.error(e)
          })
    }
  },
  computed: {
    profileId(){
      return this.id ? this.id : store.getters.userId
    },
    pretty_apiData(){
      if (this.apiData){
        return JSON.stringify(this.apiData, null, 2);
      }
      else{
        return ""
      }
    }
  }
}
</script>