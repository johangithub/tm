<template>
<v-card class="elevation-8">
    <v-card-media
              class="headline"
              height="300px"
              src="/static/majcom.jpg"
            >
    </v-card-media>
    <v-card-title class="pt-2 pb-0">
      <div class="headline">
         MAJCOM Owner 
      </div>
    </v-card-title>
    <v-card-text class="pt-0 pb-2">
        <div class="item">Sort and Filter your Billets</div>
        <div class="item">Rank your billets</div>
    </v-card-text>
    <v-card-actions class="pt-0">
        <v-btn flat primary to="/stepper_majcom" router>Begin</v-btn>  
    </v-card-actions>
</v-card>
</template>

<script></script>

<style scoped>
.item {
    font-size: 13pt;
    opacity: 0.84;
}
</style>
