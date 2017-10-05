<template>
  <v-container fluid id="profile">
  <v-layout row>
      <h4>{{rank}} {{profileData.firstName}} {{profileData.lastName}}</h4>
  </v-layout>
  <div>

<v-layout row>
  <v-flex xs3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header">General</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            <div>Grade: {{ profileData.general.grade }}</div>
            <div>Component: {{ profileData.general.component }}</div>
            <div>Functional Category: {{ profileData.general.func_cat }}</div>
            <div>Competitive Cateogry: {{ profileData.general.comp_cat }}</div>
            <div>Record Status: {{ profileData.general.record_status }}</div>
            <div>Accounting Status: {{ profileData.general.accounting_status }}</div>
            <div>Short Tour Number: {{ profileData.general.short_tour_num }}</div>
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
           <div>PAS: {{profileData.projected.assignment.pas}}</div>
            <div>AFSC: {{profileData.projected.assignment.afsc}}</div>
            <div>Assignment Selection Date: {{profileData.projected.assignment.asd}}</div>
            <div>Projected Departure Date: {{profileData.projected.assignment.pdd}}</div>
            <div>RNLTD: {{profileData.projected.assignment.rnltd}}</div>
            <div>Duty Effective Date: {{profileData.projected.duty.eff_date}}</div>
            <div>Duty Expiration Date: {{profileData.projected.duty.exp_date}}</div>
            <div>Duty Status: {{profileData.projected.duty.status}}</div>
            <div>Duty Title: {{profileData.projected.duty.title_pending}}</div>
            <div>Command Level: {{profileData.projected.duty.cmd_lvl_pending}}</div>
            <div>DAFSC: {{profileData.projected.duty.afsc_pending}}</div>
            <div>Projected Course
            <div v-for="course in profileData.projected.course">
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
          <div v-for="abc in profileData.asgn_code.block_code">
            <div>Block code: 
              <span v-tooltip:right="{ html: abcFormat(abc.code) }">{{abc.code}}</span> ({{abc.date}})</div>
          </div>
          <div v-for="aac in profileData.asgn_code.avail_code">
            <div>Avail code: 
              <span v-tooltip:right="{ html: aacFormat(aac.code) }">{{aac.code}}</span> ({{aac.date}})</div>
          </div>
          <div v-for="alc in profileData.asgn_code.limit_code">
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
          <div v-for="course in profileData.courses">
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
          <div>PME Highest: {{profileData.pme.pme_highest}}</div>
          <div v-for="item in profileData.pme.history">{{item.level}} - {{item.course}} / {{item.method}} / {{item.date}}
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
          <div>JDA Flag: {{profileData.joint.jda_flag}}</div>
          <div>JSO Code: {{profileData.joint.jso_code}}</div>
          <div>JSO_NUM Status: {{profileData.joint.jso_jsonum_status}}</div>
          <div v-for="tour in profileData.joint.history">
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
        <div v-for="deg in profileData.degree.history">
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
        <div v-if="profileData.language.dlab_score">DLAB Score(Date): {{profileData.language.dlab_score}} ({{profileData.language.dlab_date}})</div>
        <div v-for="lang in profileData.language.list">
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
        <div v-for="ac in profileData.rated.aircraft_history">
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
          <div>Aero Rating: {{profileData.rated.aero_rating_ct}}</div>
          <div>Flight Activity Code: {{profileData.rated.flt_activity_code}}</div>
          <div>Gates Current: {{profileData.rated.gates_curr}}</div>
          <div>Flight Hours(Combat): {{profileData.rated.flt_hrs_combat}}</div>
          <div>Flight Hours(Inst): {{profileData.rated.flt_hrs_instr}}</div>
          <div>Flight Hours(Total): {{profileData.rated.flt_hrs_total}}</div>
          <div>Aviation Service Code: {{profileData.rated.avn_service_code_ct}}</div>
          <div>RDTM: {{profileData.rated.rdtm}}</div>
          <div>Aircrew Position ID: {{profileData.rated.aircrew_position_id}}</div>
          <div>Aviation Service Date: {{profileData.rated.avn_service_date}}</div>
          <div>Aero Rating Date: {{profileData.rated.aero_rating_date}}</div>
          <div>Return To Fly Date: {{profileData.rated.return_to_fly_date}}</div>
          <div>ACP Eligible Date: {{profileData.rated.acp_elig_date}}</div>
          <div>ACP Effective Date: {{profileData.rated.acp_effective_date}}</div>
          <div>ACP Stop Date: {{profileData.rated.acp_stop_date}}</div>
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
        <div>{{profileData.special_experience}}</div>
        <div>Nuclear Experience</div>
        <div v-for="item in profileData.special_experience.nuclear">
        {{item.nei}}//{{item.start_date}}//{{item.stop_date}}
        </div>
        <div>SEI</div>
        <div v-for="item in profileData.special_experience.sei">
        {{item.sei}}
        </div>
        <div>Acquisition</div>
        <div>{{profileData.special_experience.acquisitions}}</div>
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
          :items="profileData.duty.history"
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
      <v-card class="grey lighten-3">
          <v-layout row class="pr-2 pt-2">
              <v-spacer></v-spacer>
              <v-btn small success @click.native="save">Save</v-btn>
              <v-snackbar
                :timeout="1000"
                :top="true"
                v-model="snackbarSave"
              >Saved!<v-btn flat class="green--text" @click.native="snackbarSave = false">Close</v-btn></v-snackbar>
         </v-layout>
        <v-card-text class="grey lighten-3">
        <v-layout row>
        <v-flex xs3>
        <div>Desired Departure Date</div>
        <v-menu
                  lazy
                  :close-on-content-click="true"
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
                    v-model="profileData.desiredDepartureDate"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker 
                    :value="profileData.desiredDepartureDate"
                    @input="updateDates($event)"
                  no-title
                  scrollable
                  actions
                  :allowed-dates="allowedDepartureDates">
                    <template scope="{ cancel }">
                      <v-card-actions>
                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
        </v-menu>
        </v-flex>
        <v-flex xs3>
        <div>Desired RNLTD</div>
        <v-menu
                  lazy
                  :close-on-content-click="true"
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
                    v-model="profileData.desiredRNLTD"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker 
                    v-model="profileData.desiredRNLTD"
                  no-title
                  scrollable
                  actions
                  :allowed-dates="allowedRNLTD">
                    <template scope="{ cancel }">
                      <v-card-actions>
                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
        </v-menu>
        </v-flex>
        <v-flex xs3>
        <div>Quals</div>
        <v-select
          :items="qualList"
          v-model="profileData.qualifications"
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
          v-model="profileData.interests"
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
              v-model="profileData.comment"
              textarea
        ></v-text-field>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </div>
  <v-layout row class="mt-2">
      <v-flex xs12 offset-sm3 sm6 offset-md4 md4 class="text-xs-center">
      <v-btn block large primary @click.native="submit">Submit</v-btn>
      <v-snackbar
        :timeout="1000"
        :top="true"
        v-model="snackbar"
      >Submitted!<v-btn flat class="blue--text" @click.native="snackbar = false">Close</v-btn></v-snackbar>
      </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import { store } from '@/store'
