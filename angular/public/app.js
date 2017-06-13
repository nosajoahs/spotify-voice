
var app = angular.module('spotifyVoiceApp', []);
app.controller('spotifyVoiceCtrl', function ($scope, $http) {

  $scope.playSong = function() {
    console.log('song title' , $scope.songTitle)
    var songTitle = $scope.songTitle;
    $http({
      method: "GET",
      url: `/playSong/${songTitle}`,
    })
    .then(function callback(response) {
      console.log('response angular app.js playsong: ', response)
      $scope.song = response.data;
      var audio = new Audio();
      audio.src = $scope.song.preview_url;
      if($scope.song.preview_url) {
        audio.play();
      }
      else {
        window.alert('Song is not available.')
      }
    })
  }


  $scope.getSongs = function() {
    $http({
      method: "GET",
      url: '/getSongs',
    })
    .then(function cb(response) {
      $scope.songs = response.data;
    })
  }

  if (annyang) {
    var commands = {
      'pause': function () {
          audio.pause();
      },
      'play *song': function (song) {
        $scope.songTitle = song
        //alert('Play song')
        $scope.playSong();
      },
      ':nomatch': function () {
      console.log('Sorry, I don\'t recognize this command')
      }
    };

    annyang.addCommands(commands);
    annyang.start();
    console.log('annyang started')
  }

});


