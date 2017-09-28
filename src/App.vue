<template>
<v-app id="app">
  <app-navbar></app-navbar>
      <main class="mt-5">
          <div id="page-content-wrapper">
            <router-view></router-view>
          </div>
      </main>
</v-app>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: {
    appNavbar: Navbar
  },
  name: 'app'
}
</script>
