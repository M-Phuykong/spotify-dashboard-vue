<template>
  <div id="Authentication">
    <div class="title">
      <h1>My Spotify DashBoard</h1>
    </div>
    <div class="authentication">
      <button class="authenticateBttn" v-on:click="requestAuthorization">
        <span class="text">Check My Info!</span>
        <span class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 0 24 24"
            width="48px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" /></svg
        ></span>
      </button>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import axios from "axios";

export default {
  name: "Authentication",
  components: {
    Footer,
  },

  methods: {
    requestAuthorization: function () {
      axios("http://localhost:3000/").then((response) => {
        window.location.href = response.data;
      });
    },
  },
};
</script>

<style scoped>
#Authentication {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.title {
  margin-top: 30vh;
  font-family: fantasy;
  font-style: italic;
  text-align: center;
}

.title h1 {
  font-size: 5rem;
}

.authentication {
  display: block;
  margin: auto;
  text-align: center;
  align-items: center;
  align-content: center;
}

.authentication button {
  width: 165px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: green;
  border: none;
  border-radius: 5px;
  background: #1db954;
}

button,
button span {
  transition: 200ms;
}

button .text {
  color: white;
  font-weight: bold;
}

button .icon {
  position: absolute;
  border-left: 1px solid #000000;
  transform: translateX(110px);
  height: 35px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button svg {
  width: 50px;
  fill: #eee;
}

button:hover {
  background: #1db954d5;
}

button:hover .text {
  color: transparent;
}

button:hover .icon {
  width: 150px;
  border-left: none;
  transform: translateX(0);
}

button:focus {
  outline: none;
}
</style>