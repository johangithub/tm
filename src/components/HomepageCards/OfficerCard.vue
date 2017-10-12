<template>
    <v-card style="border-radius: 4px;" elevation-10>
        <v-card-media
                  class="headline"
                  height="200px"
                  src="/static/f-15.jpg"
                >
        </v-card-media>
        <v-card-title class="pt-2 pb-0">
          <div class="headline">
              Officers
          </div>
        </v-card-title>
        <v-card-text class="pt-0 pb-2">
            <div class="item">Self-Advertise</div>
            <div class="item">Find Billets</div>
            <div class="item">Rank Billets</div>
        </v-card-text>
        <v-card-actions class="pt-0">
            <v-btn flat primary to="/stepper_officer" router>Begin</v-btn>  
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