import { mapGetters } from 'vuex'
var ajh4 = require('@/format/location_format')
var abc = require('@/format/abc')
var aac = require('@/format/aac')
var alc = require('@/format/alc')
var course = require('@/format/course')
export default {
  props: ['id'],
  data(){
    return {
      snackbar: false,
      snackbarSave: false,
      profileData: JSON.parse(localStorage.getItem("profileData")),
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
      showDDD: false,
      showRNLTD: false,
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
    }
  },
  methods: {
      //make selectable departure dates dynamic: force departure date to always be less than desired RNLTD
      allowedDepartureDates: function(date){
          var datePart = date.toISOString().split('T')[0]
          return datePart <= this.endCycle & datePart >= this.startCycle 
      },
      //make selectable RNLTDs dynamic: force RNLTD to be after desired departure date
      allowedRNLTD: function(date){
          var datePart = date.toISOString().split('T')[0]
          return datePart <= this.endCycle & datePart > this.profileData.desiredDepartureDate 
      },
      //use this function to automatically update desired RNLTD to day after chosen desiredDepartureDate
      updateDates(event) {
          //event is chosen desired Departure Date
          this.profileData.desiredDepartureDate = event

          //if chosen desiredDepartureDate is greater than current desiredRNLTD, 
          //must update desiredRNLTD automatically (update to selected date plus one)
          if (event >= this.profileData.desiredRNLTD) {
              //disgusting way to increment date by one day and return string form of date - can't find a better way
              var desiredDDPlusOne = new Date(this.profileData.desiredDepartureDate)
              desiredDDPlusOne.setDate(desiredDDPlusOne.getDate() + 1)
              var desiredDDPlusOne_t = desiredDDPlusOne.toISOString().split('T')[0] 
              //set desiredRNLTD to day after chosen desiredDepartureDate 
              this.profileData.desiredRNLTD = desiredDDPlusOne_t
          } 
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
    },
    save() {
        localStorage.setItem("profileData", JSON.stringify(this.profileData))
        this.snackbarSave = true
        
    },
    submit() {
        //must stringify profileData before setting to localStorage
        localStorage.setItem("profileData", JSON.stringify(this.profileData))
        window.axios.post('/officers', {
            comment: this.profileData.comment,
            desiredDepartureDate: this.profileData.desiredDepartureDate,
            desiredRNLTD: this.profileData.desiredRNLTD,
            qualifications: this.profileData.qualifications,
            interests: this.profileData.interests
        }) 
        .then((response)=>{
            console.log('information sent')
            this.snackbar = true
        })
        .catch((err)=>{
            console.log(err)
            this.snackbar = false
        })
    }
  },
  computed: {
    ...mapGetters([
        'startCycle',
        'firstRNLTD',
        'endCycle'
    ]),
    profileId(){
      return this.id ? this.id : store.getters.userId
    },
    prettyData(){
      if (this.profileData){
        return JSON.stringify(this.profileData, null, 2);
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
      return rank_obj[this.profileData.general.grade]
    },
    service_dates_array(){
      var temp = []
      for (name in this.profileData.service_dates){
        temp.push({"name": name.toUpperCase(), "date": this.profileData.service_dates[name]})
      }
      return temp
    }
  },
  mounted: function(){
      console.log('mounted profile')
      console.log(this.profileData)
  }
}
</script>
