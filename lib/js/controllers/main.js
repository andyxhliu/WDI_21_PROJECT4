angular
  .module('OneApp')
  .controller("MainController", MainController);

MainController.$inject = ["$auth", "$rootScope", "$state", "TokenService", "SOUNDCLOUD_KEY"];
function MainController($auth, $rootScope, $state, TokenService, SOUNDCLOUD_KEY) {

  var self = this;

  this.tracks = [];
  
  this.currentUser = TokenService.decodeToken();
  this.connected = false;

  $rootScope.$on('connected', function() {
    self.connected = true;
  });

  $rootScope.$on('disconnected', function() {
    self.connected = false;
  });

  $rootScope.$on('unauthorized', function() {
    $state.go("login");
  });

  $rootScope.$on('playing', function(event, time) {
    console.log("audio is playing", time);
  });

  $rootScope.$on('paused', function(event, time) {
    console.log("audio is paused", time);
  });

  $rootScope.$on("loggedIn", function() {
    self.currentUser = TokenService.decodeToken();
  });

  this.logout = function() {
    $auth.logout();
    this.currentUser = null;
    $state.go("login");
  }

  this.playSomeSound = function(genre) {
    SC.initialize({
      client_id: "057f6e8bbc48cc7f8ef8520b83444560" 
    });
    SC.get('/tracks', {
      genres: genre,
      bpm: {
        from: 100
      }
    }, function(tracks) {
      console.log(tracks);
      $rootScope.$applyAsync(function() {
        self.tracks = tracks.map(function(track) {
          track.stream_url += "?client_id=" + SOUNDCLOUD_KEY;
          return track;
        });
      });
    });
  }

}