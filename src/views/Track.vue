<template>
  <div id="Track">
    <Header></Header>

    <div class="track_configure_container container-fluid">
      <div class="top_container d-flex justify-content-center">
        <h2>Top&nbsp;</h2>

        <div class="track_group_form">
          <input
            class="num_of_track_input h-100"
            type="text"
            autocomplete="off"
            v-model="num_of_track"
            name="num_of_track_input"
            pattern="^$|([1-9]|[1-4][0-9]|50)"
            required
          />
          <span class="bar"></span>
          <label class="track_label" for="num_of_track_input"
            ># of Tracks (1-50)</label
          >
        </div>

        <h2>&nbsp;Tracks Within&nbsp;</h2>
        <select name="track_length_selector" id="track_length_selector">
          <option value="short_term">A Month</option>
          <option selected value="medium_term">The Last 6 Months</option>
          <option value="long_term">The Whole Lifetime</option>
        </select>
      </div>

      <div class="botton_container d-flex justify-content-center">
        <button
          class="search_button"
          @click="getTopTrack(num_of_track, period)"
        >
          Retreive My Result!
        </button>
      </div>
    </div>

    <div
      class="
        top_track_title_container
        container-fluid
        d-flex
        justify-content-center
      "
    >
      <div class="top_track_inner_container d-flex">
        <div class="emoji_downward">&#9196;</div>
        <div class="title">
          <h1>Top {{ track_count }} Tracks</h1>
        </div>
        <div class="emoji_downward">&#9196;</div>
      </div>
    </div>
    <!-- Card Stuff -->
    <div class="card_container container-fluid position-relative">
      <div v-if="track_count < 4">
        <div
          class="cards_wrap d-flex top-0 overflow-auto justify-content-center"
        >
          <div
            class="card_item"
            v-for="(item, index) in tracks"
            :key="`${index} - ${item.id}`"
          >
            <div class="card_inner position-relative">
              <div class="card_top d-flex top-0">
                <img :src="item.album.images[0].url" />
              </div>

              <div
                @click="showInfo(item)"
                class="
                  card_bottom
                  w-100
                  h-100
                  top-0
                  gx-0
                  position-absolute
                  justify-content-center
                "
              >
                <div class="container_bottom position-relative">
                  <div class="card_title">
                    {{ item.name }}
                  </div>
                  <div
                    class="
                      card_subtitle
                      d-flex
                      w-100
                      position-absolute
                      top-50
                      justify-content-center
                    "
                  >
                    |
                    <div
                      class="artist_name"
                      v-for="(artist, index) in item.artists"
                      :key="`${index} - ${item.id}`"
                    >
                      &nbsp;{{ artist.name }} |
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="cards_wrap d-flex top-0 overflow-auto">
        <div
          class="card_item"
          v-for="(item, index) in tracks"
          :key="`${index} - ${item.id}`"
        >
          <div class="card_inner position-relative">
            <div class="card_top d-flex top-0">
              <img :src="item.album.images[0].url" />
            </div>

            <div
              @click="showInfo(item)"
              class="
                card_bottom
                w-100
                h-100
                top-0
                gx-0
                position-absolute
                justify-content-center
              "
            >
              <div class="container_bottom position-relative">
                <div class="card_title">
                  {{ item.name }}
                </div>
                <div
                  class="
                    card_subtitle
                    d-flex
                    w-100
                    position-absolute
                    top-50
                    justify-content-center
                  "
                >
                  |
                  <div
                    class="artist_name"
                    v-for="(artist, index) in item.artists"
                    :key="`${index} - ${item.id}`"
                  >
                    &nbsp;{{ artist.name }} |
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
        class="
          button
          row
          justify-content-between
          w-100
          h-100
          top-0
          gx-0
          position-absolute
        "
      >
        <div class="col-1">
          <!-- Scroll Left -->
          <div class="prev" @mouseover="scroll(-1)" @mouseleave="stopScroll()">
            &#10094;
          </div>
        </div>
        <div class="col-1">
          <!-- Scroll Right -->
          <div class="next" @mouseover="scroll(1)" @mouseleave="stopScroll()">
            &#10095;
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
import Home from "./Home.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  name: "Track",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      tracks: [],
      tmptracks: [],
      isScroll: undefined,
      scrollX: 0,
      track_count: 20,
      num_of_track: 20,
      period: "medium_term",
    };
  },
  beforeMount() {
    this.getTopTrack(20, "medium_term");
  },
  mounted() {
    this.$nextTick(function () {
      // this.getNextTrack();

      var track_length_selector = document.getElementById("track_length_selector");
      track_length_selector.addEventListener("change", () => {
        this.period = track_length_selector.value;
      });
    });
  },
  methods: {
    getTopTrack: function (limit, time_range) {
      if (limit > 50 || limit < 1) return;
      var access_token = localStorage.getItem("access_token");
      const header = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      };
      var url = `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${time_range}`;
      axios
        .get(url, { headers: header })
        .then((response) => {
          if (response.status == 200) {
            this.tracks = response.data.items;
            this.tmptracks = response.data.items;
            this.track_count = limit;
          }
        })
        .catch(() => {
          Home.methods.fetchRefreshToken();
        });
    },
    showInfo: function (item) {
      //    window.open(
      //         item.preview_url,
      //         '_blank'
      //         );

      console.log(item);
    },
    scroll: function (number) {
      let content = document.getElementsByClassName("cards_wrap").item(0);
      this.isScroll = setInterval(() => {
        content.scrollLeft += 5 * number;
      }, 5);
    },
    stopScroll: function () {
      clearInterval(this.isScroll);
      this.isScroll = undefined;
    },
    getNextTrack: function () {
      let content = document.getElementsByClassName("cards_wrap").item(0);
      content.onscroll = () => {
        this.scrollX =
          content.scrollWidth - content.scrollLeft - content.clientWidth;
        var endOfScroll =
          Math.round(
            content.scrollWidth - content.scrollLeft - content.clientWidth
          ) === 0;
        if (endOfScroll) {
          var newTrack = this.tracks.concat(this.tmptracks);
          if (newTrack.length > this.tmptracks.length * 2) {
            newTrack = [];
            newTrack = this.tmptracks;
          }
          this.tracks = [];
          this.tracks = newTrack;
        }
      };
    },
  },
};
</script>


