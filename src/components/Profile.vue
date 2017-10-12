<template>
  <v-container fluid id="profile">
  <v-layout row>
      <h4>{{rank}} {{profileData.firstName}} {{profileData.lastName}}</h4>
  </v-layout>

<v-layout row wrap>
  <v-flex xs12 sm6 md3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header" class="title">General</div>
        <v-card>
          <v-card-text class="grey lighten-3">
              <v-layout row>
              <v-flex xs4>
                  <text-field :value="profileData.general.grade">Grade:</text-field>
              </v-flex>
              <v-flex xs8>
                  <text-field :value="profileData.general.component">Component:</text-field>
              </v-flex>
              </v-layout>
              <v-layout row>
              <v-flex xs6>
                  <text-field :value="profileData.general.comp_cat">Funct. Category:</text-field>
              </v-flex>
              <v-flex xs6>
                  <text-field :value="profileData.general.comp_cat">Comp. Category:</text-field>
              </v-flex>
              </v-layout>
              <v-layout row wrap>
                  <v-flex xs6>
                      <text-field :value="profileData.general.record_status">Record Status:</text-field>
                  </v-flex xs6>
                  <v-flex xs6>
                      <text-field :value="profileData.general.short_tour_num">Short Tour:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row wrap>
                  <v-flex>
                      <text-field :value="profileData.general.accounting_status">Accounting Status:</text-field>
                  </v-flex>
              </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <v-flex xs12 sm6 md3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header" class="title">Current</div>
        <!--show CAFSC or PAFSC?-->
        <v-card>
          <v-card-text class="grey lighten-3">
              <v-layout row>
                  <v-flex xs12>
                      <text-field :value="profileData.duty.pas">PASCODE:</text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs6>
                      <text-field :value="profileData.duty.dafsc">DAFSC:</text-field>
                  </v-flex>
                  <v-flex xs6>
                      <text-field :value="profileData.duty.core_afsc">CAFSC:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <text-field :value="profileData.duty.status_ct">Duty Status:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <text-field :value="profileData.duty.title">Duty Title:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <text-field :value="profileData.duty.location">Base:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <text-field :value="profileData.duty.unit">Unit:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <text-field :value="profileData.duty.org_level">Organization Level:</text-field>
                  </v-flex> 
              </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <v-flex xs12 sm6 md3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header" class="title">Projected</div>
        <v-card>
          <v-card-text class="grey lighten-3">
              <v-layout row wrap>
                  <v-flex xs12>
                      <text-field :value="profileData.projected.assignment.pas">PASCODE:</text-field>
                  </v-flex>
                  <v-flex xs12>
                      <text-field :value="profileData.projected.assignment.afsc">Projected AFSC:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row wrap>
                  <v-flex xs12>
                      <text-field :value="profileData.projected.assignment.asd">Assignment Selection Date:</text-field>
                  </v-flex>
                  <v-flex xs12>
                      <text-field :value="profileData.projected.assignment.pdd">PDD:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row wrap>
                  <v-flex xs12>
                      <text-field :value="profileData.projected.assignment.rnltd">RNLTD:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row wrap>
                  <v-flex xs12>
                      <text-field :value="profileData.projected.duty.eff_date">Duty Effective Date:</text-field>
                  </v-flex>
                  <v-flex xs12>
                      <text-field :value="profileData.projected.duty.exp_date">Duty Expiration Date:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row wrap>
                  <v-flex xs12>
                      <text-field :value="profileData.projected.duty.status">Duty Status:</text-field>
                  </v-flex>
                  <v-flex xs12>
                      <text-field :value="profileData.projected.duty.afsc_pending">DAFSC:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row wrap>
                  <v-flex xs12>
                      <text-field :value="profileData.projected.duty.title_pending">Duty Title:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row wrap>
                  <v-flex xs12>
                      <text-field :value="profileData.projected.duty.cmd_lvl_pending">Organization Level:</text-field>
                  </v-flex>
              </v-layout>
              <!--projected courses-->
              <v-layout row>
                  <v-flex xs12>
                      <block-text-field :value="profileData.projected.course"
                                        :table="true"
                                        :headers="['Course']">
                          Projected Courses 
                          <template slot="row" scope="props">
                              <td>{{props.item.course}}</td>
                          </template>  
                      </block-text-field> 
                  </v-flex>
              </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <v-flex xs12 sm6 md3>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header" class="title">Assignment Codes</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <!--block codes-->
          <v-layout row>
              <v-flex xs12>
                  <block-text-field :value="profileData.asgn_code.block_code"
                                    :table="true"
                                    :headers="['Code','Date']">
                      Block Codes
                      <template slot="row" scope="props">
                          <td>
                              <div v-tooltip:left="{ html: abcFormat(props.item.code) }">
                                  {{props.item.code}}
                              </div>
                          </td>
                          <td>{{props.item.date}}</td>
                      </template>  
                  </block-text-field> 
              </v-flex>
          </v-layout>
          <!--availability codes-->
          <v-layout row>
              <v-flex xs12>
                  <block-text-field :value="profileData.asgn_code.avail_code"
                                    :table="true"
                                    :headers="['Code','Date']">
                      Availability Codes
                      <template slot="row" scope="props">
                          <td>
                              <div v-tooltip:left="{ html: aacFormat(props.item.code) }">
                                  {{props.item.code}}
                              </div>
                          </td>
                          <td>{{props.item.date}}</td>
                      </template>  
                  </block-text-field> 
              </v-flex>
          </v-layout>
          <!--limitation codes-->
          <v-layout row>
              <v-flex xs12>
                  <block-text-field :value="profileData.asgn_code.limit_code"
                                    :table="true"
                                    :headers="['Code','Date']">
                      Limitation Codes
                      <template slot="row" scope="props">
                          <td>
                              <div v-tooltip:left="{ html: alcFormat(props.item.code) }">
                              {{props.item.code}}
                              </div>
                          </td>
                          <td>{{props.item.date}}</td>
                      </template>  
                  </block-text-field> 
              </v-flex>
          </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
