<template>
    <div id="Track">
        <h1>Track Page</h1>
        <button @click="getTopTrack(10,'medium_term')">Get Top 10 Track!</button>
        <button @click="getTopTrack(25,'short_term')">Get Top 25 Track!</button>
        <button @click="getTopTrack(50,'medium_term')">Get Top 50 Track!</button>
        <button @click="getTopTrack(50,'long_term')">Get Top Track! Long Term</button>
        <h2>Top Track:</h2>
        <div v-for="item in tracks" v-bind:key="item" style="float: left">
            <img :src="item.album.images[1].url">
            <p>{{ item.name }}</p>
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
            tracks_img: []
        }
    },
    created() {
        this.getTopTrack(25,'medium_term')
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
    }
}
</script>

<style scoped>

</style>