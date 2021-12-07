<template>
  <div id="Authentication">
    <button id="AuthenticateBttn" v-on:click="requestAuthorization"> Get Authentication Spotify</button>
  </div>
</template>

<script>

export default {
  name: 'Authentication',
  components: {
    
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
  text-align: center;
}

#AuthenticateBttn{
    color: green;
    height: 100px;
    width: 200px;
}

</style>