</v-layout>
<v-layout row wrap>
    <v-flex xs12 md4>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header" class="title">PME</div>
        <v-card>
          <v-card-text class="grey lighten-3">
              <v-layout row>
                  <v-flex xs12>
                      <text-field :value="profileData.pme.pme_highest">PME Highest:</text-field>
                  </v-flex>
              </v-layout> 
              <v-layout row>
                  <v-flex xs12>
                  <block-text-field :value="profileData.pme.history"
                                    :table="true"
                                    :headers="['Level','Course','Date']">
                      Courses
                      <template slot="row" scope="props">
                          <td>{{props.item.level || "None"}}</td>
                          <td>{{props.item.course}}</td>
                          <!-- <td>{{props.item.method}}</td> -->
                          <td>{{props.item.date}}</td>
                      </template>
                  </block-text-field> 
                  </v-flex>
              </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <v-flex xs12 md4>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header" class="title">Service Dates</div>
          <v-card>
              <v-card-text class="grey lighten-3">
                  <v-layout row>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.das">DAS:</text-field>
                      </v-flex>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.ddlds">DDLDS:</text-field>
                      </v-flex>
                  </v-layout> 
                  <v-layout row>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.duty_status_eff_date">Duty Status Eff. Date:</text-field>
                      </v-flex>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.odsd">ODSD:</text-field>
                      </v-flex>
                  </v-layout> 
                  <v-layout row>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.grade_eff_date">Grade Eff. Date:</text-field>
                      </v-flex>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.dor">DOR:</text-field>
                      </v-flex>
                  </v-layout> 
                  <v-layout row>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.strd">STRD:</text-field>
                      </v-flex>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.cc_date">CC Date:</text-field>
                      </v-flex>
                  </v-layout> 
                  <v-layout row>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.ead">EAD:</text-field>
                      </v-flex>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.pay_date">Pay Date:</text-field>
                      </v-flex>
                  </v-layout> 
                  <v-layout row>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.tafcsd">TAFCSD:</text-field>
                      </v-flex>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.tfcsd">TFCSD:</text-field>
                      </v-flex>
                  </v-layout> 
                  <v-layout row>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.tafmsd">TAFMSD:</text-field>
                      </v-flex>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.deros">DEROS:</text-field>
                      </v-flex>
                  </v-layout> 
                  <v-layout row>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.dos">DOS:</text-field>
                      </v-flex>
                      <v-flex xs6>
                          <text-field :value="profileData.service_dates.retsep_eff_date_proj">Ret/Sep Eff. Date Proj.:</text-field>
                      </v-flex>
                  </v-layout> 
              </v-card-text>
          </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-flex>

  <v-flex xs12 md4>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header" class="title">Courses</div>
        <v-card>
          <v-card-text class="grey lighten-3">
          <!--courses-->
          <v-layout row>
              <v-flex xs12>
                  <block-text-field :value="profileData.courses"
                                    :table="true"
                                    :headers="['Course','Date']">
                      Courses
                      <template slot="row" scope="props">
                          <td>
                              <div v-tooltip:left="{ html: courseFormat(props.item.course) }">
                                  {{props.item.course}}
                              </div>
                          </td>
                          <td>{{props.item.date}}</td>
                      </template>  
                  </block-text-field> 
              </v-flex>
          </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
