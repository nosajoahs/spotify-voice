
var app = angular.module('spotifyVoiceApp', []);
app.controller('spotifyVoiceCtrl', function ($scope, $http) {

  var audio = new Audio();

  $scope.pauseSong = function() {
    audio.pause()
  }

  $scope.playSong = function() {
    console.log('song title' , $scope.songTitle)
    var songTitle = $scope.songTitle;
    $http({
      method: "GET",
      url: `/playSong/${songTitle}`,
    })
    .then(function callback(response) {
      console.log('client response: ', response)
      $scope.song = response.data;
      audio.src = $scope.song.preview_url;
      if($scope.song.preview_url) {
        audio.play();
        $scope.getSongs();
      }
      else {
        window.alert('Song is not available for Preview.')
      }
    })
  }

  $scope.playThis = function(song) {
    console.log(song)
    if(song.preview_url) {
      audio.src = song.preview_url;
      audio.play();
    }
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

  $scope.getSongs();

  $scope.deleteSong = function(song) {
    var song = {
      id : song.id
    }
    $http({
      method : 'POST',
      url : '/deleteSong',
      data : song
    })
    .then(function cb(response) {
      $scope.getSongs();
    })
  }


  if (annyang) {
    var commands = {
      'pause': function () {
          audio.pause();
      },
      'hello': function () {
         console.log("hello world")
      },
      'play *song': function (song) {
        $scope.songTitle = song
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


