<template>
  <div class="container-fluid text-center" id="home">
    
    <h1> Home Page</h1>
    <h2>{{user.display_name}}</h2>
    <img :src="user.images[0].url">
    <h3>{{user.country}}</h3>
    <h3>{{user.uri}}</h3>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    
  },
  data(){
    return {
      user: []
    }
  },
  created() {
      if (window.location.search.length > 0){
        this.handleRedirect();
        this.getUser()
      }
      else{
        this.getUser()
        var refresh_token = localStorage.getItem("refresh_token")
        var access_token = localStorage.getItem("access_token")
        this.$store.commit('setAccessToken', access_token);
        this.$store.commit('setRefreshToken', refresh_token);
      }
  },
  methods: {
    getUser: function(){
      var access_token = localStorage.getItem("access_token");
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
            var url = `https://api.spotify.com/v1/me`
            axios.get( url , {headers: header})
            .then(response => {
                if (response.status == 200){
                    this.user = response.data
                    console.log(response.data)
                }
            })
            .catch(() =>{
                this.fetchRefreshToken()
            })
    },
    handleRedirect: function(){
      let code = this.getCode();
      this.fetchAccessToken( code );
      window.history.pushState("", "", this.$home_uri);
    },
    getCode: function(){
      let code = null;
      const queryString = window.location.search;
      if ( queryString.length > 0){
          const urlParams = new URLSearchParams(queryString);
          code = urlParams.get('code')
      }

      return code;
    },
    fetchAccessToken: function( code ){
      let body = "grant_type=authorization_code";
      body += "&code=" + code; 
      body += "&redirect_uri=" + encodeURI(this.$home_uri);
      body += "&client_id=" + this.$client_id;
      body += "&client_secret=" + this.$client_secret;
      this.callAuthorizationApi(body);
    },
    fetchRefreshToken: function(){
      var refresh_token = localStorage.getItem("refresh_token");
      let body = "grant_type=refresh_token";
      body += "&refresh_token=" + refresh_token;
      body += "&client_id=" + this.$client_id;
      this.callAuthorizationApi(body);
    },
    callAuthorizationApi: function(body){
      let xhr = new XMLHttpRequest();
      xhr.open("POST",'https://accounts.spotify.com/api/token', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(this.$client_id + ":" + this.$client_secret));
      xhr.send(body);
      xhr.onload = () => {
        var data = JSON.parse(xhr.responseText);
        if ( data.access_token != undefined ){
          localStorage.setItem("access_token", data.access_token);
          this.$store.commit('setAccessToken', data.access_token);
        }
        if ( data.refresh_token  != undefined ){
          localStorage.setItem("refresh_token", data.refresh_token);
          this.$store.commit('setRefreshToken', data.refresh_token);
        }
        
      };
    }
  }
}
</script>

<style scoped>

</style>