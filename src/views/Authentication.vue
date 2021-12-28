<template>
  <div id="Authentication">
    <div class="authentication">
      <button class="authenticateBttn" v-on:click="requestAuthorization"> Get Authentication Spotify</button>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './Footer.vue'

export default {
  name: 'Authentication',
  components: {
    Footer,
  },
  methods: {
      requestAuthorization: function () {
          let url = "https://accounts.spotify.com/authorize";
          url += "?client_id=" + this.$client_id;
          url += "&response_type=code";
          url += "&redirect_uri=" + encodeURI(this.$home_uri);
          url += "&show_dialog=true";
          url += "&scope=user-read-private user-top-read user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
          window.location.href = url;
      }
  }
}

</script>

<style scoped>

#Authentication{
  height: 100vh;
  display: flex;
  flex-direction: column;
}


.authentication{
  margin-top: 300px;
  text-align: center;
  align-items: center;
  align-content: center;
}

.authentication button{
    color: green;
    height: 100px;
    width: 200px;
}

</style>