</v-layout>
  <v-layout row wrap>
  <v-flex xs12 md6>
    <v-expansion-panel class="mt-2">
      <v-expansion-panel-content>
        <div slot="header" class="title">Joint</div>
        <v-card>
          <v-card-text class="grey lighten-3">
              <v-layout row>
                  <v-flex xs4>
                      <text-field :value="profileData.joint.jda_flag">JDA Flag:</text-field>
                  </v-flex>
                  <v-flex xs4>
                      <text-field :value="profileData.joint.jso_code">JSO Code:</text-field>
                  </v-flex>
                  <v-flex xs4>
                      <text-field :value="profileData.joint.jso_jsonum_status">JSO Status:</text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <block-text-field :value="profileData.joint.history"
                                        :table="true"
                                        :headers="['Type','Credit','Reason','Position','Start Date', 'Stop Date']">
                          Tours 
                          <template slot="row" scope="props">
                              <td>{{props.item.type}}</td>
                              <td>{{props.item.credit}}</td>
                              <td>{{props.item.reason}}</td>
                              <td style="width: 20%;">{{props.item.posn}}</td>
                              <td style="width: 20%;">{{props.item.start_date}}</td>
                              <td style="width: 20%;">{{props.item.stop_date}}</td>
                          </template>
                      </block-text-field> 
                  </v-flex>
              </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <v-flex xs12 md6>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header" class="title">Language</div>
      <v-card>
        <v-card-text class="grey lighten-3">
            <v-layout row>
                <v-flex xs6>
                    <text-field :value="profileData.language.dlab_score">DLAB Score:</text-field> 
                </v-flex>
                <v-flex xs6>
                    <text-field :value="profileData.language.dlab_date">DLAB Date:</text-field> 
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                  <block-text-field :value="profileData.language.list"
                                    :table="true"
                                    :headers="['ID','Listen','Read','Date']">
                      Language Proficiencies
                      <template slot="row" scope="props">
                          <td>{{props.item.id}}</td>
                          <td>{{props.item.listen}}</td>
                          <td>{{props.item.read}}</td>
                          <td>{{props.item.date}}</td>
                      </template>
                  </block-text-field> 
                </v-flex>
            </v-layout>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-flex>
  </v-layout>
  <v-layout row>
      <v-flex xs12>
      <v-expansion-panel class="mt-2">
        <v-expansion-panel-content>
          <div slot="header" class="title">Degrees</div>
          <v-card>
            <v-card-text class="grey lighten-3">
              <v-layout row>
                  <v-flex xs12>
                      <block-text-field :value="profileData.degree.history"
                                        :table="true"
                                        :headers="['Degree','Level','Method','School','Date Awarded']">
                          Degrees 
                          <template slot="row" scope="props">
                              <td style="width: 40%;">{{props.item.degree_ct}}</td>
                              <td>{{props.item.level}}</td>
                              <td>{{props.item.method}}</td>
                              <td>{{props.item.school}}</td>
                              <td>{{props.item.date}}</td>
                          </template>
                      </block-text-field> 
                  </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      </v-flex>
  </v-layout>
  <v-layout row wrap>
  <v-flex xs12 sm12 md4>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header" class="title">Rated Data</div>
      <v-card>
        <v-card-text class="grey lighten-3">
            <v-layout row>
                <v-flex xs6>
                    <text-field :value="profileData.rated.aero_rating_ct">Aero Rating:</text-field>  
                </v-flex>
                <v-flex xs6>
                    <text-field :value="profileData.rated.flt_activity_code">Flight Activity Code:</text-field>  
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6>
                    <text-field :value="profileData.rated.gates_curr">Gates Current:</text-field>  
                </v-flex>
                <v-flex xs6>
                    <text-field :value="Math.round(profileData.rated.flt_hrs_combat) || '0'">Combat Hours:</text-field>  
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6>
                    <text-field :value="Math.round(profileData.rated.flt_hrs_instr)">Instructor Hours:</text-field>  
                </v-flex>
                <v-flex xs6>
                    <text-field :value="Math.round(profileData.rated.flt_hrs_total)">Total Hours:</text-field>  
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <text-field :value="profileData.rated.avn_service_code_ct">Aviation Service Code:</text-field>  
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs4>
                    <text-field :value="profileData.rated.rdtm">RDTM:</text-field>  
                </v-flex>
                <v-flex xs6>
                    <text-field :value="profileData.rated.aircrew_position_id">Aircrew Position ID:</text-field>  
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs4>
                    <text-field :value="profileData.rated.avn_service_date">Aviation Service Date:</text-field>  
                </v-flex>
                <v-flex xs4>
                    <text-field :value="profileData.rated.aero_rating_date">Aero Rating Date:</text-field>  
                </v-flex>
                <v-flex xs4>
                    <text-field :value="profileData.rated.return_to_fly_date">Return to Fly Date:</text-field>  
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs4>
                    <text-field :value="profileData.rated.acp_elig_date">ACP Eligible Date:</text-field>  
                </v-flex>
                <v-flex xs4>
                    <text-field :value="profileData.rated.acp_effective_date">ACP Effective Date:</text-field>  
                </v-flex>
                <v-flex xs4>
                    <text-field :value="profileData.rated.acp_stop_date">ACP Stop Date:</text-field>  
                </v-flex>
            </v-layout>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-flex>
  <v-flex xs12 sm6 md4>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header" class="title">Aircraft Data</div>
      <v-card>
        <v-card-text class="grey lighten-3">
              <v-layout row>
                  <v-flex xs12>
                      <block-text-field :value="profileData.rated.aircraft_history"
                                        :table="true"
                                        :headers="['Aircraft','Hours','Date Last Flown']">
                          Aircraft 
                          <template slot="row" scope="props">
                              <td>{{props.item.aircraft}}</td>
                              <td>{{Math.round(props.item.hours)}}</td>
                              <td>{{props.item.aircraft_date_flown}}</td>
                          </template>
                      </block-text-field> 
                  </v-flex>
              </v-layout>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-flex>
  <v-flex xs12 sm6 md4>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header" class="title">Exp Identifier</div>
      <v-card>
        <v-card-text class="grey lighten-3">
              <v-layout row>
                  <v-flex xs12>
                      <block-text-field :value="profileData.special_experience.nuclear"
                                        :table="true"
                                        :headers="['NEI','Start Date', 'Stop Date']">
                          Nuclear
                          <template slot="row" scope="props">
                              <td>{{props.item.nei}}</td>
                              <td>{{props.item.start_date}}</td>
                              <td>{{props.item.stop_date}}</td>
                          </template>
                      </block-text-field> 
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <!--only expect one column with SEI, don't show in table-->
                      <block-text-field :value="profileData.special_experience.sei">
                          SEI 
                          <template slot="text" scope="props">
                              <span>{{props.item.sei}}</span>
                          </template>
                      </block-text-field> 
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <block-text-field :value="profileData.special_experience.acquisitions"
                                        :table="true"
                                        :headers="['Career Level','Position Type', 'Position Category']">
                          Acquisitions 
                          <template slot="row" scope="props">
                              <td>{{props.item.career_level}}</td>
                              <td>{{props.item.posn_type}}</td>
                              <td>{{props.item.posn_cat}}</td>
                          </template>
                      </block-text-field> 
                  </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs12>
                      <text-field :value="profileData.special_experience.WIC">WIC</text-field>
                  </v-flex>
              </v-layout>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-flex>
  </v-layout>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header" class="title">Duty History</div>
      <v-layout row>
          <v-flex xs12>
              <v-card>
                  <v-card-text class="grey lighten-3">
                    <v-data-table
                      :headers="duty_history_headers"
                      :items="profileData.duty.history"
                      class="data-table"
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
                  </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
    </v-expansion-panel-content>
  </v-expansion-panel>


  <v-expansion-panel class="mt-2">
    <v-expansion-panel-content>
      <div slot="header" class="title">Self Advertise</div>
      <v-card class="grey lighten-3">
           <!--<v-layout row class="pr-2 pt-2">-->
              <!--<v-spacer></v-spacer>-->
              <!--<v-btn small success @click.native="save">Save</v-btn>-->
              <!--<v-snackbar-->
                <!--:timeout="1000"-->
                <!--:top="true"-->
                <!--v-model="snackbarSave"-->
              <!--Saved!<v-btn flat class="green--text" @click.native="snackbarSave = false">Close</v-btn></v-snackbar>-->
         <!--</v-layout> -->
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
<!--   <v-layout row class="mt-2">
      <v-flex xs12 offset-sm3 sm6 offset-md4 md4 class="text-xs-center">
      <v-btn block large primary @click.native="submit">Submit</v-btn>
      <v-snackbar
        :timeout="1000"
        :top="true"
        v-model="snackbar"
      >Submitted!<v-btn flat class="blue--text" @click.native="snackbar = false">Close</v-btn></v-snackbar>
      </v-flex>
  </v-layout> -->
  </v-container>
