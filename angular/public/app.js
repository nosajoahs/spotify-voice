
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
      audio.play();
    })
  }

    $scope.getSongs = function() {
    $http({
      method: "GET",
      url: '/getSongs',
    })
    .then(function cb(response) {
      console.log(response)
    })
  }

});


