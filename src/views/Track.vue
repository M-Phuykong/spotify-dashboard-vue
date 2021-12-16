<template>
    <div id="Track">
        <Header></Header>

        <button @click="getTopTrack(10,'medium_term')">Get Top 10 Track! &#9196;</button>
        <button @click="getTopTrack(25,'short_term')">Get Top 25 Track!</button>
        <button @click="getTopTrack(50,'medium_term')">Get Top 50 Track!</button>
        <button @click="getTopTrack(50,'long_term')">Get Top Track! Long Term</button>
        <h1>{{scrollX}}</h1>


        <div class="top_track_title_container container-fluid d-flex justify-content-center">
            <div class="top_track_inner_container d-flex">
                <div class="emoji_downward">&#9196;</div>
                <div class="title"><h1>Top {{ track_count }} Tracks</h1></div>
                <div class="emoji_downward">&#9196;</div>
            </div>
        </div>
        <!-- Card Stuff -->
        <div class="card_container container-fluid position-relative ">
            <div class="cards_wrap d-flex top-0 overflow-auto">     
                <div class="card_item" v-for="(item,index) in tracks" :key="`${index} - ${item.id}`">
                    <div class="card_inner position-relative">
                        <div class="card_top d-flex top-0">
                            <img @click="showInfo(item)" :src="item.album.images[0].url">
                        </div>
                        <div class="card_bottom w-100 h-100 top-0 gx-0 position-absolute">
                            <div class="card_info">
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="card_back">

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
import Header from './Header.vue'

export default {
    name: 'Track',
    components: {
        Header
    },
    data() {
        return {
            tracks: [],
            tmptracks: [],
            isScroll: undefined,
            scrollX: 0,
            track_count: 20,
        }
    },
    beforeMount() {
        this.getTopTrack(20,'medium_term')
    },
    mounted() {
        
        this.$nextTick(function(){
            this.getNextTrack()
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
                    
                    this.tracks = response.data.items;
                    this.tmptracks = response.data.items;
    
                    
                        
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
        getNextTrack: function(){
            let content = document.getElementsByClassName("cards_wrap").item(0);
            content.onscroll = () =>{ 
                this.scrollX = content.scrollWidth - content.scrollLeft - content.clientWidth;
                var endOfScroll= Math.round(content.scrollWidth - content.scrollLeft - content.clientWidth) === 0;
                if (endOfScroll){
                    var newTrack = this.tracks.concat(this.tmptracks);
                    if (newTrack.length > this.tmptracks.length * 2){
                        newTrack = [];
                        newTrack = this.tmptracks;
                    }
                    this.tracks = [];
                    this.tracks = newTrack;



                }
            }
            
        }
        
    }
}



</script>

<style>

html{
    background-color: black;
}

h1, h2 {
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


.top_track_inner_container:hover > .emoji_downward{
    animation: arrow_pointing 250ms;
    animation-timing-function: cubic-bezier(.2, .65, .6, 1);
    animation-iteration-count: infinite;
    animation-direction: alternate;

}

.top_track_title_container .top_track_inner_container .emoji_downward{
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 1.5rem;
    transition: transform 250ms;

}

img {
  display: block;
  width: auto;
  height: 100%;
  /* border-start-start-radius: 10px;
  border-start-end-radius: 10px; */
  border-radius: 10px;
}

.card_container{
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
  background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(22,22,22,0.7251050933068539) 20%, rgba(43,43,43,0) 72%);
}

.card_info{
    margin-top: 25rem;
    font-size: 25px;
    color: white;
}

.button.row {
    background-color: transparent;
    pointer-events: none;
    border-radius: 10px; 
}

.col-1{
  pointer-events:auto;
}

.prev, .next {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  padding: 13% 32px 13% 10px;
  color: #1DB954;
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

@keyframes arrow_pointing {
    0% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(-5px);
    }

}


</style>