</template>

<script>
import { store } from '@/store'
import { mapGetters } from 'vuex'
import TextField from '@/components/TextField'
import BlockTextField from '@/components/BlockTextField'
var ajh4 = require('@/format/location_format')
var abc = require('@/format/abc')
var aac = require('@/format/aac')
var alc = require('@/format/alc')
var course = require('@/format/course')
export default {
  props: ['id', 'value', 'profileData'],
  data(){
    return {
      snackbar: false,
      snackbarSave: false,
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
    // save() {
    //     localStorage.setItem("profileData", JSON.stringify(this.profileData))
    //     this.snackbarSave = true
        
    // },
    // submit() {
    //     //must stringify profileData before setting to localStorage
    //     localStorage.setItem("profileData", JSON.stringify(this.profileData))
    //     window.axios.post('/officers', {
    //         comment: this.profileData.comment,
    //         desiredDepartureDate: this.profileData.desiredDepartureDate,
    //         desiredRNLTD: this.profileData.desiredRNLTD,
    //         qualifications: this.profileData.qualifications,
    //         interests: this.profileData.interests
    //     }) 
    //     .then((response)=>{
    //         console.log('information sent')
    //         this.snackbar = true
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //         this.snackbar = false
    //     })
    // }
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
    // prettyData(){
    //   if (this.profileData){
    //     return JSON.stringify(this.profileData, null, 2);
    //   }
    //   else{
    //     return ""
    //   }
    // },
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
  components: {
    'text-field': TextField,
    'block-text-field': BlockTextField
  },
  mounted: function(){

  }
}
</script>

<style scoped>
.title {
    font-size: 18px;
}
.data-table {
    border-radius: 4px; 
    box-shadow: 0px 1px 4px 0px #888;
    box-sizing: border-box;
    margin: 4px 1px 4px 1px;
    font-family: Arial;
}
</style>
