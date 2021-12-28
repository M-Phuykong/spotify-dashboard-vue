<template>
  <div id="Home">
    <Header></Header>
<!-- 
    <div class="container">
      <div class="screen">
        <div class="screen_header"></div>
        <div class="screen_body h-100"> -->
          <!-- <img :src="user.images[0].url" /> -->
          <!-- <h2>{{ user.display_name }}</h2>
          <h2>{{ user.email }}</h2>
          <h2>{{ user.country }}</h2>
          <h2>{{ user.external_urls.spotify }}</h2>
        </div>
      </div>
    </div> -->

  
    <div class="profile_card">
      <img :src="user.images[0].url" />
      <div class="profile_name">{{ user.display_name }}</div>
      <div class="profile_position">{{ user.email }}</div>
      <div class="profile_overview">
          <div class="profile_overview">
              <div class="row text-center">
                  <div class="col-sm">
                    <h3>{{user.country}}</h3>
                    <p>Country</p>
                  </div>
                  <div class="col-sm">
                    <h3 style="text-transform: capitalize;">{{user.product}}</h3>
                    <p>Type</p>
                  </div>
                  <div class="col-sm">
                    <h3>{{user.followers.total}}</h3>
                    <p>Followers</p>
                  </div>
              </div>
          </div>
      </div>
    </div>


  

    <Footer></Footer>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      user: [],
    };
  },
  created() {
    if (window.location.search.length > 0) {
      this.handleRedirect();
    } else {
      var refresh_token = localStorage.getItem("refresh_token");
      var access_token = localStorage.getItem("access_token");
      this.$store.commit("setAccessToken", access_token);
      this.$store.commit("setRefreshToken", refresh_token);
      this.getUser();
    }
  },
  methods: {
    getUser: function () {
      var access_token = localStorage.getItem("access_token");
      const header = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      };
      var url = `https://api.spotify.com/v1/me`;
      axios
        .get(url, { headers: header })
        .then((response) => {
          if (response.status == 200) {
            this.user = response.data;
            console.log(response.data);
          }
        })
        .catch(() => {
          this.fetchRefreshToken();
        });
    },
    handleRedirect: function () {
      let code = this.getCode();
      this.fetchAccessToken(code);
      window.history.pushState("", "", this.$home_uri);
    },
    getCode: function () {
      let code = null;
      const queryString = window.location.search;
      if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get("code");
      }

      return code;
    },
    fetchAccessToken: function (code) {
      let body = "grant_type=authorization_code";
      body += "&code=" + code;
      body += "&redirect_uri=" + encodeURI(this.$home_uri);
      body += "&client_id=" + this.$client_id;
      body += "&client_secret=" + this.$client_secret;
      this.callAuthorizationApi(body);
    },
    fetchRefreshToken: function () {
      var refresh_token = localStorage.getItem("refresh_token");
      let body = "grant_type=refresh_token";
      body += "&refresh_token=" + refresh_token;
      body += "&client_id=" + this.$client_id;
      this.callAuthorizationApi(body);
    },
    callAuthorizationApi: function (body) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "https://accounts.spotify.com/api/token", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader(
        "Authorization",
        "Basic " + btoa(this.$client_id + ":" + this.$client_secret)
      );
      xhr.send(body);
      xhr.onload = () => {
        var data = JSON.parse(xhr.responseText);
        if (data.access_token != undefined) {
          localStorage.setItem("access_token", data.access_token);
          this.$store.commit("setAccessToken", data.access_token);
        }
        if (data.refresh_token != undefined) {
          localStorage.setItem("refresh_token", data.refresh_token);
          this.$store.commit("setRefreshToken", data.refresh_token);
        }
        this.getUser();
      };
    },
  },
};
</script>

<style scoped>

#Home {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  margin-top: 2%;
  height: auto;
}

.screen {
  position: relative;
  background: rgb(57, 90, 133);
  border-radius: 15px;
  height: 75vh;
}

.screen_header {
  display: flex;
  align-items: center;
  height: 20px;
  padding: 10px 20px;
  background: rgb(223, 223, 105);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.screen .screen_body {
  text-align: center;
}

img {
  height: 100%;
  width: 100%;
}

.profile_card {
  width: 21rem;
  height: 22.5rem;
  background-color: transparent;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  margin: 10px auto;
  margin-top: 8vh;
  cursor: pointer;
}

.profile_card img{
  transition: all 0.15s linear;
}

.profile_card .profile_name{
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 2rem;
  font-weight: bold;
  color: #FFF;
  padding: 15px 20px 5px;
  background: linear-gradient(140deg, rgba(0, 0, 0, 0.4) 50%, rgba(255, 255, 0, 0) 50%);
  transition: all 0.15s linear;
}

.profile_card .profile_position {
    position: absolute;
    color: rgba(255, 255, 255, 0.4);
    left: 30px;
    top: 4.8rem;
    transition: all 0.15s linear;
}

.profile_card .profile_overview {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 50%, rgba(255, 255, 0, 0));
    color: #FFF;
    padding: 50px 0px 20px 0px;
    transition: all 0.15s linear;
}

.profile-card .profile_overview h3 {
    font-weight: bold;
}

.profile_card .profile_overview p {
    color: rgba(255, 255, 255, 0.7);
}

.profile_card:hover img {
    filter: brightness(80%);
}

.profile_card:hover .profile_name {
    padding-left: 25px;
    padding-top: 20px;
}

.profile_card:hover .profile_position {
    left: 40px;
    color: white;
}

.profile_card:hover .profile_overview {
    padding-bottom: 25px;
}




</style>