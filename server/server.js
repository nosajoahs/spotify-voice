const keys = require('../config.js')
const express = require('express')
const db = require('../db/config')
const bodyParser = require('body-parser')
const path = require('path');
var Buffer = require('buffer').Buffer;
var request = require('request'); 

const app = express();

//app.use(bodyParser.urlencoded({ extended: true }));
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
        console.log('BODY FROM body: ' , body);
        console.log('BODY FROM body: ' , body.tracks.items[0].album.images[0]);
        db.Song.create ({
          title: body.tracks.items[0].name,
          artist: body.tracks.items[0].artists[0].name,
          album: body.tracks.items[0].album.name,
          preview_url: body.tracks.items[0].preview_url,
          url: body.tracks.items[0].href,
          album_image: body.tracks.items[0].album.images[0].url
        })
        .then((song) => {
          res.send(song)
        })
      });
    }
  });
})

app.get('/getSongs', function(req, res) {
  db.Song.findAll({
    order: [["updatedAt","DESC"]],
    limit: 4
  })
  .then(songs => {
    res.send(songs)
  })
})


app.post('/deleteSong', function(req, res) {
  console.log(req.body)
  db.Song.destroy({
    where: {
      id : req.body.id 
    }
  })
  .then(song => {
    res.sendStatus(200, song)
  })
})


app.listen(8888, function () {
  console.log('listening on port 8888!')
})