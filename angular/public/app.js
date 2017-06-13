
var app = angular.module('spotifyVoiceApp', []);
app.controller('spotifyVoiceCtrl', function ($scope, $http) {

  $scope.playSong = function() {
    console.log('song title' , $scope.songTitle)
    var songTitle = $scope.songTitle;
    $http({
      method: "GET",
      url: `/playSong/${songTitle}`,
    })
    .then(function cb(response) {
      console.log('response angular app.js playsong: ', response)
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



