<template>
  <v-container id="home">
  <h4>Welcome to the Air Force Talent Marketplace</h4>  
  <p>Congratulations! As an active participant on the FY18 Summer VML cycle, you have been chosen to help shape the future Air Force assignment system.</p>
  <v-layout row>
  <v-flex xs6>
  <v-card>
    <v-card-media
              class="headline"
              height="300px"
              src="/static/airforce_pilot.jpg"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span>Officers</span>
                  </v-flex>
                </v-layout>
              </v-container>
    </v-card-media>
    <v-card-title>
      <div class="headline">Update your profile</div>
    You're more than what's on your SURF. Your first step is to input your work experience, skills, and other relevant information in MyVector. We've provided a guide for you here. This information will be seen by billet owners as they search for officers that are most suitable for their positions. Tip: The more information you provide, the better the billet owners will be able to make an assessment on choosing specific officers. Please provide this information by 31 January 2017 so that gaining commanders have enough time to search.
    </v-card-title>
    <v-divider></v-divider>
    <v-card-title>
      <div class="headline">Find jobs you're interested in.</div>
    The Find a Billet tool lets you quickly filter down to billets you'd like to fill. Thanks to the participation by billet owners, you'll see a lot more data then you would in AMS. Feel free to reach out to billet POCs who have made their contact information public!
    </v-card-title>
    <v-divider></v-divider>
    <v-card-title>
      <div class="headline">Submit your preference.</div>
      Once you've found assignments that you want, fill out your dream sheet by 3 March 2017.
    </v-card-title>
  </v-card>
  </v-flex>
  <v-flex>
  <v-card>
    <v-card-media
              class="headline"
              height="300px"
              src="/static/beach.jpg"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span>Billets</span>
                  </v-flex>
                </v-layout>
              </v-container>
    </v-card-media>
    </v-card>
  </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      title: 'Air Foce Talent Marketplace Home Page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
