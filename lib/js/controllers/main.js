angular
  .module('OneApp')
  .controller("MainController", MainController);

MainController.$inject = ["$auth", "$rootScope", "$state", "TokenService", "SOUNDCLOUD_KEY"];
function MainController($auth, $rootScope, $state, TokenService, SOUNDCLOUD_KEY) {

  var self = this;
  this.currentSound = null;
  this.offset = 50;
  this.genre = null;
  this.textShow = true;

  this.textMuted = function() {
    if (this.textShow === false ) {
      this.textShow = true;
    } else if (this.textShow === true) {
      this.textShow = false;
    }
  }

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
    self.playSomeSound();
  });

  this.logout = function() {
    $auth.logout();
    this.currentUser = null;
    $state.go("login");
  }

  this.randomSelection = function() {
    self.offset = Math.floor(Math.random()*1000);
    console.log(self.offset);
    self.playSomeSound();
  }

  this.playSomeSound = function() {
    SC.initialize({
      client_id: "057f6e8bbc48cc7f8ef8520b83444560" 
    });
    SC.get('/tracks', {
      order: 'hotness',
      offset: self.offset,
      genres: self.genre,
      limit: 20,
      bpm: {
        from: 100
      }
    }, function(tracks) {
      $rootScope.$applyAsync(function() {
        self.tracks = tracks.map(function(track) {
          track.stream_url += "?client_id=" + SOUNDCLOUD_KEY;
          return track;
        });
      });
    });
  }

  this.inputSound = function(url) {
    this.currentSound = url;
  }

}