const keys = require('../config.js')
const express = require('express')
const db = require('../db/config')
const bodyParser = require('body-parser')
const path = require('path');
var Buffer = require('buffer').Buffer;
var request = require('request'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../angular/public')));

const client_id = keys.client_id;
const client_secret = keys.client_secret;

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
};

// app.post('/addSong', function (req, res) {
//   db.Song.create ({
//     title: req.body.title,
//     artist: req.body.artist,
//     album: req.body.album,
//     url: req.body.url
//   })
//   .then(() => {
//     res.send('Hello World!')
//   })
// });


app.get('/playSong/:title', function(req, res) {

  console.log('req server playSong: ' , req.params.title)

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      var options = {
        url: 'https://api.spotify.com/v1/search?q=' + req.params.title + '&type=track',
        headers: {
          'Authorization': 'Bearer ' + body.access_token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log('BODY FROM body: ' , body.tracks.items[0]);
        //response.send(body.tracks.items[0])
      });
    }
  });

})



app.listen(8888, function () {
  console.log('listening on port 8888!')
})