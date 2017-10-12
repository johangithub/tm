<template>
<v-card>
    <v-card-media
              class="headline"
              height="200px"
              src="/static/iron-eagle.jpg"
            >
    </v-card-media>
    <v-card-title class="pt-2 pb-0">
      <div class="headline">
          Billet Owners
      </div>
    </v-card-title>
    <v-card-text class="pt-0 pb-2">
        <div class="item">Advertise Your Billet</div>
        <div class="item">Find Officers</div>
        <div class="item">Rank Officers</div>
    </v-card-text>
    <v-card-actions class="pt-0">
        <v-btn flat primary to="/stepper_billetowner" router>Begin</v-btn>  
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
