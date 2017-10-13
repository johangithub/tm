<template>
<v-card>
    <v-card-media
              class="headline"
              height="200px"
              src="/static/iron-eagle.jpg"
            >
    </v-card-media>
    <v-card-title class="pt-2 pb-0">
      <div class="headline">Losing Commanders</div>
    </v-card-title>
    <v-card-text class="pt-0 pb-2">
        <div class="item">Rank Your Officers</div>
        <div class="item">Vector your Officers</div>
        <div class="item">Provide Comments</div>
    </v-card-text>
    <v-card-actions class="pt-0">
        <v-btn flat primary to="/losing_commander" router>Begin</v-btn>  
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
