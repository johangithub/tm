<template>
    <v-card class="elevation-8">
        <v-card-media
                  class="headline"
                  height="200px"
                  src="/static/porch.jpg"
                >
        </v-card-media>
        <v-card-title class="pt-2 pb-0">
          <div class="headline">
             CFM/AO 
          </div>
        </v-card-title>
        <v-card-text class="pt-0 pb-2">
            <div class="item">Supervise the process!</div>
        </v-card-text>
        <v-card-actions class="pt-0">
            <v-btn flat primary to="/cfm_dashboard" router>Begin</v-btn>  
        </v-card-actions>
    </v-card>
</template>

<script>
</script>

<style scoped>
.item {
    font-size: 13pt;
    opacity: 0.84;
}
</style>
