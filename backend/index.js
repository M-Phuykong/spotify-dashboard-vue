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
  // console.log(code_object)
  // res.send(code_object)
})

app.get('/user', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  
  getUser(qs.stringify(req.query))
  .then(response => {
    if (response.status == 200) {
        res.send(response.data)
    }
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



async function callAuthorizationApi(code){

  const headers = {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic NjdkNTI1ZWQ1NjJkNDhkYTg2YjM5ZTRhMTBmNDhjNmY6YjY4MDIwZjhjZDA2NDJlOWE2MzEyYmJmYzFhYmU0NTA='
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