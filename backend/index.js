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
  
//   let code = qs.stringify(req.query)
  callAuthorizationApi()
  .then(respond => res.send(respond))
  // console.log(code_object)
  // res.send(code_object)
})

app.get('/user', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  
  getUser(qs.stringify(req.query))
  .then(respond => console.log(respond))



})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function fetchAccessToken(code) {

      let body = "grant_type=authorization_code";
      body += "&code=" + code;
      body += "&redirect_uri=" + encodeURI("http://localhost:8080/home");
      body += "&client_id=" + process.env.client_id;
      body += "&client_secret=" + process.env.client_secret;
      
}

async function getUser(access_token){

  // const header = {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + access_token
  //   };

  var url = "https://api.spotify.com/v1/me";
  
  try {
      const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
          }
      });

      console.log(response)


      return response.data
  }
  catch (err){
      console.error(err);
  }
  
  




}



async function callAuthorizationApi(){

  const headers = {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
          username: process.env.client_id,
          password: process.env.client_secret,
      },
  };

  const data = {
      grant_type: 'client_credentials',
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