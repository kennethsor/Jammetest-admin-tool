<script>
export default {
  data() {
    return {
      isAuthenticated: this.$auth0.isAuthenticated
    }
  },
  methods: {
    loginOrOut() {
      if(this.isAuthenticated){
        this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
      }
      else{
        this.$auth0.loginWithRedirect();
      }
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Jammetest</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/About">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" @click="loginOrOut">{{ isAuthenticated ? "Logout" : "Login"}}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>