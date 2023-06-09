<script>
//import { useAuth0 } from '@auth0/auth0-vue'

import JammetestNavbar from './components/JammetestNavbar.vue'

export default {
  components: {
    JammetestNavbar,
  }
}

</script>
<template>
  <div class="container vw-100 fixed-top">
    <div class="row">
      <div class="col-lg-12">
        <JammetestNavbar></JammetestNavbar>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>