<style>
#Track {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

html {
  background-color: black;
}

h1,
h2 {
  color: #1db954;
}

* {
  scroll-behavior: auto;
  margin: 0;
  box-sizing: border-box;
}

body {
  background: transparent;
  font-size: 14px;
}

/* Track Input CSS Part */

.track_group_form {
  position: relative;
}

.num_of_track_input {
  padding: 10px 10px 10px 5px;
  display: block;
  width: 150px;
  border: none;
  border-bottom: 1px solid #757575;
  background: transparent;
  color: white;
  font-size: 1.2rem;
}

.num_of_track_input:focus {
  outline: none;
}

/* Label */
.track_label {
  color: #999;
  font-size: 15px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
}

/* Active State */
.num_of_track_input:focus ~ .track_label,
.num_of_track_input:valid ~ .track_label {
  top: -20px;
  font-size: 14px;
  color: #35af35;
}

/* Bottom Bar */
.bar {
  position: relative;
  display: block;
  width: 150px;
}

.bar::before,
.bar::after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #35af35;
  transition: 0.2s ease all;
}

.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

.num_of_track_input:focus ~ .bar:before,
.num_of_track_input:focus ~ .bar:after {
  width: 50%;
}

/* End */

.top_track_inner_container:hover > .emoji_downward {
  animation: arrow_pointing 250ms;
  animation-timing-function: cubic-bezier(0.2, 0.65, 0.6, 1);
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.top_track_title_container .top_track_inner_container .emoji_downward {
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 1.5rem;
  transition: transform 250ms;
}

.track_configure_container .top_container {
  margin-top: 2%;
}

.search_button {
  margin-top: 2%;
  margin-bottom: 2%;
}

img {
  display: block;
  width: auto;
  height: 100%;
  /* border-start-start-radius: 10px;
  border-start-end-radius: 10px; */
  border-radius: 10px;
}

.card_container {
  padding-right: 0;
  padding-left: 0;
  background: black;
  border-radius: 10px;
}

::-webkit-scrollbar {
  display: none;
}

.cards_wrap .card_item {
  width: auto;
  margin: 10px;
}

.cards_wrap .card_inner {
  height: 100%;
  width: auto;
  background: rgb(0, 0, 0);
}

.cards_wrap .card_top {
  width: auto;
  height: 500px;
  padding: 10px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0;
}

.cards_wrap .card_bottom {
  height: 100px;
  width: auto;
  text-align: center;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(22, 22, 22, 0.7251050933068539) 20%,
    rgba(43, 43, 43, 0) 72%
  );
}

#track_length_selector {
  margin: 0;
}

/* Hover Card Animation */

.cards_wrap .card_bottom:hover > .container_bottom .card_title {
  transform: translateY(-80%);
  opacity: 1;
}

.cards_wrap .card_bottom:hover > .container_bottom .card_title::after {
  transform: scale(1);
  opacity: 1;
  transition-delay: 0.1s;
  transition-duration: 0.2s;
}

.cards_wrap .card_bottom:hover > .container_bottom .card_subtitle {
  transform: translateY(-55%);
  opacity: 0.9;
  transition-delay: 0.15s;
  transition-duration: 0.2s;
}

.container_bottom .card_title {
  opacity: 0.6;
  letter-spacing: 1.5px;
  margin-top: 26rem;
  font-size: 150%;
  color: white;
  text-transform: uppercase;
  transition: 300ms;
}

.container_bottom .card_title::after {
  display: block;
  margin: 1% auto 2%;
  width: 60%;
  height: 1px;
  content: "";
  background-color: #fff;
  opacity: 0.5;
  transform: scale(0);
  transition: transform 0.15s;
}

.container_bottom .card_subtitle {
  font-size: 100%;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0;
  transition: 100ms;
  color: white;
  padding-top: 2%;
}

/* End */

.button.row {
  line-height: 1px;
  background-color: transparent;
  pointer-events: none;
  border-radius: 10px;
}

.col-1 {
  pointer-events: auto;
}

.prev,
.next {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  padding: 13% 32px 13% 10px;
  color: #1db954;
  background: linear-gradient(90deg, rgba(0,0,0,0.8690828382134104) 0%, rgba(43,43,43,0) 78%);
  font-weight: bold;
  font-size: 25px;
  transition: 0.6s ease;
}

.next {
  right: 0;
  padding: 13% 10px 13% 32px;
  background: linear-gradient(-90deg, rgba(0,0,0,0.8690828382134104) 0%, rgba(43,43,43,0) 78%);
}

@keyframes arrow_pointing {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-5px);
  }
}
</style>