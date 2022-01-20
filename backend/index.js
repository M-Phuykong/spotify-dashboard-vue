const express = require('express')
const dotenv = require("dotenv")
const axios = require('axios')
var qs = require('qs')

dotenv.config()
const app = express()
const port = 3000

const home_uri = "http://localhost:8080/home";

app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    let url = "https://accounts.spotify.com/authorize";
    url += "?client_id=" + process.env.client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(home_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-top-read user-read-email";
    res.send(url)
})

app.get('/login', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  
  callAuthorizationApi(qs.stringify(req.query))
  .then(respond => res.send(respond))

})

app.get('/refresh', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  
  getRefreshToken(qs.stringify(req.query))
  .then(respond => res.send(respond))
})

app.get('/user', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  
  getUser(qs.stringify(req.query))
  .then(response => {
    res.send(response.data)
  })

})

app.get('/track', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  
  getTrack(req.query.access_token, req.query.limit, req.query.time_range)
  .then(response => {
    res.send(response.data)
  })

})

app.get('/artist', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  
  getArtist(req.query.access_token, req.query.limit, req.query.time_range)
  .then(response => {
    res.send(response.data)
  })

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


async function getUser(access_token){

    const header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token.slice(0,-1),
    };
    var url = `https://api.spotify.com/v1/me`;
  
  try {
      const response = await axios.get(url, { headers: header });

      return response
  }
  catch (err){
      console.error(err);
  }
  
}

async function getTrack(access_token, limit, time_range){

    const header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };
    var url = `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${time_range}`;
  
  try {
      const response = await axios.get(url, { headers: header });

      return response
  }
  catch (err){
      console.error(err);
  }
  
}

async function getArtist(access_token, limit, time_range){

    const header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };
    var url = `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${time_range}`;
  
  try {
      const response = await axios.get(url, { headers: header });

      return response
  }
  catch (err){
      console.error(err);
  }
  
}

async function callAuthorizationApi(code){

  const headers = {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${process.env.client_id_and_secret_base64}`
      },
  };

  const data = {
      code : code.slice(0,-1),
      redirect_uri: encodeURI(home_uri),
      grant_type: 'authorization_code',
  };

  try {
    let res = await axios.post(
          'https://accounts.spotify.com/api/token',
          qs.stringify(data),
          headers)

    return res.data
  }
  catch (err) {
      console.error(err);
  }

}

async function getRefreshToken(refresh_code){

  const headers = {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${process.env.client_id_and_secret_base64}`
      },
  };

  const data = {
      refresh_token : refresh_code.slice(0,-1),
      grant_type: 'refresh_token',
  };

  try {
    let res = await axios.post(
          'https://accounts.spotify.com/api/token',
          qs.stringify(data),
          headers)

    return res.data
  }
  catch (err) {
      console.error(err);
  }

}