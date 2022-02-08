<template>
  <div id="Artist">
    <Header></Header>

    <div class="artist_configure_container container-fluid">
      <div class="top_container d-flex justify-content-center">
        <h2>Top&nbsp;</h2>

        <div class="artist_group_form">
          <input
            class="num_of_artist_input h-100"
            type="text"
            autocomplete="off"
            v-model="num_of_artist"
            name="num_of_artist_input"
            pattern="^$|([1-9]|[1-4][0-9]|50)"
            required
          />
          <span class="bar"></span>
          <label class="artist_label" for="num_of_artist_input"
            ># of Artists (1-50)</label
          >
        </div>

        <h2>&nbsp;Artists Within&nbsp;</h2>
        <select name="length_selector" id="length_selector">
          <option value="short_term">A Month</option>
          <option selected value="medium_term">The Last 6 Months</option>
          <option value="long_term">The Whole Lifetime</option>
        </select>
      </div>

      <div class="botton_container d-flex justify-content-center">
        <button
          class="search_button"
          @click="getTopArtist(num_of_artist, period)"
        >
          <h6>Retrieve My Result!</h6>
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
          <h1>
            Top
            <a class="title_track_count_number">{{ artist_count }}</a> Artists
          </h1>
        </div>
        <div class="emoji_downward">&#9196;</div>
      </div>
    </div>
    <!-- Card Stuff -->
    <div class="artist_card_container container-fluid position-relative">
      <div v-if="artist_count < 4">
        <div
          class="artist_cards_wrap d-flex overflow-auto justify-content-center"
        >
          <div
            class="card_item"
            v-for="(item, index) in artists"
            :key="`${index} - ${item.id}`"
          >
            <div class="card_inner position-relative">
              <div class="card_top d-flex-top-0">
                <img :src="item.images[0].url" />
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
                  <div class="artist card_title">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="artist_cards_wrap d-flex top-0 overflow-auto">
        <div
          class="card_item"
          v-for="(item, index) in artists"
          :key="`${index} - ${item.id}`"
        >
          <div class="card_inner position-relative">
            <div class="card_top d-flex top-0">
              <img :src="item.images[0].url" />
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
                <div class="artist card_title">
                  {{ item.name }}
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
            <div
              class="prev"
              @mouseover="scroll(-1)"
              @mouseleave="stopScroll()"
            >
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
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  name: "Artist",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      artists: [],
      isScroll: undefined,
      scrollX: 0,
      artist_count: 20,
      num_of_artist: 20,
      period: "medium_term",
    };
  },
  beforeMount() {
    this.getTopArtist(20, "medium_term");
  },
  mounted() {
    this.$nextTick(function () {
      var length_selector = document.getElementById("length_selector");
      length_selector.addEventListener("change", () => {
        this.period = length_selector.value;
      });
    });
  },
  methods: {
    getTopArtist: function (limit_arg, time_range_arg) {
      if (limit_arg > 50 || limit_arg < 1) return;

      var access_token = this.$store.getters.getAccessToken;

      const params = {
        access_token: access_token,
        limit: limit_arg,
        time_range: time_range_arg,
      };

      axios(`${this.$backend_url}/artist?`, { params: params }).then(
        (response) => {
          if (response.status == 200) {
            this.artists = response.data.items;
            this.artist_count = limit_arg;
          }
        }
      );
    },
    showInfo: function (item) {
      //    window.open(
      //         item.preview_url,
      //         '_blank'
      //         );

      console.log(item);
    },
    scroll: function (number) {
      let content = document
        .getElementsByClassName("artist_cards_wrap")
        .item(0);
      this.isScroll = setInterval(() => {
        content.scrollLeft += 5 * number;
      }, 5);
    },
    stopScroll: function () {
      clearInterval(this.isScroll);
      this.isScroll = undefined;
    },
  },
};
</script>

<style>
#Artist {
  height: 100vh;
  display: flex;
  flex-direction: column;
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

.artist_group_form {
  position: relative;
}

.num_of_artist_input {
  padding: 10px 10px 10px 5px;
  display: block;
  width: 150px;
  border: none;
  border-bottom: 1px solid #757575;
  background: transparent;
  color: rgb(255, 255, 255);
  font-size: 1.2rem;
}

.num_of_artist_input:focus {
  outline: none;
}

/* Label */
.artist_label {
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
.num_of_artist_input:focus ~ .artist_label,
.num_of_artist_input:valid ~ .artist_label {
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

.num_of_artist_input:focus ~ .bar:before,
.num_of_artist_input:focus ~ .bar:after {
  width: 50%;
}

/* End */

select {
  background: black;
  color: white;
  border: none;
  font-size: 1.6rem;
  padding-bottom: 10px;
}

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

.artist_configure_container .top_container {
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

.artist_card_container {
  padding-right: 0;
  padding-left: 0;
  background: black;
  border-radius: 10px;
}

::-webkit-scrollbar {
  display: none;
}

.artist_cards_wrap .card_item {
  width: auto;
  margin: 10px;
}

.artist_cards_wrap .card_inner {
  height: 100%;
  width: auto;
  background: rgb(0, 0, 0);
}

.artist_cards_wrap .card_top {
  width: auto;
  height: 500px;
  padding: 10px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0;
}

.artist_cards_wrap .card_bottom {
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

/* Hover Card Animation */

.artist_cards_wrap .card_bottom:hover > .container_bottom .card_title {
  transform: translateY(-80%);
  opacity: 1;
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

/* Hover Card Animation End */

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
  font-weight: bold;
  font-size: 25px;
  transition: 0.6s ease;
}

.next {
  right: 0;
  padding: 13% 10px 13% 32px;
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