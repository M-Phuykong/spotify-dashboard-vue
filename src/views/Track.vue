<template>
    <div id="Track">
        <h1>Track Page</h1>
        <button @click="getTopTrack(10,'medium_term')">Get Top 10 Track!</button>
        <button @click="getTopTrack(25,'short_term')">Get Top 25 Track!</button>
        <button @click="getTopTrack(50,'medium_term')">Get Top 50 Track!</button>
        <button @click="getTopTrack(50,'long_term')">Get Top Track! Long Term</button>
        <h2>Top Track:</h2>
        <!-- <div v-for="item in tracks" v-bind:key="item" style="float: left">
            <img :src="item.album.images[1].url">
            <p>{{ item.name }}</p>
        </div> -->

        <!-- Card Stuff -->
        <div class="card_container container-fluid position-relative">
            <div class="cards_wrap d-flex top-0 overflow-auto">     
                <div class="card_item" v-for="item in tracks" v-bind:key="item">
                    <div class="card_inner">
                        <div class="card_top">
                            <img @click="showInfo(item)" :src="item.album.images[0].url">
                        </div>
                        <div class="card_bottom">
                            <div class="card_info">
                                <h5>{{ item.name }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
            <div class="button row justify-content-between w-100 h-100 top-0 gx-0 position-absolute">
                <div class="col-1">
                    <!-- Scroll Left -->
                    <div class="prev" @mouseover="scroll(-1)" @mouseleave="stopScroll()" >&#10094;</div>
                </div>
                <div class="col-1">
                    <!-- Scroll Right -->
                    <div class="next" @mouseover="scroll(1)" @mouseleave="stopScroll()" >&#10095;</div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import axios from 'axios';
import Home from './Home.vue'

export default {
    name: 'Track',
    data() {
        return {
            tracks: [],
            isScroll: undefined
        }
    },
    created() {
        this.getTopTrack(25,'medium_term')
   
    },
    mounted() {
        
        this.$nextTick(function(){
          

        })
        
    },
    methods: {
        getTopTrack: function(limit, time_range){
            var access_token = localStorage.getItem("access_token");
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
            var url = `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${time_range}`
            axios.get( url , {headers: header})
            .then(response => {
                if (response.status == 200){
                    this.tracks = response.data.items
                    for (var track of response.data.items){
                        this.tracks_img.push(track.album.images[1])
                    }
                    
                    // console.log(response.data.items[0])
                }
            })
            .catch(() =>{
                Home.methods.fetchRefreshToken()
            })
        },
        showInfo: function(item){
            //    window.open(
            //         item.preview_url,
            //         '_blank'
            //         );
            console.log(item)
            
            
        },
        scroll: function(number){
            let content = document.getElementsByClassName("cards_wrap").item(0);
            this.isScroll = setInterval(() => {
                content.scrollLeft += (5 * number)
                
            },2) 
            
        },
        stopScroll: function(){
            clearInterval(this.isScroll);
            this.isScroll = undefined
        },
        
    }
}



</script>

<style>

* {
  scroll-behavior: auto;
  margin: 0;
  box-sizing: border-box;
  font-family: "Nunito", sans-serif;
}

body {
  background: transparent;
  font-size: 14px;
}

img {
  display: block;
  width: 100%;
  height: 100%;
}

.card_container{
    align-items: center;
    padding-right: 0;
    padding-left: 0;
    background: black;
}

::-webkit-scrollbar {
    display: none;
}

.cards_wrap .card_item {
  min-width: 25%;
  margin: 5px;
}

.cards_wrap .card_inner {
  height: 100%;
  background: rgb(0, 0, 0);
}

.cards_wrap .card_top {
  width: 100%;
  min-height: 225px;
  padding: 10px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0;
}

.cards_wrap .card_bottom {
  text-align: center;
  padding: 15px;
  background: white;
}

.button.row {
    background-color: transparent
}

.prev, .next {
  position: absolute;
  width: 100px;
  height: 100%;
  padding: 13% 32px 13% 10px;
  color: white;
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(22,22,22,1) 23%, rgba(43,43,43,0) 100%);
  font-weight: bold;
  font-size: 25px;
  transition: 0.6s ease;
}

.next {
  right: 0;
  padding: 13% 10px 13% 32px;
  background: linear-gradient(-90deg, rgba(0,0,0,1) 0%, rgba(22,22,22,1) 23%, rgba(43,43,43,0) 100%);



}


</style>